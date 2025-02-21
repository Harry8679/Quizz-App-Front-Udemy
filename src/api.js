import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4900/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const saveScore = async (score) => {
  try {
    await API.post("/score", { score });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du score :", err);
  }
};

export default API;
