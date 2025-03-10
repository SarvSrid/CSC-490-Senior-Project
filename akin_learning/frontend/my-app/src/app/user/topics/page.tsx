'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Subtopic {
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
  const topic_id = searchParams ? searchParams.get("topic_id") : null; // Get topic_id from query parameters
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);

  useEffect(() => {
    if (topic_id) {
      // Fetch subtopics for the selected topic
      fetch(`http://localhost:5002/api/subtopics?topic_id=${topic_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched subtopics:", data);
          setSubtopics(data);
        })
        .catch((error) => console.error("Error fetching subtopics:", error));
    }
  }, [topic_id]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Akin Learning</h2>
        <nav className="space-y-4">
          <Link href="/user/dashboard">
            <button className="block text-left">🏠 Home</button>
          </Link>
          <Link href="/user/topics">
            <button className="block text-left font-semibold">📖 Subjects</button>
          </Link>
          <button className="block text-left">🤖 AI Tutor</button>
          <button className="block text-left">⚙️ Settings</button>
        </nav>
        <Link href="/auth/signin/signin1">
          <button className="absolute bottom-5 left-5">🚪 Log Out</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Subtopics</h1>

        {/* Subtopic List */}
        <div className="grid grid-cols-3 gap-8">
          {subtopics.map((subtopic) => (
            <div key={subtopic.id} className="border p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4">
                {subtopic.name}
              </h3>
              <p className="text-center">
                Difficulty: {difficultyLabels[subtopic.difficulty_level]}
              </p>
              <ul className="space-y-2">
                <li className="text-gray-700">
                  <Link href="/user/questions" legacyBehavior>
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