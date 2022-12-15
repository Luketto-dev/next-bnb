import axios from "axios";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const schema = yup
    .object()
    .shape({
      // .email() tolto per vedere se funzionava la validazione lato server
      email: yup.string().email().required(),
      password: yup.string().min(8).max(32).required(),
      firstname: yup.string().min(2).max(60).required(),
      lastname: yup.string().min(2).max(32).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function formSubmitHandler(data) {
    if (!isLogin) {
      try {
        setError(null);
        await axios.post("/api/auth/register", data);
      } catch (error) {
        if (error.response.data.message) {
          alert('utente gia registrato')
        }
        
        setError(error.response.data.errori);
      }
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result);

      if (!result.error) {
        router.push("/");
      }
    }
  }

  function changeAuthMode(e) {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="container ">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email")}
        />
        <div>{errors.email?.message}</div>
        <div>{error && <p>{error.email}</p>}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          {...register("password")}
        />
        <div>{errors.password?.message}</div>
        <div>{error && <p>{error.password}</p>}</div>
      </div>

      {!isLogin && (
        <>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              {...register("firstname")}
            />
            <div>{errors.firstname?.message}</div>
            <div>{error && <p>{error.firstname}</p>}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              {...register("lastname")}
            />
            <div>{errors.lastname?.message}</div>
            <div>{error && <p>{error.lastname}</p>}</div>
          </div>
        </>
      )}

      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={changeAuthMode}
      >
        {isLogin
          ? "Not registered? create new account"
          : "Login with existing account"}
      </button>

      <button className="btn btn-primary mb-3">
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
}
