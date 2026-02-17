"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);

    const userMessage = { role: "user", content: message };
    setChat([...chat, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const botMessage = { role: "assistant", content: data.answer };

    setChat(prev => [...prev, botMessage]);
    setMessage("");
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      <h1>Databricks RAG Chatbot</h1>

      <div style={{ marginTop: 20 }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          style={{ width: "80%", padding: 10 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question..."
        />
        <button
          onClick={sendMessage}
          style={{ padding: 10, marginLeft: 10 }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </main>
  );
}