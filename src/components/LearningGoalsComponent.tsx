import { useNavigate } from "react-router-dom";
import { announceSuccess } from "../utils/accessibility";
import { getLearningGoalLabel } from "../utils/learningGoalMapping";

interface LearningGoalsComponentProps {
  goals: string[];
  selectedGrade?: string;
}
function capitalize(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function LearningGoalsComponent({ goals, selectedGrade }: LearningGoalsComponentProps) {
  const navigate = useNavigate();

  const handleLearningGoalsClick = (goal: string, index: number) => {
    const displayLabel = selectedGrade ? getLearningGoalLabel(selectedGrade, goal, index) : `Kompetansemål ${index + 1}`;
    // Always store in the original format for backend compatibility, regardless of display label
    const storageFormat = `Kompetansemål ${index + 1}: ${goal}`;
    localStorage.setItem("selectedLearningGoal", storageFormat);
    announceSuccess(`${displayLabel} er valgt. Navigerer til aktiviteter.`);
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
        
        {goals.map((goal, index) => {
          const displayLabel = selectedGrade ? getLearningGoalLabel(selectedGrade, goal, index) : `Kompetansemål ${index + 1}`;
          
          return (
            <button
              key={index}
              className="w-full max-w-4xl min-w-0 bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer text-left mb-4"
              onClick={() => handleLearningGoalsClick(goal, index)}
              onKeyDown={(e) => handleKeyPress(e, goal, index)}
              aria-label={`Velg ${displayLabel}: ${goal}`}
              type="button"
            >
              <h3 aria-hidden="true">
                {displayLabel}
              </h3>
              <p aria-hidden="true" >
                {capitalize(goal)}
              </p>
              
              {/* Screen reader content */}
              <p className="sr-only">
                {displayLabel} av {goals.length}: {goal}. 
                Trykk for å se tilgjengelige aktiviteter for dette målet.
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default LearningGoalsComponent;
