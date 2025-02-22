import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté à chaque changement
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [user]); // Met à jour quand `user` change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Met à jour l'état global
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">Quiz App ❓</Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-green-300">{user?.username || "Utilisateur"}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 hover:text-gray-300">Connexion</Link>
            <Link to="/register" className="px-4 hover:text-gray-300">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;