import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useUser } from "@/userContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function AddQuizModal() {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { fetchQuizzes } = useUser();

  const quizAdder = async () => {
    if (!quizTitle.trim() || !description.trim()) {
      alert("Title and Description are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/quizzes`, {
        title: quizTitle,
        description: description,
      }, { withCredentials: true });

      if (response.status === 201) {
        // alert("Quiz added successfully!");
        setQuizTitle("");
        setDescription("");
        fetchQuizzes();
        setIsOpen(false); // Close the modal on success
      } else {
        throw new Error("Failed to add quiz");
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      alert("Error adding quiz!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 text-white">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(true)}>
            Add Quiz
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border border-gray-700 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Quiz</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Quiz Title</Label>
              <Input
                placeholder="Enter quiz title"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                placeholder="Enter quiz description"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                className="text-gray-400 border-gray-600" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700" 
                onClick={quizAdder}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Quiz"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
