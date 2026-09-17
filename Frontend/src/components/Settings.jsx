import react, { useState } from 'react';
import SetNewPassword from './SetNewPassword';
import DeleteAccount from './DeleteAccount'

function Settings({ authView, onAuthViewChange }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');

  const [message, setMessage] = useState("");
  
    useEffect(() => {
      fetch("http://localhost:8000/api/checking_request_data", {
    credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Error: " + error.message);
      });
    }, []);

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