"use client"

import ProtectedComponent from "@/components/Profile/Protected"

// import {useSession} from 'next-auth/react'

const ProtectedClientPage = () => {

    // const {data:session} = useSession()


  return (
    <div>
        <h1> This is a
            <i style={{color: "red"}}> Client-Side</i> protected page
        </h1>

        {/* <p>You are logged in as: <b>{session?.user?.name}</b></p> */}
        <ProtectedComponent/>
    </div>
  )
}

export default ProtectedClientPage