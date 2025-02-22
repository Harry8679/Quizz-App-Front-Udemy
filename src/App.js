import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import ScoreBoard from "./components/ScoreBoard";
import Navbar from "./components/Navbar";
import API from "./api/api";
import ProtectedRoute from "./components/ProtectedRoute"; // Protège les routes privées
import PublicRoute from "./components/PublicRoute"; // Empêche l'accès aux pages publiques si connecté

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
        {/* 🔓 Pages accessibles uniquement aux NON-CONNECTÉS */}
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute user={user}>
              <Register setUser={setUser} />
            </PublicRoute>
          }
        />

        {/* 🔐 Pages accessibles uniquement aux UTILISATEURS CONNECTÉS */}
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