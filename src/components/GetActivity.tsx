import { useEffect, useState } from "react";

import {
  Activity,
  ActivityTask,
  CombinedActivity,
} from "../data/types";

import {
  GradeData,
  GradeActivity,
} from "../../src/data/gradeTypes";

// Cache for grade-based activities
const gradeCache = new Map<string, GradeData>();

// Map grade names to JSON filenames
// Grade to file mapping
const gradeFileMap: { [key: string]: string } = {
  "Andre årstrinn": "2.grade.json",
  "Tredje årstrinn": "3.grade.json",
  "Fjerde årstrinn": "4.grade.json",
  "Femte årstrinn": "5.grade.json",
  "Sjette årstrinn": "6.grade.json",
  "Syvende årstrinn": "7.grade.json",
};

// Extract learning goal number from activity ID (format: PXXYY where P is grade prefix, XX is learning goal number)
function extractLearningGoalNumber(activityId: string): number | null {
  if (activityId.length >= 5) {
    // Check for grade prefixes: A (2nd), B (3rd), C (4th), D (5th), E (6th), F (7th)
    const gradePrefix = activityId.charAt(0);
    const validPrefixes = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    if (validPrefixes.includes(gradePrefix)) {
      // Extract XX from PXXYY format (positions 1-2 after prefix)
      const lgStr = activityId.substring(1, 3);
      const lgNum = parseInt(lgStr, 10);
      
      // Validate that it's a reasonable learning goal number (1-15 to accommodate different grades)
      if (!isNaN(lgNum) && lgNum >= 1 && lgNum <= 15) {
        return lgNum;
      }
    }
  }
  return null;
}

// Extract learning goal number from API learning goal selection (e.g., "Kompetansemål 8" -> 8)
function extractLearningGoalFromSelection(selectedGoal: string): number | null {
  // Handle cases like "Kompetansemål 8", "kompetansemål 8", "Kompetansemål 11:", or just "8"
  // Look for numbers, prioritizing two-digit numbers over single digits
  const matches = selectedGoal.match(/(\d+)/g);
  if (matches) {
    // Find the learning goal number (usually the first or largest number)
    const numbers = matches.map(m => parseInt(m, 10)).filter(n => n >= 1 && n <= 15);
    if (numbers.length > 0) {
      // If we have multiple numbers, prefer the one that looks like a learning goal (1-15)
      return numbers.find(n => n >= 10) || numbers[0];
    }
  }
  return null;
}

