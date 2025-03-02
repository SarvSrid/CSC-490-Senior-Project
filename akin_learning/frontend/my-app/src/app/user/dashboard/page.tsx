"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
          console.log("Fetched progress data:", data); // This is for error checking
          setProgress(data);
        })
        .catch((error) => console.error("Error fetching progress:", error));
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  // Function to capitalize the first letter of the user's name
  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`p-8 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">Dashboard</h1>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        <div className={`p-6 rounded-lg shadow-md text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Your Progress, {capitalizeFirstLetter(user.name)}</h2>
          {progress.length > 0 ? (
            <ul className="space-y-2">
              {progress.map((item, index) => (
                <li key={index}>
                  {item.topic}: <span className="font-semibold">{item.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No progress data available.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            Cookies.remove("user");
            router.push("/auth/signin/signin1");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}