#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ACTIVITIES_FILE = path.join(__dirname, '../public/activityData/activities.json');
const TASKS_OUTPUT_DIR = path.join(__dirname, '../public/activityData/tasks');

// Ensure tasks directory exists
if (!fs.existsSync(TASKS_OUTPUT_DIR)) {
    fs.mkdirSync(TASKS_OUTPUT_DIR, { recursive: true });
}

// Sample task generators based on activity type
const taskGenerators = {
    // Math-focused tasks
    math: {
        easy: [
            { question: "Hva er 3 + 4?", answer: "7", type: "addition" },
            { question: "Hva er 5 + 2?", answer: "7", type: "addition" },
            { question: "Hva er 8 - 3?", answer: "5", type: "subtraction" },
            { question: "Hva er 6 + 1?", answer: "7", type: "addition" },
            { question: "Hva er 9 - 4?", answer: "5", type: "subtraction" },
            { question: "Hva er 2 + 3?", answer: "5", type: "addition" },
            { question: "Hva er 7 - 2?", answer: "5", type: "subtraction" },
            { question: "Hva er 4 + 4?", answer: "8", type: "addition" }
        ],
        medium: [
            { question: "Hva er 12 + 8?", answer: "20", type: "addition" },
            { question: "Hva er 15 - 7?", answer: "8", type: "subtraction" },
            { question: "Hva er 6 × 3?", answer: "18", type: "multiplication" },
            { question: "Hva er 24 ÷ 4?", answer: "6", type: "division" },
            { question: "Hva er 13 + 9?", answer: "22", type: "addition" }
        ],
        hard: [
            { question: "Hva er 147 + 89?", answer: "236", type: "addition" },
            { question: "Hva er 204 - 78?", answer: "126", type: "subtraction" },
            { question: "Hva er 15 × 12?", answer: "180", type: "multiplication" },
            { question: "Hva er 144 ÷ 12?", answer: "12", type: "division" },
            { question: "Hva er 25% av 80?", answer: "20", type: "percentage" },
            { question: "Hva er 13 × 17?", answer: "221", type: "multiplication" },
            { question: "Hva er 256 ÷ 16?", answer: "16", type: "division" },
            { question: "Hva er 30% av 60?", answer: "18", type: "percentage" }
        ]
    },
    
    // Geometry tasks
    geometry: {
        easy: [
            { question: "Hvor mange sider har en trekant?", answer: "3", type: "shape_properties" },
            { question: "Hvor mange hjørner har en firkant?", answer: "4", type: "shape_properties" },
            { question: "Hva kalles en figur med fire like sider?", answer: "kvadrat", type: "shape_identification" }
        ],
        medium: [
            { question: "Hva er arealet av et rektangel med lengde 6 og bredde 4?", answer: "24", type: "area" },
            { question: "Hvor mange grader er det i en sirkel?", answer: "360", type: "angles" },
            { question: "Hva er omkretsen av en firkant med sider 3, 4, 3, 4?", answer: "14", type: "perimeter" }
        ],
        hard: [
            { question: "Hva er arealet av en trekant med grunnlinje 8 og høyde 6?", answer: "24", type: "area" },
            { question: "Hvor mange grader er det i en rett vinkel?", answer: "90", type: "angles" },
            { question: "Hva er radiusen til en sirkel med diameter 14?", answer: "7", type: "circle_properties" }
        ]
    },
    
    // Time/clock tasks
    time: {
        easy: [
            { question: "Hvor mange minutter er det i en time?", answer: "60", type: "time_units" },
            { question: "Hvilken tid viser klokka når den lille viseren peker på 3 og den store på 12?", answer: "03:00", type: "clock_reading" },
            { question: "Hvor mange timer er det i en dag?", answer: "24", type: "time_units" }
        ],
        medium: [
            { question: "Hvis klokka er 14:30, hvor mange minutter er det til klokka 15:00?", answer: "30", type: "time_calculation" },
            { question: "Hva er klokka hvis det er kvart over åtte på morgenen?", answer: "08:15", type: "time_expression" },
            { question: "Hvor lenge er det fra 13:45 til 14:15?", answer: "30 minutter", type: "time_duration" }
        ],
        hard: [
            { question: "Hvis et tog går klokka 09:25 og reisen tar 2 timer og 40 minutter, når kommer det frem?", answer: "12:05", type: "time_calculation" },
            { question: "Hvor mange sekunder er det i 5 minutter?", answer: "300", type: "time_conversion" },
            { question: "Hvis det er 15:45 nå, hva var klokka for 3 timer og 20 minutter siden?", answer: "12:25", type: "time_calculation" }
        ]
    }
};

