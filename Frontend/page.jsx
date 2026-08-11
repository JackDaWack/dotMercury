import React from 'react';

function Header() {
  return (
    <header>
      <h1>dotMercury</h1>
      <nav>
        <select>
            <option value="Inbox">Home</option>
            <option value="Settings">Settings</option>
            <option value="Logout">Logout</option>
        </select>
      </nav>
    </header>
  );
}
export default Header;