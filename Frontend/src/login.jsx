import { useState } from "react";

function Login() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            setMessage(data.success ? "Login successful" : (data.message || "Invalid email or password"));
            if (data.success) {
                // Redirect to the dashboard or another page after successful login
                window.location.href = "/"; // Change this to your desired route
            } else {
                setMessage(data.message || "Invalid email or password");
            }
        } catch (error) {
            setMessage("Unable to reach the server.");
        }
    };

    return (
        <main>
            <h1>Login to dotMercury</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}

export default Login;