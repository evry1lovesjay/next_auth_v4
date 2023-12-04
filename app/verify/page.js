import { verifyWithCredentials } from '@/actions/authActions'
import React from 'react'

const verifyPage = async ({searchParams:{token} }) => {
    const res = await verifyWithCredentials(token)

    return (
        <h1 style={{color: "green"}} >{res?.msg}</h1>
  )
}

export default verifyPage