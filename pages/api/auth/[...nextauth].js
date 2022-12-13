import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";


export async function verifyPassword(password, hashedPassword){
  const isValid = await compare(password, hashedPassword);
  return isValid;
}


export default NextAuth({
  sessions: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("no user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          
          throw new Error("password not valid");
        }
        
        return { email: user.email };
      },
    }),
  ],
});
