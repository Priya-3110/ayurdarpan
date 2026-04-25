import React, { useState } from "react";
import axios from "axios";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
        history: updatedMessages.map((msg) => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      const botMessage = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "24px",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        💬
      </button>

      {/* 🧠 Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Ayurveda Chatbot
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  margin: "8px 0",
                }}
              >
                <b>{msg.role === "user" ? "You" : "AI"}:</b>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && <p>Typing...</p>}
          </div>

          {/* Input */}
          <div style={{ display: "flex", padding: "10px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={{ flex: 1, padding: "5px" }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;