import { useEffect, useState } from "react";

import {
  Activity,
  ActivityTask,
  CombinedActivity,
  Question,
} from "/Users/ingrid/Desktop/mappe uten navn/new/public/activityData/types.ts";

export function Activities(
  selectedGrade: string | null,
  selectedGoal: string | null
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
            const detailRes = await fetch(
              `/activityData/tasks/${activity.id}.json`
            );
            if (!detailRes.ok) return null;

            const details: ActivityTask = await detailRes.json();
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
              ...details,
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

  return { activities };
}

export default Activities;
