import { useEffect, useState } from "react";

function Login() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/api/login")
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);
    return (
        <main>   
            <h1>Login to dotMercury</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
        </main>
    );
}

export default Login;