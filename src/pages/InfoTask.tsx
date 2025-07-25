import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSingleActivity } from "../components/GetActivity";
import { useEffect, useRef } from "react";

function InfoTask() {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const selectedGameId = localStorage.getItem("selectedGameId");
  const selectedGrade = localStorage.getItem("selectedGrade");
  const selectedLearningGoal = localStorage.getItem("selectedLearningGoal");
  const currentGameImage = localStorage.getItem("selectedGameImage");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use the consolidated hook instead of custom fetching
  const { activity, loading, error } = useSingleActivity(
    selectedGameId,
    selectedGrade,
    selectedLearningGoal
  );

  const handleShowOnScreen = () => {
    if (currentGameImage) {
      window.open(currentGameImage, "_blank");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowToolsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
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

  if (error || !activity || !selectedGrade) {
    return (
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>{error || "Kunne ikke laste aktivitetsdata."}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const gradeTasks = {
    tips: activity.grades[selectedGrade]?.tips || "",
    reflection: activity.grades[selectedGrade]?.reflection || "",
    easy: activity.grades[selectedGrade]?.easy ?? [],
    medium: activity.grades[selectedGrade]?.medium ?? [],
    hard: activity.grades[selectedGrade]?.hard ?? [],
  };
  console.log("task:", gradeTasks.tips);

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />

      <div className="flex-1">
        <div className="flex flex-col items-center justify-start p-6 relative">
          <button
            className="absolute top-4 right-6 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate("/gameSelection")}
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
                <div className="relative" ref={dropdownRef}>
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
                  <p>
                    {activity.learningGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </p>
                </ul>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Beskrivelse</h2>
                <p style={{ whiteSpace: "pre-line" }}>{activity.description}</p>
              </div>

              <div className="bg-white border border-black rounded-2xl p-6">
                <h2>Oppgaver</h2>
                {gradeTasks.tips.length > 0 && (
                  <p style={{ whiteSpace: "pre-line" }}>{gradeTasks.tips}</p>
                )}

                {gradeTasks.easy.length > 0 && (
                  <>
                    <h3>Enkel</h3>
                    <ul className="list-disc list-inside mb-4">
                      {gradeTasks.easy.map((task, index) => (
                        <li style={{ whiteSpace: "pre-line" }} key={index}>
                         <p>{task.question}</p> 
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {gradeTasks.medium.length > 0 && (
                  <>
                    <h3>Middels</h3>
                    <ul className="list-disc list-inside mb-4">
                      {gradeTasks.medium.map((task, index) => (
                        <li style={{ whiteSpace: "pre-line" }} key={index}>
                          <p>{task.question}</p> 
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {gradeTasks.hard.length > 0 && (
                  <>
                    <h3>Vanskelig</h3>
                    <ul className="list-disc list-inside">
                      {gradeTasks.hard.map((task, index) => (
                        <li style={{ whiteSpace: "pre-line" }} key={index}>
                          <p>{task.question}</p>
                        </li>
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

              {gradeTasks.reflection.length > 0 && (
                <div className="bg-white border border-black rounded-2xl p-6">
                  <h2>Refleksjonsspørsmål</h2>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {gradeTasks.reflection}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InfoTask;
