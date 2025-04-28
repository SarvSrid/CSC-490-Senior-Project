
// pages/QuestionCard.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { ChevronDown } from "lucide-react";

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
  answered_correctly?: boolean | null;
  selected_option?: number | null;
}

interface QuestionCardProps {
  q: Question;
  isDarkMode: boolean;
  selectedOptionId: number | null;
  isCorrect: boolean | null;
  hasSubmitted: boolean;
  handleOptionSelect: (optionId: number) => void;
  handleSubmit: () => void;
  allCorrect: boolean;
}

const parseSubtext = (subtext: string) => {
  const unescaped = subtext.replace(/\\n/g, "\n");
  const parts = unescaped.split("\n");
  return {
    text: parts[0] || "",
    code: parts.slice(1).join("\n"),
  };
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  q,
  isDarkMode,
  selectedOptionId,
  isCorrect,
  hasSubmitted,
  handleOptionSelect,
  handleSubmit,
  allCorrect,
}) => {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const subtextRef = useRef<HTMLDivElement>(null);
  const parsed = parseSubtext(q.subtext);

  // celebration
  useEffect(() => {
    if (hasSubmitted && isCorrect) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, isCorrect]);

  // scroll indicator
  useEffect(() => {
    if (subtextRef.current) {
      setShowScrollIndicator(
        subtextRef.current.scrollHeight > subtextRef.current.clientHeight
      );
    }
  }, [q.subtext]);

  const handleSubtextScroll = () => {
    if (subtextRef.current?.scrollTop! > 0) {
      setShowScrollIndicator(false);
    }
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div
        className={`p-5 rounded-cus border ${
          q.answered_correctly
            ? "border-green-500"
            : isDarkMode
            ? "border-gray-600"
            : "border-gray-300"
        }`}
      >
        {/* Header */}
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {q.header}
          </h3>
        </div>

        {/* Subtext */}
        <div
          ref={subtextRef}
          onScroll={handleSubtextScroll}
          className="max-h-[230px] overflow-y-scroll custom-scrollbar mb-2 relative"
        >
          {parsed.text && (
            <p className={`${isDarkMode ? "text-white" : "text-gray-700"} mb-2`}>
              {parsed.text}
            </p>
          )}
          {parsed.code && (
            <pre
              className={`p-3 rounded mb-2 whitespace-pre-wrap ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {parsed.code}
            </pre>
          )}
          {showScrollIndicator && (
            <div className="absolute bottom-1 right-1">
              <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let style = isDarkMode
              ? "bg-transparent border-gray-400 text-gray-200 hover:bg-gray-700"
              : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100";

            if (q.answered_correctly && option.is_correct) {
              style = "bg-green-500 border-green-500 text-white";
            } else if (hasSubmitted && isSelected && isCorrect === false) {
              style = "bg-red-500 border-red-500 text-white";
            } else if (isSelected) {
              style = "bg-pink-500 border-pink-500 text-white";
            }

            return (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`cursor-pointer p-3 border rounded-full transition-colors ${style}`}
              >
                <span style={{ whiteSpace: "pre-line" }}>
                  {option.option_text.replace(/\\n/g, ",\t")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Submit & Go to Topics */}
        <div className="mt-6 flex items-center space-x-4">
          <button
            onClick={handleSubmit}
            disabled={q.answered_correctly === true}
            className={`font-bold py-2 px-6 rounded-full transition-colors ${
              q.answered_correctly
                ? "bg-transparent border border-gray-300 text-gray-400 cursor-default"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            Submit
          </button>

          {allCorrect && (
            <button
              onClick={() =>  router.back()}
              className="font-bold py-2 px-6 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
              EXIT
            </button>
          )}
        </div>

        {/* Feedback */}
        {hasSubmitted && isCorrect === true && (
          <p className="mt-2 text-green-500">Correct!</p>
        )}
        {hasSubmitted && isCorrect === false && (
          <p className="mt-2 text-red-500">Incorrect!</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
