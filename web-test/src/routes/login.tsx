import { createFileRoute, useRouter } from '@tanstack/react-router'
import { FormEvent, useState } from 'react'
import Cookies from 'js-cookie'
import { gqlClient } from '../graphql/client'
import { gql } from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon, SendIcon } from 'lucide-react'
import { isAuthenticated, signIn, signOut } from '../utils/auth'


export const Route = createFileRoute('/login')({
  component: LoginPage
})


interface ResponseRequest {
  loginTest: { access_token: string }
}


function LoginPage () {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<any | null>(null)
  const [token, setToken] = useState<string | null>(Cookies.get('token') ?? null)
  // const [user] = useAtom(UserAtom)

  const req = async (variabes: { email: string }) => gqlClient.request<ResponseRequest>(gql`
    mutation LoginTest($email: String!) {
      loginTest(email: $email) {
        access_token
      }
    }
  `, variabes)

  const { data, error, mutate, isPending } = useMutation({
    mutationFn: async (variabes: { email: string }) => req(variabes),
    onSuccess: (data: ResponseRequest) => {
      setResult(data)
      setToken(data.loginTest.access_token)
      Cookies.set('token', data.loginTest.access_token, {
        expires: 1
      })
    },
    onError: (error: any) => setResult(error),
  })

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!email) return;

    mutate({ email })
  }

  return (
    <>
    <div className="flex m-2 gap-2 items-start">
      <form onSubmit={submit} className='flex flex-col gap-2 w-full max-w-xs'>
        <p 
          className='text-xs truncate '
        >
          token: {token ? JSON.stringify(token) : 'Sem token'}
        </p>
        <input
          className='p-2'
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-2 bg-slate-300 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-400 active:bg-slate-500">
          Entrar {isPending ? <Loader2Icon className='size-4 animate-spin' /> : <SendIcon className='size-4' />}
        </button>
      </form>

      <div className=''>
        <pre>result: {JSON.stringify(result, null, 2)}</pre>
      </div>

    </div>
    </>
  )
}

function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      {isAuthenticated() ? (
        <>
          <p>Hello user!</p>
          <button
            onClick={async () => {
              signOut();
              router.invalidate();
            }}
            className="w-[110px]"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>Who are you?</p>
          <button
            onClick={async () => {
              signIn();
              router.invalidate();
            }}
            className="w-[110px]"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}