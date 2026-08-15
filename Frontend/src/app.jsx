import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello_world")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main>
      <h1>Welcome to dotMercury!</h1>
      <p>This app is currently under development. We appreciate your patience!</p>
      <p>{message}</p>
    </main>
  );
}

export default App;