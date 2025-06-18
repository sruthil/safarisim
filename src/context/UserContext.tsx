"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null, authToken?: string | null) => void;
  logout: () => void;
  loadingUser: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setUser: () => {},
  logout: () => {},
  loadingUser: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Load user and token from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.error("Failed to parse user/token from localStorage", error);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const handleSetUser = (user: User | null, authToken?: string | null) => {
    setUser(user);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        setToken(authToken);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setToken(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, token, setUser: handleSetUser, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
