import { useEffect, useState } from "react";
import { ActivityDescription, Task, TaskFile } from "../../public/activityData/types";

export type Question = {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  grade: string;
  learningGoal: string;
  question: string;
  answer: string;
  type: string;
};

export async function loadTaskFile(activityId: string): Promise<TaskFile | null> {
  try {
    const response = await fetch(`/activityData/tasks/${activityId}.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${activityId}.json: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to load tasks for ${activityId}:`, error);
    return null;
  }
}

export async function getAllTasksForActivity(activityId: string): Promise<Task[]> {
  const taskFile = await loadTaskFile(activityId);
  if (!taskFile) return [];

  const allTasks: Task[] = [];

  Object.values(taskFile.grades).forEach((gradeTasks) => {
    if (gradeTasks.easy) allTasks.push(...gradeTasks.easy);
    if (gradeTasks.medium) allTasks.push(...gradeTasks.medium);
    if (gradeTasks.hard) allTasks.push(...gradeTasks.hard);
    if (gradeTasks.tasks) allTasks.push(...gradeTasks.tasks);
  });

  return allTasks;
}

// ✅ Custom Hook
export function Activities(selectedGrade: string | null, selectedGoal: string | null) {
  const [activities, setActivities] = useState<ActivityDescription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actRes = await fetch("/activityData/activities.json");
        const baseActivities: ActivityDescription[] = await actRes.json();

        const fetchPromises = baseActivities.map(async (activity) => {
          try {
            const detailRes = await fetch(`/activityData/tasks/${activity.id}.json`);
            if (!detailRes.ok) return null;

            const details: TaskFile = await detailRes.json();
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
            id: activity.id,
            title: activity.title,
            description: activity.description,
            duration: activity.duration,
            image: activity.image,
            tools: activity.tools,
            location: activity.location,
            learningGoals: activity.learningGoals,
            tasks: {
              easy: details.grades?.[selectedGrade ?? ""]?.easy || [],
              medium: details.grades?.[selectedGrade ?? ""]?.medium || [],
              hard: details.grades?.[selectedGrade ?? ""]?.hard || [],
            },
            variations: activity.variations,
            reflectionQuestions: activity.reflectionQuestions,
          });
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
