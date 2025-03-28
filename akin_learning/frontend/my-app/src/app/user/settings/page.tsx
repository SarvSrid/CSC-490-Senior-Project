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
  Key,
  Globe,
} from "lucide-react";

function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Declare the profile button ref
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // Update the ref type in ProfileDropdownProps to allow null.
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

      if (isProfileOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

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
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              isDarkMode ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"
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

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
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
        className={`fixed top-0 left-0 right-0 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
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
      <ProfileDropdown
        isProfileOpen={isProfileOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        closeProfile={() => setIsProfileOpen(false)}
        buttonRef={profileButtonRef}
      />

      {/* Main Content */}
      <div className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}>
        <h1 className="text-4xl font-light text-center mb-12">Settings</h1>
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {/* Account */}
          <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <span className="font-medium">Account</span>
            </div>
          </div>
          {/* Security */}
          <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <Moon className="w-6 h-6" />
              <span className="font-medium">Security</span>
            </div>
          </div>
          {/* Language */}
          <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6" />
              <span className="font-medium">Language</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
