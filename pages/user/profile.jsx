import React from 'react'
import {getSession} from 'next-auth/react'
import { PrismaClient } from "@prisma/client";

export default function profile({session}) {
  return (
    <div></div>
  )
}


export async function getServerSideProps(context){

    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/welcome',
          permanent: false
        }
      }
    }

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    console.log(user)
  
  
    return{
      props: {session, name:user.firstname}
    }
  
  }