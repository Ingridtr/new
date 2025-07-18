// Task Files Index
// Auto-generated index for all task files

// Import types from the auto-generated types file
import type { Task, TaskFile, GradeName, GradeTasks } from './types';



export type { Task, TaskFile, GradeName, GradeTasks };

// Dynamic task loading function
export async function loadTaskFile(activityId: string): Promise<TaskFile | null> {
  try {
    const response = await fetch(`/activityData/tasks/${activityId}.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${activityId}.json: ${response.status} ${response.statusText}`);
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
  
  return taskFile.grades[gradeName] || null;
}

// Helper function to get all tasks for an activity, flattened across all grades
export async function getAllTasksForActivity(activityId: string): Promise<Task[]> {
  const taskFile = await loadTaskFile(activityId);
  if (!taskFile) return [];
  
  const allTasks: Task[] = [];
  
  Object.values(taskFile.grades).forEach(gradeTasks => {
    if (gradeTasks.easy) allTasks.push(...gradeTasks.easy);
    if (gradeTasks.medium) allTasks.push(...gradeTasks.medium);
    if (gradeTasks.hard) allTasks.push(...gradeTasks.hard);
    if (gradeTasks.tasks) allTasks.push(...gradeTasks.tasks);
  });
  
  return allTasks;
}

// Helper function to get supported grades for an activity
export async function getSupportedGrades(activityId: string): Promise<string[]> {
  const taskFile = await loadTaskFile(activityId);
  return taskFile?.supportedGrades || [];
}


// Helper function to get task statistics
export async function getTaskStatistics(activityId: string): Promise<{
  totalTasks: number;
  tasksPerGrade: number;
  gradeCount: number;
  supportedGrades: string[];
} | null> {
  const taskFile = await loadTaskFile(activityId);
  if (!taskFile) return null;
  
  return {
    totalTasks: taskFile.totalTasks,
    tasksPerGrade: taskFile.tasksPerGrade,
    gradeCount: taskFile.supportedGrades.length,
    supportedGrades: taskFile.supportedGrades
  };
}
