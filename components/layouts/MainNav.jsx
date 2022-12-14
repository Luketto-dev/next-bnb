import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function MainNav() {
  const session = useSession();

  async function logoutHandler(e) {
    await signOut();
  }
  return (
    <nav>
      navigation links
      <header>links</header>
      <div>
        <button onClick={logoutHandler}>Logout</button>
        <h1>{!session.data ? "non autenticato" : "autenticato"}</h1>
      </div>
    </nav>
  );
}
