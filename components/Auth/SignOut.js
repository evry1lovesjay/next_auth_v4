"use client"

import {signOut} from 'next-auth/react';


const SignOut = () => {
  return (
    <>
    {/* // Sign Out */}
        <button onClick={() =>{signOut()}} style= {{padding: "5px", color: "white", border: "none", backgroundColor: "red"}}>
            Sign Out
        </button>
    </>
  )
}

export default SignOut