"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Cpu,
  Settings,
  LogOut,
  Moon,
  Sun,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";

interface ChatbotClientProp {
  userData: { id: string ;username: string; email: string };
}

export default function ChatbotPage({userData}: ChatbotClientProp) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Chatbot state
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs for textarea and auto-scroll
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // ----------------------
  // TypingIndicator Component
  // ----------------------
  const TypingIndicator: React.FC = () => (
    <div className="flex space-x-1 pt-2">
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );


  // Auto scroll to bottom when messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    { icon: Cpu, label: "AI Tutor", path: "/user/chatbot" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "http://localhost:5000/auth/logout" },
  ];

  // Profile Dropdown Component
  const ProfileDropdown: React.FC<{
    isProfileOpen: boolean;
    isDarkMode: boolean;
    toggleTheme: () => void;
    closeProfile: () => void;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
  }> = ({ isProfileOpen, isDarkMode, toggleTheme, closeProfile, buttonRef }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          closeProfile();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen, closeProfile, buttonRef]);
    if (!isProfileOpen) return null;
    return (
      <div
        ref={dropdownRef}
        className={`fixed right-4 mt-16 w-64 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          } rounded-xl shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"
          } z-50`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <User className="w-8 h-8 rounded-full mr-2" />
            <div className="ml-3">
              <h3 className="font-medium">{userData.username}</h3>
              <p className="text-sm text-gray-500">ID: {userData.id}</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <button
            onClick={() => router.push("/user/settings/account")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
          >
            <User className="inline w-5 h-5 mr-3" />
            Edit Profile
          </button>
          <button
            onClick={() => router.push("/user/settings")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
          >
            <Settings className="inline w-5 h-5 mr-3" />
            Settings
          </button>
          <button
            onClick={() => {
              toggleTheme();
              closeProfile();
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="inline w-5 h-5 mr-3" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="inline w-5 h-5 mr-3" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Handle auto-expanding textarea height
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  // Handle sending message with API call (API call remains intact)
  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/openai/dashboard/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error communicating with chatbot:", error);
        const errorMessage = { sender: "bot", text: "Sorry, I encountered an error. Please try again." };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 shadow-md1 z-30`}
        style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-color)" }}
      >
        <nav className="mt-20">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={index} href={item.path}>
                <div className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}>
                  <item.icon className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`} fill={isActive ? "currentColor" : "none"} />
                  {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </div>
              </Link>
            );
          })}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
            {bottomMenuItems.map((item, index) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link key={index} href={item.path}>
                  <div className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"}`}>
                    <item.icon className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`} fill={isActive ? "currentColor" : "none"} />
                    {!isSidebarCollapsed && <span className="text-sm">{item.label}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} shadow-md z-30 flex items-center justify-between`}
        style={{ padding: "8px 24px 8px 16px" }}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-300 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold">Akin Learning</span>
        </div>
        <div>
          <button
            ref={profileButtonRef}
            onClick={toggleProfile}
            className={`flex items-center px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
          >
            <User className="w-8 h-8 rounded-full mr-2" />
            <span className="font-medium">{userData.username}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </header>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <ProfileDropdown
          isProfileOpen={isProfileOpen}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          closeProfile={() => setIsProfileOpen(false)}
          buttonRef={profileButtonRef}
        />
      )}

      {/* Main Content – Chatbot UI */}
      <div className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}>
        <div className="w-full mb-8 px-1">
          <h2 className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            Akin AI Tutor
          </h2>
          <hr className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />
        </div>
        <div className={`bg-transparent rounded-cus p-6 border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
          <div className="h-96 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${message.sender === "user"
                  ? "self-end bg-gradient-to-r from-purple-500 to-blue-500 text-white border-gray-300"
                  : "self-start bg-transparent border-gray-600"
                  }`}
              >
                <p className={`${message.sender === "user" || isDarkMode ? "text-white" : "text-black"}`}>{message.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`text-gray-800 p-2 rounded-lg bg-transparent border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          <div className="relative w-full px-3 py-3">
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything"
              className={`w-full resize-none border border-gray-300 rounded-full pr-16 pl-3 pt-55 py-2 min-h-[40px] max-h-52 overflow-auto custom-scrollbar ${isDarkMode
                ? "bg-gray-900 text-white placeholder-gray-400"
                : "bg-white text-gray-800 placeholder-gray-500"
                }`}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="absolute bottom-11 right-6 bg-pink-500 text-white px-3 py-1 rounded-full"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Custom styles for scrollbar and typing indicator */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
          border-radius: 3px;
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #a0a0a0;
          border-radius: 50%;
          animation: bounce 1.4s infinite;
        }
        .dot-1 {
          animation-delay: 0s;
        }
        .dot-2 {
          animation-delay: 0.2s;
        }
        .dot-3 {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};