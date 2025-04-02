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
  Globe,
} from "lucide-react";

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

const getProgressBarColor = (percentage: number) => {
  if (percentage === 100) {
    return "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)";
  } else if (percentage < 33) {
    return "#FF0000";
  } else if (percentage < 66) {
    return "#FFFF00";
  } else {
    return "#00FF00";
  }
};

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
          onClick={() => router.push('/user/settings/account')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
        >
          <User className="inline w-5 h-5 mr-3" />
          Edit Profile
        </button>
        <button
          onClick={() => router.push('/user/settings')}
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
// Difficulty Labels and Topic Interface
// ----------------------
interface Topic {
  id: number;
  name: string;
  difficulty_level: number;
  progress: {
    percentage: number;
    active_questions: number;
    completed_questions: number;
  };
}

const difficultyLabels: { [key: number]: string } = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

// ----------------------
// Main SubjectsPage Component (Merged)
// ----------------------
const SubjectsPage: React.FC = () => {
  // Navigation and theme states
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const subject_id = searchParams ? searchParams.get("subject_id") : null;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  // Topics states (fetched from API)
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Define your sidebar menu items
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    //{ icon: BookOpen, label: "Subjects", path: "/user/topics" },
    { icon: Cpu, label: "AI Tutor", path: "/user/chatbot" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
  ];

  useEffect(() => {
    if (subject_id) {
      fetch(`http://localhost:5002/api/topics?subject_id=${subject_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching topics: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) {
            throw new Error("API response is not an array");
          }
          setTopics(data);
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
          setError(error.message);
        });
    }
  }, [subject_id]);

  // Toggle functions
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 z-20`}
        style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-color)" }}
      >
        <nav className="mt-20">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={index} href={item.path}>
                <div
                  className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"
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
                    className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${isActive ? "bg-white/20" : "hover:bg-white/10"
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
      <div className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}>
        <div className="w-full mb-8 px-1">
          <h2
            className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"
              }`}
          >
            Topics:
          </h2>
          <hr
            className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"
              }`}
          />
        </div>
        {/* Topics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`border p-5 rounded-lg bg-transparent ${isDarkMode ? "border-gray-600" : "border-gray-300"
                }`}
            >
              <h3
                className={`text-xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-800"
                  }`}
              >
                {topic.name}
              </h3>
              <p
                className={`text-center mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                Difficulty: {difficultyLabels[topic.difficulty_level]}
              </p>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${topic.progress.percentage}%`,
                    background: getProgressBarColor(topic.progress.percentage),
                  }}

                ></div>
              </div>

              {/* Progress Text */}
              <p
                className={`text-center text-sm mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                {topic.progress.completed_questions} of{" "}
                {topic.progress.active_questions} completed (
                {topic.progress.percentage.toFixed(0)}%)
              </p>
              <div className="flex justify-center">
                <Link href={`/user/questions?topic_id=${topic.id}`} legacyBehavior>
                  <a
                    className={`px-4 py-2 rounded-full border transition-colors ${isDarkMode
                        ? "border-gray-600 text-white hover:bg-gray-600"
                        : "border-gray-300 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    View Questions
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

  );
};

export default SubjectsPage;
