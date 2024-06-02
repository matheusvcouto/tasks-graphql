import { jwtVerify } from "jose"
import { atom, useAtom } from "jotai"
import { createJSONStorage } from "jotai/utils"
import Cookies from "js-cookie"

export interface User {
  // id: string
  email: string
}
export const userAtom = atom<User | null>(null)

const decodeToken = async (token: string) => {
  try {
    const publicKey = new TextEncoder().encode(atob(import.meta.env.VITE_JWT_PUBLIC_KEY));
    const { payload } = await jwtVerify(token, publicKey);
    return payload as unknown as User;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const UserAtom = atom<Promise<User | null>>( async () => {
  const token = Cookies.get('token')
  if (token) {
    return null
  }
  return null
})
