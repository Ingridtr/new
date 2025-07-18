#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ACTIVITIES_FILE = path.join(
  __dirname,
  "../public/activityData/activities.json"
);
const TASKS_OUTPUT_DIR = path.join(__dirname, "../public/activityData/tasks");

// Grade to API URL mappings - based on the kompetansemaalsett structure
const GRADE_API_MAPPINGS = {
  "Andre årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV20",
  "Tredje årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV22",
  "Fjerde årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV18",
  "Femte årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV19",
  "Sjette årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV21",
  "Syende årstrinn":
    "https://data.udir.no/kl06/v201906/kompetansemaalsett-lk20/KV17",
};

// Cache for learning goals to avoid repeated API calls
const learningGoalsCache = {};

// Fetch learning goals for a specific grade
async function fetchLearningGoalsForGrade(gradeName) {
  if (learningGoalsCache[gradeName]) {
    return learningGoalsCache[gradeName];
  }

  const apiUrl = GRADE_API_MAPPINGS[gradeName];
  if (!apiUrl) {
    console.warn(`No API URL found for grade: ${gradeName}`);
    return [];
  }

  try {
    console.log(`Fetching learning goals for ${gradeName}...`);
    const response = await fetch(apiUrl);
    const data = await response.json();

    const learningGoals = data.kompetansemaal || [];
    const goalTitles = learningGoals.map((goal) => goal.tittel);

    learningGoalsCache[gradeName] = goalTitles;
    return goalTitles;
  } catch (error) {
    console.error(`Error fetching learning goals for ${gradeName}:`, error);
    return [];
  }
}

// Select a random learning goal for a grade
function selectRandomLearningGoal(learningGoals) {
  if (!learningGoals || learningGoals.length === 0) {
    return "Generell matematisk kompetanse";
  }
  return learningGoals[Math.floor(Math.random() * learningGoals.length)];
}

// Ensure tasks directory exists
if (!fs.existsSync(TASKS_OUTPUT_DIR)) {
  fs.mkdirSync(TASKS_OUTPUT_DIR, { recursive: true });
}


// Function to parse grades from the grade string
function parseGrades(gradeString) {
  if (!gradeString || gradeString.trim() === "") {
    return ["general"]; // Default fallback
  }

  // Split by comma and clean up
  return gradeString
    .split(",")
    .map((grade) => grade.trim())
    .filter((grade) => grade !== "");
}


// Main function
async function generateTaskFiles(specificActivityId = null) {
  try {
    // Read activities file
    const activitiesData = JSON.parse(fs.readFileSync(ACTIVITIES_FILE, "utf8"));

    let processedCount = 0;
    let activityIds = [];

    for (const activity of activitiesData) {
      // Skip if specific activity ID is provided and this isn't it
      if (specificActivityId && activity.id !== specificActivityId) {
        continue;
      }

      // Only process activities with tasks
      if (activity.number_of_tasks > 0) {
        const tasks = await generateTasks(activity);
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
          ...tasks,
        };

        // Write task file
        fs.writeFileSync(
          taskFilePath,
          JSON.stringify(taskFileContent, null, 2)
        );
        const gradeCount = parseGrades(activity.grade).length;
        console.log(
          `✅ Generated tasks for ${activity.title} (${activity.id}.json)`
        );
        console.log(
          `   📊 ${gradeCount} grade(s): ${parseGrades(activity.grade).join(
            ", "
          )}`
        );
        console.log(
          `   🎯 Total tasks: ${taskFileContent.totalTasks} (${taskFileContent.tasksPerGrade} per grade)`
        );
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
      console.log(
        `\n🎉 Successfully generated task files for ${processedCount} activities`
      );
      console.log(`📁 Task files saved to: ${TASKS_OUTPUT_DIR}`);
    }
  } catch (error) {
    console.error("❌ Error generating task files:", error.message);
    process.exit(1);
  }
}


// Command line interface
const args = process.argv.slice(2);
const specificActivityId = args[0];

if (args.includes("--help") || args.includes("-h")) {
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
generateTaskFiles(specificActivityId).catch((error) => {
  console.error("❌ Script execution failed:", error);
  process.exit(1);
});
