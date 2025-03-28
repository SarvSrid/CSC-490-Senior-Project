"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  answered_correctly: boolean;
}

interface ChatbotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QuestionsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams ? searchParams.get("topic_id") : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!topicId) {
        console.error("Topic ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5003/api/questions?topic_id=${topicId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOptionId(null);
    setIsCorrect(null);
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptionId(optionId);
  };

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

  const handleChatbotMessageSubmit = async (message: string) => {
    if (!message.trim()) return;

    setIsChatbotLoading(true);

    // Add user message immediately
    const userMessage: ChatbotMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatbotMessages((prev) => [...prev, userMessage]);

    try {
      // Send the message to the backend
      const response = await fetch("http://localhost:5004/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          conversation_history: [...chatbotMessages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to chatbot");
      }

      const data = await response.json();
      setChatbotMessages(data.conversation_history);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      // Add error message to chat
      const errorMessage: ChatbotMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatbotMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatbotLoading(false);
    }
  };

  const handleChatbotButtonClick = async () => {
    const newChatbotOpenState = !isChatbotOpen;
    setIsChatbotOpen(newChatbotOpenState);

    if (newChatbotOpenState && chatbotMessages.length === 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const questionContext = `I need help with this question: ${currentQuestion.header}. ${currentQuestion.subtext} Here are the answer choices: ${currentQuestion.options
        .map((option) => option.option_text)
        .join(", ")}`;

      setIsChatbotLoading(true);
      try {
        const response = await fetch("http://localhost:5004/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: questionContext,
            conversation_history: [],
          }),
        });

        const data = await response.json();
        setChatbotMessages(data.conversation_history);
      } catch (error) {
        console.error("Error initializing chatbot:", error);
      } finally {
        setIsChatbotLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading questions...</div>;
  }

  if (!questions.length) {
    return <div className="flex justify-center items-center h-screen">No questions available for this topic.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-1/5 min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Akin Learning</h2>
        <nav className="space-y-4">
          <Link href="/user/dashboard">
            <button className="block text-left">🏠 Home</button>
          </Link>
          <button className="block text-left">⚙️ Settings</button>
        </nav>
        <Link href="/auth/signin/signin1">
          <button className="absolute bottom-5 left-5">🚪 Log Out</button>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Questions</h1>

        {/* Navigation Buttons */}
        <div className="flex justify-center mb-6 flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionChange(index)}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === index
                  ? "bg-blue-500 text-white"
                  : questions[index].answered_correctly
                  ? "bg-green-500 text-white"
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
                  disabled={currentQuestion.answered_correctly}
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
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={currentQuestion.answered_correctly}
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

      {/* Chatbot Sidebar */}
      {isChatbotOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg border-l z-10 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-blue-500 text-white">
            <h3 className="text-lg font-bold">Learning Assistant</h3>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatbotMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isChatbotLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input');
                if (input && input.value.trim()) {
                  handleChatbotMessageSubmit(input.value.trim());
                  input.value = '';
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isChatbotLoading}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isChatbotLoading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button
        onClick={handleChatbotButtonClick}
        className={`fixed right-4 top-4 px-4 py-2 rounded shadow-lg z-20 ${
          isChatbotOpen ? 'bg-gray-500 hover:bg-gray-600' : 'bg-purple-500 hover:bg-purple-600'
        } text-white transition-colors`}
      >
        {isChatbotOpen ? "Close Assistant" : "Ask Chatbot for Help"}
      </button>
    </div>
  );
};

export default QuestionsPage;