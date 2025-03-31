"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Cpu,
  Settings,
  LogOut,
  Moon,
  Sun,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";
import Cookies from "js-cookie";

// ----------------------
// ProfileDropdown Component
// ----------------------
interface ProfileDropdownProps {
  isProfileOpen: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  closeProfile: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isProfileOpen,
  isDarkMode,
  toggleTheme,
  closeProfile,
  buttonRef,
}) => {
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, closeProfile, buttonRef]);

  if (!isProfileOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`fixed right-4 mt-16 w-64 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } rounded-xl shadow-lg border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } z-50`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/60"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-medium">User123</h3>
            <p className="text-sm text-gray-500">ID: 1234567</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <User className="inline w-5 h-5 mr-3" />
          Edit Profile
        </button>
        <Link
          href="/user/settings"
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <Settings className="inline w-5 h-5 mr-3" />
          Settings
        </Link>
        <button
          onClick={() => {
            toggleTheme();
            closeProfile();
          }}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
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

// ----------------------
// TypingIndicator Component
// ----------------------
const TypingIndicator: React.FC = () => (
  <div className="flex space-x-1">
    <span
      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
      style={{ animationDelay: "0s" }}
    ></span>
    <span
      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
      style={{ animationDelay: "0.2s" }}
    ></span>
    <span
      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
      style={{ animationDelay: "0.4s" }}
    ></span>
  </div>
);

// ----------------------
// Interfaces for Questions (Old Page)
// ----------------------
interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}
interface Question {
  id: number;
  header: string;
  subtext: string;
  options: Option[];
  answered_correctly: boolean;
}
interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ----------------------
// Main QuestionsPage Component (Merged)
// ----------------------
const QuestionsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  // Fetch questions using topic_id – ensure your URL includes ?topic_id=1
  const topic_id = searchParams ? searchParams.get("topic_id") : null;

  // Theme, profile, and sidebar state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  // Question and Answer state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);

  // Sidebar navigation items
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    {
      icon: BookOpen,
      label: "Subjects",
      path: "/user/topics",
      activeCondition: () =>
        pathname === "/user/topics" || pathname === "/user/questions",
    },
    { icon: Cpu, label: "AI Tutor", path: "/user/ai-tutor" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
  ];

  // Fetch questions from API using topic_id
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5003/api/questions?topic_id=${topic_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic_id]);

  const handleQuestionChange = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setSelectedOptionId(null);
      setIsCorrect(null);
      setIsChatbotOpen(false);
    }
  };

  const [isNavigating, setIsNavigating] = useState(false);

  const handleNav = (newIndex: number) => {
    if (isNavigating) return;
    setIsNavigating(true);
    handleQuestionChange(newIndex);
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleOptionSelect = (option: string, questionIndex: number) => {
    setSelectedOptionId(Number(option));
  };

  // Submit Question Check Part – now displays result on the card and does not auto-advance
  const handleSubmit = async () => {
    console.log("Submitted answer for question", currentQuestionIndex, {
      answer: selectedOptionId,
    });
    if (selectedOptionId === null) {
      alert("Please select an option before submitting.");
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    try {
      const response = await fetch(
        `http://localhost:5003/api/questions/${currentQuestion.id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selected_option_id: selectedOptionId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }
      const result = await response.json();
      setIsCorrect(result.is_correct);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion.id
            ? { ...question, answered_correctly: result.is_correct }
            : question
        )
      );
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // Chatbot Functions
  const handleChatbotMessageSubmit = async (message: string) => {
    if (!message.trim()) return;
    setIsChatbotLoading(true);

    const userMessage: ChatbotMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatbotMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5004/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          conversation_history: [...chatbotMessages, userMessage],
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message to chatbot");
      }
      const data = await response.json();
      setChatbotMessages(data.conversation_history);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      const errorMessage: ChatbotMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatbotMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatbotLoading(false);
    }
  };

  const handleChatbotButtonClick = async () => {
    const newChatbotOpenState = !isChatbotOpen;
    setIsChatbotOpen(newChatbotOpenState);

    if (newChatbotOpenState && chatbotMessages.length === 0 && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const questionContext = `I need help with this question: ${currentQuestion.header}. ${currentQuestion.subtext} Options: ${currentQuestion.options
        .map((o) => o.option_text)
        .join(", ")}`;
      setIsChatbotLoading(true);
      try {
        const response = await fetch("http://localhost:5004/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: questionContext,
            conversation_history: [],
          }),
        });
        const data = await response.json();
        setChatbotMessages(data.conversation_history);
      } catch (error) {
        console.error("Error initializing chatbot:", error);
      } finally {
        setIsChatbotLoading(false);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  // Render a question card with main content style using the correct question text from "header"
  const renderQuestionCard = (index: number) => {
    const q = questions[index];
    // For the current question, use selectedOptionId
    const selectedOption = index === currentQuestionIndex ? selectedOptionId : null;
    return (
      <div
        className={`p-5 rounded-lg shadow-md ${
          isDarkMode ? "bg-[rgb(31,41,55)] border border-gray-500" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-bold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {q.header} {/* Use q.header to show the actual question */}
        </h3>
        <div className="space-y-3">
          {q.options.map((option, optionIndex) => {
            const isSelected = selectedOption === option.id;
            return (
              <div
                key={optionIndex}
                onClick={() => handleOptionSelect(option.id.toString(), index)}
                className={`cursor-pointer p-3 border rounded-full transition-colors ${
                  isSelected
                    ? "bg-pink-500 border-pink-500 text-white"
                    : isDarkMode
                    ? "bg-transparent border-gray-400 text-gray-200 hover:bg-gray-700"
                    : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.option_text}
              </div>
            );
          })}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Submit
        </button>
        {isCorrect !== null && (
          <p className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </p>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading questions...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-[rgb(31,41,55)] text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 z-20`}
        style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-color)" }}
      >
        <nav className="mt-20">
          {menuItems.map((item, index) => {
            const isActive = item.activeCondition
              ? item.activeCondition()
              : pathname.startsWith(item.path);
            return (
              <Link key={index} href={item.path}>
                <div
                  className={`flex items-center m-2 ${
                    isSidebarCollapsed ? "px-4" : "px-6"
                  } py-3 rounded-lg transition-colors ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`}
                    fill={isActive ? "currentColor" : "none"}
                  />
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
                  <div
                    className={`flex items-center ${
                      isSidebarCollapsed ? "px-4" : "px-6"
                    } py-3 transition-colors ${
                      isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`}
                      fill={isActive ? "currentColor" : "none"}
                    />
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
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold">Akin Learning</span>
        </div>
        <div>
          <button
            ref={profileButtonRef}
            onClick={toggleProfile}
            className={`flex items-center px-4 py-2 rounded-full ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-medium">User123</span>
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

      {/* Main Content – Questions */}
      <div
        className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-10`}
      >
        <div className="w-full mb-8 px-1">
          <h2
            className={`text-3xl font-light text-left mb-2 ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
          >
            Questions: Python
          </h2>
          <hr
            className={`w-full border-t ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            }`}
          />
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-center mb-6">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionChange(index)}
              className={`mx-2 px-4 py-2 rounded-full transition-transform duration-200 transform hover:scale-110 ${
                currentQuestionIndex === index
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {/* Question Card Slider */}
        <div className="relative flex items-center justify-center">
          {currentQuestionIndex > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleNav(currentQuestionIndex - 1);
              }}
              className="absolute left-0 cursor-pointer opacity-70 filter blur-sm hover:opacity-100 hover:blur-0 transition-all duration-300"
              style={{ width: "60%" }}
            >
              {renderQuestionCard(currentQuestionIndex - 1)}
            </div>
          )}
          <div
            className="relative z-10 transition-all duration-300"
            style={{ width: "80%" }}
          >
            {renderQuestionCard(currentQuestionIndex)}
          </div>
          {currentQuestionIndex < questions.length - 1 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleNav(currentQuestionIndex + 1);
              }}
              className="absolute right-0 cursor-pointer opacity-70 filter blur-sm hover:opacity-100 hover:blur-0 transition-all duration-300"
              style={{ width: "60%" }}
            >
              {renderQuestionCard(currentQuestionIndex + 1)}
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Sidebar */}
      {isChatbotOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white/30 backdrop-blur-sm shadow-lg border-l z-10 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-blue-500 text-white">
            <h3 className="text-lg font-bold">Learning Assistant</h3>
            <button onClick={() => setIsChatbotOpen(false)} className="hover:text-gray-200">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatbotMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isChatbotLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const textarea = e.currentTarget.querySelector("textarea");
                if (textarea && textarea.value.trim()) {
                  handleChatbotMessageSubmit(textarea.value.trim());
                  textarea.value = "";
                }
              }}
              className="w-full"
            >
              <div className="w-full border border-gray-300 rounded-full overflow-hidden flex flex-col md:flex-row">
                <textarea
                  placeholder="Type your question..."
                  wrap="soft"
                  className={`w-full p-3 max-h-32 overflow-auto resize-none focus:outline-none transition-all ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                  disabled={isChatbotLoading}
                />
                {/* Divider: vertical on md and up, horizontal on small screens */}
                <div className="hidden md:block w-px bg-gray-300" />
                <div className="block md:hidden h-px bg-gray-300" />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
                  disabled={isChatbotLoading}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button
        onClick={handleChatbotButtonClick}
        style={{ right: isChatbotOpen ? "400px" : "1rem" }}
        className="fixed bottom-4 w-16 h-16 rounded-full shadow-lg z-50 text-white flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      >
        {isChatbotOpen ? (
          "✕"
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">AI</span>
            <span className="text-xs">Tutor</span>
          </div>
        )}
      </button>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default QuestionsPage;
