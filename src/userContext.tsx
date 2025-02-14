import { createContext, useContext, useState } from "react";
import { User, Quiz, UserContextType } from "./types/types";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;


export const UserContext = createContext<UserContextType | null >(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const fetchQuizzes = async () => {
    try {
      const response=await axios.get(`${API_URL}/quizzes`,{withCredentials:true})
      console.log(response)
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email: email,
        password: password,
      },{withCredentials:true});
    
      if (response.status === 200) {  // Check if the request was successful
        const userData = response.data;
        console.log(userData)  // Axios automatically parses JSON
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data?.message || "Invalid credentials");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  const logout = async () => {
    setUser(null);
    await axios.get(`${API_URL}/logout`,{withCredentials:true})
    localStorage.removeItem("user");
  };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
 
  return (
    <UserContext.Provider value={{ user, setUser, quizzes, fetchQuizzes, login, logout }}>
    {children}
  </UserContext.Provider>  );
}

// Custom hook for using the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}