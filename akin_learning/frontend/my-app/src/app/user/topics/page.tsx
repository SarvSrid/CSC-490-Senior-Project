import React from "react";
import Link from "next/link";

const SubjectsPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Akin Learning</h2>
        <nav className="space-y-4">
          <button className="block text-left">🏠 Home</button>
          <button className="block text-left font-semibold">📖 Subjects</button>
          <button className="block text-left">🤖 AI Tutor</button>
          <button className="block text-left">⚙️ Settings</button>
        </nav>
        <button className="absolute bottom-5 left-5">🚪 Log Out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Subject</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">
          <span className="border-b-2 border-black">Python</span>
        </h2>

        {/* Levels */}
        <div className="grid grid-cols-3 gap-8">
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
            <div key={level.title} className="border p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4">
                {level.title}
              </h3>
              <ul className="space-y-2">
                {level.topics.map((topic, index) => (
                  <li key={index} className="text-gray-700">
                    <Link href="/user/questions" legacyBehavior>
                      <a className="hover:underline">• {topic}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* User Info */}
      <div className="absolute top-5 right-5 flex items-center space-x-3">
        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
          👤
        </div>
        <div>
          <p className="font-semibold">User123</p>
          <p className="text-xs text-gray-500">ID: 1234567</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;