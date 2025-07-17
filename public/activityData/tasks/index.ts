// Task Files Index
// Auto-generated index for all task files

// Import types from the auto-generated types file
import type { Task, TaskFile, ActivityId, GradeName, GradeTasks } from './types';
import { AVAILABLE_TASK_ACTIVITY_IDS } from './types';

// Re-export types for convenience
export type { Task, TaskFile, ActivityId, GradeName, GradeTasks };

// Dynamic task loading function
export async function loadTaskFile(activityId: string): Promise<TaskFile | null> {
  try {
    const response = await fetch(`/public/activityData/tasks/${activityId}.json`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to load tasks for ${activityId}:`, error);
    return null;
  }
}

// Helper function to get tasks by activity ID
export async function getTasksByActivityId(activityId: string): Promise<TaskFile | null> {
  return await loadTaskFile(activityId);
}

// Helper function to get tasks for a specific grade within an activity
export async function getTasksByActivityAndGrade(activityId: string, gradeName: string): Promise<GradeTasks | null> {
  const taskFile = await loadTaskFile(activityId);
  if (!taskFile) return null;
  
  return 