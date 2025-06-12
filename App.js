import React, { useState, useEffect } from "react";

const socket = new WebSocket("ws://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      setChat((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    socket.send(message);
    setMessage("");
  };

  return (
    <div>
      <h2>Real-Time Chat</h2>
      <div>
        {chat.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;