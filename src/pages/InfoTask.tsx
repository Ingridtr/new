import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CombinedActivity, Question } from "../../public/activityData/types";
import activitiesMetadata from "../../public/activityData/activities.json";

function InfoTask() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<CombinedActivity | null>(null);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const selectedGameId = localStorage.getItem("selectedGameId");
  const selectedGrade = localStorage.getItem("selectedGrade");
  const selectedLearningGoal = localStorage.getItem("selectedLearningGoal");
  const currentGameImage = localStorage.getItem("selectedGameImage");

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!selectedGameId || !selectedGrade || !selectedLearningGoal) return;

      try {
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
        const allTasks: Question[] = [
          ...(gradeData.easy ?? []),
          ...(gradeData.medium ?? []),
          ...(gradeData.hard ?? []),
        ];

        const filteredTasks = allTasks.filter((t) =>
          t.learningGoal.includes(selectedLearningGoal)
        );

        const learningGoals = Array.from(
          new Set(filteredTasks.map((t) => t.learningGoal))
        );

        setActivity({
          ...meta,
          ...details,
          grades: {
            [selectedGrade]: {
              easy: filteredTasks.filter((t) => t.difficulty === "easy"),
              medium: filteredTasks.filter((t) => t.difficulty === "medium"),
              hard: filteredTasks.filter((t) => t.difficulty === "hard"),
            },
          },
          learningGoals,
        });
      } catch (error) {
        console.error("Feil under lasting av aktivitet:", error);
      }
    };

    fetchActivityData();
  }, [selectedGameId, selectedGrade, selectedLearningGoal]);

  const handleShowOnScreen = () => {
    if (currentGameImage) {
      window.open(currentGameImage, "_blank");
    }
  };

  if (!activity || !selectedGrade) {
    return (
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Laster aktivitetsdata...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const gradeTasks = {
    easy: activity.grades[selectedGrade]?.easy ?? [],
    medium: activity.grades[selectedGrade]?.medium ?? [],
    hard: activity.grades[selectedGrade]?.hard ?? [],
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />

      <div className="flex-1">
        <div className="flex flex-col items-center justify-start p-6 relative">
          <button
            className="absolute top-4 right-6 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate(-1)}
            aria-label="Lukk aktivitetsside og gå tilbake"
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full mt-8 items-start">
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
              {activity.tools.length <= 1 ? (
                <div className="flex items-center gap-2">
                  <span role="img" aria-label="Utstyr">
                    🛠️
                  </span>
                  <p>{activity.tools[0] ?? "Ingen"}</p>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                    className="flex items-center gap-2"
                    aria-expanded={showToolsDropdown}
                    aria-haspopup="true"
                    aria-label="Vis utstyrsliste"
                  >
                    <span role="img" aria-label="Utstyr">
                      🛠️
                    </span>
                    <p>Utstyrsliste</p>
                  </button>
                  {showToolsDropdown && (
                    <ul
                      className="absolute left-0 mt-2 w-48 bg-white border border-black rounded-md shadow-md z-10"
                      role="menu"
                    >
                      {activity.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          role="menuitem"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <Print
                title={activity.title}
                location={activity.location}
                duration={activity.time}
                tools={activity.tools}
                learningGoals={activity.learningGoals}
                description={activity.description}
                tasks={{
                  easy: gradeTasks.easy.map((task) => task.question),
                  medium: gradeTasks.medium.map((task) => task.question),
                  hard: gradeTasks.hard.map((task) => task.question),
                }}
                variations={activity.variations}
                reflectionQuestions={activity.reflectionQuestions}
              />
              <button
                className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
                onClick={handleShowOnScreen}
                aria-label="Vis aktivitet på skjerm"
              >
                <span role="img" aria-label="Skjerm">
                  🖥️
                </span>
                <p>Vis på skjerm</p>
              </button>
            </div>

            <div className="flex flex-col space-y-6 w-full">
              <div className="bg-white border border-black rounded-2xl p-6">
                <h1>{activity.title}</h1>
                <h2>Kobling til kompetansemål</h2>
                <ul className="list-disc list-inside">
                  {activity.learningGoals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Beskrivelse</h2>
                <p>{activity.description}</p>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Oppgaver</h2>
                {gradeTasks.easy.length > 0 && (
                  <>
                    <h3>Enkel</h3>
                    <ul className="list-disc list-inside mb-4">
                      {gradeTasks.easy.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}
                {gradeTasks.medium.length > 0 && (
                  <>
                    <h3>Middels</h3>
                    <ul className="list-disc list-inside mb-4">
                      {gradeTasks.medium.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}
                {gradeTasks.hard.length > 0 && (
                  <>
                    <h3>Vanskelig</h3>
                    <ul className="list-disc list-inside">
                      {gradeTasks.hard.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}
                {gradeTasks.easy.length === 0 &&
                  gradeTasks.medium.length === 0 &&
                  gradeTasks.hard.length === 0 && (
                    <p>Ingen oppgaver tilgjengelig for dette trinnet.</p>
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
