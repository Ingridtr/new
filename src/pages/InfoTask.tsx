import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { act, useState } from "react";
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Innholdsseksjon med relativ posisjon for knappen */}
      <div className="relative flex-1 px-4">
        {/* Lukkeknapp øverst til høyre (under Navbar) */}
        <button
          className="fixed top-36 right-6 z-50 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("/gameSelection")}
          aria-label="Lukk aktivitetsside og gå tilbake"
        >
          ×
        </button>
        {/* Innhold */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 mt-12 mb-12">
          {/* Venstre kolonne - Info og Tips */}
          <div className="flex flex-col gap-6 w-full lg:w-64 lg:sticky lg:top-40 lg:self-start">
            {/* Info boks */}
            <div className="bg-green-100 border rounded-2xl py-6 px-6 space-y-4 h-fit">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="Sted">
                  📍 {activity.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="Varighet">
                  ⏱️ {activity.time} min
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span role="img" aria-label="Utstyr">
                  🛠️
                </span>
                <div className="space-y-1">
                  {activity.tools.map((tool: string, index: number) => (
                    <div key={index}>{tool}</div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activity.groupsize && activity.groupsize != "Alle" && (
                  <>
                    <span role="img" aria-label="Gruppe">
                      👥 {activity.groupsize} per gruppe
                    </span>
                  </>
                )}
                {activity.groupsize === "Alle" && (
                  <span role="img" aria-label="Gruppe">
                    👥 {activity.groupsize}
                  </span>
                )}
              </div>

              {/* <Print
                id={activity.id}
                title={activity.title}
                location={activity.location}
                time={activity.time}
                tools={activity.tools}
                groupsize={activity.groupsize}
                learning_goals={activity.learningGoals}
                content={{
                  introduction:
                    activity.gradeContent?.introduction?.join("\n") ?? "",
                  main: activity.gradeContent?.main?.join("\n") ?? "",
                  examples: activity.gradeContent?.examples ?? [],
                  reflection: activity.gradeContent?.reflection ?? [],
                }}
                tips={activity.gradeContent?.tips?.join("\n") ?? ""}
                extra={activity.gradeContent?.extra?.join("\n") ?? ""}
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
              </button>*/}
            </div>

            {/* Tips boks */}
            {activity.gradeContent?.tips &&
              activity.gradeContent.tips.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 space-y-4 rounded-2xl py-6 px-6">
                  {/* Overskrift med ikon */}
                  <div className="flex items-center gap-3">
                    <span role="img" aria-label="Tips" className="text-3xl">
                      💡
                    </span>
                    <h3>Tips</h3>
                  </div>

                  {/* Tips-innhold under */}
                  <div>
                    {activity.gradeContent.tips.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="flex flex-col space-y-6 flex-1">
            {/* Introduction Section */}
            <h1>{activity.title}</h1>
            {activity.gradeContent?.introduction &&
              activity.gradeContent.introduction.length > 0 && (
                <div>
                  {activity.gradeContent.introduction.map((item, index) => (
                    <p key={index} className="mb-2 text-lg">
                      {item}
                    </p>
                  ))}
                </div>
              )}

            {/* Main Activity Section */}
            {activity.gradeContent?.main &&
              activity.gradeContent.main.length > 0 && (
                <div>
                  <h3>Slik gjør du</h3>
                  <ol className="list-decimal list-inside space-y-2 text-lg text-black">
                    {activity.gradeContent.main.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}

            {activity.gradeContent?.examples &&
              activity.gradeContent.examples.length > 0 && (
                <div>
                  <h3>Eksempler</h3>
                  <ul className="list-disc list-inside space-y-1 text-lg text-black">
                    {activity.gradeContent.examples.flatMap(
                      (example, exampleIndex) =>
                        example
                          .split("–") // Bruk lang tankestrek (ikke vanlig bindestrek)
                          .map((part, partIndex) => {
                            const trimmed = part.trim();
                            return trimmed ? (
                              <li key={`${exampleIndex}-${partIndex}`}>
                                {trimmed}
                              </li>
                            ) : null;
                          })
                    )}
                  </ul>
                </div>
              )}

            {/* Reflection Section */}
            {activity.gradeContent?.reflection &&
              activity.gradeContent.reflection.length > 0 && (
                <div>
                  <h3>Refleksjonsspørsmål</h3>
                  <ul className="list-disc list-inside space-y-1 text-lg text-black">
                    {activity.gradeContent.reflection.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            {activity.learningGoals && activity.learningGoals.length > 0 && (
              <div>
                <h3>Kobling til kompetansemål</h3>
                <ul className="list-disc list-inside">
                  <p className="text-lg text-black">
                    {activity.learningGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </p>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InfoTask;
