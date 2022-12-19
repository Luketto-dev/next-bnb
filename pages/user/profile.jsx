import React from "react";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default function profile(props) {
  const { user } = props;

  return (
    <div>
      {user.firstname}
      {user.lastname}
      {user.email}
      {user.apartments.map((apartment) => (<div key={apartment.id}>{apartment.name}</div>))}
      
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      password: false,
      apartments: {
        include: {
          types: true,
        },
      },
    },
  });

  console.log(user);

  return {
    props: {
      user: user,
    },
  };
}
