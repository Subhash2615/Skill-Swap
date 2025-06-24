// AuthContext placeholder
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export interface User {
  name: string;
  email: string;
  // Add other user fields as needed
  skills_to_teach?: string[];
  skills_to_learn?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get<User>("/users/me")
        .then((res: { data: User }) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 