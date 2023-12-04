import React from 'react'
import Button from '../Global/Button'
import Form from '../Global/Form'
import {changePasswordWithCredentials} from '@/actions/authActions'

const ChangePassword = () => {

    async function handleChangePassword(formData){
        const old_pass = formData.get("old_pass")
        const new_pass = formData.get("new_pass")

        const res = await changePasswordWithCredentials({old_pass , new_pass})
        if(res?.msg) alert (res?.msg)
    }


  return (
    <>
        <h2>Change Password</h2>

        <Form action={handleChangePassword} style={{margin:"20px 0"}}>
            <input type="password" name="old_pass" placeholder="Old Password" required />
            <input type="password" name="new_pass" placeholder="New Password" required />
            <Button value="Change Password" />
        </Form>
    </>
  )
}

export default ChangePassword