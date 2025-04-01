"use client";

import React, { useState } from "react";
import Link from "next/link";

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5005/api/chatbotweb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage.text,
            conversation_history: messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chatbot response");
        }

        const data = await response.json();
        const botMessage = { sender: "bot", text: data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error communicating with chatbot:", error);
        const errorMessage = {
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-5">
        <div className="sidebar-header mb-8">
          <h1 className="text-xl font-bold">Akin Learning</h1>
        </div>
        <nav className="nav-menu space-y-4">
          <ul>
            <li>
              <Link href="/user/dashboard">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-house"></i>
                  <span className="nav-text">Home</span>
                </div>
              </Link>
            </li>
            {/* <li>
              <Link href="/ai-tutor">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-robot"></i>
                  <span className="nav-text">AI Tutor</span>
                </div>
              </Link>
            </li> */}
            <li>
              <Link href="/settings">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-gear"></i>
                  <span className="nav-text">Settings</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer mt-8">
          <div className="logout">
            <Link href="/auth/signin/signin1">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="nav-text">Log Out</span>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5 flex justify-between items-center">
          <h1 className="text-xl font-bold">Akin Chatbot Tutor</h1>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg shadow-md ${
                  message.sender === "user"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                <p className="text-gray-800">{message.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg shadow-md bg-gray-100 self-start">
                <p className="text-gray-800">Thinking...</p>
              </div>
            )}
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
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;