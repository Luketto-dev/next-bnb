import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();

  if (req.method !== "POST") {
    res.status(401).json({ message: "invalid method" });
  }

  const { email, password, firstname, lastname } = req.body;
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      firsname: firstname,
      lastname: lastname,
    },
  });

  res.status(200).json({ message: user });
}
