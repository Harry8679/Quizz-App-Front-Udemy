import { useEffect, useState } from "react";
import { fetchQuestions, submitScore } from "../api/api";
import QuizCard from "../components/QuizCard";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions()
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Erreur lors du chargement des questions :", err));
  }, []);

  const handleAnswer = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      submitScore({ score: newScore });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Quiz terminé 🎉</h2>
          <p className="text-lg">Votre score : {score} / {questions.length}</p>
        </div>
      ) : questions.length > 0 ? (
        <QuizCard question={questions[currentQuestion]} onAnswer={handleAnswer} />
      ) : (
        <p>Chargement du quiz...</p>
      )}
    </div>
  );
};

export default Quiz;