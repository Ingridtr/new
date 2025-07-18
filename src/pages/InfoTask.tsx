import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Task } from "../../public/activityData/tasks/types";
import activitiesMetadata from "../../public/activityData/activities.json";
import { Activity } from "../components/GetActivity"; // Importer type hvis du har den

function InfoTask() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const selectedGameId = localStorage.getItem("selectedGameId");
  const selectedGrade = localStorage.getItem("selectedGrade");
  const selectedLearningGoal = localStorage.getItem("selectedLearningGoal");

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!selectedGameId || !selectedGrade || !selectedLearningGoal) return;

      try {
        // Hent aktivitetsmetadata
        const meta = activitiesMetadata.find((a) => a.id === selectedGameId);
        if (!meta) {
          console.error("Fant ikke aktivitet med id:", selectedGameId);
          return;
        }

        const detailRes = await fetch(
          `/activityData/tasks/${selectedGameId}.json`
        );
        if (!detailRes.ok) {
          console.error("Fant ikke oppgavedata for:", selectedGameId);
          return;
        }

        const details = await detailRes.json();
        const gradeData = details.grades[selectedGrade] ?? {};
        const allTasks: Task[] = [
          ...(gradeData.easy ?? []),
          ...(gradeData.medium ?? []),
          ...(gradeData.hard ?? []),
        ];

        // Filtrer relevante oppgaver
        const filteredTasks = allTasks.filter((t) =>
          t.learningGoal.includes(selectedLearningGoal)
        );

        const competencyGoals = Array.from(
          new Set(filteredTasks.map((t) => t.learningGoal))
        );

        setActivity({
          ...meta,
          tasksByDifficulty: {
            easy: filteredTasks.filter((t) => t.difficulty === "easy"),
            medium: filteredTasks.filter((t) => t.difficulty === "medium"),
            hard: filteredTasks.filter((t) => t.difficulty === "hard"),
          },
          competencyGoals,
        });
      } catch (error) {
        console.error("Feil under lasting av aktivitet:", error);
      }
    };

    fetchActivityData();
  }, [selectedGameId, selectedGrade, selectedLearningGoal]);

  const handleShowOnScreen = () => {
    const img = localStorage.getItem("selectedGameImage");
    if (img) window.open(img, "_blank");
  };

  if (!activity) {
    return (
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Laster aktivitet...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />

      <div className="flex-1">
        <div className="flex flex-col items-center justify-start p-6 relative">
          <button
            className="absolute top-4 right-6 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate(-1)}
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full mt-8 items-start">
            {/* INFOKORT */}
            <div className="bg-white border border-black rounded-2xl p-4 space-y-4 w-full lg:w-48 text-left">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="Sted">
                  📍
                </span>
                <p>{activity.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="Varighet">
                  ⏱️
                </span>
                <p>{activity.time}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                  className="flex items-center gap-2"
                >
                  <span role="img" aria-label="Utstyr">
                    🛠️
                  </span>
                  <p>Utstyrsliste</p>
                </button>
                {showToolsDropdown && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white border border-black rounded-md shadow-md z-10">
                    {activity.tools
                      .split(",")
                      .map((tool: string, index: number) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100">
                          {tool.trim()}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <Print
                title={activity.title}
                location={activity.location}
                duration={activity.time}
                tools={activity.tools.split(",")}
                competencyGoals={activity.learningGoal}
                description={activity.description}
                tasks={activity.tasksByDifficulty}
                variations={activity.variations}
                reflectionQuestions={activity.reflectionQuestions}
              />

              <button
                className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
                onClick={handleShowOnScreen}
              >
                <span role="img" aria-label="Skjerm">
                  🖥️
                </span>
                <p>Vis på skjerm</p>
              </button>
            </div>

            {/* INNHOLD */}
            <div className="flex flex-col space-y-6 w-full">
              <div className="bg-white border border-black rounded-2xl p-6">
                <h1>{activity.title}</h1>
                <h2>Kobling til kompetansemål</h2>
                <ul className="list-disc list-inside">
                  {activity.competencyGoals.map(
                    (goal: string, index: number) => (
                      <li key={index}>{goal}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Beskrivelse</h2>
                <p>{activity.description}</p>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Oppgaver</h2>
                {["easy", "medium", "hard"].map((level) =>
                  activity.tasksByDifficulty[level].length > 0 ? (
                    <div key={level}>
                      <h3>
                        {level === "easy"
                          ? "Enkel"
                          : level === "medium"
                          ? "Middels"
                          : "Vanskelig"}
                      </h3>
                      <ul className="list-disc list-inside mb-4">
                        {activity.tasksByDifficulty[level].map(
                          (task: Task, idx: number) => (
                            <li key={idx}>{task.question}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Variasjoner</h2>
                <p>{activity.variations}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Refleksjonsspørsmål [Etter aktiviteten]</h2>
                <p>{activity.reflectionQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InfoTask;
