import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div>
      <h1>Delete Account</h1>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Confirm Delete Account</button>
    </div>
  )
}

export default DeleteAccount;