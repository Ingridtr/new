/**
 * Type definitions for grade-based activity structure
 */

export interface ActivityContent {
  introduction: string[];
  main: string[];
  examples: string[];
  reflection: string[];
  tips: string[];
  extra: string[];
}

export interface GradeActivity {
  id: string;
  title: string;
  time: string;
  location: string;
  tools: string;
  groupsize: string;
  learning_goal: string;
  content: ActivityContent;
}

export interface GradeData {
  grade: string;
  total_activities: number;
  activities: GradeActivity[];
}

// Type for the grade mapping
export type GradeLevel = 
  | "Andre årstrinn"
  | "Tredje årstrinn" 
  | "Fjerde årstrinn"
  | "Femte årstrinn"
  | "Sjette årstrinn"
  | "Syvende årstrinn";
