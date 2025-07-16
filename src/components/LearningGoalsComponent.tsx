interface LearningGoalsComponentProps {
  goals: string[];
}

function LearningGoalsComponent({ goals }: LearningGoalsComponentProps) {
  return (
    <div className="space-y-4 px-4">
      {goals.map((goal, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <h3 className="text-lg font-semibold">Kompetansemål {index + 1}</h3>
          <p className="text-gray-600">{goal}</p>
        </div>
      ))}
    </div>
  );
}

export default LearningGoalsComponent;