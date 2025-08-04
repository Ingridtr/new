import { useEffect, useState } from "react";

import {
  Activity,
  ActivityTask,
  CombinedActivity,
  Question,
} from "../../public/activityData/types";

import activitiesMetadataUrl from "../../public/activityData/activities.json?url";

// Interface for raw activity data from JSON (before processing)
interface RawActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  image: string;
  tools: string; // This is a string that gets split into array
  location: string;
  grade: string;
  number_of_tasks: number;
}

const metadataCache = new Map<string, RawActivity[]>();
const taskCache = new Map<string, ActivityTask>();
async function fetchActivitiesMetadata(): Promise<RawActivity[]> {
  if (metadataCache.has("activities")) {
    return metadataCache.get("activities")!;
  }

  try {
    const response = await fetch(activitiesMetadataUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch activities metadata: ${response.status}`
      );
    }
    const data = await response.json();
    metadataCache.set("activities", data);
    return data;
  } catch (error) {
    console.error("Failed to load activities metadata:", error);
    return [];
  }
}

export async function fetchActivityTasks(
  activityId: string
): Promise<ActivityTask | null> {
  if (taskCache.has(activityId)) {
    return taskCache.get(activityId)!;
  }

  try {
    const response = await fetch(`/activityData/tasks/${activityId}.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${activityId}.json: ${response.status}`);
      return null;
    }
    const data = await response.json();

    // Cache the result
    taskCache.set(activityId, data);
    return data;
  } catch (error) {
    console.error(`Failed to load tasks for ${activityId}:`, error);
    return null;
  }
}

export async function fetchSingleActivity(
  activityId: string,
  selectedGrade?: string,
  selectedLearningGoal?: string
): Promise<CombinedActivity | null> {
  try {
    const activitiesMetadata = await fetchActivitiesMetadata();
    const rawActivity = activitiesMetadata.find(
      (a: RawActivity) => a.id === activityId
    );
    const taskDetails = await fetchActivityTasks(activityId);

    if (!rawActivity || !taskDetails) return null;

    const activity: Activity = {
      ...rawActivity,
      tools: rawActivity.tools.split(",").map((tool: string) => tool.trim()),
    };

    const gradeData = selectedGrade
      ? taskDetails.grades[selectedGrade] ?? {}
      : {};

    const allQuestions: Question[] = [
      ...(gradeData.easy ?? []),
      ...(gradeData.medium ?? []),
      ...(gradeData.hard ?? []),
    ];

    const filteredQuestions = selectedLearningGoal
      ? allQuestions.filter((q) =>
          q.learningGoal.includes(selectedLearningGoal)
        )
      : allQuestions;

    const learningGoals = Array.from(
      new Set(filteredQuestions.map((q) => q.learningGoal))
    );

    return {
      ...activity,
      ...taskDetails,
      learningGoals: learningGoals,
      grades: selectedGrade
        ? {
            [selectedGrade]: {
              tips: gradeData.tips || "",
              reflection: gradeData.reflection || "",
              easy: filteredQuestions.filter((q) => q.difficulty === "easy"),
              medium: filteredQuestions.filter(
                (q) => q.difficulty === "medium"
              ),
              hard: filteredQuestions.filter((q) => q.difficulty === "hard"),
            },
          }
        : taskDetails.grades,
    };
  } catch (error) {
    console.error("Error fetching single activity:", error);
    return null;
  }
}
export function useSingleActivity(
  activityId: string | null,
  selectedGrade: string | null,
  selectedLearningGoal: string | null
) {
  const [activity, setActivity] = useState<CombinedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!activityId) {
        setActivity(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const gradeFromStorage =
          selectedGrade || localStorage.getItem("selectedGrade");
        const goalFromStorage =
          selectedLearningGoal || localStorage.getItem("selectedLearningGoal");

        const result = await fetchSingleActivity(
          activityId,
          gradeFromStorage || undefined,
          goalFromStorage || undefined
        );
        setActivity(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setActivity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityId, selectedGrade, selectedLearningGoal]);

  return { activity, loading, error };
}

export function useActivities(
  selectedGrade: string | null,
  selectedGoal: string | null
) {
  const [activities, setActivities] = useState<CombinedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const gradeFromStorage =
          selectedGrade || localStorage.getItem("selectedGrade");
        const goalFromStorage =
          selectedGoal || localStorage.getItem("selectedLearningGoal");
        const activitiesMetadata = await fetchActivitiesMetadata();

        const baseActivities: Activity[] = activitiesMetadata.map(
          (rawActivity: RawActivity) => ({
            ...rawActivity,
            tools: rawActivity.tools
              .split(",")
              .map((tool: string) => tool.trim()), // Convert string to array
          })
        );

        const fetchPromises = baseActivities.map(async (activity) => {
          const details = await fetchActivityTasks(activity.id);
          if (!details) return null;

          const gradeData = gradeFromStorage
            ? details.grades[gradeFromStorage] ?? {}
            : {};
          const allQuestions: Question[] = [
            ...(gradeData.easy ?? []),
            ...(gradeData.medium ?? []),
            ...(gradeData.hard ?? []),
          ];

          const filteredQuestions = goalFromStorage
            ? allQuestions.filter((q) =>
                q.learningGoal.includes(goalFromStorage)
              )
            : allQuestions;
          if (
            filteredQuestions.length > 0 ||
            (!gradeFromStorage && !goalFromStorage)
          ) {
            const learningGoals = Array.from(
              new Set(filteredQuestions.map((q) => q.learningGoal))
            );

            return {
              ...activity,
              ...details,
              learningGoals: learningGoals,
              grades: gradeFromStorage
                ? {
                    [gradeFromStorage]: {
                      easy: filteredQuestions.filter(
                        (q) => q.difficulty === "easy"
                      ),
                      medium: filteredQuestions.filter(
                        (q) => q.difficulty === "medium"
                      ),
                      hard: filteredQuestions.filter(
                        (q) => q.difficulty === "hard"
                      ),
                    },
                  }
                : details.grades,
            };
          }
          return null;
        });

        const results = await Promise.all(fetchPromises);
        const validResults = results.filter(
          (result): result is CombinedActivity => result !== null
        );

        setActivities(validResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Feil ved henting av aktiviteter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGrade, selectedGoal]);

  return { activities, loading, error };
}

export default useActivities;
