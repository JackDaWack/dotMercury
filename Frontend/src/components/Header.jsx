function Header({ authView, onAuthViewChange }) {
  return (
    <header>
      <h1>dotMercury</h1>
      <nav>
        <select value={authView} onChange={(event) => onAuthViewChange(event.target.value)}>
          <option>--Navigation--</option>
          <option value="login">Login</option>
          <option value="register">Register</option>
        </select>
      </nav>
    </header>
  );
}
export default Header;
