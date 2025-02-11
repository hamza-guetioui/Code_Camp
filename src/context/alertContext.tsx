"use client";

import { createContext, useContext, useState } from "react";

interface IState {
  message: string;
  status: number;
}
// Define the context type
interface AlertContextTypes {
  alert: IState | null;
  handleAlert: ({ status, message }: IState) => void;
}

// Create the context with a default value of null
const alertProvider = createContext<AlertContextTypes | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<IState | null>(null);
  const handleAlert = ({ status, message }: IState) => {
    setAlert({ status, message });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <alertProvider.Provider value={{ alert, handleAlert }}>
      {children}
    </alertProvider.Provider>
  );
};

// Rename function to match its purpose
export const useAlert = () => {
  const context = useContext(alertProvider);
  if (!context) {
    throw new Error("useRefresh must be used within RefreshProvider");
  }
  return context;
};
