// Static Task Imports (Alternative approach)
// This file provides a static import approach for task files

// Import all task files (you may need to configure TypeScript to allow JSON imports)
// For now, this provides the structure and can be used when JSON import is configured

export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  difficulty: TaskDifficulty;
  question: string;
  answer: string;
  type: string;
}

export interface TaskFile {
  activityId: string;
  activityTitle: string;
  totalTasks: number;
  generatedAt: string;
  easy?: Task[];
  medium?: Task[];
  hard?: Task[];
  tasks?: Task[];
}

// If you want to use static imports, you can uncomment these when JSON imports are configured:
/*
import mattesherriffTasks from './mattesheriff.json';
import tallinjeTasks from './tallinje.json';
import stivHeksTasks from './stiv-heks.json';
import posterSkattejaktTasks from './poster-skattejakt.json';
import pastandsveggeneTask from './pastandsveggene.json';
import nappeHaleTasks from './nappe-hale.json';
import laereKlokkaTasks from './laere-klokka.json';
import problemlosningHverdagenTasks from './problemlosning-hverdagen.json';
import regnefrisbeeTasks from './regnefrisbee.json';
import bingoTasks from './bingo.json';
import hoderegningKortstokkTasks from './hoderegning-kortstokk.json';
import hangmanFigurerTasks from './hangman-figurer.json';
import tiervennerTasks from './tiervenner.json';
import terningskastTasks from './terningskast.json';
import hvemErJegTasks from './hvem-er-jeg.json';
import geometridansTasks from './geometridans.json';
import rangerMegTasks from './ranger-meg.json';
import mattememoryTasks from './mattememory.json';
import stafettTasks from './stafett.json';
import hundrenettTasks from './hundrenett.json';

export const taskFiles: Record<string, TaskFile> = {
  'mattesheriff': mattesherriffTasks,
  'tallinje': tallinjeTasks,
  'stiv-heks': stivHeksTasks,
  'poster-skattejakt': posterSkattejaktTasks,
  'pastandsveggene': pastandsveggeneTask,
  'nappe-hale': nappeHaleTasks,
  'laere-klokka': laereKlokkaTasks,
  'problemlosning-hverdagen': problemlosningHverdagenTasks,
  'regnefrisbee': regnefrisbeeTasks,
  'bingo': bingoTasks,
  'hoderegning-kortstokk': hoderegningKortstokkTasks,
  'hangman-figurer': hangmanFigurerTasks,
  'tiervenner': tiervennerTasks,
  'terningskast': terningskastTasks,
  'hvem-er-jeg': hvemErJegTasks,
  'geometridans': geometridansTasks,
  'ranger-meg': rangerMegTasks,
  'mattememory': mattememoryTasks,
  'stafett': stafettTasks,
  'hundrenett': hundrenettTasks
};
*/
