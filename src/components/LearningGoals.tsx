import { useEffect, useState } from "react";
import LearningGoalsComponent from "./LearningGoalsComponent";

function LearningGoals({ selectedGrade }: { selectedGrade: string }) {
  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localRes = await fetch("/MAT01-05.json");
        const localJson = await localRes.json();
        const learningGoalsChapters =
          localJson["kompetansemaal-kapittel"]?.kompetansemaalsett;

        for (const i of learningGoalsChapters) {
          const url = i["url-data"];
          const res = await fetch(url);
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

            setGoals(goalList);
            break;
          }
        }
      } catch (err) {
        console.error("Feil ved henting av mål:", err);
      }
    };

    fetchData();
  }, [selectedGrade]);

  return (
    <div className="p-4">
      <h2 className="font-semibold text-2xl text-center mb-4">{selectedGrade}</h2>
      <LearningGoalsComponent goals={goals} />
    </div>
  );
}

export default LearningGoals;
