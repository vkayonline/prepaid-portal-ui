import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    console.log("AuthContext: User logged in. isAuthenticated:", true); // Added log
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    console.log("AuthContext: User logged out. isAuthenticated:", false); // Added log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
