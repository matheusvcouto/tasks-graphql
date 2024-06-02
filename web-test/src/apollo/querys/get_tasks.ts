import { gql } from "@apollo/client";

export const GET_TASKS_ID_TITLE = gql`
{
  tasks {
    id
    title
  }
}
`

export const GET_TASKS = gql`
{
  tasks {
    id
    title
    description
  }
}
`


export const GET_TASKS_AND_SUBTASKS = gql`
{
  tasks {
    id
    title
    description

    subTasks {
      id
      title
      description
    }
  }
}
`

export interface GET_TASKS_ID_TITLE {
  tasks: {
    id: string
    title: string
  }[]
}

export interface GET_TASKS {
  tasks: {
    id: string
    title: string
    description: string

    subTasks: GET_TASKS['tasks']
  }[]
}