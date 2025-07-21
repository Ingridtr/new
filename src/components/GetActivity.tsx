import { useEffect, useState } from "react";

import {
  Activity,
  ActivityTask,
  CombinedActivity,
  Question,
} from "../../public/activityData/types";

// Fetch activities metadata
export async function fetchActivitiesMetadata(): Promise<Activity[]> {
  const response = await fetch("/activityData/activities.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch activities: ${response.status}`);
  }
  return response.json();
}

// Fetch task details for a specific activity
export async function fetchActivityTasks(activityId: string): Promise<ActivityTask | null> {
  try {
    const response = await fetch(`/activityData/tasks/${activityId}.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${activityId}.json: ${response.status}`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to load tasks for ${activityId}:`, error);
    return null;
  }
}

// Get a single activity with all its data
export async function fetchSingleActivity(
  activityId: string,
  selectedGrade?: string,
  selectedLearningGoal?: string
): Promise<CombinedActivity | null> {
  try {
    const [activitiesMetadata, taskDetails] = await Promise.all([
      fetchActivitiesMetadata(),
      fetchActivityTasks(activityId)
    ]);

    const activity = activitiesMetadata.find(a => a.id === activityId);
    if (!activity || !taskDetails) {
      return null;
    }

    const gradeData = selectedGrade ? taskDetails.grades[selectedGrade] ?? {} : {};
    const allQuestions: Question[] = [
      ...(gradeData.easy ?? []),
      ...(gradeData.medium ?? []),
      ...(gradeData.hard ?? []),
    ];

    const filteredQuestions = selectedLearningGoal
      ? allQuestions.filter(q => q.learningGoal.includes(selectedLearningGoal))
      : allQuestions;

    const learningGoals = Array.from(
      new Set(filteredQuestions.map(q => q.learningGoal))
    );

    return {
      ...activity,
      ...taskDetails,
      learningGoals: learningGoals, // Use 'learningGoals' to match InfoTask expectation
      // Override grades with filtered data if grade is selected
      grades: selectedGrade ? {
        [selectedGrade]: {
          easy: filteredQuestions.filter(q => q.difficulty === "easy"),
          medium: filteredQuestions.filter(q => q.difficulty === "medium"),
          hard: filteredQuestions.filter(q => q.difficulty === "hard"),
        }
      } : taskDetails.grades
    };
  } catch (error) {
    console.error("Error fetching single activity:", error);
    return null;
  }
}

// Hook for a single activity (replaces InfoTask fetching logic)
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
        const result = await fetchSingleActivity(
          activityId,
          selectedGrade || undefined,
          selectedLearningGoal || undefined
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

// Hook for multiple activities (original GameSelection use case)
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
        const baseActivities = await fetchActivitiesMetadata();

        // Fetch all activity details in parallel
        const fetchPromises = baseActivities.map(async (activity) => {
          const details = await fetchActivityTasks(activity.id);
          if (!details) return null;

          const gradeData = details.grades[selectedGrade ?? ""] ?? {};
          const allQuestions: Question[] = [
            ...(gradeData.easy ?? []),
            ...(gradeData.medium ?? []),
            ...(gradeData.hard ?? []),
          ];

          const filteredQuestions = selectedGoal
            ? allQuestions.filter((q) => q.learningGoal.includes(selectedGoal))
            : allQuestions;

          if (filteredQuestions.length > 0 || !selectedGoal) {
            const learningGoals = Array.from(
              new Set(allQuestions.map((q) => q.learningGoal))
            );

            return {
              ...activity,
              ...details,
              learningGoals: learningGoals, // Changed to match type
            };
          }
          return null;
        });

        const results = await Promise.all(fetchPromises);
        const validResults = results.filter((result): result is CombinedActivity => result !== null);
        
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
