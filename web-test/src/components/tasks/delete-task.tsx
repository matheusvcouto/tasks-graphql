import { gql, useMutation } from "@apollo/client"
import { Trash2, Loader2Icon } from 'lucide-react'
import { GET_TASKS_ID_TITLE } from "../../apollo/querys"

const DELETE_TASK = gql`
mutation($taskId: String!) {
  deleteTask(taskId: $taskId) {
    title
  }
}
`

interface Props {
  taskId: string
}

export const DeleteTask = ({ taskId }: Props) => {
  const [deleteTask, { loading }] = useMutation(DELETE_TASK)

  async function removeTaks() {
    await deleteTask({
      variables: {
        taskId: taskId
      },
      refetchQueries: [GET_TASKS_ID_TITLE]
    })
  }
  return (
    <>
      <button className="p-2" onClick={removeTaks}>
        {
          loading ? <Loader2Icon className="size-4 animate-spin" /> : <Trash2 className="size-4" />
        }
      </button>
    </>
  )
}