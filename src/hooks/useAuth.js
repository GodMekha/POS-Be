import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/** const { user, token, isAuth, login, logout } = useAuth(); */
export const useAuth = () => useContext(AuthContext);
