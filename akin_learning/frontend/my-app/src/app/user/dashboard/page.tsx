"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

interface ProgressData {
  topic: string;
  percentage: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (!userData) {
      router.push("/auth/signin/signin1");
    } else {
      const user = JSON.parse(userData);
      setUser(user);

      // Fetch progress data
      fetch(`http://localhost:5000/api/progress?user_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched progress data:", data);
          setProgress(data);
        })
        .catch((error) => console.error("Error fetching progress:", error));
    }
  }, [router]);

  // DOM manipulation for progress circles, profile popup, and slide-out panel
  useEffect(() => {
    const circles = document.querySelectorAll(".progress-circle");
    circles.forEach((circle) => {
      const value = parseInt(circle.getAttribute("data-value") || "0", 10);
      const fillColor = circle.getAttribute("data-fill") || "#00aaff";
      const bgColor = circle.getAttribute("data-bg") || "#e0e0e0";
      const fill = circle.querySelector(".circle-fill") as HTMLElement;
      const text = circle.querySelector(".circle-text") as HTMLElement;
      const angle = (value / 100) * 360;
      if (fill) {
        fill.style.background = `conic-gradient(${fillColor} 0deg, ${fillColor} ${angle}deg, ${bgColor} ${angle}deg, ${bgColor} 360deg)`;
      }
      if (text) {
        text.textContent = `${value}%`;
      }
    });

    // Profile popup functionality
    const profileButton = document.getElementById("profileButton");
    const profilePopup = document.getElementById("profilePopup");
    const popupCloseBtn = document.getElementById("popupCloseBtn");

    const handleProfileClick = () => {
      profilePopup?.classList.toggle("show");
    };

    profileButton?.addEventListener("click", handleProfileClick);
    popupCloseBtn?.addEventListener("click", () => {
      profilePopup?.classList.remove("show");
    });
    document.addEventListener("click", (event) => {
      if (
        profilePopup &&
        profileButton &&
        !profilePopup.contains(event.target as Node) &&
        !profileButton.contains(event.target as Node)
      ) {
        profilePopup.classList.remove("show");
      }
    });

    // Slide-out panel for subjects
    const subjectsSlideout = document.getElementById("subjectsSlideout");
    const slideoutArrow = document.getElementById("slideoutArrow");
    const arrowSymbol = document.querySelector(".arrow-symbol") as HTMLElement;
    slideoutArrow?.addEventListener("click", () => {
      subjectsSlideout?.classList.toggle("open");
      if (subjectsSlideout?.classList.contains("open")) {
        arrowSymbol.innerHTML = "&rsaquo;"; // arrow pointing right
      } else {
        arrowSymbol.innerHTML = "&lsaquo;"; // arrow pointing left
      }
    });
  }, [progress]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`p-8 min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Top Bar */}
      <header className={`top-bar ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="user-info pill-profile" id="profileButton">
          <img src="https://via.placeholder.com/40" alt="User Avatar" className="user-avatar" />
          <span className="gradient-text">User123</span>
          <span className="dropdown-icon">▼</span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="sidebar-header">
          <h1>Akin Learning</h1>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active">
              <Link href="/dashboard">
                <i className="fa-solid fa-house"></i>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/user/topics">
                <i className="fa-solid fa-book"></i>
                <span className="nav-text">Subjects</span>
              </Link>
            </li>
            <li>
              <Link href="/ai-tutor">
                <i className="fa-solid fa-robot"></i>
                <span className="nav-text">AI Tutor</span>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <i className="fa-solid fa-gear"></i>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="logout">
          <Link href="/auth/signin/signin1">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="nav-text">Log Out</span>
          </Link>
          </div>
        </div>
      </aside>

      {/* Profile Popup */}
      <div className={`profile-popup ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`} id="profilePopup">
        <div className="popup-header">
          <div className="popup-user-info">
            <img src="https://via.placeholder.com/60" alt="Avatar" className="popup-avatar" />
            <div>
              <h3 className="gradient-text">User123</h3>
              <p className="popup-userid">ID: 1234567</p>
            </div>
          </div>
          <button className="popup-close" id="popupCloseBtn">
            &times;
          </button>
        </div>
        <div className="popup-body">
          <button className="popup-action">
            <i className="fa-solid fa-user"></i>
            Edit Profile
          </button>
          <button className="popup-action">
            <i className="fa-solid fa-gear"></i>
            Settings
          </button>
          <button className="popup-action">
            <i className="fa-solid fa-right-from-bracket"></i>
            Log Out
          </button>
          <button className="popup-action" onClick={toggleTheme}>
            <i className="fa-solid fa-moon"></i>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className={`main-content ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <main className="dashboard">
          <h1 className="dashboard-title">Progress</h1>
          <div className="progress-grid">
            {progress.map((item, index) => (
              <Link href="/user/topics" key={index}>
                <div className="progress-card">
                  <div
                    className="progress-circle"
                    data-value={item.percentage.toString()}
                    data-fill="#FFD966"
                    data-bg={isDarkMode ? "#4B5563" : "#FFF9E6"}
                  >
                    <div className="circle-fill"></div>
                    <div className="circle-text">{item.percentage}%</div>
                  </div>
                  <span className="language-label">{item.topic}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      {/* Slide-Out Panel for Subjects */}
      <div className={`subjects-slideout ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`} id="subjectsSlideout">
        <div className="slideout-gradient"></div>
        <div className="slideout-arrow" id="slideoutArrow">
          <span className="arrow-symbol">&lsaquo;</span>
        </div>
        <div className="slideout-content">
          <h1 className="slideout-title">Subjects</h1>
          <div className="subject-item">Python</div>
          <div className="subject-item">C++</div>
          <div className="subject-item">Java</div>
          <div className="subject-item">Assembly language</div>
        </div>
      </div>

      
    </div>
  );
}
