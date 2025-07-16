import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function InfoTask() {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [currentGameImage, setCurrentGameImage] =
    useState<string>("/sheriff.png");

  useEffect(() => {
    // Get the selected game image from localStorage
    const storedGameImage = localStorage.getItem("selectedGameImage");
    if (storedGameImage) {
      setCurrentGameImage(storedGameImage);
    }
  }, []);

  const handleShowOnScreen = () => {
    window.open(currentGameImage, "_blank");
  };

  const activityData = {
    title: "Mattesheriff",
    location: "Inne / ute",
    duration: "5 minutter",
    tools: ["Ingen"],
    competencyGoals: [
      "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur, representere tallene på ulike måter og oversette mellom de ulike representasjonene",
    ],
    description:
      "Elevene stiller seg i en sirkel med en sheriff i midten. Sheriffen peker på en elev som må bøye seg ned. Cowboyene på hver side av denne eleven skal duellere i et mattestykke.",
    tasks: {
      easy: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8",
      ],
      medium: [
        "Hva er 12 – 4? → 8",
        "Hva kommer før 30? → 29",
        "Hva er halvparten av 10? → 5",
      ],
      hard: [
        "Hva er 8 + 7? → 15",
        "Hva er det tredobbelte av 3? → 9",
        "Hva er 100 – 37? → 63",
      ],
    },
    variations: "Varier hvem som står i midten",
    reflectionQuestions: "Hvordan kom du frem til svaret?",
  };

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
                <p>Inne / ute</p>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <p>5 minutter</p>
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
                  <li>
                    <p>{activityData.competencyGoals}</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Beskrivelse</h2>
                <p>{activityData.description}</p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Oppgaver</h2>
                <h3 className="font-bold">Enkel</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.easy.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>

                <h3>Middels</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.medium.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>

                <h3>Vanskelig</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.hard.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
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
