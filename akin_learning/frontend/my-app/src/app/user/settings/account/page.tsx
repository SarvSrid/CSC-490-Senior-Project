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
    X, // <-- import the 'X' icon
} from "lucide-react";

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

const AccountPage: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname() ?? "";
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const profileButtonRef = useRef<HTMLButtonElement | null>(null);

    // Placeholder user info
    const [user, setUser] = useState<{
        id: string;
        name: string;
        email: string;
        phone: string;
    } | null>(null);

    useEffect(() => {
        const userData = Cookies.get("user");
        if (!userData) {
            router.push("/auth/signin/signin1");
        } else {
            const parsedUser = JSON.parse(userData);
            setUser({ ...parsedUser, phone: "(123) 456-7890" });
        }
    }, [router]);

    // Theme toggler
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark");
    };

    // Profile dropdown toggler
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    // Sidebar toggler
    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    // ----------------------------
    // NEW: State & handlers for the Delete Confirmation popup
    // ----------------------------
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const openDeletePopup = () => {
        setIsDeletePopupOpen(true);
    };

    const closeDeletePopup = () => {
        setIsDeletePopupOpen(false);
    };

    const handleDeleteAccount = () => {
        // TODO: Add your real delete logic here
        console.log("Account deleted!");
        setIsDeletePopupOpen(false);
    };

    // Sidebar menu items
    const menuItems = [
        { icon: Home, label: "Home", path: "/user/dashboard" },
        // { icon: BookOpen, label: "Subjects", path: "/user/topics" },
        { icon: Cpu, label: "AI Tutor", path: "/user/chatbot" },
        { icon: Settings, label: "Settings", path: "/user/settings" },
    ];
    const bottomMenuItems = [
        { icon: LogOut, label: "Log Out", path: "/auth/signin/signin1" },
    ];

    return (
        <div
            className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                }`}
        >
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full ${isSidebarCollapsed ? "w-16" : "w-64"
                    } transition-all duration-300 z-20`}
                style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-color)" }}
            >
                <nav className="mt-20">
                    {menuItems.map((item, index) => {
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <Link key={index} href={item.path}>
                                <div
                                    className={`flex items-center m-2 ${isSidebarCollapsed ? "px-4" : "px-6"
                                        } py-3 rounded-lg transition-transform transform hover:scale-105 ${isActive ? "bg-white/20" : "hover:bg-white/10"
                                        }`}
                                >
                                    <item.icon
                                        className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`}
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
                                            } py-3 rounded-lg transition-transform transform hover:scale-105 ${isActive ? "bg-white/20" : "hover:bg-white/10"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-6 h-6 ${isSidebarCollapsed ? "" : "mr-4"}`}
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
                        className={`flex items-center px-4 py-2 rounded-full ${isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            } transition-colors`}
                    >
                        <User className="w-8 h-8 rounded-full mr-2" />
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

            {/* Main Content – Account Page */}
            <div
                className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} transition-all duration-300 pt-20 p-8`}
            >
                <div className="w-full mb-8 px-1">
                    <h2
                        className={`text-3xl font-light text-left mb-2 ${isDarkMode ? "text-gray-white" : "text-gray-600"
                            }`}
                    >
                        Profile
                    </h2>
                    <hr
                        className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"
                            }`}
                    />
                </div>

                {/* Big Account Card */}
                <div
                    className={`max-w-3xl mx-auto p-8 rounded-xl transition-colors bg-transparent border ${isDarkMode ? "border-gray-600" : "border-gray-300"
                        }`}
                >
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link href="/user/settings" legacyBehavior>
                            <button
                                className={`px-3 py-1 text-sm rounded-full transition-colors hover:bg-gray-200 border ${isDarkMode
                                        ? "border-gray-600 text-white hover:bg-gray-600"
                                        : "border-gray-300 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                <span className="bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                    BACK
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* User Information Section */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center bg-transparent border ${isDarkMode ? "border-white" : "border-black"
                                }`}
                        >
                            <User className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">
                                <span className="bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                    User123
                                </span>
                            </p>
                            <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
                                User@example.com
                            </p>
                            <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
                                (123) 456-7890
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div
                        className={`mx-full my-4 border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"
                            }`}
                    ></div>

                    {/* Editable Section */}
                    <div className="space-y-6">
                        {/* Username Field */}
                        <div className="relative flex w-full items-end px-3 py-3">
                            <input
                                type="text"
                                placeholder="Enter new username"
                                className={`flex-1 px-4 py-2 rounded-full border border-gray-300 transition-colors focus:outline-none bg-transparent ${isDarkMode ? "text-white" : "text-black"
                                    } focus:ring-0 input-gradient`}
                            />
                            <button className="absolute right-3 bottom-3 px-4 py-2 rounded-full transition-colors border border-transparent">
                                <span className="transition-transform duration-200 hover:scale-110 bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                    EDIT
                                </span>
                            </button>
                        </div>

                        {/* Email Field */}
                        <div className="relative flex w-full items-end px-3 py-3">
                            <input
                                type="email"
                                placeholder="Enter new email"
                                className={`flex-1 px-4 py-2 rounded-full border border-gray-300 transition-colors focus:outline-none bg-transparent ${isDarkMode ? "text-white" : "text-black"
                                    } focus:ring-0 input-gradient`}
                            />
                            <button className="absolute right-3 bottom-3 px-4 py-2 rounded-full transition-colors border border-transparent">
                                <span className="transition-transform duration-200 hover:scale-110 bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                    EDIT
                                </span>
                            </button>
                        </div>

                        {/* Phone Field */}
                        <div className="relative flex w-full items-end px-3 py-3">
                            <input
                                type="tel"
                                placeholder="Enter new phone number"
                                className={`flex-1 px-4 py-2 rounded-full border border-gray-300 transition-colors focus:outline-none bg-transparent ${isDarkMode ? "text-white" : "text-black"
                                    } focus:ring-0 input-gradient`}
                            />
                            <button className="absolute right-3 bottom-3 px-4 py-2 rounded-full transition-colors border border-transparent">
                                <span className="transition-transform duration-200 hover:scale-110 bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                    EDIT
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Delete Account Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={openDeletePopup}
                            className={`px-6 py-3 rounded-full border transition-colors hover:bg-gray-200 ${isDarkMode
                                    ? "border-gray-600 text-white hover:bg-gray-600"
                                    : "border-gray-300 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            <span className="bg-gradient-to-b from-[rgba(0,170,255,1)] via-[rgba(199,108,253,0.95)] to-[rgba(255,90,252,0.89)] bg-clip-text text-transparent">
                                Delete Account
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Popup */}
            {isDeletePopupOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={(e) => {
                        // Close if user clicks the semi-transparent backdrop itself
                        if (e.target === e.currentTarget) {
                            closeDeletePopup();
                        }
                    }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Popup Card */}
                    <div
                        className={`relative w-96 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                            } p-6`}
                    >
                        {/* Close 'X' button */}
                        <button
                            onClick={closeDeletePopup}
                            className="absolute top-3 right-3 hover:text-gray-400"
                        >
                            <X size={18} />
                        </button>

                        {/* Title */}
                        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>

                        {/* Body Text (quoted, as in the screenshot) */}
                        <p className="mb-6">
                            "Are you certain you wish to proceed with the deletion of your account"
                        </p>

                        {/* Confirm Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleDeleteAccount}
                                className={`px-6 py-2 rounded transition-colors font-medium ${isDarkMode
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-black text-white hover:bg-gray-800"
                                    }`}
                            >
                                CONFIRM
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

export default AccountPage;