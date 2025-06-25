// File: src/App.jsx

import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Import external CSS file

const App = () => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState("");       // Input message text
  const ws = useRef(null);                      // WebSocket reference
  const scrollRef = useRef(null);               // Ref for scrolling to last message

  // Establish WebSocket connection on mount
  useEffect(() => {
    ws.current = new WebSocket("wss://echo.websocket.events");

    ws.current.onmessage = (event) => {
      if (event.data !== "echo.websocket.events sponsored by Lob.com") {
        addMessage("Server", event.data); // Add server response to chat
      }
    };

    return () => ws.current?.close(); // Close WebSocket on unmount
  }, []);

  // Add new message to the state (no timestamp)
  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  // Send message to server and display locally
  const sendMessage = () => {
    if (input.trim()) {
      ws.current.send(input);        // Send to server
      addMessage("You", input);      // Add to local chat
      setInput("");                  // Clear input field
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container">
      <h2 className="title">💬 Vite WebSocket Chat</h2>

      {/* Chat Message Area */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === "You" ? "you" : "server"}`}
          >
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input and Send Button */}
      <div className="input-row">
        <input
          className="input"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;