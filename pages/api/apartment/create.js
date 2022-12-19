import { prisma, PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function (req, res) {
  if (req.method !== "POST") {
     res.status(501).json({ message: 'metodo non supportato da questa rotta api' });
    return;
  }

  const session = await getSession({req:req});
  

  const userEmail = session.user.email

  

  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where:{
        email: userEmail

    },
    
  })

  const userId = user.id


  res.status(200).json({ name: req.body });
}
