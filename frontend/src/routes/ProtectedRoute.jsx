import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMe } from "../features/auth/authSlice";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
