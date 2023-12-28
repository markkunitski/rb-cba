'use client'
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ role: "", token: "" });

  const setAuth = (role, token) => {
    setAuthState({ role, token });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
