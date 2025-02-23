import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!user; // ✅ Simplifie ta condition en fonction de l'utilisateur directement

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">Quiz App ❓</Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-green-300">{user.username || "Utilisateur"}</span>
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