import { createFileRoute } from '@tanstack/react-router'
import { ListTasks } from '../../../components/tasks/list-tasks'

export const Route = createFileRoute('/auth/_layout/tasks')({
  component: () => <ListTasks />
})