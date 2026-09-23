import react, { useState } from 'react';


function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/delete_user", {
                method: "DELETE",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            setMessage(data.success ? "Account deleted successfully" : (data.message || "Failed to delete account"));
            if (data.success) {
                window.location.href ="/";
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
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Confirm Delete Account</button>
      </form> 
    </div>
  )
}

export default DeleteAccount;