import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

export default async function (req, res) {
  const schema = yup.object().shape({
    // .email() tolto per vedere se funzionava la validazione lato server
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    firstname: yup.string().min(2).max(60).required(),
    lastname: yup.string().min(2).max(32).required(),
  });

  const { email, password, firstname, lastname } = req.body;

  try {
    await schema.validate(
      {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
      { abortEarly: false }
    );
  } catch (error) {
    const errorsObj = error.errors.reduce((acc, err) => {
      // extract the key from the error message
      const key = err.split(" ")[0];
      // add the key and error message to the errors object
      acc[key] = err;
      return acc;
    }, {});

    res.status(501).json({ errori: errorsObj });
  }

  try {
    const prisma = new PrismaClient();

    if (req.method !== "POST") {
      res.status(401).json({ message: "invalid method" });
    }

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
  } catch (error) {
    res.status(402).json({ message: 'utente non creato' });
  }
}
