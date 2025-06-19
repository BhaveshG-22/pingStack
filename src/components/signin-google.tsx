"use client"
import { signIn } from "next-auth/react"

export default function SignInWithGoogle() {
  return (
    <button onClick={() => signIn("google", { redirectTo: "/admin" })}>
      Sign in with Google
    </button>
  )
}