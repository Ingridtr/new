import LearningGoals from "../components/LearningGoals";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function LearningGoalsSelection() {
  const navigate = useNavigate();
  const { grade } = useParams<{ grade: string }>();

  return (
    <div className="bg-white-50 h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Filter button */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/grade")}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Trinn: {grade}
              <span className="ml-2 text-gray-400">×</span>
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Velg kompetansemål</h1>


        {grade && <LearningGoals selectedGrade={grade} />}
      </div>

      <Footer />
    </div>
  );
}
export default LearningGoalsSelection;
