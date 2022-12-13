import React from "react";
import MainNav from "./MainNav";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <main>{props.children}</main>
    </>
  );
}
