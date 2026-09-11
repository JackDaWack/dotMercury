import React from "react";
import "./header.css";

function Header() {
  return (
    <header>
      <link rel="stylesheet" href="./header.css" />
      <h1>dotMercury</h1>
      <nav>
        <a>Mail</a>
        <a>Settings</a>
        <a id="logoutBtn">Logout</a>
      </nav>
    </header>
  );
}
export default Header;
