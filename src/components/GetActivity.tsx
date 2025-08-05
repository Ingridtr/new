import { useEffect, useState } from "react";

import {
  Activity,
  ActivityTask,
  CombinedActivity,
} from "../../public/activityData/types";

import {
  GradeData,
  GradeActivity,
} from "../../public/activityData/gradeTypes";

import gradeActivitiesUrl from "../../public/activityData/grades/andre_aarstrinn.json?url";

// Cache for grade-based activities
const gradeCache = new Map<string, GradeData>();

// Fetch grade-based activities from the new structure
async function fetchGradeActivities(): Promise<GradeActivity[]> {
  if (gradeCache.has("andre_aarstrinn")) {
    return gradeCache.get("andre_aarstrinn")!.activities;
  }

  try {
    const response = await fetch(gradeActivitiesUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch grade activities: ${response.status}`
      );
    }
    const data: GradeData = await response.json();
    gradeCache.set("andre_aarstrinn", data);
    return data.activities;
  } catch (error) {
    console.error("Failed to load grade activities:", error);
    return [];
  }
}

// Convert GradeActivity to the old Activity format for compatibility
function convertGradeActivityToActivity(gradeActivity: GradeActivity): Activity {
  return {
    id: gradeActivity.id,
    title: gradeActivity.title,
    description: gradeActivity.content.introduction.join(" ") + " " + gradeActivity.content.main.join(" "),
    time: gradeActivity.time,
    image: "", // No image in new structure, could be added later
    tools: gradeActivity.tools.split(",").map(tool => tool.trim()),
    location: gradeActivity.location,
    grade: "Andre årstrinn", // Fixed to 2nd grade for now
    number_of_tasks: 1 // Default value
  };
}

// Create mock ActivityTask data from GradeActivity for compatibility
function createMockActivityTask(gradeActivity: GradeActivity): ActivityTask {
  return {
    activityId: gradeActivity.id,
    activityTitle: gradeActivity.title,
    totalTasks: 1,
    tasksPerGrade: 1,
    supportedGrades: ["Andre årstrinn"],
    generatedAt: new Date().toISOString(),
    grades: {
      "Andre årstrinn": {
        tips: gradeActivity.content.tips.join(" "),
        reflection: gradeActivity.content.reflection.join(" "),
        easy: [],
        medium: [],
        hard: []
      }
    },
    learningGoals: [gradeActivity.learning_goal]
  };
}

export async function fetchActivityTasks(
  activityId: string
): Promise<ActivityTask | null> {
  try {
    const gradeActivities = await fetchGradeActivities();
    const gradeActivity = gradeActivities.find(activity => activity.id === activityId);
    
    if (!gradeActivity) {
      console.error(`Activity not found: ${activityId}`);
      return null;
    }

    return createMockActivityTask(gradeActivity);
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
    const gradeActivities = await fetchGradeActivities();
    const gradeActivity = gradeActivities.find(activity => activity.id === activityId);
    
    if (!gradeActivity) {
      console.error(`Activity not found: ${activityId}`);
      return null;
    }

    const activity = convertGradeActivityToActivity(gradeActivity);
    const taskDetails = createMockActivityTask(gradeActivity);

    // Filter based on learning goal if provided
    const learningGoals = selectedLearningGoal 
      ? [gradeActivity.learning_goal].filter(goal => 
          goal.toLowerCase().includes(selectedLearningGoal.toLowerCase())
        )
      : [gradeActivity.learning_goal];

    // Use selectedGrade for future compatibility (currently fixed to "Andre årstrinn")
    const currentGrade = selectedGrade || "Andre årstrinn";

    return {
      ...activity,
      ...taskDetails,
      learningGoals: learningGoals,
      grades: {
        [currentGrade]: {
          tips: gradeActivity.content.tips.join(" "),
          reflection: gradeActivity.content.reflection.join(" "),
          easy: [],
          medium: [],
          hard: []
        }
      },
      // Add the original content structure for InfoTask to use
      gradeContent: gradeActivity.content
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
        const gradeActivities = await fetchGradeActivities();
        
        // Filter activities based on learning goal if provided
        const filteredActivities = selectedGoal
          ? gradeActivities.filter(gradeActivity =>
              gradeActivity.learning_goal.toLowerCase().includes(selectedGoal.toLowerCase())
            )
          : gradeActivities;

        // Convert to CombinedActivity format
        const combinedActivities: CombinedActivity[] = filteredActivities.map(gradeActivity => {
          const activity = convertGradeActivityToActivity(gradeActivity);
          const taskDetails = createMockActivityTask(gradeActivity);

          return {
            ...activity,
            ...taskDetails,
            learningGoals: [gradeActivity.learning_goal],
            grades: {
              "Andre årstrinn": {
                tips: gradeActivity.content.tips.join(" "),
                reflection: gradeActivity.content.reflection.join(" "),
                easy: [],
                medium: [],
                hard: []
              }
            },
            gradeContent: gradeActivity.content
          };
        });

        setActivities(combinedActivities);
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
