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
        const baseActivities: ActivityDescription[] = await actRes.json();

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

        const matchedActivities: ActivityDescription[] = [];

        for (const result of results) {
          if (!result) continue;

          const { activity, details } = result;

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