// Function to determine task type based on activity
function getTaskType(activity) {
    const title = activity.title.toLowerCase();
    const description = activity.description.toLowerCase();
    
    if (title.includes('geometri') || description.includes('figur') || description.includes('areal') || title.includes('hangman')) {
        return 'geometry';
    } else if (title.includes('klokka') || description.includes('tid') || description.includes('klokka')) {
        return 'time';
    } else {
        return 'math';
    }
}

// Function to parse grades from the grade string
function parseGrades(gradeString) {
    if (!gradeString || gradeString.trim() === '') {
        return ['general']; // Default fallback
    }
    
    // Split by comma and clean up
    return gradeString.split(',').map(grade => grade.trim()).filter(grade => grade !== '');
}

// Function to get grade difficulty level (higher grade = harder tasks)
function getGradeDifficultyMultiplier(gradeName) {
    const gradeMap = {
        'Første årstrinn': 1,
        'Andre årstrinn': 2,
        'Tredje årstrinn': 3,
        'Fjerde årstrinn': 4,
        'Femte årstrinn': 5,
        'Sjette årstrinn': 6,
        'Syende årstrinn': 7,
        'Åttende årstrinn': 8,
        'Niende årstrinn': 9,
        'Tiende årstrinn': 10,
        'general': 3 // Default to middle difficulty
    };
    
    return gradeMap[gradeName] || 3;
}

// Function to adjust task difficulty based on grade
function adjustTaskDifficultyForGrade(tasks, gradeName, taskType) {
    const difficultyLevel = getGradeDifficultyMultiplier(gradeName);
    const taskPool = taskGenerators[taskType];
    
    // Create grade-appropriate tasks based on difficulty level
    if (difficultyLevel <= 2) {
        // Lower grades: mostly easy, some medium
        return {
            easy: taskPool.easy.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_easy_${index + 1}`,
                difficulty: 'easy',
                grade: gradeName,
                ...task
            })),
            medium: taskPool.easy.slice(3, 6).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_medium_${index + 1}`,
                difficulty: 'medium',
                grade: gradeName,
                ...task
            })),
            hard: taskPool.medium.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_hard_${index + 1}`,
                difficulty: 'hard',
                grade: gradeName,
                ...task
            }))
        };
    } else if (difficultyLevel <= 5) {
        // Middle grades: balanced mix
        return {
            easy: taskPool.easy.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_easy_${index + 1}`,
                difficulty: 'easy',
                grade: gradeName,
                ...task
            })),
            medium: taskPool.medium.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_medium_${index + 1}`,
                difficulty: 'medium',
                grade: gradeName,
                ...task
            })),
            hard: taskPool.hard.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_hard_${index + 1}`,
                difficulty: 'hard',
                grade: gradeName,
                ...task
            }))
        };
    } else {
        // Higher grades: more challenging tasks
        return {
            easy: taskPool.medium.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_easy_${index + 1}`,
                difficulty: 'easy',
                grade: gradeName,
                ...task
            })),
            medium: taskPool.hard.slice(0, 3).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_medium_${index + 1}`,
                difficulty: 'medium',
                grade: gradeName,
                ...task
            })),
            hard: taskPool.hard.slice(3, 6).map((task, index) => ({
                id: `${tasks.activityId}_${gradeName.replace(/\s+/g, '_').toLowerCase()}_hard_${index + 1}`,
                difficulty: 'hard',
                grade: gradeName,
                ...task
            }))
        };
    }
}

