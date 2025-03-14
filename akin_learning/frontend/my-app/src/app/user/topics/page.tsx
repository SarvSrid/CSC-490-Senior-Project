'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Topic {
  id: number;
  name: string;
  difficulty_level: number;
}

const difficultyLabels: { [key: number]: string } = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

const TopicsPage = () => {
  const searchParams = useSearchParams();
  const subject_id = searchParams ? searchParams.get("subject_id") : null;

  console.log("Subject ID:", subject_id); // Debugging

  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          console.log("Fetched topics:", data);
          setTopics(data);
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
          setError(error.message);
        });
    }
  }, [subject_id]);

  if (!subject_id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: Subject ID is missing or invalid.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Akin Learning</h2>
        <nav className="space-y-4">
          <Link href="/user/dashboard">
            <button className="block text-left">🏠 Home</button>
          </Link>
          {/* <Link href="/user/topics">
            <button className="block text-left font-semibold">📖 Subjects</button>
          </Link> */}
          <button className="block text-left">🤖 AI Tutor</button>
          <button className="block text-left">⚙️ Settings</button>
        </nav>
        <Link href="/auth/signin/signin1">
          <button className="absolute bottom-5 left-5">🚪 Log Out</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Topics</h1>

        {/* Topic List */}
        <div className="grid grid-cols-3 gap-8">
          {topics.map((topic) => (
            <div key={topic.id} className="border p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4">
                {topic.name}
              </h3>
              <p className="text-center">
                Difficulty: {difficultyLabels[topic.difficulty_level]}
              </p>
              <ul className="space-y-2">
                <li className="text-gray-700">
                  <Link href={`/user/questions?topic_id=${topic.id}`} legacyBehavior>
                    <a className="hover:underline">• View Questions</a>
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TopicsPage;