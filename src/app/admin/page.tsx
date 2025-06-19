import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div>
            <h1>Private Page</h1>
            {/* <p>Welcome, {session.user?.name}!</p> */}
        </div>
    )
}

export default page