import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "Admin", text: "Welcome to Smart Campus Chat!" },
    { sender: "Student", text: "Thank you!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col h-[70vh]">
      <h2 className="text-xl font-semibold mb-4">Campus Chat</h2>
      <div className="flex-1 overflow-y-auto border p-4 rounded mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender === "You" ? "text-right" : "text-left"}`}>
            <p>
              <span className="font-bold">{m.sender}: </span>
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
