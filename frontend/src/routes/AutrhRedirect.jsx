import { Navigate } from "react-router-dom";

function AutrhRedirect({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default AutrhRedirect;
