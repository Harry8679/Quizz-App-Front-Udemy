import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const QuizCard = ({ question, onAnswer }) => {
  return (
    <div className="border p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        <BlockMath>{question.question}</BlockMath>
      </h2>
      <div className="flex flex-col space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onAnswer(option.isCorrect)}
          >
            <InlineMath>{option.text}</InlineMath>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;