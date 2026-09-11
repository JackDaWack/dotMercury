import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  return (
    <div>
      <h1>Settings</h1>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="new_password">New Password:</label>
        <input type="new_password" id="new_password" name="new_password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
        <button type="submit">Confirm New Password</button>
    </div>
  )
}

export default SetNewPassword;