import React, { useState, useEffect } from "react";

function Register() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/api/register")
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);
    return (
        <main>     
            <h1>Register for dotMercury</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
        </main>
    );
}

export default Register;
