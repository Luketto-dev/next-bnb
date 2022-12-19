import React from 'react'
import ApartmentForm from '../../components/forms/ApartmentForm'
import {getSession} from 'next-auth/react'
import { PrismaClient } from "@prisma/client";

export default function create(props) {
  return (
    <div>
        <ApartmentForm types={props.types}></ApartmentForm>
    </div>
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
  

    const prisma = new PrismaClient();

    const types = await prisma.type.findMany()

    console.log(types)

    return{
        props:{
            types,
            
        }
    }


}