import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenue sur Quiz App ❓</h1>
        <p className="text-lg mb-4">Testez vos connaissances avec des quiz interactifs.</p>
        <Link to="/quiz" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Commencer le quiz
        </Link>
      </div>
    </div>
  );
};

export default Home;
