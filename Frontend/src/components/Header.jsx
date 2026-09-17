import React from "react";
import "./header.css";
import { Link } from 'react-router-dom'

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
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header>
      <h1>dotMercury</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
