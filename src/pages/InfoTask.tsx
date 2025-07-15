import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ActionButton from "../components/ActionButton";
import { useNavigate } from "react-router-dom";

function InfoTask() {
  const navigate = useNavigate();

  // Data for the activity
  const activityData = {
    title: "Mattesheriff",
    location: "Inne / ute",
    duration: "5 minutter",
    tools: "Ingen",
    competencyGoals: [
      "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur, representere tallene på ulike måter og oversette mellom de ulike representasjonene"
    ],
    description: "Elevene stiller seg i en sirkel med en sheriff i midten. Sher... (osv. )",
    tasks: {
      easy: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ],
      medium: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ],
      hard: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ]
    },
    variations: "Varier hvem som står i midten",
    reflectionQuestions: "Hvordan kom du frem til svaret?"
  };

  return (
    <div className="bg-yellow-50 h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center justify-start p-6 relative">
        {/* Lukkeknapp */}
        <button
          className="absolute top-4 right-6 text-2xl font-bold"

          onClick={() => navigate(-1)} // Go back to previous page

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
            <div className="flex items-center gap-2">
              <span>🛠️</span>
              <span>Ingen</span>
            </div>
            <ActionButton
              type="print"
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
            <ActionButton
              type="showOnScreen"
              title={activityData.title}
              location={activityData.location}
              duration={activityData.duration}
              tools={activityData.tools}
              competencyGoals={activityData.competencyGoals}
              description={activityData.description}
              tasks={activityData.tasks}
              variations={activityData.variations}
              reflectionQuestions={activityData.reflectionQuestions}
              illustrationImage="/Sheriff.png"
            />
          </div>

          {/* HOVEDINNHOLD */}
          <div className="flex flex-col space-y-6 w-full">
            <div className="bg-white border border-black rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-center mb-2">
                Mattesheriff
              </h1>
              <h2 className="font-bold">Kobling til kompetansemål</h2>
              <ul className="list-disc list-inside">
                <li>
                  Utforske tall, mengder og telling i lek, natur, billedkunst,
                  musikk og barnelitteratur, representere tallene på ulike måter
                  og oversette mellom de ulike representasjonene
                </li>
              </ul>
            </div>

            <div className="bg-white border border-black rounded-2xl p-6">
              <h2 className="font-bold mb-2">Beskrivelse</h2>
              <p>
                Elevene stiller seg i en sirkel med en sheriff i midten. Sher...
                (osv. )
              </p>
            </div>
            <div className="bg-white border border-black rounded-2xl p-6">
              <h2 className="font-bold mb-2">Oppgaver</h2>
              <h3 className="font-bold">Enkel</h3>
              <ul className="list-disc list-inside">
                <li>Hva er 5 + 2? → 7</li>
                <li>Hva kommer etter 19? → 20 </li>
                <li>Hva er det dobbelte av 4? → 8</li>
              </ul>

              <h3 className="font-bold">Middels</h3>
              <ul className="list-disc list-inside">
                <li>Hva er 5 + 2? → 7</li>
                <li>Hva kommer etter 19? → 20 </li>
                <li>Hva er det dobbelte av 4? → 8</li>
              </ul>
              <h3 className="font-bold">Vanskelig</h3>
              <ul className="list-disc list-inside">
                <li>Hva er 5 + 2? → 7</li>
                <li>Hva kommer etter 19? → 20 </li>
                <li>Hva er det dobbelte av 4? → 8</li>
              </ul>
            </div>
            <div className="bg-white border border-black rounded-2xl p-6">
              <h2 className="font-bold mb-2">Variasjoner</h2>
              <p>Varier hvem som står i midten</p>
            </div>
            <div className="bg-white border border-black rounded-2xl p-6">
              <h2 className="font-bold mb-2">
                Refleksjonsspørsmål [Etter aktiviteten]
              </h2>
              <p>Hvordan kom du frem til svaret?</p>
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
