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

export function Activities(
  selectedGrade: string | null,
  selectedGoal: string | null
) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/activityData/activities.json");
        const data: Activity[] = await res.json();
        console.log("Hentet aktiviteter:", data);

        setActivities(data);
      } catch (err) {
        console.error("Feil ved henting av aktiviteter:", err);
      }
    };

    fetchData();
  }, [selectedGrade, selectedGoal]);
  useEffect(() => {
    console.log(" hentet:", activities);
  }, [activities]);

  return { activities };
}

export default Activities;
