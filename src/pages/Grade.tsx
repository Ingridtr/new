import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GradeButton from "../components/GradeButton";

function Grade() {
  // Clear selected grade when returning to grade selection
  useEffect(() => {
    localStorage.removeItem("selectedGrade");
    localStorage.removeItem("selectedLearningGoal");
    // Dispatch event to update navbar
    window.dispatchEvent(new CustomEvent("gradeChanged", { detail: { grade: null } }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <div className="flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Velg trinn</h1>
          <GradeButton />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Grade;
