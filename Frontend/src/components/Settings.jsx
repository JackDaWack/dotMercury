import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetNewPassword from './SetNewPassword';
import DeleteAccount from './DeleteAccount';

function Settings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const navigate = useNavigate();
  return (
    <main>
      <h1>Settings</h1>
        <SetNewPassword />
        <DeleteAccount />
    </main>
  )
}

export default Settings;