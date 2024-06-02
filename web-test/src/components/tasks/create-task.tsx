import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_TASKS_ID_TITLE } from "../../apollo/querys";

const CREATE_TASK = gql`
mutation($input: CreateTaskInput!) {
  task: createTask(input: $input) {
    id
    title
  }
}
`

export const CreateTask = () => {
  const [ title, setTitle ] = useState('')
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK)

  async function Submit(e: FormEvent) {
    e.preventDefault()
    if (!title) return;

    await createTask({
      variables: {
        input: {
          title
        }
      },
      refetchQueries: [GET_TASKS_ID_TITLE],
    })

  }

  return (
    <>
    <form onSubmit={Submit} className="flex gap-2 items-center justify-center">
      <input 
        type="text" 
        value={title}
        className="px-2 py-1 rounded-md"
        onChange={e => setTitle(e.target.value)} 
      />
      <button type="submit">enviar</button>
    </form>
    <pre>{data ? JSON.stringify(data, null, 2) : 'Sem data'}</pre>
    </>
  )
}