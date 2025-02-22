import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("maths");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Quiz App ❓</h1>
      <p className="text-lg mb-4">Sélectionnez une catégorie :</p>
      
      <select
        className="border p-2 rounded-lg"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="maths">Maths</option>
        <option value="physique">Physique</option>
        <option value="chimie">Chimie</option>
        <option value="informatique">Informatique</option>
      </select>

      <button
        onClick={startQuiz}
        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Commencer le quiz
      </button>
    </div>
  );
};

export default Home;