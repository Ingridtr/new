import { useNavigate } from "react-router-dom";
import { announceSuccess } from "../utils/accessibility";

interface LearningGoalsComponentProps {
  goals: string[];
}

function LearningGoalsComponent({ goals }: LearningGoalsComponentProps) {
  const navigate = useNavigate();

  const handleLearningGoalsClick = (goal: string, index: number) => {
    // Store both the goal text and a parseable identifier
    localStorage.setItem("selectedLearningGoal", `Kompetansemål ${index + 1}: ${goal}`);
    announceSuccess(`Kompetansemål ${index + 1} er valgt. Navigerer til aktiviteter.`);
    navigate(`/gameSelection`);
  };

  const handleKeyPress = (e: React.KeyboardEvent, goal: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLearningGoalsClick(goal, index);
    }
  };

  if (goals.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4 px-4">
        <div 
          className="bg-yellow-50 p-6 rounded-lg border border-yellow-200"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-600">Laster kompetansemål...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 px-4">
      <div 
        role="group" 
        aria-labelledby="learning-goals-heading"
        className="w-full max-w-4xl"
      >
        <h2  className="sr-only">
          Tilgjengelige kompetansemål for valgt trinn
        </h2>
        
        {goals.map((goal, index) => (
          <button
            key={index}
            className="w-full max-w-4xl min-w-0 bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer text-left mb-4"
            onClick={() => handleLearningGoalsClick(goal, index)}
            onKeyDown={(e) => handleKeyPress(e, goal, index)}
            aria-label={`Velg kompetansemål ${index + 1}: ${goal}`}
            type="button"
          >
            <h3 aria-hidden="true">
              Kompetansemål {index + 1}
            </h3>
            <p aria-hidden="true">
              {goal}
            </p>
            
            {/* Screen reader content */}
            <p className="sr-only">
              Kompetansemål {index + 1} av {goals.length}: {goal}. 
              Trykk for å se tilgjengelige aktiviteter for dette målet.
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
export default LearningGoalsComponent;
