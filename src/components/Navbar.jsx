import { Link } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">Quiz App ❓</Link>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Déconnexion</button>
        ) : (
          <>
            <Link to="/login" className="px-4">Connexion</Link>
            <Link to="/register" className="px-4">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;