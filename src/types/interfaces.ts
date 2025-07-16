// Shared interfaces for games and activities

// Base game/activity information shared between GameCard and ActivityData
export interface BaseGameInfo {
  title: string;
  image: string;
  time: string;
  location: string;
  equipment: string;
}

// Extended game interface for gameData.ts
export interface Game extends BaseGameInfo {
  id: string;
  competencyIds: number[]; // Which competencies this game supports
  grades: string[]; // Which grades this game is suitable for
}

// Extended activity interface for activityData.ts
export interface ActivityData extends BaseGameInfo {
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
