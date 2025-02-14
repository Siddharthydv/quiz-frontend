import { useState } from "react";
import { useUser } from "@/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect  } from "react";

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();
  const{user}=useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    console.log(user)
   
  };
  useEffect(() => {
    if (user) {
      console.log("User logged in:", user);
      navigate("/quiztable");
    }
  }, [user, navigate]); 

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
