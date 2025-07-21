// Types for game descriptions and data structures

// Full activity data with all details
export interface ActivityDescription {
  id: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  tools: string[];
  learningGoals: string[];
  description: string;
  tasks: {
    easy: Task[];  
    medium: Task[];
    hard: Task[];
  };
  variations: string;
  reflectionQuestions: string;
}

// Lightweight activity data for lists/summaries
export interface Activity {
  id: string;
  title: string;
  image: string;
  time: string;
  location: string;
  tools: string;
}

export interface ActivitiesDatabase {
  [grade: string]: {
    [competencyId: number]: Activity[];
  };
}


export interface Task {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  type: string;
  grade: string; 
  learningGoal: string; 
}

export interface GradeTasks {
  easy?: Task[];
  medium?: Task[];
  hard?: Task[];
  tasks?: Task[]; // For non-9 task activities
}
export type GradeName = 
  | 'Andre årstrinn'
  | 'Tredje årstrinn'
  | 'Fjerde årstrinn'
  | 'Femte årstrinn'
  | 'Sjette årstrinn'
  | 'Syende årstrinn';



  export interface TaskFile {
  activityId: string;
  activityTitle: string;
  totalTasks: number;
  tasksPerGrade: number;
  supportedGrades: string[];
  generatedAt: string;
  grades: { [gradeName: string]: GradeTasks };
}