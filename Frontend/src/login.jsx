import { useEffect, useState } from "react";

function Login() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "user@example.com",
                password: "password"
            })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);
    return (
        <main>   
            <h1>Login to dotMercury</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
        </main>
    );
}

export default Login;