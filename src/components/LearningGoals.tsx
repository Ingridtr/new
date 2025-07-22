import { useEffect, useState } from "react";
import LearningGoalsComponent from "./LearningGoalsComponent";
import { announceError } from "../utils/accessibility";

interface LearningGoalsState {
  goals: string[];
  loading: boolean;
  error: string | null;
}

function LearningGoals({ selectedGrade }: { selectedGrade: string }) {
  const [state, setState] = useState<LearningGoalsState>({
    goals: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const localRes = await fetch("/MAT01-05.json");
        if (!localRes.ok) {
          throw new Error(
            `Kunne ikke laste kompetansemål-data: ${localRes.status}`
          );
        }

        const localJson = await localRes.json();
        const learningGoalsChapters =
          localJson["kompetansemaal-kapittel"]?.kompetansemaalsett;

        if (!learningGoalsChapters) {
          throw new Error("Fant ikke kompetansemål-kapitler i dataene");
        }

        for (const i of learningGoalsChapters) {
          const url = i["url-data"];
          if (!url) continue;

          const res = await fetch(url);
          if (!res.ok) {
            console.warn(`Kunne ikke laste data fra ${url}: ${res.status}`);
            continue;
          }

          const json = await res.json();
          const grade = json["etter-aarstrinn"] ?? [];
          const gradeTitle = grade[0]?.tittel ?? "Ukjent trinn";

          if (gradeTitle === selectedGrade) {
            const learningGoals = json["kompetansemaal"] ?? [];
            const goalList: string[] = [];

            for (const goal of learningGoals) {
              if (typeof goal.tittel === "string") {
                goalList.push(goal.tittel);
              }
            }

            setState({
              goals: goalList,
              loading: false,
              error: null,
            });
            return;
          }
        }

        setState({
          goals: [],
          loading: false,
          error: `Fant ingen kompetansemål for ${selectedGrade}`,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ukjent feil ved henting av kompetansemål";
        console.error("Feil ved henting av mål:", err);

        setState({
          goals: [],
          loading: false,
          error: errorMessage,
        });

        announceError(errorMessage);
      }
    };

    fetchData();
  }, [selectedGrade]);

  if (state.loading) {
    return (
      <div className="p-4">
        <h2>{selectedGrade}</h2>
        <div
          className="flex justify-center items-center p-8"
          role="status"
          aria-live="polite"
          aria-label="Laster kompetansemål"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p>Laster kompetansemål...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="p-4">
        <h2 className="text-center mb-4">
          {selectedGrade}
        </h2>
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-6"
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-description"
        >
          <h3 id="error-title" className="text-red-800 font-bold mb-2">
            Feil ved lasting av kompetansemål
          </h3>
          <p id="error-description" className="text-red-700 mb-4">
            {state.error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Last siden på nytt"
          >
            <p>Prøv igjen</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">{selectedGrade}</h2>
      <LearningGoalsComponent goals={state.goals} />
    </div>
  );
}

export default LearningGoals;