// Fetch grade-based activities from the new structure
async function fetchGradeActivities(gradeName?: string | null): Promise<GradeActivity[]> {
  const filename = gradeName ? gradeFileMap[gradeName] : "2.grade.json";
  const cacheKey = filename || "2.grade.json";
  
  console.log(`fetchGradeActivities called with gradeName: "${gradeName}"`);
  console.log(`Mapped to filename: "${filename}"`);
  
  if (gradeCache.has(cacheKey)) {
    console.log(`Using cached data for: ${cacheKey}`);
    return gradeCache.get(cacheKey)!.activities;
  }

  try {
    const url = `/activityData/grades/${filename || "2.grade.json"}`;
    console.log(`Fetching from URL: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      // If the specific grade file doesn't exist, fall back to 2nd grade
      if (filename !== "2.grade.json") {
        console.warn(`Grade file ${filename} not found, falling back to 2nd grade`);
        return fetchGradeActivities("Andre årstrinn");
      }
      throw new Error(
        `Failed to fetch grade activities: ${response.status}`
      );
    }
    const data: GradeData = await response.json();
    console.log(`Successfully loaded ${data.activities.length} activities for ${data.grade}`);
    gradeCache.set(cacheKey, data);
    return data.activities;
  } catch (error) {
    console.error("Failed to load grade activities:", error);
    return [];
  }
}

// Convert GradeActivity to the old Activity format for compatibility
function convertGradeActivityToActivity(gradeActivity: GradeActivity, gradeName?: string): Activity {
  return {
    id: gradeActivity.id,
    title: gradeActivity.title,
    description: gradeActivity.content.introduction.join(" ") + " " + gradeActivity.content.main.join(" "),
    time: gradeActivity.time,
    image: "", // No image in new structure, could be added later
    tools: gradeActivity.tools.split(",").map(tool => tool.trim()),
    location: gradeActivity.location,
    grade: gradeName || "Andre årstrinn", // Use provided grade or default
    number_of_tasks: 1 // Default value
  };
}

// Create mock ActivityTask data from GradeActivity for compatibility
function createMockActivityTask(gradeActivity: GradeActivity, gradeName?: string): ActivityTask {
  const currentGrade = gradeName || "Andre årstrinn";
  return {
    activityId: gradeActivity.id,
    activityTitle: gradeActivity.title,
    totalTasks: 1,
    tasksPerGrade: 1,
    supportedGrades: [currentGrade],
    generatedAt: new Date().toISOString(),
    grades: {
      [currentGrade]: {
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
  activityId: string,
  gradeName?: string | null
): Promise<ActivityTask | null> {
  try {
    const gradeActivities = await fetchGradeActivities(gradeName);
    const gradeActivity = gradeActivities.find(activity => activity.id === activityId);
    
    if (!gradeActivity) {
      console.error(`Activity not found: ${activityId}`);
      return null;
    }

    return createMockActivityTask(gradeActivity, gradeName || undefined);
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
    const gradeActivities = await fetchGradeActivities(selectedGrade);
    const gradeActivity = gradeActivities.find(activity => activity.id === activityId);
    
    if (!gradeActivity) {
      console.error(`Activity not found: ${activityId}`);
      return null;
    }

    const activity = convertGradeActivityToActivity(gradeActivity, selectedGrade || undefined);
    const taskDetails = createMockActivityTask(gradeActivity, selectedGrade || undefined);

    // Filter based on learning goal if provided
    const learningGoals = selectedLearningGoal 
      ? [gradeActivity.learning_goal].filter(goal => {
          const searchGoalNumber = extractLearningGoalFromSelection(selectedLearningGoal);
          const activityGoalNumber = extractLearningGoalNumber(gradeActivity.id);
          
          // If we can extract numbers from both, use ID-based matching (more reliable)
          if (searchGoalNumber !== null && activityGoalNumber !== null) {
            return searchGoalNumber === activityGoalNumber;
          }
          
          // Fallback to text matching with normalization for edge cases
          const activityGoal = goal.toLowerCase();
          const searchGoal = selectedLearningGoal.toLowerCase();
          
          // Direct match
          if (activityGoal.includes(searchGoal)) {
            return true;
          }
          
          // Handle Nynorsk/Bokmål spelling variations (fallback)
          const normalizedActivityGoal = activityGoal
            .replace(/eigenskapen/g, 'egenskapen')
            .replace(/eigenskapar/g, 'egenskaper')
            .replace(/hovudrekning/g, 'hoderegning')
            .replace(/framlengs/g, 'fremover')
            .replace(/teljing/g, 'telling')
            .replace(/nærmiljø/g, 'nærområde')
            .replace(/teikne/g, 'tegne')
            .replace(/korleis/g, 'hvordan')
            .replace(/måtar/g, 'måter')
            .replace(/figurar/g, 'figurer')
            .replace(/samanlikne/g, 'sammenligne')
            .replace(/storleikar/g, 'størrelser')
            .replace(/måleiningar/g, 'måleenheter')
            .replace(/problemløysing/g, 'problemløsning')
            .replace(/løyse/g, 'løse')
            .replace(/repeterande/g, 'repeterende')
            .replace(/einingar/g, 'enheter')
            .replace(/følgje/g, 'følge')
            .replace(/kjenne att/g, 'kjenne igjen')
            .replace(/eige/g, 'eget')
            .replace(/frå/g, 'fra')
            .replace(/teljingane/g, 'tellingene')
            .replace(/mønster i teljingane/g, 'mønstre i tellingene')
            .replace(/ulike startpunkt/g, 'forskjellige startpunkt')
            .replace(/dei/g, 'dem');
          
          const normalizedSearchGoal = searchGoal
            .replace(/eigenskapen/g, 'egenskapen')
            .replace(/eigenskapar/g, 'egenskaper')
            .replace(/hovudrekning/g, 'hoderegning')
            .replace(/framlengs/g, 'fremover')
            .replace(/teljing/g, 'telling')
            .replace(/nærmiljø/g, 'nærområde')
            .replace(/teikne/g, 'tegne')
            .replace(/korleis/g, 'hvordan')
            .replace(/måtar/g, 'måter')
            .replace(/figurar/g, 'figurer')
            .replace(/samanlikne/g, 'sammenligne')
            .replace(/storleikar/g, 'størrelser')
            .replace(/måleiningar/g, 'måleenheter')
            .replace(/problemløysing/g, 'problemløsning')
            .replace(/løyse/g, 'løse')
            .replace(/repeterande/g, 'repeterende')
            .replace(/einingar/g, 'enheter')
            .replace(/følgje/g, 'følge')
            .replace(/kjenne att/g, 'kjenne igjen')
            .replace(/eige/g, 'eget')
            .replace(/frå/g, 'fra')
            .replace(/teljingane/g, 'tellingene')
            .replace(/mønster i teljingane/g, 'mønstre i tellingene')
            .replace(/ulike startpunkt/g, 'forskjellige startpunkt')
            .replace(/dei/g, 'dem');
          
          return normalizedActivityGoal.includes(normalizedSearchGoal);
        })
      : [gradeActivity.learning_goal];

    // Use selectedGrade, fallback to "Andre årstrinn" if no grade is selected
    const currentGrade = selectedGrade || "Andre årstrinn";

    return {
      ...activity,
      ...taskDetails,
      learningGoals: learningGoals,
      groupsize: gradeActivity.groupsize, // Add groupsize field
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
        // If no grade is selected, don't load any activities
        if (!selectedGrade) {
          setActivities([]);
          setLoading(false);
          return;
        }

        const gradeActivities = await fetchGradeActivities(selectedGrade);
        
        // Filter activities based on learning goal if provided
        const filteredActivities = selectedGoal
          ? gradeActivities.filter(gradeActivity => {
              const searchGoalNumber = extractLearningGoalFromSelection(selectedGoal);
              const activityGoalNumber = extractLearningGoalNumber(gradeActivity.id);
              
              // Debug logging for learning goals 10+
              if (searchGoalNumber && searchGoalNumber >= 10) {
                console.log(`DEBUG: Filtering for LG ${searchGoalNumber}`);
                console.log(`Activity ${gradeActivity.id}: extracted LG ${activityGoalNumber}`);
                console.log(`Match: ${searchGoalNumber === activityGoalNumber}`);
              }
              
              // If we can extract numbers from both, use ID-based matching (more reliable)
              if (searchGoalNumber !== null && activityGoalNumber !== null) {
                return searchGoalNumber === activityGoalNumber;
              }
              
              // Fallback to text matching with normalization for edge cases
              const activityGoal = gradeActivity.learning_goal.toLowerCase();
              const searchGoal = selectedGoal.toLowerCase();
              
              // Direct match
              if (activityGoal.includes(searchGoal)) {
                return true;
              }
              
              // Handle Nynorsk/Bokmål spelling variations (fallback)
              const normalizedActivityGoal = activityGoal
                .replace(/eigenskapen/g, 'egenskapen')
                .replace(/eigenskapar/g, 'egenskaper')
                .replace(/hovudrekning/g, 'hoderegning')
                .replace(/framlengs/g, 'fremover')
                .replace(/teljing/g, 'telling')
                .replace(/nærmiljø/g, 'nærområde')
                .replace(/teikne/g, 'tegne')
                .replace(/korleis/g, 'hvordan')
                .replace(/måtar/g, 'måter')
                .replace(/figurar/g, 'figurer')
                .replace(/samanlikne/g, 'sammenligne')
                .replace(/storleikar/g, 'størrelser')
                .replace(/måleiningar/g, 'måleenheter')
                .replace(/problemløysing/g, 'problemløsning')
                .replace(/løyse/g, 'løse')
                .replace(/repeterande/g, 'repeterende')
                .replace(/einingar/g, 'enheter')
                .replace(/følgje/g, 'følge')
                .replace(/kjenne att/g, 'kjenne igjen')
                .replace(/eige/g, 'eget')
                .replace(/frå/g, 'fra')
                .replace(/teljingane/g, 'tellingene')
                .replace(/mønster i teljingane/g, 'mønstre i tellingene')
                .replace(/ulike startpunkt/g, 'forskjellige startpunkt')
                .replace(/dei/g, 'dem');
              
              const normalizedSearchGoal = searchGoal
                .replace(/eigenskapen/g, 'egenskapen')
                .replace(/eigenskapar/g, 'egenskaper')
                .replace(/hovudrekning/g, 'hoderegning')
                .replace(/framlengs/g, 'fremover')
                .replace(/teljing/g, 'telling')
                .replace(/nærmiljø/g, 'nærområde')
                .replace(/teikne/g, 'tegne')
                .replace(/korleis/g, 'hvordan')
                .replace(/måtar/g, 'måter')
                .replace(/figurar/g, 'figurer')
                .replace(/samanlikne/g, 'sammenligne')
                .replace(/storleikar/g, 'størrelser')
                .replace(/måleiningar/g, 'måleenheter')
                .replace(/problemløysing/g, 'problemløsning')
                .replace(/løyse/g, 'løse')
                .replace(/repeterande/g, 'repeterende')
                .replace(/einingar/g, 'enheter')
                .replace(/følgje/g, 'følge')
                .replace(/kjenne att/g, 'kjenne igjen')
                .replace(/eige/g, 'eget')
                .replace(/frå/g, 'fra')
                .replace(/teljingane/g, 'tellingene')
                .replace(/mønster i teljingane/g, 'mønstre i tellingene')
                .replace(/ulike startpunkt/g, 'forskjellige startpunkt')
                .replace(/dei/g, 'dem');
              
              return normalizedActivityGoal.includes(normalizedSearchGoal);
            })
          : gradeActivities;

        // Convert to CombinedActivity format
        const combinedActivities: CombinedActivity[] = filteredActivities.map(gradeActivity => {
          const activity = convertGradeActivityToActivity(gradeActivity, selectedGrade || undefined);
          const taskDetails = createMockActivityTask(gradeActivity, selectedGrade || undefined);

          return {
            ...activity,
            ...taskDetails,
            learningGoals: [gradeActivity.learning_goal],
            groupsize: gradeActivity.groupsize, // Add groupsize field
            grades: {
              [selectedGrade || "Andre årstrinn"]: {
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
