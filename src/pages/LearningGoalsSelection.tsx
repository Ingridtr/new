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
    <div className="bg-white-50 h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <FilterButton
              text={` ${selectedGrade}`}
              onClick={() => navigate("/Grade")}
            />
          </div>
          <h1 className="text-3xl font-bold mb-6">Velg Kompetansemål</h1>
        </div>

        {selectedGrade && <LearningGoals selectedGrade={selectedGrade} />}
      </div>

      <Footer />
    </div>
  );
}
export default LearningGoalsSelection;
