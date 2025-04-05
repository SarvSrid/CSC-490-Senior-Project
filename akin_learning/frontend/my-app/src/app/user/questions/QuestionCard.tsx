import React, { useState, useEffect, useRef } from "react";
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
    handleOptionSelect: (optionId: number) => void;
    handleSubmit: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    q,
    isDarkMode,
    selectedOptionId,
    isCorrect,
    handleOptionSelect,
    handleSubmit,
}) => {
    // These hooks are local to the question card component.
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const subtextRef = useRef<HTMLDivElement>(null);

    // Check if the subtext overflows and then show the scroll indicator.
    useEffect(() => {
        if (subtextRef.current) {
            if (subtextRef.current.scrollHeight > subtextRef.current.clientHeight) {
                setShowScrollIndicator(true);
            } else {
                setShowScrollIndicator(false);
            }
        }
    }, [q?.subtext]);

    // When the user scrolls the subtext area, hide the indicator.
    const handleSubtextScroll = () => {
        if (subtextRef.current && subtextRef.current.scrollTop > 0) {
            setShowScrollIndicator(false);
        }
    };

    return (
        <div className={`p-5 rounded-cus border ${isDarkMode ? "bg-[rgb(31,41,55)] border-gray-600" : "border-gray-300"}`}>
            {/* Expanded Question Header */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {q.header}
                </h3>
            </div>
            {/* Fixed Subtext Area */}
            <div
                ref={subtextRef}
                onScroll={handleSubtextScroll}
                className="max-h-[230px] overflow-y-scroll custom-scrollbar mb-2 relative"
            >
                <p style={{ whiteSpace: "pre-line" }} className={`${isDarkMode ? "text-white" : "text-gray-700"}`}>
                    {q.subtext.replace(/\\n/g, "\n")}
                </p>
                {showScrollIndicator && (
                    <div className="absolute bottom-1 right-1">
                        <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
                    </div>
                )}
            </div>
            <div className="space-y-3">
                {q.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    let optionStyle = isDarkMode
                        ? "bg-transparent border-gray-400 text-gray-200 hover:bg-gray-700"
                        : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100";
                    if (isSelected && isCorrect !== null) {
                        optionStyle = isCorrect
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-red-500 border-red-500 text-white";
                    } else if (isSelected) {
                        optionStyle = "bg-pink-500 border-pink-500 text-white";
                    }
                    return (
                        <div
                            key={option.id}
                            onClick={() => handleOptionSelect(option.id)}
                            className={`cursor-pointer p-3 border rounded-full transition-colors ${optionStyle}`}
                        >
                            <span style={{ whiteSpace: "pre-line" }}>
                                {option.option_text.replace(/\\n/g, ",\t")}
                            </span>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
                Submit
            </button>
            {isCorrect !== null && (
                <p className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                    {isCorrect ? "Correct!" : "Incorrect!"}
                </p>
            )}
        </div>
    );
};

export default QuestionCard;
