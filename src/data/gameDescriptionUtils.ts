import gameDescriptionsData from './gameDescriptions.json';
import { GameDescription, TasksForGrade } from './types';

/**
 * Get a specific game description by ID
 */
export function getGameDescription(gameId: string): GameDescription | null {
  return gameDescriptionsData[gameId as keyof typeof gameDescriptionsData] || null;
}

/**
 * Get tasks for a game - returns all difficulty levels regardless of grade
 * Previously filtered by grade, but now returns all levels for teacher flexibility
 */
export function getTasksForGrade(gameId: string, _grade?: string): TasksForGrade {
  const game = getGameDescription(gameId);
  
  if (!game) return {};

  // Return all difficulty levels regardless of grade
  const tasks: TasksForGrade = {
    easy: game.tasks.easy || [],
    medium: game.tasks.medium || [],
    hard: game.tasks.hard || []
  };

  return tasks;
}

/**
 * Get all available games
 */
export function getAllGameIds(): string[] {
  return Object.keys(gameDescriptionsData);
}

/**
 * Get games suitable for a specific grade
 */
export function getGamesForGrade(grade: string): GameDescription[] {
  return Object.values(gameDescriptionsData).filter((game: any) => 
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
