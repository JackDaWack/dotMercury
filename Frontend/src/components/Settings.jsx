import react, { useState } from 'react';
import SetNewPassword from './SetNewPassword';
import DeleteAccount from './DeleteAccount'

function Settings({ authView, onAuthViewChange }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');

  const [message, setMessage] = useState("");
  
    try {
        const response = await fetch("http://localhost:8000/api/checking_request_data", {
            method: "POST",
            credentials: "include"
        });
        const data = await response.json();
        setMessage(data.success ? "Settings updated successfully" : (data.message || "Failed to update settings"));
    } catch (error) {
        setMessage("Unable to reach the server.");
    }

  if (message === "Welcome! Please log in.") {
    return authView === "register" ? <Register authView={authView} onAuthViewChange={onAuthViewChange} /> : <Login authView={authView} onAuthViewChange={onAuthViewChange} />;
  }
  return (
    <main>
      <h1>Settings</h1>
        <SetNewPassword />
        <DeleteAccount />
    </main>
  )
}

export default Settings;