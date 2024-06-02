import { createFileRoute } from '@tanstack/react-router'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/logout')({
  component: () => {
    
    function logout() {
      Cookies.remove('token')
      console.log('cookie removido')
    }
    
    return (
      <>
      <button onClick={logout}>Sair</button>
      </>
    )
  }
})