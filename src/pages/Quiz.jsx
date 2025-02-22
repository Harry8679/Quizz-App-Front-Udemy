import { useEffect, useState } from "react";
import { fetchQuestions } from "../api/api";
import QuizCard from "../components/QuizCard";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    fetchQuestions("maths") // Exemple : récupérer des questions de maths
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Erreur chargement des questions :", err));
  }, []);

  // 🎵 Charger les sons depuis /public
  const chronoAudio = new Audio("/sounds/chrono.mp3");
  const timeoutAudio = new Audio("/sounds/timeout.mp3");

  useEffect(() => {
    if (timeLeft === 20) {
      chronoAudio.play(); // Démarrer le chrono au début de chaque question
    }

    if (timeLeft === 0) {
      timeoutAudio.play(); // Jouer le son de fin
      handleAnswer(false); // Considérer la réponse comme fausse
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    setTimer(interval);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleAnswer = (isCorrect) => {
    clearInterval(timer); // Arrêter le timer
    setTimeLeft(20); // Réinitialiser le temps pour la prochaine question

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
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
        <div>
          <div className="text-right text-red-500 font-bold text-lg">⏳ {timeLeft}s</div>
          <QuizCard question={questions[currentQuestion]} onAnswer={handleAnswer} />
        </div>
      ) : (
        <p>Chargement du quiz...</p>
      )}
    </div>
  );
};

export default Quiz;
