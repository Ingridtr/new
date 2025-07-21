import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {getAllTasksForActivity,} from "../../public/activityData/tasks/index";
import { GameDescription } from "../../public/activityData/types";

import gamesMetadata from "../../public/activityData/activities.json"; // adjust path if needed



function InfoTask() {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const currentGameImage = localStorage.getItem("selectedGameImage") || "";
  const [activityData, setActivityData] = useState<GameDescription | null>(
    null
  );

  useEffect(() => {
  const fetchData = async () => {
    const storedGameId = localStorage.getItem("selectedGameId");
    const storedLearningGoal = localStorage.getItem("selectedLearningGoal");


    const taskId = storedGameId;


    if (!taskId) {
      console.error("No task ID found.");
      return;
    }

    const baseMetadata = gamesMetadata.find((g) => g.id === taskId);
    if (!baseMetadata) {
      console.error("No metadata found for game:", taskId);
      return;
    }

    const allTasks = await getAllTasksForActivity(taskId);

    const modifiedGameData: GameDescription = {
      id: baseMetadata.id,
      title: baseMetadata.title,
      location: baseMetadata.location || "",
      duration: baseMetadata.time || "",
      tools: baseMetadata.tools.split(",").map((t) => t.trim()),
      competencyGoals: storedLearningGoal ? [storedLearningGoal] : [],
      description: baseMetadata.description,
      tasks: {
        easy: allTasks.filter((t) => t.difficulty === "easy"),
        medium: allTasks.filter((t) => t.difficulty === "medium"),
        hard: allTasks.filter((t) => t.difficulty === "hard"),
      },
      gradeMapping: {}, // optional
      variations: "",
      reflectionQuestions: "",
    };setActivityData(modifiedGameData);

  };

  fetchData();
  }, []);

  const handleShowOnScreen = () => {
    window.open(currentGameImage, "_blank");
  };

  // Show loading state if activityData is not yet loaded
  if (!activityData) {
    return (
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Laster aktivitetsdata...</div>
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
          {/* Lukkeknapp */}
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
                <span role="img" aria-label="Sted">📍</span>
                <p>{activityData.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="Varighet">⏱️</span>
                <p>{activityData.duration}</p>
              </div>
              {activityData.tools.length <= 1 ? (
                <div className="flex items-center gap-2">
                  <span role="img" aria-label="Utstyr">🛠️</span>
                  <p>{activityData.tools[0]}</p>
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
                    <span role="img" aria-label="Utstyr">🛠️</span>
                    <p>Utstyrsliste</p>
                  </button>
                  {showToolsDropdown && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white border border-black rounded-md shadow-md z-10" role="menu">
                      {activityData.tools.map((tool, index) => (
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
                title={activityData.title}
                location={activityData.location}
                duration={activityData.duration}
                tools={activityData.tools}
                competencyGoals={activityData.competencyGoals}
                description={activityData.description}
                tasks={{
                  easy: activityData.tasks.easy.map(task => task.question),
                  medium: activityData.tasks.medium.map(task => task.question),
                  hard: activityData.tasks.hard.map(task => task.question),
                }}
                variations={activityData.variations}
                reflectionQuestions={activityData.reflectionQuestions}
              />
              <button
                className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
                onClick={handleShowOnScreen}
                aria-label="Vis aktivitet på skjerm"
              >
                <span role="img" aria-label="Skjerm">🖥️</span>
                <p>Vis på skjerm</p>
              </button>
            </div>

            {/* HOVEDINNHOLD */}
            <div className="flex flex-col space-y-6 w-full">
              <div className="bg-white border border-black rounded-2xl p-6">
                <h1>{activityData.title}</h1>
                <h2>Kobling til kompetansemål</h2>
                <ul className="list-disc list-inside">
                  {activityData.competencyGoals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Beskrivelse</h2>
                <p>{activityData.description}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Oppgaver</h2>

                {activityData.tasks.easy.length > 0 && (
                  <>
                    <h3>Enkel</h3>
                    <ul className="list-disc list-inside mb-4">
                      {activityData.tasks.easy.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activityData.tasks.medium.length > 0 && (
                  <>
                    <h3>Middels</h3>
                    <ul className="list-disc list-inside mb-4">
                      {activityData.tasks.medium.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activityData.tasks.hard.length > 0 && (
                  <>
                    <h3>Vanskelig</h3>
                    <ul className="list-disc list-inside">
                      {activityData.tasks.hard.map((task, index) => (
                        <li key={index}>{task.question}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activityData.tasks.easy.length === 0 &&
                  activityData.tasks.medium.length === 0 &&
                  activityData.tasks.hard.length === 0 && (
                    <p>Ingen oppgaver tilgjengelig for dette trinnet.</p>
                  )}
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Variasjoner</h2>
                <p>{activityData.variations}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Refleksjonsspørsmål [Etter aktiviteten]</h2>
                <p>{activityData.reflectionQuestions}</p>
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
