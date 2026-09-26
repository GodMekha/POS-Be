import { createContext, useCallback, useEffect, useState } from "react";
import { authService } from "../service/authService.js";
import { tokenStorage } from "../service/api/apiClient.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(tokenStorage.get());
  const [user, setUser] = useState(readUser);

  const logout = useCallback(() => {
    tokenStorage.clear();
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener("auth:logout", logout);
    return () => window.removeEventListener("auth:logout", logout);
  }, [logout]);

  const login = async (phoneNumber, password) => {
    const { token: t, refreshToken, ...u } = await authService.login({ phoneNumber, password });
    tokenStorage.set(t, refreshToken);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
    return u;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuth: !!token }}>{children}</AuthContext.Provider>
  );
};
