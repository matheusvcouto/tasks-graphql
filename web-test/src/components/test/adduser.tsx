import { useAtom } from "jotai"
import { FormEvent, useState } from "react"
import { userAtom } from "../../hooks/user"

export const AddUser = () => {
  const [email, setEmail] = useState<string>('')
  const [user, setUser] = useAtom(userAtom) 

  const add = (e: FormEvent) => {
    e.preventDefault()
    setUser({email})
    console.log(user)
  }
  return (
    <>
    <form onSubmit={add}>
      <div>
        <pre>email: {email}</pre>
      </div>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
    </form>
    </>
  )
}