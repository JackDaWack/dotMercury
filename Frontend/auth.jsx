import React, { useState } from 'react';
import './styles.css';

const API_BASE = 'http://localhost:8000';

function login_page(){
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function register_page(){
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="reg-username">Username:</label>
        <input type="text" id="reg-username" name="username" required />
        <label htmlFor="reg-email">Email:</label>
        <input type="email" id="reg-email" name="email" required />
        <label htmlFor="reg-password">Password:</label>
        <input type="password" id="reg-password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

async function login() {
    try {
        const username = document.querySelector("#login-form #username").value;
        const password = document.querySelector("#login-form #password").value;
        const response = await fetch("/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username,password})})
        if (!response.ok) {
            throw new Error("User login request failed");
        }
        const data = await response.json();
        console.log("Server response:", data);
        if (data.success) {
            window.location.href = "/";
        } else {
            alert("Login failed");
        }
    }
    catch(err){console.error("Error calling backend:", err);}
}

async function register() {
    try {
        const username = document.querySelector("#register-form #username").value;
        const email = document.querySelector("#register-form #email").value;
        const password = document.querySelector("#register-form #password").value;
        const response = await fetch("/register", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username,email,password})})
        const data = await response.json();
        console.log("Server response:", data);
        if (data.success) {
            window.location.href = "/login-page";
        } else {
            alert(data.message || "Registration failed");
        }
    }
    catch(err){console.error("Error calling backend:", err);}

}