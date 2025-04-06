import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    id: number;
    option_text: string;
    is_correct: boolean;
    // parsedLabel?: string;
    // parsedCode?: string;
}

interface Question {
    id: number;
    header: string;
    subtext: string;
    options: Option[];
    answered_correctly?: boolean | null;
    selected_option?: number | null;
    parsedSubtext?: {
        text: string;
        code: string;
    };
}

interface QuestionCardProps {
    q: Question;
    isDarkMode: boolean;
    selectedOptionId: number | null;
    isCorrect: boolean | null;
    handleOptionSelect: (optionId: number) => void;
    handleSubmit: () => void;
}

const parseSubtext = (subtext: string) => {
    const unescapedSubtext = subtext.replace(/\\n/g, '\n');
    const parts = unescapedSubtext.split('\n');
    
    return {
        text: '',  // First line as text
        code: unescapedSubtext  // Rest as code
    };
};

// Commented out option parsing since we're not using it
/*
const parseOptionText = (optionText: string) => {
    const unescapedText = optionText.replace(/\\n/g, '\n');
    const parts = unescapedText.split('\n');
    const label = parts[0];
    const code = parts.slice(1).join('\n');

    return {
        label: label || '',
        code: code || ''
    };
};
*/

const QuestionCard: React.FC<QuestionCardProps> = ({
    q,
    isDarkMode,
    selectedOptionId,
    isCorrect,
    handleOptionSelect,
    handleSubmit,
}) => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const subtextRef = useRef<HTMLDivElement>(null);
    
    // Parse only the subtext
    const parsedSubtext = parseSubtext(q.subtext);

    useEffect(() => {
        if (subtextRef.current) {
            const { scrollHeight, clientHeight } = subtextRef.current;
            setShowScrollIndicator(scrollHeight > clientHeight);
        }
    }, [q.subtext]);

    const handleSubtextScroll = () => {
        if (subtextRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = subtextRef.current;
            setShowScrollIndicator(scrollTop + clientHeight < scrollHeight);
        }
    };

    return (
        <div className={`p-5 rounded-cus border ${isDarkMode ? "bg-[rgb(31,41,55)] border-gray-600" : "border-gray-300"}`}>
            {/* Header Section */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {q.header}
                </h3>
            </div>

            {/* Subtext Section with Parsed Content */}
            <div
                ref={subtextRef}
                onScroll={handleSubtextScroll}
                className="max-h-[230px] overflow-y-scroll custom-scrollbar mb-2 relative"
            >
                {/* Render parsed text if it exists */}
                {parsedSubtext.text && (
                    <p style={{ whiteSpace: "pre-line" }} className={`${isDarkMode ? "text-white" : "text-gray-700"} mb-2`}>
                        {parsedSubtext.text}
                    </p>
                )}
                
                {/* Render parsed code if it exists */}
                {parsedSubtext.code && (
                    <pre className={`p-3 rounded-md overflow-x-auto text-sm font-mono ${
                        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
                    }`}>
                        {parsedSubtext.code.split('\n').map((line, i) => (
                            <div key={i} className="whitespace-pre">
                                {line}
                            </div>
                        ))}
                    </pre>
                )}
                
                {showScrollIndicator && (
                    <div className="absolute bottom-1 right-1">
                        <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
                    </div>
                )}
            </div>

            {/* Options Section (unchanged) */}
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