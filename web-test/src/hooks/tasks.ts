import { atom } from "jotai"
import { GET_TASKS } from "../apollo/querys"

export interface task {
  id: string
  title: string
  description: string

  subTasks: GET_TASKS['tasks']
}

export const tasksAtom = atom<task[] | null>(null)
