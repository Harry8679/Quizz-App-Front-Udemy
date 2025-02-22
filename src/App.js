import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import ScoreBoard from "./components/ScoreBoard";
import Navbar from "./components/Navbar";
import API from "./api/api";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import du composant de protection

function App() {
  const [user, setUser] = useState(null);

  // 🔥 Vérifier l'utilisateur connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/profile")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Seules ces deux routes sont accessibles sans connexion */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* 🔐 Toutes ces routes sont protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scoreboard"
          element={
            <ProtectedRoute user={user}>
              <ScoreBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;