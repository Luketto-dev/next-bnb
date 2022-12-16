import {getSession} from 'next-auth/react'

export default function Home() {
  return <>QUI CI SARANNO GLI APPARTAMENTI....</>;
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


  return{
    props: {session}
  }

}