"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
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

// Helper function for progress color.
const getProgressColor = (percentage: number) => {
  if (percentage === 100) return "url(#gradient)";
  else if (percentage === 0) return "";
  else if (percentage < 33) return "#FF0000";
  else if (percentage < 66) return "#FFFF00";
  else return "#00FF00";
};

// Interface for subject-level progress data returned by your first API.
interface ProgressData {
  subject_id: number;
  subject: string;
  average_progress: number;
  questionLeft: number; // The question number the user left off at.
  last_visited_question_id?: number | null; // Optional
  recentTopics?: TopicData[]; // Will hold the top 3 recent topics for the subject.
}

// Interface for topic-level progress data returned by your second API.
interface TopicData {
  topic_id: number;
  name: string;
  subject_id: number;
  last_visited_question_id?: number | null;
  updated_at: string;
  difficulty_level: string;
  progress_percentage: number;
  active_questions: number;
  completed_questions: number;
}

function Dashboard() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSubjectsPanelOpen, setSubjectsPanelOpen] = useState(false);

  // Create a ref for the profile button.
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (!userData) {
      router.push("/auth/signin/signin1");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      Promise.all([
        fetch(`http://localhost:5001/api/progress?user_id=${parsedUser.id}`),
        fetch(`http://localhost:5003/api/user-progress?user_id=${parsedUser.id}`)
      ])
        .then(async ([progressRes, userProgressRes]) => {
          const progressData: ProgressData[] = await progressRes.json();
          const userProgress: TopicData[] = await userProgressRes.json();

          // Merge the two datasets by grouping topics under the corresponding subject.
          const mergedData = progressData.map((subject) => ({
            ...subject,
            recentTopics: userProgress.filter((topic) => topic.subject_id === subject.subject_id)
          }));

          setProgress(mergedData);
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [router]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
  const toggleSubjectsPanel = () => setSubjectsPanelOpen(!isSubjectsPanelOpen);

  // Sidebar menu items.
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    { icon: Cpu, label: "AI Tutor", path: "/user/chatbot" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [{ icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" }];

  // ProfileDropdown inner component.
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
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen, closeProfile, buttonRef]);
    if (!isProfileOpen) return null;
    return (
      <div
        ref={dropdownRef}
        className={`fixed right-4 mt-16 w-64 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"} rounded-xl shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"} z-50`}
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
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <User className="inline w-5 h-5 mr-3" />
            Edit Profile
          </button>
          <button
            onClick={() => router.push("/user/settings")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <Settings className="inline w-5 h-5 mr-3" />
            Settings
          </button>
          <button
            onClick={() => {
              toggleTheme();
              closeProfile();
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}`}
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

  // ProgressCard component – renders each progress card for a subject.
  // It now uses the merged property "recentTopics" which contains the top 3 recent topics.
  const ProgressCard: React.FC<{ item: ProgressData }> = ({ item }) => {
    const recentTopics = item.recentTopics || [];
    return (
      <div
        className={`p-6 rounded-2xl transition-colors duration-300 shadow-none border ${isDarkMode ? "border-gray-600" : "border-gray-300"} bg-transparent`}
        style={{ height: "460px" }}
      >
        {/* Top Section with Start Button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{item.subject}</h3>
          <Link href={`/user/topics?subject_id=${item.subject_id}`}>
            <button
              className={`px-4 py-1 rounded-full border transition-colors ${isDarkMode ? "border-gray-600 text-white hover:bg-gray-600" : "border-gray-300 text-gray-800 hover:bg-gray-300"}`}
            >
              Start
            </button>
          </Link>
        </div>
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto my-4">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getProgressColor(item.average_progress)}
              strokeWidth="2.5"
              strokeDasharray={`${item.average_progress}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              {Math.round(item.average_progress)}%
            </span>
          </div>
        </div>
        {/* Divider with "Recent" */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-lg font-medium text-gray-500">Recent</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        {/* Bottom Section: Recent Topics List */}
        <div className="space-y-4">
          {recentTopics.length > 0 ? (
            recentTopics.slice(0, 3).map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{topic.name}</h4>
                  <p className="text-sm text-gray-500">
                    {topic.completed_questions} of {topic.active_questions} completed ({Number(topic.progress_percentage).toFixed(0)}%)
                  </p>
                </div>
                <Link href={`/user/questions?topic_id=${topic.topic_id}`}>
                  <button
                    className={`px-4 py-1 rounded-full border transition-colors ${isDarkMode
                        ? "border-gray-600 text-white hover:bg-gray-600"
                        : "border-gray-300 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    Continue
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No recent topics</p>
          )}
        </div>
      </div>
    );
  };

  // ChartCard Component – displays a horizontal bar graph.
  const ChartCard: React.FC<{ data: ProgressData[]; isDarkMode: boolean }> = ({ data, isDarkMode }) => {
    return (
      <div
        className={`p-6 rounded-2xl transition-colors duration-300 shadow-none border ${isDarkMode ? "border-gray-600" : "border-gray-300"} bg-transparent`}
        style={{ height: "250px", width: "35%" }}
      >
        <div className="flex items-center my-44">
          <div className="flex-grow border-t border-gray-300" />
          <span className={`text-lg mx-2 font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Overall Progress Chart
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24">
                  <span className="text-sm font-medium">{item.subject}</span>
                </div>
                <div
                  className="flex-1 rounded-full h-4 overflow-hidden"
                  style={{ backgroundColor: isDarkMode ? "#374151" : "#E5E7EB" }}
                >
                  <div
                    className="h-22 rounded-full"
                    style={{
                      width: item.average_progress === 100 ? '98%' : `${item.average_progress}%`,
                      background:
                        item.average_progress === 100
                          ? "linear-gradient(to right, rgba(0,170,255,1), rgba(199,108,253,0.95), rgba(255,90,252,0.89))"
                          : getProgressColor(item.average_progress),
                    }}
                  ></div>
                </div>

                <div className="w-12 text-right ml-2">
                  <span className="text-sm font-medium">{Math.round(item.average_progress)}%</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No chart data available.</p>
          )}
        </div>
      </div>
    );
  };

  // ImprovementCard Component – displays suggestions for improvement.
  const ImprovementCard: React.FC<{ data: ProgressData[]; isDarkMode: boolean }> = ({ data, isDarkMode }) => {
    const threshold = 50;
    const suggestions = data.filter((item) => item.average_progress < threshold);
    let selectedSuggestions: ProgressData[] = [];
    if (suggestions.length === 0) {
      selectedSuggestions = [];
    } else if (suggestions.length === 1) {
      selectedSuggestions = suggestions;
    } else {
      const sorted = [...suggestions].sort((a, b) => a.average_progress - b.average_progress);
      const minVal = sorted[0].average_progress;
      const lowest = sorted.filter((item) => item.average_progress === minVal);
      if (lowest.length >= 2) {
        // If more than two share the same lowest progress, shuffle and pick two.
        selectedSuggestions = lowest.sort(() => Math.random() - 0.5).slice(0, 2);
      } else {
        selectedSuggestions = sorted.slice(0, 2);
      }
    }
    return (
      <div
        className={`p-6 rounded-2xl transition-colors duration-300 shadow-none border ${isDarkMode ? "border-gray-600" : "border-gray-300"} bg-transparent`}
        style={{ height: "190px", width: "23%" }}
      >
        <div className="flex items-center my-44">
          <div className="flex-grow border-t border-gray-300" />
          <span className={`text-lg mx-2 font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>Improvement Suggestions</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        {selectedSuggestions.length > 0 ? (
          <div className="flex flex-row gap-12">
            {selectedSuggestions.map((suggestion, index) => (
              <div key={index} className="flex flex-col">
                <span className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{suggestion.subject}</span>
                <span className="text-sm text-gray-500">
                  Progress: {Math.round(suggestion.average_progress)}%
                </span>
                <Link href={`/user/topics?subject_id=${suggestion.subject_id}`}>
                  <button
                    className={`mt-1 px-3 py-1 rounded-full border transition-colors ${isDarkMode
                      ? "border-gray-600 text-white hover:bg-gray-600"
                      : "border-gray-300 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    Improve
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Great job! No subjects need improvement.
          </p>
        )}
      </div>
    );
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
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
          >
            <User className="w-8 h-8 rounded-full mr-2" />
            <span className="font-medium">{user ? user.name : "User"}</span>
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

      {/* Main Content – Dashboard */}
      <div className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}>
        <div className="w-full mb-8 px-1">
          <h2 className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            Progress
          </h2>
          <hr className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />
        </div>
        {/* Grid of Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {progress.map((item, index) => (
            <ProgressCard key={index} item={item} />
          ))}
        </div>
        {/* New Chart and Improvement Cards beside each other */}
        <div className="mt-11 flex justify-left gap-77">
          <ChartCard data={progress} isDarkMode={isDarkMode} />
          <ImprovementCard data={progress} isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Dashboard;