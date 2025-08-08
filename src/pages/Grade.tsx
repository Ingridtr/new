import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GradeButton from "../components/GradeButton";
import { useNavigate } from "react-router-dom";

function Grade() {
  const navigate = useNavigate();
  // Clear selected grade when returning to grade selection
  useEffect(() => {
    localStorage.removeItem("selectedGrade");
    localStorage.removeItem("selectedLearningGoal");
    // Dispatch event to update navbar
    window.dispatchEvent(
      new CustomEvent("gradeChanged", { detail: { grade: null } })
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <div className="flex-1 flex flex-col justify-center">
        <button
          className="fixed top-36 right-6 z-50 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("/")}
          aria-label="Lukk aktivitetsside og gå tilbake"
        >
          ×
        </button>
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1>Velg trinn</h1>
          <GradeButton />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Grade;
