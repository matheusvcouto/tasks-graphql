import { Outlet, createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/auth/_layout')({
  // loader: () => <Loader2Icon className='size-4' />,
  beforeLoad: async () => {
    console.log('Aqui')
    const token = Cookies.get('token')
    if (token) {
      // console.log(token)
    } else {
      throw redirect({
        to: '/login'
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  const token = Cookies.get('token')
  
  return (
    <div>
      <h1>Layout Auth</h1>
      <Outlet />
    </div>
  )
}
