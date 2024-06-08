"use client"

import React from 'react'
import Image from 'next/image'


import User from "../../public/images/user-1.jpg";
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';


const UserButton = ({user}: Session) => {
  return (
    <>
    <div className='flex flex-row gap-2'>

        <div className="rounded-full overflow-hidden border-2 border-gray-100 hover:border-blue-Sec cursor-pointer">
            <Image className="h-8 w-8" src={User} alt="user-image" />
        </div>
            <button onClick={()=> signOut()}>Sign Out</button>
    </div>
    </>
  )
}

export default UserButton