"use client";
import { GET_USER } from "@/actions/User";
import { IUser } from "@/types/user";
import { useCookies } from "next-client-cookies"; // Import useCookies
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Define the context type
interface AuthContextTypes {
  isAuth: boolean;
  loading: boolean;
  user: IUser | null;
  login: (data: IUser) => void; // Function to handle login
  logout: () => void; // Function to handle logout
  updateUser: (user: IUser) => void; // Function to update user details
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state
  const [user, setUser] = useState<IUser | null>(null);
  const cookies = useCookies(); // Initialize useCookies
  const router = useRouter();

  // Function to handle login
  const login = (data: IUser) => {
    setIsAuth(true);
    setUser(data);
    router.push("/");
  };

  // Function to handle logout
  const logout = () => {
    setIsAuth(false);
    setUser(null);
    // Remove the token and refreshToken from cookies
    cookies.remove("token");
    cookies.remove("refreshToken");
    router.push("/login");
  };

  // Function to update user details
  const updateUser = (user: IUser) => {
    setUser(user);
  };

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
            setUser(data);
            setIsAuth(true);
            return;
          }
          setIsAuth(false);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsAuth(false);
          setUser(null);
        } finally {
          setLoading(false); // Set loading to false after the check is complete
        }
      };

      fetchUser();
    } else {
      setIsAuth(false);
      setUser(null);
      setLoading(false); // Set loading to false if no token is found
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        user,
        login,
        logout,
        updateUser,
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
