import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditQuizModal from "./EditQuizModal";
import DeleteQuizModal from "./DeleteQuizModal";
import AddQuizModal from "./addQuizModal";
import LogoutButton from "./Logout";
import { useUser } from "@/userContext";
import { Quiz } from "@/types/types";
import ViewQuizModal from "./ViewModal";


export default function QuizTable() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const { quizzes, fetchQuizzes } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleEditClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg">
        <Input 
          placeholder="Search quizzes..." 
          className="w-1/3 bg-gray-900 text-white border border-gray-700 shadow-inner focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-5">
          <AddQuizModal />
          <LogoutButton />
        </div>
        
      </div>

      <div className="border border-gray-700 rounded-xl overflow-hidden shadow-xl bg-gray-900/80 backdrop-blur-md">
        <Table className="w-full bg-gray-900">
          <TableHeader className="bg-gray-800/60">
            <TableRow>
              <TableHead className="text-white text-lg font-semibold">QUIZ TITLE</TableHead>
              <TableHead className="text-white text-lg font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuizzes.map((quiz, index) => (
              <TableRow key={index} className="hover:bg-gray-800/50 transition-all duration-200">
                <TableCell>
                  <div className="p-3 rounded-lg border border-gray-700 bg-gray-800 shadow-md">
                    <span className="font-semibold text-purple-400">{quiz.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <ViewQuizModal quiz={quiz} />
                    <Button 
                      variant="link" 
                      className="text-yellow-400 hover:text-yellow-300 transition-all duration-200" 
                      onClick={() => handleEditClick(quiz)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="link" 
                      className="text-red-400 hover:text-red-300 transition-all duration-200" 
                      onClick={() => handleDeleteClick(quiz)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <EditQuizModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        quizData={selectedQuiz} 
      />
      <DeleteQuizModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        quizData={selectedQuiz} 
      />
    </div>
  );
}


