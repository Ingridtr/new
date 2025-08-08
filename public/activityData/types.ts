export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  image: string;
  tools: string[];
  location: string;
  grade: string;
  number_of_tasks: number;
}

export interface ActivityTask {
  activityId: string;
  activityTitle: string;
  totalTasks: number;
  tasksPerGrade: number;
  supportedGrades: string[];
  generatedAt: string;
  grades: {
    [grade: string]: {
      tips?: string;
      reflection?: string;
      easy?: Question[];
      medium?: Question[];
      hard?: Question[];
    };
  };
  learningGoals: string[];
}

export interface Question {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  grade: string;
  learningGoal: string;
  question: string;
  answer: string;
  type: string;
}

export type CombinedActivity = Activity &
  ActivityTask & {
    learningGoals: string[]; // Use learningGoals to match ActivityTask
    groupsize: string; // Add groupsize field
    gradeContent?: {
      introduction: string[];
      main: string[];
      examples: string[];
      reflection: string[];
      tips: string[];
      extra: string[];
    };
  };
