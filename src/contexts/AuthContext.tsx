import { createContext, useContext, useState, ReactNode } from "react";

type Role = "creator" | "brand" | null;

interface AuthContextType {
  role: Role;
  isLoggedIn: boolean;
  login: (role: "creator" | "brand") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem("creatorhub_role");
    return saved === "creator" || saved === "brand" ? saved : null;
  });

  const login = (r: "creator" | "brand") => {
    setRole(r);
    localStorage.setItem("creatorhub_role", r);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("creatorhub_role");
  };

  return (
    <AuthContext.Provider value={{ role, isLoggedIn: !!role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
