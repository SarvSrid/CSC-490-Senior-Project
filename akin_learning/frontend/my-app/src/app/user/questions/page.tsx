"use client";

import React, { useState } from "react";
import Link from "next/link";

const QuestionsPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What is Python?",
      options: [
        "A type of snake",
        "A high-level programming language",
        "A type of coffee",
        "A brand of car",
      ],
      correctAnswer: "A high-level programming language",
    },
    {
      question: "How do you declare a variable in Python?",
      options: [
        "var x = 10;",
        "int x = 10;",
        "x = 10",
        "declare x = 10;",
      ],
      correctAnswer: "x = 10",
    },
    {
      question: "What are Python's basic data types?",
      options: [
        "Integers, floats, strings, lists, tuples, sets, and dictionaries",
        "Numbers, characters, arrays, and structures",
        "Classes, objects, methods, and attributes",
        "Files, directories, and paths",
      ],
      correctAnswer: "Integers, floats, strings, lists, tuples, sets, and dictionaries",
    },
    {
      question: "How do you create a function in Python?",
      options: [
        "function myFunction() {}",
        "def my_function():",
        "create function my_function()",
        "function: my_function()",
      ],
      correctAnswer: "def my_function():",
    },
    {
      question: "What is a list comprehension?",
      options: [
        "A way to create lists using a for loop",
        "A concise way to create lists",
        "A method to sort lists",
        "A function to filter lists",
      ],
      correctAnswer: "A concise way to create lists",
    },
  ];

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/5 min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Akin Learning</h2>
        <nav className="space-y-4">
          <Link href="/dashboard">
            <button className="block text-left">🏠 Home</button>
          </Link>
          <Link href="/user/topics">
            <button className="block text-left font-semibold">📖 Subjects</button>
          </Link>
          <button className="block text-left">🤖 AI Tutor</button>
          <button className="block text-left">⚙️ Settings</button>
        </nav>
        <button className="absolute bottom-5 left-5">🚪 Log Out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Questions</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">
          <span className="border-b-2 border-black">Python</span>
        </h2>

        {/* Navigation Buttons */}
        <div className="flex justify-center mb-6">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionChange(index)}
              className={`mx-2 px-4 py-2 rounded ${currentQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current Question */}
        <div className="border p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{questions[currentQuestionIndex].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <label key={optionIndex} className="block">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
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
        <Link href="/user/chatbot">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Chatbot
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionsPage;