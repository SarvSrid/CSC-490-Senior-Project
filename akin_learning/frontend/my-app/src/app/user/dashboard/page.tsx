"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
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

interface ProgressData {
  subject_id: number;
  subject: string;
  average_progress: number;
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

  useEffect(() => {
    const userData = Cookies.get("user");
    if (!userData) {
      router.push("/auth/signin/signin1");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetch(`http://localhost:5001/api/progress?user_id=${parsedUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched progress data:", data);
          setProgress(data);
        })
        .catch((error) => console.error("Error fetching progress:", error));
    }
  }, [router]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
  const toggleSubjectsPanel = () => setSubjectsPanelOpen(!isSubjectsPanelOpen);

  // Define your sidebar menu items
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    { icon: BookOpen, label: "Subjects", path: "/user/topics" },
    { icon: Cpu, label: "AI Tutor", path: "/user/ai-tutor" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
  ];

  // ProfileDropdownProps allows the button ref to be null.
  interface ProfileDropdownProps {
  isProfileOpen: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  closeProfile: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}


  // ProfileDropdown inner component
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

  // Create a ref for the profile button
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
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
                  className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${
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
                    className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 rounded-lg transition-colors ${
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

      {/* Main Content */}
      <div className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}>
        <div className="w-full mb-8 px-1">
          <h2 className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            Progress
          </h2>
          <hr className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />
        </div>
        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {progress.map((item, index) => {
            const getProgressColor = (percentage: number) => {
              if (percentage === 100) {
                return "url(#gradient)";
              } else if (percentage < 33) {
                return "#FF0000";
              } else if (percentage < 66) {
                return "#FFFF00";
              } else {
                return "#00FF00";
              }
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-colors duration-300 shadow-none border ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                } bg-transparent`}
              >
                {/* Subject Name (Top Left) */}
                <div className="flex justify-start">
                  <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {item.subject}
                  </h3>
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
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={getProgressColor(item.average_progress)}
                      strokeWidth="3"
                      strokeDasharray={`${item.average_progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      {item.average_progress}%
                    </span>
                  </div>
                </div>
                {/* Continue Button (Bottom Left) */}
                <div className="flex justify-start">
                  <Link href="/user/topics">
                    <button
                      className={`px-4 py-1 rounded-full border transition-colors ${
                        isDarkMode
                          ? "border-gray-600 text-white hover:bg-gray-600"
                          : "border-gray-300 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
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
}

export default Dashboard;
