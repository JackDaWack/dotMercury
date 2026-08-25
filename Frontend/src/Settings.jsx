import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
}

export default Settings;