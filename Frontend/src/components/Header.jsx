function Header() {
  return (
    <header>
      <h1>dotMercury</h1>
      <nav>
        <select>
          <option>--Navigation--</option>
          <option value="/api/login">Login</option>
          <option value="/api/register">Register</option>
        </select>
      </nav>
    </header>
  );
}
export default Header;
