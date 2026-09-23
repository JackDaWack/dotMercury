import react, { useState } from 'react';


function DeleteAccount() {
  const [password, setPassword] = useState('');

  const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/delete_user", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            setMessage(data.success ? "Account deleted successfully" : (data.message || "Failed to delete account"));
            if (data.success) {
                // Redirect to the dashboard or another page after successful login
                window.location.href = "/";
                localStorage.removeItem("token");
                window.location.reload();
            } else {
                setMessage(data.message || "Failed to delete account");
            }
        } catch (error) {
            setMessage("Unable to reach the server.");
        }
    };

  return (
    <div>
      <h2>Delete Account</h2>
      <form onSubmit={handleDelete}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Confirm Delete Account</button>
      </form> 
    </div>
  )
}

export default DeleteAccount;