import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuizTable from "./pages/QuizComp/quizTable";
import LoginPage from "./pages/LoginPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiztable" element={<QuizTable />} />
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}
