import react, { useState } from 'react';


function DeleteAccount() {
  const [password, setPassword] = useState('');
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