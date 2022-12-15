import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function MainNav() {
  const session = useSession();

  async function logoutHandler(e) {
    await signOut();
  }
  return (

  <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <div>
        <button onClick={logoutHandler}>Logout</button>
        <h1>{!session.data ? "non autenticato" : "autenticato"}</h1>
      </div>
      </ul>
    </div>
  </div>
</nav>



  );
}
