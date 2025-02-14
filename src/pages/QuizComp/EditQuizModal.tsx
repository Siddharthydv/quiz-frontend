import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Quiz } from "@/types/types";
import { useUser } from "@/userContext";
const API_URL = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in your .env file


export default function EditQuizModal({ isOpen, onClose, quizData }:{isOpen:boolean,onClose:()=>void,quizData:Quiz | null}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {fetchQuizzes}=useUser();
  useEffect(() => {
    if (quizData) {
      setName(quizData.title);
      setDescription(quizData.description);
    }
  }, [quizData]);

  const handleSave = async () => {
    console.log("Updated Quiz:", { name, description });
    onClose(); // Close modal after saving
    try{
    const response=await axios.put(`${API_URL}/quizzes/${quizData?.id}`,{title:name,description:description},{withCredentials:true})
    if(response.status===201)
      fetchQuizzes();
    }catch(error)
    {
      alert(error)
    }
  
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white p-6">
        <DialogHeader>
          <DialogTitle>Edit Quiz</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Quiz Name" 
            className="bg-gray-800 text-white"
          />
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Quiz Description" 
            className="bg-gray-800 text-white"
          />
        </div>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
