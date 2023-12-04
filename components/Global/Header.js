import Link from 'next/link'
import {getServerSession} from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOut from '../Auth/SignOut'


const Header = async () => {

    const session = await getServerSession(authOptions)

    console.log(session)
  return (
    <header >
        <>
        <Link style={{marginRight:"20px"}} href="/"> Home </Link>
        <Link style={{marginRight:"20px"}} href="/protected/client"> Protected (client) </Link>
        <Link style={{marginRight:"20px"}} href="/protected/server"> Protected (server) </Link>
        </>


        {session ? (
            <>
                <Link style={{marginRight:"20px"}} href="/profile/client"> Profile (client) </Link>
                <Link style={{marginRight:"20px"}} href="/profile/server"> Profile (server)</Link>
                <Link style={{marginRight:"20px"}} href="/dashboard">Admin Dashboard </Link>
                {/* <Link style={{marginRight:"20px"}} href="/signout">Sign Out </Link> */}
                <SignOut/>
            
            </>
        )

        : (
            <>
            <Link style={{marginRight:"20px"}} href="/signin"> SignIn </Link>
            </>
        )}
    </header>
  )
}

export default Header