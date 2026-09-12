import React from "react";
import "./header.css";

function Header() {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Logout failed with status ${response.status}`);
      }

      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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
