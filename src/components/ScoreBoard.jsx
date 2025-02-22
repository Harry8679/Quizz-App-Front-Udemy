import { useEffect, useState } from "react";
import API from "../api/api";

const ScoreBoard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    API.get("/score")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Erreur lors du chargement des scores :", err));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">🏆 Classement des Scores</h2>
      {scores.length > 0 ? (
        <ul className="list-disc pl-6">
          {scores.map((score, index) => (
            <li key={index} className="p-2 border rounded bg-gray-100 my-2">
              Score : {score.score} - Date : {new Date(score.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun score enregistré.</p>
      )}
    </div>
  );
};

export default ScoreBoard;