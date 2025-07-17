// Auto-generated TypeScript types for task files
// Generated on: 2025-07-17T11:29:23.322Z

export interface Task {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  type: string;
  grade?: string; // Grade this task is designed for
  learningGoal?: string; // Norwegian curriculum learning goal
}

export interface GradeTasks {
  easy?: Task[];
  medium?: Task[];
  hard?: Task[];
  tasks?: Task[]; // For non-9 task activities
}

export interface TaskFile {
  activityId: string;
  activityTitle: string;
  totalTasks: number;
  tasksPerGrade: number;
  supportedGrades: string[];
  generatedAt: string;
  grades: { [gradeName: string]: GradeTasks };
}

export type ActivityId = 'mattesheriff' | 'tallinje' | 'stiv-heks' | 'poster-skattejakt' | 'pastandsveggene' | 'nappe-hale' | 'laere-klokka' | 'problemlosning-hverdagen' | 'regnefrisbee' | 'bingo' | 'hoderegning-kortstokk' | 'hangman-figurer' | 'tiervenner' | 'terningskast' | 'hvem-er-jeg' | 'geometridans' | 'ranger-meg' | 'mattememory' | 'stafett' | 'hundrenett';

export type GradeName = 
  | 'Første årstrinn'
  | 'Andre årstrinn'
  | 'Tredje årstrinn'
  | 'Fjerde årstrinn'
  | 'Femte årstrinn'
  | 'Sjette årstrinn'
  | 'Syende årstrinn'
  | 'Åttende årstrinn'
  | 'Niende årstrinn'
  | 'Tiende årstrinn'
  | 'general';

export const AVAILABLE_TASK_ACTIVITY_IDS: ActivityId[] = [
  'mattesheriff',
  'tallinje',
  'stiv-heks',
  'poster-skattejakt',
  'pastandsveggene',
  'nappe-hale',
  'laere-klokka',
  'problemlosning-hverdagen',
  'regnefrisbee',
  'bingo',
  'hoderegning-kortstokk',
  'hangman-figurer',
  'tiervenner',
  'terningskast',
  'hvem-er-jeg',
  'geometridans',
  'ranger-meg',
  'mattememory',
  'stafett',
  'hundrenett'
];
