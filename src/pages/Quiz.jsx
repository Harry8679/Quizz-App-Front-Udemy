import { useEffect, useState } from "react";
import { fetchQuestions } from "../api/api";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(null);

  // 🔥 Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Veuillez vous connecter pour accéder au quiz !");
      navigate("/login");
    }
  }, [navigate]);

  // 📌 Charger les questions (Exemple : Maths)
  useEffect(() => {
    fetchQuestions("maths")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Erreur chargement des questions :", err));
  }, []);

  // 🎵 Charger les sons du dossier `public/sounds`
  const chronoAudio = new Audio("/sounds/chrono.mp3");
  const timeoutAudio = new Audio("/sounds/timeout.mp3");

  useEffect(() => {
    if (!quizStarted) return; // Ne pas jouer le son tant que le quiz n'a pas démarré

    // 🔊 Jouer le son du chrono dès le début de la question
    if (timeLeft === 20) {
      chronoAudio.play().catch((err) => console.error("Erreur audio :", err));
    }

    // 🔊 Son de fin + Considérer la réponse comme fausse si le temps expire
    if (timeLeft === 0) {
      timeoutAudio.play().catch((err) => console.error("Erreur audio :", err));
      handleAnswer(false); 
    }

    // ⏳ Décompte du temps
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    setTimer(interval);

    return () => clearInterval(interval);
  }, [timeLeft, quizStarted]);

  // 📌 Gérer la réponse de l'utilisateur
  const handleAnswer = (isCorrect) => {
    clearInterval(timer);
    setTimeLeft(20); // 🔄 Réinitialiser le timer

    if (isCorrect) {
      setScore(score + 1);
    }

    // 👉 Passer à la question suivante ou afficher le score final
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {!quizStarted ? (
        // 🔥 Bouton pour démarrer le quiz après interaction utilisateur
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
        // 🎉 Affichage du résultat final
        <div className="text-center">
          <h2 className="text-3xl font-bold">Quiz terminé 🎉</h2>
          <p className="text-lg">Votre score : {score} / {questions.length}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600"
          >
            Rejouer
          </button>
        </div>
      ) : questions.length > 0 ? (
        // 🔥 Affichage des questions avec Timer
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