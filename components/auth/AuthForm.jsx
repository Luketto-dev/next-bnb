import axios from "axios";
import React, { useRef, useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!isLogin) {
      const emailValue = emailInputRef.current.value;
      const passwordValue = passwordInputRef.current.value;
      const firstNameValue = firstNameInputRef.current.value;
      const lastNameValue = lastNameInputRef.current.value;

      const data = {
        email: emailValue,
        password: passwordValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
      };

      axios.post("/api/auth/register", data);
    }
  }

  function changeAuthMode(e) {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  }

  return (
    <form onSubmit={formSubmitHandler} className="container">
      email
      <input type="email" name="email" ref={emailInputRef} />
      password
      <input type="password" name="password" ref={passwordInputRef} />
      {!isLogin && (
        <div>
          first name
          <input type="text" name="firstname" ref={firstNameInputRef} />
          last name
          <input type="text" name="lastname" ref={lastNameInputRef} />
        </div>
      )}
      <button type="button" onClick={changeAuthMode}>
        {isLogin
          ? "Not registered? create new account"
          : "Login with existing account"}
      </button>
      <button>{isLogin ? "Login" : "Register"}</button>
    </form>
  );
}
