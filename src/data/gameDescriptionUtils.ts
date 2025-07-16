import { gameDescriptions } from './gameDescriptionsData';
import { GameDescription, TasksForGrade } from './types';

/**
 * Get a specific game description by ID
 */
export function getGameDescription(gameId: string): GameDescription | null {
  return gameDescriptions[gameId] || null;
}

/**
 * Get tasks filtered by grade level
 * Returns only the difficulty levels that are appropriate for the given grade
 */
export function getTasksForGrade(gameId: string, grade: string): TasksForGrade {
  const game = getGameDescription(gameId);
  if (!game) return {};

  const allowedDifficulties = game.gradeMapping[grade] || [];
  const tasks: TasksForGrade = {};

  allowedDifficulties.forEach(difficulty => {
    if (difficulty === 'easy' && game.tasks.easy) {
      tasks.easy = game.tasks.easy;
    }
    if (difficulty === 'medium' && game.tasks.medium) {
      tasks.medium = game.tasks.medium;
    }
    if (difficulty === 'hard' && game.tasks.hard) {
      tasks.hard = game.tasks.hard;
    }
  });

  return tasks;
}

/**
 * Get all available games
 */
export function getAllGameIds(): string[] {
  return Object.keys(gameDescriptions);
}

/**
 * Get games suitable for a specific grade
 */
export function getGamesForGrade(grade: string): GameDescription[] {
  return Object.values(gameDescriptions).filter(game => 
    game.gradeMapping[grade] && game.gradeMapping[grade].length > 0
  );
}

/**
 * Check if a game is suitable for a specific grade
 */
export function isGameSuitableForGrade(gameId: string, grade: string): boolean {
  const game = getGameDescription(gameId);
  if (!game) return false;
  
  return game.gradeMapping[grade] && game.gradeMapping[grade].length > 0;
}
