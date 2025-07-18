import { useEffect, useState } from "react";

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  image: string;
  tools: string;
  location: string;
  grade: string;
  number_of_tasks: number;
};
export type ActivityDetails = {
  activityId: string;
  activityTitle: string;
  totalTasks: number;
  tasksPerGrade: number;
  supportedGrades: string[];
  generatedAt: string;
  grades: {
    [grade: string]: {
      easy?: Question[];
      medium?: Question[];
      hard?: Question[];
    };
  };
};

export type Question = {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  grade: string;
  learningGoal: string;
  question: string;
  answer: string;
  type: string;
};
type CombinedActivity = Activity & {
  learningGoal: string[];
};

export function Activities(
  selectedGrade: string | null,
  selectedGoal: string | null,
) {
  const [activities, setActivities] = useState<CombinedActivity[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actRes = await fetch("/activityData/activities.json");
        const baseActivities: Activity[] = await actRes.json();

        const matchedActivities: CombinedActivity[] = [];

        // Fetch all activity details in parallel to avoid waterfall requests
        const fetchPromises = baseActivities.map(async (activity) => {
          try {
            const detailRes = await fetch(`/activityData/tasks/${activity.id}.json`);
            if (!detailRes.ok) return null;
            
            const details: ActivityDetails = await detailRes.json();
            return { activity, details };
          } catch (error) {
            console.error(`Failed to fetch details for ${activity.id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(fetchPromises);

        // Process results after all fetches complete
        for (const result of results) {
          if (!result) continue;
          
          const { activity, details } = result;
          const gradeData = details.grades[selectedGrade ?? ""] ?? {};
          const allQuestions: Question[] = [
            ...(gradeData.easy ?? []),
            ...(gradeData.medium ?? []),
            ...(gradeData.hard ?? []),
          ];

          const filteredQuestions = allQuestions.filter((q) =>
            q.learningGoal.includes(selectedGoal ?? "")
          );

          if (filteredQuestions.length > 0) {
            const learningGoals = Array.from(
              new Set(allQuestions.map((q) => q.learningGoal))
            );

            matchedActivities.push({
              ...activity,
              learningGoal: learningGoals,
            });
          }
        }

        setActivities(matchedActivities);
      } catch (err) {
        console.error("Feil ved henting av aktiviteter:", err);
      }
      
    };

    fetchData();
  }, [selectedGrade, selectedGoal]);

  return { activities  };
}

export default Activities;
