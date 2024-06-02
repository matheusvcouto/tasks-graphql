import { useAtom } from "jotai"
import { userAtom } from "../../hooks/user"

export const ViewUser = () => {
    const [user, setUser] = useAtom(userAtom) 
  return (
    <>
      <pre>user: {JSON.stringify(user, null, 2)}</pre>
    </>
  )
}