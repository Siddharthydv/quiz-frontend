import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Quiz } from "@/types/types";

export default function ViewQuizModal({ quiz }: { quiz: Quiz | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="link" 
          className="text-blue-400 hover:text-blue-300 transition-all duration-200" 
          onClick={() => setIsOpen(true)}
        >
          View
        </Button>
      </DialogTrigger>
      {quiz && (
        <DialogContent className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-purple-400">{quiz.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300 text-lg mt-2 italic">{quiz.description}</p>
          <p className="text-gray-400 text-sm mt-4">Created on: {formatDate(quiz.createdAt)}</p>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => setIsOpen(false)} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
