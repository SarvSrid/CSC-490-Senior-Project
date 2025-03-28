"use client";
import { useRouter, usePathname } from "next/navigation";
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

function SubjectsPage() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle functions
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  // Sidebar navigation items
  const menuItems = [
    { icon: Home, label: "Home", path: "/user/dashboard" },
    { icon: BookOpen, label: "Subjects", path: "/user/topics" },
    { icon: Cpu, label: "AI Tutor", path: "/user/ai-tutor" },
    { icon: Settings, label: "Settings", path: "/user/settings" },
  ];
  const bottomMenuItems = [
    { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
  ];

  // Profile Dropdown Props interface allows buttonRef to be null.
  interface ProfileDropdownProps {
    isProfileOpen: boolean;
    isDarkMode: boolean;
    toggleTheme: () => void;
    closeProfile: () => void;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
  }

  // ProfileDropdown component
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
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
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
                    className={`flex items-center ${isSidebarCollapsed ? "px-4" : "px-6"} py-3 transition-colors ${
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
        className={`fixed top-0 left-0 right-0 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} shadow-md z-30 flex items-center justify-between`}
        style={{ padding: "8px 24px 8px 16px" }}
      >
        <div className="flex items-center space-x-2">
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
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
        <h2 className="text-3xl font-bold text-center mb-6">Subject</h2>
        <h2 className="text-2xl font-semibold text-center mb-8">
          <span className="border-b-2 border-black">Python</span>
        </h2>

        {/* Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Beginner",
              topics: [
                "Introduction to Python",
                "Data Types and Variables",
                "Basic Operators",
                "Control Structures",
                "Basic Data Structures",
                "Functions",
                "Modules and Packages",
              ],
            },
            {
              title: "Intermediate",
              topics: [
                "List Comprehensions",
                "Functions (Continued) File Handling",
                "Error and Exception Handling",
                "Classes and Object-Oriented Programming (OOP)",
                "Intermediate Data Structures",
                "Regular Expressions",
                "Working with External Libraries",
              ],
            },
            {
              title: "Advanced",
              topics: [
                "Advanced OOP Concepts",
                "Multithreading and Multiprocessing",
                "Networking and APIs",
                "Databases",
                "Advanced Libraries and Frameworks",
                "Memory Management and Optimization",
                "Python C Extensions",
              ],
            },
          ].map((level) => (
            <div key={level.title} className="border p-5 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-bold text-center mb-4">{level.title}</h3>
              <ul className="space-y-2">
                {level.topics.map((topic, index) => (
                  <li key={index} className="text-gray-700">
                    <Link href="/user/questions" className="hover:underline">
                      • {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubjectsPage;
