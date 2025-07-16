import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GameData, gameDataDatabase, gamesDatabase } from "../data";

function InfoTask() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [activityData, setActivityData] = useState<GameData | null>(null);
  const [gameImage, setGameImage] = useState<string>("");

  useEffect(() => {
    if (gameId && gameDataDatabase[gameId as keyof typeof gameDataDatabase]) {
      setActivityData(gameDataDatabase[gameId as keyof typeof gameDataDatabase]);
      
      // Find the corresponding game image from gamesDatabase
      for (const grade in gamesDatabase) {
        for (const competency in gamesDatabase[grade]) {
          const games = gamesDatabase[grade][competency as any];
          const game = games.find((g: any) => g.id === gameId);
          if (game) {
            setGameImage(game.image);
            break;
          }
        }
      }
    } else {
      // Fallback to default game if gameId not found
      setActivityData(gameDataDatabase["mattesheriff-1-2-1"]);
      setGameImage("/sheriff.png");
    }
  }, [gameId]);

  const handleShowOnScreen = () => {
    if (gameImage) {
      window.open(gameImage, '_blank');
    }
  };

  if (!activityData) {
    return <div>Loading...</div>;
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
                <span>{activityData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{activityData.duration}</span>
              </div>
              {activityData.tools.length <= 1 ? (
                <div className="flex items-center gap-2">
                  <span>🛠️</span>
                  <span>{activityData.tools[0]}</span>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                    className="flex items-center gap-2"
                  >
                    <span>🛠️</span>
                    <span>Utstyrsliste</span>
                  </button>
                  {showToolsDropdown && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white border border-black rounded-md shadow-md z-10">
                      {activityData.tools.map((tool: string, index: number) => (
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
                <span>Vis på skjerm</span>
              </button>
            </div>

            {/* HOVEDINNHOLD */}
            <div className="flex flex-col space-y-6 w-full">
              <div className="bg-white border border-black rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-2">
                  {activityData.title}
                </h1>
                <h2 className="font-bold">Kobling til kompetansemål</h2>
                <ul className="list-disc list-inside">
                  <li>{activityData.competencyGoals}</li>
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2 className="font-bold mb-2">Beskrivelse</h2>
                <p>{activityData.description}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2 className="font-bold mb-2">Oppgaver</h2>
                <h3 className="font-bold">Enkel</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.easy.map((task: string, index: number) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>

                <h3 className="font-bold">Middels</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.medium.map((task: string, index: number) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>

                <h3 className="font-bold">Vanskelig</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.hard.map((task: string, index: number) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2 className="font-bold mb-2">Variasjoner</h2>
                <p>{activityData.variations}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2 className="font-bold mb-2">
                  Refleksjonsspørsmål [Etter aktiviteten]
                </h2>
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
