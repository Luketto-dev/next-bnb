import {getSession} from 'next-auth/react'
import { PrismaClient } from "@prisma/client";

export default function Home(props) {
  const {apartments} = props
  return (
    <div>
      {apartments.map((apartment) => (<div key={apartment.id}>{apartment.name}</div>))}
    </div>
  );
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

  const apartments = await prisma.apartment.findMany({ 
    include: {

      types: true
    },
  });

  return {
    props: {
      apartments: apartments,

    },
  };


}