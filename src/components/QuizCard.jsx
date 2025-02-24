import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

// Fonction pour bien afficher les espaces
const cleanLatex = (str) => str.replace(/\\\(|\\\)/g, "").replace(/\s+/g, "~");

const QuizCard = ({ question, onAnswer }) => {
  return (
    <div className="border p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-red-600">
        <BlockMath math={cleanLatex(question.question)} />
      </h2>
      <div className="flex flex-col space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onAnswer(option.isCorrect)}
          >
            <InlineMath math={cleanLatex(option.text)} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;