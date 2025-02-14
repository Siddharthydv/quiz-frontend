export type Quiz = {
    id: string;
    title: string;
    description: string;
    createdAt:string
  };
  
 export  type User = {
    id: string;
    name: string;
    email: string;
  };
  
 export  type UserContextType = {
    user: User | null;
    quizzes: Quiz[];
    fetchQuizzes: () => void;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
  