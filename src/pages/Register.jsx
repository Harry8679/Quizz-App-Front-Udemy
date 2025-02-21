import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      alert("Erreur lors de l'inscription !");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom d'utilisateur" className="w-full p-3 border rounded-lg" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Mot de passe" className="w-full p-3 border rounded-lg" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;