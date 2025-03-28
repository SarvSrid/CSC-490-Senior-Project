"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Cpu,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  User

} from "lucide-react";

// Define the ProfileDropdownProps interface
interface ProfileDropdownProps {
  isProfileOpen: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  closeProfile: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}


// Define the ProfileDropdown component
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
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


const QuestionsPage: React.FC = () => {
  const pathname = usePathname() ?? "";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  // Store selected answer for each question by index
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  // Create a ref for the profile button
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const questions = [
    {
      question: "What is Python?",
      options: [
        "A type of snake",
        "A high-level programming language",
        "A type of coffee",
        "A brand of car",
      ],
      correctAnswer: "A high-level programming language",
    },
    {
      question: "How do you declare a variable in Python?",
      options: [
        "var x = 10;",
        "int x = 10;",
        "x = 10",
        "declare x = 10;",
      ],
      correctAnswer: "x = 10",
    },
    {
      question: "What are Python's basic data types?",
      options: [
        "Integers, floats, strings, lists, tuples, sets, and dictionaries",
        "Numbers, characters, arrays, and structures",
        "Classes, objects, methods, and attributes",
        "Files, directories, and paths",
      ],
      correctAnswer:
        "Integers, floats, strings, lists, tuples, sets, and dictionaries",
    },
    {
      question: "How do you create a function in Python?",
      options: [
        "function myFunction() {}",
        "def my_function():",
        "create function my_function()",
        "function: my_function()",
      ],
      correctAnswer: "def my_function():",
    },
    {
      question: "What is a list comprehension?",
      options: [
        "A way to create lists using a for loop",
        "A concise way to create lists",
        "A method to sort lists",
        "A function to filter lists",
      ],
      correctAnswer: "A concise way to create lists",
    },
  ];

  const handleQuestionChange = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleNav = (newIndex: number) => {
    if (isNavigating) return;
    setIsNavigating(true);
    handleQuestionChange(newIndex);
    setTimeout(() => setIsNavigating(false), 300); // 300ms debounce
  };

  const handleSelectOption = (option: string, questionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted answer for question", currentQuestionIndex, {
      answer: selectedAnswers[currentQuestionIndex],
    });
    // Navigate to next question if available
    if (currentQuestionIndex < questions.length - 1) {
      handleQuestionChange(currentQuestionIndex + 1);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

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

  // Render question card with pill options and dark mode adjustments
  const renderQuestionCard = (index: number) => {
    const q = questions[index];
    const selectedOption = selectedAnswers[index];
    return (
      <div
        className={`p-5 rounded-lg shadow-md ${isDarkMode
            ? "bg-[rgb(31,41,55)] border border-gray-500"
            : "bg-white"
          }`}
      >
        <h3
          className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
        >
          {q.question}
        </h3>
        <div className="space-y-3">
          {q.options.map((option, optionIndex) => {
            const isSelected = option === selectedOption;
            return (
              <div
                key={optionIndex}
                onClick={() => handleSelectOption(option, index)}
                className={`cursor-pointer p-3 border rounded-full transition-colors ${isSelected
                    ? "bg-pink-500 border-pink-500 text-white"
                    : isDarkMode
                      ? "bg-transparent border-gray-400 text-gray-200 hover:bg-gray-700"
                      : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {option}
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
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-[rgb(31,41,55)] text-white" : "bg-white text-black"
        }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"
          } transition-all duration-300 z-20`}
        style={{
          background: "var(--sidebar-bg)",
          color: "var(--sidebar-color)",
        }}
      >
        <nav className="mt-20">
          {menuItems.map((item, index) => {
            const isActive = item.activeCondition
              ? item.activeCondition()
              : pathname.startsWith(item.path);
            return (
              <Link key={index} href={item.path}>
                <div
                  className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"
                    } py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"
                      }`}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  {!isSidebarCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
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
                      className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"
                        }`}
                      fill={isActive ? "currentColor" : "none"}
                    />
                    {!isSidebarCollapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
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
            className={`flex items-center px-4 py-2 rounded-full ${isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
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

      {/* Main Content */}
      <div
        className={`${isSidebarCollapsed ? "ml-16" : "ml-64"
          } transition-all duration-300 pt-20 p-10`}
      >
        <div className="w-full mb-8 px-1">
          <h2 className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            Questions: Python
          </h2>
          <hr className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />
        </div>
        {/* Navigation Buttons with animation */}
        <div className="flex justify-center mb-6">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionChange(index)}
              className={`mx-2 px-4 py-2 rounded-full transition-transform duration-200 transform hover:scale-110 ${currentQuestionIndex === index
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
