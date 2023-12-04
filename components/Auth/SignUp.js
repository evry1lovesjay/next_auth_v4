"use client"

import Link from 'next/link';
import Form from '../Global/Form'
import Button from '../Global/Button'
import { signUpWithCredentials } from '@/actions/authActions'

const signUp = () => {
  async function handleSignUpCredentials(formData){
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    const res = await signUpWithCredentials({name, email, password})
    if(res?.msg) alert (res?.msg)
  }

  return (
    <div>
      <h2>Sign up With NextAuth</h2>

      <Form action={handleSignUpCredentials} style={{margin: "30px 0"}}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        <Button value="Register" />
      </Form>

      <div style={{margin: "30px 0"}}>
        <span style={{color: "red"}}>Already have an account ? </span>
        <Link href="/signin" style={{textDecoration:"none", background:"red", padding:"15px", color: "white"}}>Sign In</Link>
      </div>
    </div>
  )
}

export default signUp