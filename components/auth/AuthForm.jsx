import axios from "axios";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  async function formSubmitHandler(data) {
    if (!isLogin) {
      // axios.post("/api/auth/register", data);
      console.log(data);
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
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email", {
            required: "L'email è obbligatoria",
          })}
        />
        <div>{errors.email && <p>email invalid</p>}</div>
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
              {...register("firstname", {
                required: "Il nome è obbligatorio",
              })}
            />
            <div>{errors.firstname && <p>firstname invalid</p>}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              {...register("lastname", {
                required: "Il cognome è obbligatorio",
              })}
            />
            <div>{errors.lastname && <p>lastname is invalid</p>}</div>
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