// Function to generate tasks for an activity with grade support
function generateTasks(activity) {
    const taskType = getTaskType(activity);
    const grades = parseGrades(activity.grade);
    const tasksPerGrade = activity.number_of_tasks;
    
    // If only 9 tasks and multiple grades, scale accordingly
    if (activity.number_of_tasks === 9) {
        const gradeResults = {};
        
        grades.forEach(gradeName => {
            gradeResults[gradeName] = adjustTaskDifficultyForGrade({
                activityId: activity.id
            }, gradeName, taskType);
        });
        
        return {
            totalTasks: activity.number_of_tasks * grades.length,
            tasksPerGrade: activity.number_of_tasks,
            grades: gradeResults
        };
    } else {
        // For other numbers, generate mixed difficulty per grade
        const gradeResults = {};
        const taskPool = taskGenerators[taskType];
        const allTasks = [...taskPool.easy, ...taskPool.medium, ...taskPool.hard];
        
        grades.forEach(gradeName => {
            gradeResults[gradeName] = {
                tasks: allTasks.slice(0, activity.number_of_tasks).map((task, index) => ({
                    id: `${activity.id}_${gradeName.replace(' ', '_').toLowerCase()}_task_${index + 1}`,
                    difficulty: index < activity.number_of_tasks / 3 ? 'easy' : 
                               index < (activity.number_of_tasks * 2) / 3 ? 'medium' : 'hard',
                    grade: gradeName,
                    ...task
                }))
            };
        });
        
        return {
            totalTasks: activity.number_of_tasks * grades.length,
            tasksPerGrade: activity.number_of_tasks,
            grades: gradeResults
        };
    }
}

// Main function
function generateTaskFiles(specificActivityId = null) {
    try {
        // Read activities file
        const activitiesData = JSON.parse(fs.readFileSync(ACTIVITIES_FILE, 'utf8'));
        
        let processedCount = 0;
        let activityIds = [];
        
        for (const activity of activitiesData) {
            // Skip if specific activity ID is provided and this isn't it
            if (specificActivityId && activity.id !== specificActivityId) {
                continue;
            }
            
            // Only process activities with tasks
            if (activity.number_of_tasks > 0) {
                const tasks = generateTasks(activity);
                const taskFileName = `${activity.id}.json`;
                const taskFilePath = path.join(TASKS_OUTPUT_DIR, taskFileName);
                
                // Create task file structure
                const taskFileContent = {
                    activityId: activity.id,
                    activityTitle: activity.title,
                    totalTasks: tasks.totalTasks,
                    tasksPerGrade: tasks.tasksPerGrade,
                    supportedGrades: parseGrades(activity.grade),
                    generatedAt: new Date().toISOString(),
                    ...tasks
                };
                
                // Write task file
                fs.writeFileSync(taskFilePath, JSON.stringify(taskFileContent, null, 2));
                const gradeCount = parseGrades(activity.grade).length;
                console.log(`✅ Generated tasks for ${activity.title} (${activity.id}.json)`);
                console.log(`   📊 ${gradeCount} grade(s): ${parseGrades(activity.grade).join(', ')}`);
                console.log(`   🎯 Total tasks: ${taskFileContent.totalTasks} (${taskFileContent.tasksPerGrade} per grade)`);
                processedCount++;
                activityIds.push(activity.id);
            }
        }
        
        // Generate TypeScript types file
        if (!specificActivityId && processedCount > 0) {
            generateTypesFile(activityIds);
        }
        
        if (specificActivityId && processedCount === 0) {
            console.log(`❌ No activity found with ID: ${specificActivityId}`);
        } else {
            console.log(`\n🎉 Successfully generated task files for ${processedCount} activities`);
            console.log(`📁 Task files saved to: ${TASKS_OUTPUT_DIR}`);
        }
        
    } catch (error) {
        console.error('❌ Error generating task files:', error.message);
        process.exit(1);
    }
}

// Generate TypeScript declaration file
function generateTypesFile(activityIds) {
    const typesContent = `// Auto-generated TypeScript types for task files
// Generated on: ${new Date().toISOString()}

export interface Task {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  type: string;
  grade?: string; // Grade this task is designed for
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

export type ActivityId = ${activityIds.map(id => `'${id}'`).join(' | ')};

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
  ${activityIds.map(id => `'${id}'`).join(',\n  ')}
];
`;
    
    const typesFilePath = path.join(TASKS_OUTPUT_DIR, 'types.ts');
    fs.writeFileSync(typesFilePath, typesContent);
    console.log(`📝 Generated TypeScript types file: types.ts`);
}

// Command line interface
const args = process.argv.slice(2);
const specificActivityId = args[0];

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node generateTaskFiles.js [activity-id]

Options:
  activity-id    Generate tasks only for the specified activity ID
  --help, -h     Show this help message

Examples:
  node generateTaskFiles.js                    # Generate tasks for all activities
  node generateTaskFiles.js mattesheriff       # Generate tasks only for mattesheriff activity
    `);
    process.exit(0);
}

// Run the script
generateTaskFiles(specificActivityId);
