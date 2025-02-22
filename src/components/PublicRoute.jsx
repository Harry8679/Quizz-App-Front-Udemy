import { Navigate } from "react-router-dom";

const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />; // Redirige vers la page d'accueil si connecté
  }
  return children;
};

export default PublicRoute;