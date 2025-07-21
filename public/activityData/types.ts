// Types for game descriptions and data structures

import type { Task } from "./tasks/types"; // import from task types

export interface GameDescription {
  id: string;
  title: string;
  location: string;
  duration: string;
  tools: string[];
  learningGoals: string[];
  description: string;
  tasks: {
    easy: Task[];  
    medium: Task[];
    hard: Task[];
  };
  gradeMapping: {
    [grade: string]: string[];
  };
  variations: string;
  reflectionQuestions: string;
}


export interface GameDescriptions {
  [gameId: string]: GameDescription;
}

export interface Game {
  id: string;
  title: string;
  image: string;
  time: string;
  location: string;
  tools: string;
}

export interface GamesDatabase {
  [grade: string]: {
    [competencyId: number]: Game[];
  };
}

export interface Competency {
  id: number;
  title: string;
  description: string;
}

export interface CompetenciesData {
  [grade: string]: Competency[];
}

export interface CompetencyData {
  [grade: string]: {
    [competencyId: number]: string;
  };
}

// Helper type to get tasks for specific grade and difficulty
export interface TasksForGrade {
  easy?: string[];
  medium?: string[];
  hard?: string[];
}
