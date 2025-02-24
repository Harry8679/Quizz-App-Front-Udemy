import { useEffect, useState, useRef } from "react";
import { fetchQuestions } from "../api/api";
import QuizCard from "../components/QuizCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "maths";
  const difficulty = searchParams.get("difficulty") || "medium";

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef(null);
  
  const chronoAudio = useRef(new Audio("/sounds/chrono.mp3"));
  const timeoutAudio = useRef(new Audio("/sounds/timeout.mp3"));

  // 🔥 Vérification utilisateur connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Veuillez vous connecter pour accéder au quiz !");
      navigate("/login");
    }
  }, [navigate]);

  // 📌 Charger les questions selon catégorie et difficulté
  useEffect(() => {
    fetchQuestions(category, difficulty)
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error("Format des données incorrect :", data);
          setQuestions([]);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement des questions :", err);
        setQuestions([]);
      });
  }, [category, difficulty]);

  // 🎵 Gestion des sons et du timer
  useEffect(() => {
    if (!quizStarted) return;

    chronoAudio.current.loop = true;
    chronoAudio.current.play().catch(console.error);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          chronoAudio.current.pause();
          timeoutAudio.current.play().catch(console.error);
          handleAnswer(false);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      chronoAudio.current.pause();
    };
  }, [quizStarted, currentQuestion]);

  // ✅ Gestion de la réponse
  const handleAnswer = (isCorrect) => {
    clearInterval(timerRef.current);
    chronoAudio.current.pause();
    setTimeLeft(20);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < 10 && nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {!quizStarted ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Prêt à jouer ? 🎯</h2>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600"
          >
            Commencer le Quiz
          </button>
        </div>
      ) : showResult ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Quiz terminé 🎉</h2>
          <p className="text-lg">
            Votre score : {score} / {questions.length > 10 ? 10 : questions.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600"
          >
            Rejouer
          </button>
        </div>
      ) : questions.length > 0 ? (
        <div>
          <div className="text-right text-red-500 font-bold text-lg">⏳ {timeLeft}s</div>
          <QuizCard question={questions[currentQuestion]} onAnswer={handleAnswer} />
        </div>
      ) : (
        <p className="text-center">Chargement du quiz...</p>
      )}
    </div>
  );
};

export default Quiz;