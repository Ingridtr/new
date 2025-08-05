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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Innholdsseksjon med relativ posisjon for knappen */}
      <div className="relative flex-1 px-4">
        {/* Lukkeknapp øverst til høyre (under Navbar) */}
        <button
          className="absolute top-6 right-6 z-50 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("/gameSelection")}
          aria-label="Lukk aktivitetsside og gå tilbake"
        >
          ×
        </button>

        {/* Innhold */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 mt-12">
          {/* Venstre boks */}
          <div className="bg-sky-100 border lg:sticky lg:top-40 rounded-2xl p-6 space-y-4 w-full lg:w-1/5 h-fit">
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
              <p>{activity.time} min</p>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="Utstyr">
                🛠️
              </span>
              <p>{activity.tools}</p>
            </div>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="Gruppe">
                👥
              </span>
              <p>{activity.groupsize}</p>
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

          <div className="flex flex-col space-y-6 w-full lg:w-3/5">
            {/* <div className="bg-white  p-6">
                <h1>{activity.title}</h1>
                <h2>Kobling til kompetansemål</h2>
                <ul className="list-disc list-inside">
                  <p>
                    {activity.learningGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </p>
                </ul>
              </div> */}

            {/* Introduction Section */}
            <h1>{activity.title}</h1>
            {activity.gradeContent?.introduction &&
              activity.gradeContent.introduction.length > 0 && (
                <div>
                  {activity.gradeContent.introduction.map((item, index) => (
                    <p key={index} className="mb-2">
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
                  <ol className="list-decimal list-inside space-y-2 text-base sm:text-lg lg:text-xl text-black">
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
                  <ul className="list-disc list-inside space-y-1 text-base sm:text-lg lg:text-xl text-black">
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
                  <ul className="list-disc list-inside space-y-1 text-base sm:text-lg lg:text-xl text-black">
                    {activity.gradeContent.reflection.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="lg:sticky lg:top-40 rounded-2xl p-6 space-y-4 w-full lg:w-1/5 h-fit">
            {activity.gradeContent?.tips &&
              activity.gradeContent.tips.length > 0 && (
                <>
                  {/* Overskrift med ikon */}
                  <div className="flex items-center gap-3">
                    <span role="img" aria-label="Tips" className="text-3xl">
                      💡
                    </span>
                    <h3 className="text-2xl font-bold">Tips</h3>
                  </div>

                  {/* Tips-innhold under */}
                  <div>
                    {activity.gradeContent.tips.map((item, index) => (
                      <p key={index} className="mb-2 text-gray-800">
                        {item}
                      </p>
                    ))}
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default InfoTask;
