import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main>
      <h1>My FastAPI + React App</h1>
      <p>{message}</p>
    </main>
  );
}

export default App;