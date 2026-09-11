import React from "react";
import "./header.css";

function Header() {
  const handleLogout = () => {
    try {
      fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
        credentials: "include",
          headers: {
          "Content-Type": "application/json"
         }
        }
      });
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  return (
    <header>
      <link rel="stylesheet" href="./header.css" />
      <h1>dotMercury</h1>
      <nav>
        <a>Mail</a>
        <a>Settings</a>
        <a onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  );
}
export default Header;
