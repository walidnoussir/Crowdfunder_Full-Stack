import { jwtDecode } from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const { userId, role } = jwtDecode(token);
  return {
    userId,
    role,
  };
};
