import { useQuery } from "@tanstack/react-query"
import { GET_TASKS_ID_TITLE } from "../../apollo/querys"
import { useAtom } from "jotai"
import { tasksAtom } from "../../hooks/tasks"
import { DeleteTask } from "./delete-task"
import { gqlClient } from "../../graphql/client"
import { gql } from "graphql-request"

export function ListTasks () {
  const { data, isPending } = useQuery<GET_TASKS_ID_TITLE>({
    queryKey: ['tasks'],
    queryFn: () => gqlClient.request<GET_TASKS_ID_TITLE>(gql`
    {
      unaltorizeTest
    }
    `)
  })
  if (isPending) return <p>Carregando...</p>;

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <ul className="flex flex-col px-10 py-4 p-10 w-96 items-center justify-between">
          {data && data.tasks.map(task => (
            <li key={task.id} className="flex gap-2 w-full items-center justify-between">
              <p>{task.title}</p>
              <DeleteTask taskId={task.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}