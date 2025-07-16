// Types for the application data structures

export interface Game {
  id: string;
  title: string;
  image: string;
  time: string;
  location: string;
  equipment: string;
}

export interface GameData {
  title: string;
  location: string;
  duration: string;
  tools: string[];
  competencyGoals: string[];
  description: string;
  tasks: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
  variations: string;
  reflectionQuestions: string;
}

export interface Competency {
  id: number;
  title: string;
  description: string;
}

export interface GamesDatabase {
  [grade: string]: {
    [competencyId: number]: Game[];
  };
}

export interface CompetencyData {
  [grade: string]: {
    [competencyId: number]: string;
  };
}

export interface CompetenciesData {
  [grade: string]: Competency[];
}

export interface GameDataDatabase {
  [gameId: string]: GameData;
}
