import React from "react";
import "./header.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Settings from "./Settings.jsx";

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
      window.location.reload(); // Reload the page to reflect the logout state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <header>
      <link rel="stylesheet" href="./header.css" />
      <h1>dotMercury</h1>
      <Router>
        <nav>
          <link to="/">Home</link>
          <link to="/settings">Settings</link>
        </nav>
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
export default Header;
