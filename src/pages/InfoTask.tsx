import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getGameDescription,
  getTasksForGrade,
} from "../data/gameDescriptionUtils";
import { GameDescription } from "../data/types";

function InfoTask() {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [currentGameImage, setCurrentGameImage] =
    useState<string>("/sheriff.png");
  const [activityData, setActivityData] = useState<GameDescription | null>(
    null
  );
  const [currentGrade, setCurrentGrade] = useState<string>("1-2");

  useEffect(() => {
    // Get the selected game image from localStorage
    const storedGameImage = localStorage.getItem("selectedGameImage");
    if (storedGameImage) {
      setCurrentGameImage(storedGameImage);
    }

    // Get the selected game title and grade from localStorage
    const storedGameId = localStorage.getItem("selectedGameId");
    const storedGameTitle = localStorage.getItem("selectedGame");
    const storedGrade = localStorage.getItem("selectedGrade");

    if (storedGrade) {
      // Map old grade format to new format if needed
      const gradeMap: { [key: string]: string } = {
        "Andre årstrinn": "1-2",
        "Tredje årstrinn": "3",
        "Fjerde årstrinn": "4",
        "Femte årstrinn": "5",
        "Sjette årstrinn": "6",
        "Syvende årstrinn": "7",
      };

      const mappedGrade = gradeMap[storedGrade] || storedGrade;
      setCurrentGrade(mappedGrade);
    }

    // Use the stored game ID if available, otherwise fall back to title mapping
    let gameId = storedGameId;

    if (!gameId && storedGameTitle) {
      // Fallback: Map game titles to IDs for backward compatibility
      const gameIdMap: { [title: string]: string } = {
        Mattesheriff: "mattesheriff",
        Påstandsveggene: "pastandsveggene",
        Koordinatsystemet: "koordinatsystemet",
        Tallsafari: "tallsafari",
      };
      gameId = gameIdMap[storedGameTitle];
    }

    if (gameId) {
      const gameData = getGameDescription(gameId);

      if (gameData) {
        // Get all tasks (no longer filtered by grade)
        const tasksForGrade = getTasksForGrade(gameId);

        // Create a modified game data with all tasks
        const modifiedGameData = {
          ...gameData,
          tasks: {
            easy: tasksForGrade.easy || [],
            medium: tasksForGrade.medium || [],
            hard: tasksForGrade.hard || [],
          },
        };

        setActivityData(modifiedGameData);
      }
    } else {
      // Fallback to default game (Mattesheriff)
      const defaultGame = getGameDescription("mattesheriff");
      if (defaultGame) {
        const tasksForGrade = getTasksForGrade("mattesheriff");
        const modifiedGameData = {
          ...defaultGame,
          tasks: {
            easy: tasksForGrade.easy || [],
            medium: tasksForGrade.medium || [],
            hard: tasksForGrade.hard || [],
          },
        };
        setActivityData(modifiedGameData);
      }
    }
  }, [currentGrade]);

  const handleShowOnScreen = () => {
    window.open(currentGameImage, "_blank");
  };

  // Show loading state if activityData is not yet loaded
  if (!activityData) {
    return (
      <div className="bg-yellow-50 h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Laster aktivitetsdata...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-start p-6 relative">
          {/* Lukkeknapp */}
          <button
            className="absolute top-4 right-6 text-2xl font-bold"
            onClick={() => navigate(-1)}
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full mt-8 items-start">
            <div className="bg-white border border-black rounded-2xl p-4 space-y-4 w-full lg:w-[200px] text-left">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <p>{activityData.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <p>{activityData.duration}</p>
              </div>
              {activityData.tools.length <= 1 ? (
                <div className="flex items-center gap-2">
                  <span>🛠️</span>
                  <p>{activityData.tools[0]}</p>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                    className="flex items-center gap-2"
                  >
                    <span>🛠️</span>
                    <p>Utstyrsliste</p>
                  </button>
                  {showToolsDropdown && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white border border-black rounded-md shadow-md z-10">
                      {activityData.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                tasks={activityData.tasks}
                variations={activityData.variations}
                reflectionQuestions={activityData.reflectionQuestions}
              />
              <button
                className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
                onClick={handleShowOnScreen}
              >
                <span>🖥️</span>
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
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activityData.tasks.medium.length > 0 && (
                  <>
                    <h3>Middels</h3>
                    <ul className="list-disc list-inside mb-4">
                      {activityData.tasks.medium.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </>
                )}

                {activityData.tasks.hard.length > 0 && (
                  <>
                    <h3>Vanskelig</h3>
                    <ul className="list-disc list-inside">
                      {activityData.tasks.hard.map((task, index) => (
                        <li key={index}>{task}</li>
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
