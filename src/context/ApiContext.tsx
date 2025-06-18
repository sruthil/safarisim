"use client";

import { createContext, useContext } from "react";

interface ApiContextType {
  apiUrl: string;
  getAuthHeaders: () => Record<string, string>;
}

const ApiContext = createContext<ApiContextType>({
  apiUrl: "",
  getAuthHeaders: () => ({}),
});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://popam.com/api";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken"); // or from cookies
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  return (
    <ApiContext.Provider value={{ apiUrl, getAuthHeaders }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
