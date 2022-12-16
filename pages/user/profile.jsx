import React from "react";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default function profile(props) {
  const { firstname, lastname, email } = props;

  return (
    <div>
      {firstname}
      {lastname}
      {email}
      {JSON.stringify(props.user)}
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
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      user: user,
    },
  };
}
