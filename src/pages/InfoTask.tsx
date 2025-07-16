import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Print from "../components/Print";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // legg til denne linja øverst

function InfoTask() {
  const navigate = useNavigate();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

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
      easy: (
      <>
        <li>Hva er 5 + 2? → 7</li>
        <li>Hva kommer etter 19? → 20</li>
        <li>Hva er det dobbelte av 4? → 8</li>
      </>),
      medium: (
      <>
        <li>Hva er 5 + 2? → 7</li>
        <li>Hva kommer etter 19? → 20</li>
        <li>Hva er det dobbelte av 4? → 8</li>
      </>),
      hard: (
      <>
        <li>Hva er 5 + 2? → 7</li>
        <li>Hva kommer etter 19? → 20</li>
        <li>Hva er det dobbelte av 4? → 8</li>
      </>),
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
            onClick={() => navigate("/gameSelection")}
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full mt-8 items-start">
            <div className="bg-white border border-black rounded-2xl p-4 space-y-4 w-full lg:w-[200px] text-left">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Inne / ute</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>5 minutter</span>
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
              <div className="flex items-center gap-2">
                <span>🖥️</span>
                <span>Vis på skjerm</span>
              </div>
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
                  {activityData.tasks.easy}
                </ul>
                <h3 className="font-bold">Middels</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.medium}
                </ul>
                <h3 className="font-bold">Vanskelig</h3>
                <ul className="list-disc list-inside">
                  {activityData.tasks.hard}
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
