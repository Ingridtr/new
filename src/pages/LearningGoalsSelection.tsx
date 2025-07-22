import LearningGoals from "../components/LearningGoals";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import FilterButton from "../components/FilterButton";

function LearningGoalsSelection() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  useEffect(() => {
    const storedGrade = localStorage.getItem("selectedGrade");
    setSelectedGrade(storedGrade);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <FilterButton
              text={` ${selectedGrade}`}
              onClick={() => navigate("/grade")}
            />
          </div>
          <h1>Velg kompetansemål</h1>
        </div>

        {selectedGrade && <LearningGoals selectedGrade={selectedGrade} />}
      </div>

      <Footer />
    </div>
  );
}
export default LearningGoalsSelection;
