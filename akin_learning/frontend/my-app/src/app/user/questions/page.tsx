"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  header: string;
  subtext: string;
  options: Option[];
  answered_correctly: boolean; // Add this field
}

const QuestionsPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle question change
  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOptionId(null); // Reset selected option
    setIsCorrect(null); // Reset correctness feedback
  };

  // Handle option selection
  const handleOptionSelect = (optionId: number) => {
    setSelectedOptionId(optionId);
  };

  // Handle answer submission
  const handleAnswerSubmit = async () => {
    if (selectedOptionId === null) {
      alert("Please select an option before submitting.");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    try {
      const response = await fetch(
        `http://localhost:5003/api/questions/${currentQuestion.id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selected_option_id: selectedOptionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const result = await response.json();
      setIsCorrect(result.is_correct);
      alert(result.is_correct ? "Correct!" : "Incorrect!");

      // Update the question's answered_correctly status
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion.id
            ? { ...question, answered_correctly: result.is_correct }
            : question
        )
      );
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

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
              className={`mx-2 px-4 py-2 rounded ${
                currentQuestionIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current Question */}
        <div className="border p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{currentQuestion.header}</h3>
          <p className="text-gray-600 mb-4">{currentQuestion.subtext}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <label key={option.id} className="block">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedOptionId === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  className="mr-2"
                  disabled={currentQuestion.answered_correctly} // Disable if answered correctly
                />
                {option.option_text}
              </label>
            ))}
          </div>
          <button
            onClick={handleAnswerSubmit}
            className={`mt-4 px-4 py-2 rounded ${
              currentQuestion.answered_correctly
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentQuestion.answered_correctly} // Disable if answered correctly
          >
            Submit Answer
          </button>
          {isCorrect !== null && (
            <p className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </p>
          )}
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