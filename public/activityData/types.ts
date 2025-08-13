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

// Grade-based activity types
export interface GradeActivity {
  id: string;
  title: string;
  time: string;
  location: string;
  tools: string;
  groupsize: string;
  learning_goal: string;
  content: {
    introduction: string[] | string;
    main: string[] | string;
    examples: string[] | string;
    reflection: string[] | string;
    tips: string[] | string;
    extra?: string[] | string;
  };
}

export interface GradeData {
  grade: string;
  total_activities: number;
  activities: GradeActivity[];
}

export type CombinedActivity = Activity &
  ActivityTask & {
    learningGoals: string[]; // Use learningGoals to match ActivityTask
    groupsize: string; // Add groupsize field
    gradeContent?: {
      introduction: string[] | string;
      main: string[] | string;
      examples: string[] | string;
      reflection: string[] | string;
      tips: string[] | string;
      extra?: string[] | string;
    };
  };
