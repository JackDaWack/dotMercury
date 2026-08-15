import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello_world")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Error: " + error.message);
      });
  }, []);

  return (
    <main>
      <h1>Welcome to dotMercury!</h1>
      <p>This app is currently under development. We appreciate your patience!</p>
      <p>Testing Backend: {message}</p>
    </main>
  );
}

export default App;