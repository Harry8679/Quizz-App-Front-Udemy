import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4900/api" });

// 📌 Ajouter automatiquement le token JWT dans toutes les requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📌 Récupérer 10 questions aléatoires selon la catégorie et la difficulté
export const fetchQuestions = async (category, difficulty = "medium") => {
  try {
    const response = await API.get(`/quiz/${category}/${difficulty}`);
    return response.data; // ✅ Retourner seulement les données
  } catch (error) {
    console.error("Erreur lors de la récupération des questions :", error.response?.data || error.message);
    return []; // ✅ Retourne un tableau vide en cas d'erreur pour éviter un crash
  }
};

// 📌 Soumettre le score de l'utilisateur
export const submitScore = async (score) => {
  try {
    const response = await API.post("/score", { score });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission du score :", error.response?.data || error.message);
  }
};

// 📌 Inscription d'un nouvel utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
  }
};

// 📌 Connexion d'un utilisateur
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
  }
};

export default API;

// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4900/api" });

// // Ajouter le token JWT dans les requêtes si l'utilisateur est connecté
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // export const fetchQuestions = () => API.get("/quiz");
// export const submitScore = (score) => API.post("/score", { score });
// export const registerUser = (userData) => API.post("/auth/register", userData);
// export const loginUser = (userData) => API.post("/auth/login", userData);
// export const fetchQuestions = (category) => API.get(`/quiz/${category}`);


// export default API;