import { useEffect, useState } from "react";
import Login from "./login.jsx";
import Register from "./register.jsx";

function App({ authView }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/checking_request_data")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Error: " + error.message);
      });
  }, []);

  if (message === "Welcome! Please log in.") {
    return authView === "register" ? <Register /> : <Login />;
  }
  return (
    <main>
      <h1>Welcome to dotMercury!</h1>
      <p>This app is currently under development. We appreciate your patience!</p>
    </main>
  );
}

export default App;