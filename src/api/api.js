import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4900/api" });

// Ajouter le token JWT dans les requêtes si l'utilisateur est connecté
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchQuestions = () => API.get("/quiz");
export const submitScore = (score) => API.post("/score", { score });
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

export default API;