"use client";

import React, { useState } from "react";
import Link from "next/link";

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! How can I assist you today?" },
    { sender: "user", text: "Can you tell me about Python?" },
    { sender: "bot", text: "Python is a high-level programming language known for its readability and versatility." },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulate a response from the chatbot
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "This is a response from the chatbot." },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chatbot Interface</h1>
        <Link href="/user/questions">
          <button className="bg-white text-blue-500 px-4 py-2 rounded">Back to Questions</button>
        </Link>
      </header>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg shadow-md ${
                message.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
              }`}
            >
              <p className="text-gray-800">{message.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 bg-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 mr-4"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-5 left-5">
        <Link href="/auth/signin/signin1">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatbotPage;