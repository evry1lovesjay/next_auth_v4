"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Form from '../Global/Form';
import Button from '../Global/Button';
import { forgotPasswordWithCredentials } from '@/actions/authActions'

const SignIn = ({callbackUrl}) => {

async function handleCredentialsLogin(formData){
  const email= formData.get("email")
  const password= formData.get("password")

  await signIn("credentials", {
    email,
    password,
    // redirect: false,
    callbackUrl
  })
}

async function handleForgotPassword(formData){
  const email = formData.get("email")

  const res = await forgotPasswordWithCredentials({email})

  if(res?.msg) alert(res?.msg)
}

  return (
    <>
    <h2>Sign In With NextAuth</h2>

    {/* // Google Login */}
    <div style= {{margin: "30px 0"}}>
        <button onClick={() =>{signIn('google', {callbackUrl})}} style= {{padding: "15px", color: "white", border: "none", fontSize: "16px", backgroundColor: "red"}}>
            Continue with Google
        </button>
    </div>

    {/* // Sign in with Credentials */}
    <Form action={handleCredentialsLogin} style={{margin: "30px 0"}}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <Button value="Credentials Login" />
    </Form>

    {/* Forgot Password */}
    <h3>Forgot Password ?? </h3>
    <Form action={handleForgotPassword} style={{margin: "30px 0"}}>
        <input type="email" name="email" placeholder="Email" required />
        <Button value="Forgot Password" />
    </Form>


    <div style={{margin: "30px 0"}}>
      <span>Don't have an account ? </span>
      <Link href="/signup" style={{color: "red", textDecoration:"none"}}>Sign Up With Email & Password</Link>
    </div>
    </>
  )
}

export default SignIn