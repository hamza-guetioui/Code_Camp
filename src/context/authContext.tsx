"use client";
import { GET_USER } from "@/lib/actions/User";
import { IUser } from "@/types/user";
import { useCookies } from "next-client-cookies"; // Import useCookies
import { createContext, useContext, useEffect, useState } from "react";

// Define the context type
interface AuthContextTypes {
  isAuth: boolean;
  loading: boolean;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state
  const cookies = useCookies(); // Initialize useCookies

  // Check for token and fetch user data on mount
  useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      // Simulate fetching user data based on the token
      const fetchUser = async () => {
        setLoading(true);
        try {
          // Replace this with your actual API call to fetch user data
          const data: IUser | null = await GET_USER();
          if (data !== null) {
            setIsAuth(true);
            return;
          }
          setIsAuth(false);
        } catch {
          setIsAuth(false);
        } finally {
          setLoading(false); // Set loading to false after the check is complete
        }
      };

      fetchUser();
    } else {
      setIsAuth(false);
      setLoading(false); // Set loading to false if no token is found
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
