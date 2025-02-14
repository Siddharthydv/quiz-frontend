import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
  const navigate=useNavigate();
  return (
    <div className="flex items-center justify-between bg-[#171717] text-white px-6 py-3">
      <h1 className="text-3xl font-semibold">QuizMaster</h1>
      <Button onClick={()=>{navigate('/login')}}  className="bg-green-500 hover:bg-green-600">Login</Button>
    </div>
  );
}