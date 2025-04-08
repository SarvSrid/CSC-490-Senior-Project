"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  ArrowLeft,
} from "lucide-react";
import Cookies from "js-cookie";
import QuestionCard from "./QuestionCard"; // adjust the path as needed

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
  const router = useRouter();

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
      className={`fixed right-4 mt-16 w-64 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        } rounded-xl shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"
        } z-50`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <User className="w-8 h-8 rounded-full mr-2" />
          <div className="ml-3">
            <h3 className="font-medium">User123</h3>
            <p className="text-sm text-gray-500">ID: 1234567</p>
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

// ----------------------
// Interfaces for Questions
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
  answered_correctly?: boolean | null;
  selected_option?: number | null;
  // New flag to persist an incorrect submission.
  incorrect_submitted?: boolean;
}

interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ----------------------
// Main QuestionsPage Component (Survey Layout with Integrated Chatbot)
// ----------------------
const QuestionsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const topic_id = searchParams ? searchParams.get("topic_id") : null;

  // Theme, profile, and sidebar state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  // Question state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // Local flag for the current question submission.
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Chatbot state
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);

  // Additional state for chat input
  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Refs for question indicators.
  const indicatorRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll active indicator into view.
  const prevIndexRef = useRef(currentQuestionIndex);
  useEffect(() => {
    let targetIndex: number;
    if (currentQuestionIndex > prevIndexRef.current) {
      targetIndex = currentQuestionIndex + 4;
      if (targetIndex >= indicatorRefs.current.length) {
        targetIndex = indicatorRefs.current.length - 1;
      }
    } else if (currentQuestionIndex < prevIndexRef.current) {
      targetIndex = currentQuestionIndex - 4;
      if (targetIndex < 0) {
        targetIndex = 0;
      }
    } else {
      targetIndex = currentQuestionIndex;
    }
    indicatorRefs.current[targetIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
    prevIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // Sidebar navigation items (Subjects tab removed).
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    { icon: Cpu, label: "AI Tutor", path: "/user/chatbot" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
  ];

  // Fetch questions from API using topic_id.
  useEffect(() => {
    if (!topic_id) {
      console.error("topic_id is missing");
      setIsLoading(false);
      return;
    }
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5003/api/questions?topic_id=${topic_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        const filteredQuestions = data.filter(
          (q: { topic_id: number }) => q.topic_id === Number(topic_id)
        );
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [topic_id]);

  // When changing questions, reset the submission flag.
  const handleQuestionChange = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setHasSubmitted(false);
      const savedOption = questions[index].selected_option ?? null;
      setSelectedOptionId(savedOption);
      setIsCorrect(
        typeof questions[index].answered_correctly === "boolean"
          ? questions[index].answered_correctly
          : null
      );
    }
  };

  // Prevent rapid navigation.
  const [isNavigating, setIsNavigating] = useState(false);
  const handleNav = (newIndex: number) => {
    if (isNavigating) return;
    setIsNavigating(true);
    handleQuestionChange(newIndex);
    setTimeout(() => setIsNavigating(false), 300);
  };

  // When the user selects an option, clear the incorrect flag for the current question.
  const handleOptionSelect = (optionId: number) => {
    if (hasSubmitted && isCorrect === false) {
      setHasSubmitted(false);
      setIsCorrect(null);
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questions[currentQuestionIndex].id
            ? { ...q, incorrect_submitted: false }
            : q
        )
      );
    }
    setSelectedOptionId(optionId);
  };

  // Submit answer and update UI.
  const handleSubmit = async () => {
    if (selectedOptionId === null) {
      alert("Please select an option before submitting.");
      return;
    }
    setHasSubmitted(true);
    const currentQuestion = questions[currentQuestionIndex];
    try {
      const response = await fetch(
        `http://localhost:5003/api/questions/${currentQuestion.id}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selected_option_id: selectedOptionId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }
      const result = await response.json();
      setIsCorrect(result.is_correct);

      if (result.is_correct) {
        // Persist correct answers.
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === currentQuestion.id
              ? {
                ...q,
                answered_correctly: true,
                selected_option: selectedOptionId,
                incorrect_submitted: false,
              }
              : q
          )
        );
        if (currentQuestionIndex < questions.length - 1) {
          setTimeout(() => {
            handleQuestionChange(currentQuestionIndex + 1);
            setSelectedOptionId(null);
            setIsCorrect(null);
          }, 500);
        } else {
          setTimeout(() => {
            router.back();
          }, 1500);
        }
      } else {
        // Mark the question as having an incorrect submission so the indicator remains red.
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === currentQuestion.id
              ? { ...q, incorrect_submitted: true }
              : q
          )
        );

        const explanationContext = `Help me understand this question: ${currentQuestion.header}. ${currentQuestion.subtext}. The options are: ${currentQuestion.options
          .map((o) => o.option_text)
          .join(", ")}.`;


        await handleChatbotMessageSubmit(explanationContext);

        // Incorrect feedback persists until a new option is selected.
      }

    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // ----------------------
  // TypingIndicator Component
  // ----------------------
  const TypingIndicator: React.FC = () => (
    <div className="flex space-x-1 pt-2">
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className={`w-2 h-2 bg-transparent rounded-full animate-bounce border ${isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );

  // Chatbot Functions.
  const handleChatbotMessageSubmit = async (message: string) => {
    if (!message.trim()) return;
    setIsChatbotLoading(true);
    try {
      const response = await fetch("http://localhost:5004/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversation_history: chatbotMessages }),
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


  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setChatbotMessages((prev) => [
        ...prev,
        { role: "user", content: input, timestamp: new Date().toLocaleTimeString() },
      ]);
      handleChatbotMessageSubmit(input);
      setInput("");
    }
  };

  // Theme and profile toggles.
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Auto-scroll chat to bottom.
  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatbotMessages]);

  // Render Chatbot Card.
  const renderChatbotCard = () => (
    <div
      className={`bg-transparent rounded-cus p-6 border ${isDarkMode ? "border-gray-600" : "border-gray-300"
        }`}
      style={{
        position: "fixed",
        bottom: 30,
        right: 40,
        height: "780px",
        width: "400px",
        zIndex: 20,
      }}
    >
      <div className="w-full mb-6 px-1">
        <h2
          className={`text-3xl font-light text-center mb-2 ${isDarkMode ? "text-white" : "text-gray-600"
            }`}
        >
          AI Tutor
        </h2>
        <hr
          className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"
            }`}
        />
      </div>
      <div className="h-100 overflow-y-auto space-y-4 mb-4">
        {chatbotMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg border ${msg.role === "user" && isDarkMode
                  ? "self-end bg-gradient-to-r from-purple-500 to-blue-500 text-white border-gray-600"
                  : msg.role === "user"
                    ? "self-end bg-gradient-to-r from-purple-500 to-blue-500 text-white border-gray-300"
                    : "self-start bg-transparent border-gray-300"
                }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        {isChatbotLoading && (
          <div className="flex justify-start">
            <div
              className={`text-gray-800 p-2 rounded-lg bg-transparent border ${isDarkMode ? "border-gray-600" : "border-gray-300"
                }`}
            >
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="relative w-full px-3 py-33">
        <textarea
          ref={textAreaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Need Help?"
          className={`w-full resize-none border border-gray-300 rounded-full pr-16 pl-1 pt-55 py-1 min-h-[40px] max-h-52 overflow-auto custom-scrollbar ${isDarkMode
              ? "bg-gray-900 text-white placeholder-gray-400"
              : "bg-white text-gray-800 placeholder-gray-500"
            }`}
          disabled={isChatbotLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isChatbotLoading}
          className="absolute bottom-11 right-6 bg-pink-500 text-white px-3 py-1 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading questions...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-fixed ${isDarkMode ? "bg-[rgb(31,41,55)] text-white" : "bg-white text-black"
        }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"
          } transition-all duration-300 shadow-md1 z-30`}
        style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-color)" }}
      >
        <nav className="mt-20">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={index} href={item.path}>
                <div
                  className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"
                    } py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                >
                  <item.icon
                    className={`${isSidebarCollapsed ? "" : "mr-4"} w-6 h-6`}
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
                    className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"
                      } py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"
                      }`}
                  >
                    <item.icon
                      className={`${isSidebarCollapsed ? "" : "mr-4"} w-6 h-6`}
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
        className={`fixed top-0 left-0 right-0 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } shadow-md z-30 flex items-center justify-between`}
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
            className={`flex items-center px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
          >
            <User className="w-8 h-8 rounded-full mr-2" />
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

      {/* Main Content – Survey Layout */}
      <div
        className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-10 relative`}
      >
        <div className="w-full mb-4 px-1">
          <h2
            className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"
              }`}
          >
            Questions:
          </h2>
          <hr
            className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"
              }`}
          />
          <div className="mb-4">
            <button
              onClick={() => router.back()}
              className={`px-1 mt-4 py-1 text-sm rounded-full transition-colors border ${isDarkMode
                  ? "border-gray-600 text-white hover:bg-gray-600"
                  : "border-gray-300 text-gray-800 hover:bg-gray-300"
                }`}
            >
              <ArrowLeft className="w-10 h-6 rounded-full mr-2" />
            </button>
          </div>
        </div>

        {/* Question Indicators */}
        <div className="w-1/2 mx-auto2 overflow-x-auto custom-scrollbar">
          <div className="flex space-x-2 pb-2">
            {questions.map((q, index) => {
              let indicatorColor = "bg-gray-200 text-black";
              if (q.answered_correctly === true) {
                indicatorColor = "bg-green-500 text-white";
              } else if (q.incorrect_submitted) {
                indicatorColor = "bg-red-500 text-white";
              }
              const isActive = currentQuestionIndex === index;
              return (
                <button
                  key={index}
                  ref={(el) => {
                    indicatorRefs.current[index] = el;
                  }}
                  onClick={() => handleQuestionChange(index)}
                  className={`transition-transform duration-200 transform hover:scale-105 ${isActive ? "w-14 h-14 -translate-y-3" : "w-10 h-10"
                    } rounded-full flex-shrink-0 flex items-center justify-center ${indicatorColor}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Card */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {questions.length > 0 && (
            <div className="md:w-1/2 w-full" style={{ width: "65%" }}>
              <QuestionCard
                q={questions[currentQuestionIndex]}
                isDarkMode={isDarkMode}
                selectedOptionId={selectedOptionId}
                isCorrect={isCorrect}
                hasSubmitted={hasSubmitted}
                handleOptionSelect={handleOptionSelect}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Chat Card – integrated chat UI */}
      {renderChatbotCard()}

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