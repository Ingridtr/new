import { useNavigate } from "react-router-dom";

interface LearningGoalsComponentProps {
  goals: string[];
}

function LearningGoalsComponent({ goals }: LearningGoalsComponentProps) {
  const navigate = useNavigate();

  const handleLearningGoalsClick = (goal: string) => {
    localStorage.setItem("selectedLearningGoal", goal);
    navigate(`/gameSelection`);
  };
  return (
    <div className="flex flex-col items-center space-y-4 px-4">
      {goals.map((goal, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          style={{ width: "60vw" }}
          onClick={() => handleLearningGoalsClick(goal)}
        >
          <h3 className="text-lg font-semibold">Kompetansemål {index + 1}</h3>
          <p className="text-black">{goal}</p>
        </div>
      ))}
    </div>
  );
}
export default LearningGoalsComponent;
