import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/user')({
  component: Page
})

function Page () {
  const router = useRouter()
  return (
    <>
      <div>Hello {router.state.location.pathname}</div>
    </>
  )
}