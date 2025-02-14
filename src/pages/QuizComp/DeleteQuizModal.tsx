import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Quiz } from "@/types/types";
import { useUser } from "@/userContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in your .env file

export default function DeleteQuizModal({ isOpen, onClose, quizData }:{isOpen:boolean,onClose:()=>void,quizData:Quiz | null}) {
  const {fetchQuizzes}=useUser();
  const quizDeleter = async () => {

    try {
      const response =await axios.delete(`${API_URL}/quizzes/${quizData?.id}`,{withCredentials:true})

      if (response.status === 201) {
        fetchQuizzes();
        onClose();
        
      } else {
        throw new Error("Failed to add quiz");
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      alert("Error adding quiz!");
    } finally {
      
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white p-6">
        <DialogHeader>
          <DialogTitle>Delete Quiz</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300">
          Are you sure you want to delete <span className="font-semibold">{quizData?.title}</span>?
        </p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-400">
            Cancel
          </Button>
          <Button onClick={quizDeleter} className="bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
