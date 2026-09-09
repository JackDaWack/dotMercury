import React, { useState } from "react";

function Register() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();
            setMessage(data.message || (data.success ? "User registered successfully" : "Registration failed"));
            if (data.success) {
                // Redirect to the login page or another page after successful registration
                window.location.href = "/login"; // Change this to your desired route
            } else {
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setMessage("Unable to reach the server.");
        }
    };

    return (
        <main>
            <h1>Register for dotMercury</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}

export default Register;
