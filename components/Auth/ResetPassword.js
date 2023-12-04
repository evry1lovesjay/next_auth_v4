"use client"

import React from 'react'
import Form from '../Global/Form'
import Button from '../Global/Button'
import { resetPasswordWithCredentials } from '@/actions/authActions'

const ResetPasswordComponent = ({token}) => {

    async function handleResetPassword(formData){
        const password = formData.get("password")
        const res = await resetPasswordWithCredentials({token, password})
        if(res?.msg) alert (res?.msg)
    }

  return (
    <div>
        <h1>ResetPasswordComponent</h1>

        <Form action={handleResetPassword}>
            <input type="password" name="password" placeholder="Password" required />
        
            <Button value="Reset password"/>
        </Form>
    </div>
  )
}

export default ResetPasswordComponent