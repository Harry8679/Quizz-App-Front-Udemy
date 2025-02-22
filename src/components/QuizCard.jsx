import React from "react";

const QuizCard = ({ question, onAnswer }) => {
  return (
    <div className="border p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="flex flex-col space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onAnswer(option === question.correctAnswer)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;