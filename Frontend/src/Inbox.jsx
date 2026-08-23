import React from "react";

function Inbox() {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        // Simulate fetching messages
        setMessages([
            { id: 1, subject: "Welcome to dotMercury!", body: "We're excited to have you on board!" },
            { id: 2, subject: "Your account has been created", body: "Thank you for signing up!" }
        ]);
    }, []);

    return (
        <div>
            <h2>Inbox</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <h3>{message.subject}</h3>
                        <p>{message.body}</p>
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default Inbox;