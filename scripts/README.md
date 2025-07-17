# Task File Generator

This script automatically generates individual JSON task files for each activity based on the `activities.json` file.

## Overview

The script reads the `activities.json` file and creates separate task files for each activity that has `number_of_tasks > 0`. Each task file contains:

- **For activities with 9 tasks**: Split into 3 difficulty levels (easy, medium, hard) with 3 tasks each
- **For other task counts**: Mixed difficulty tasks up to the specified number

## File Structure

Generated task files are saved to: `public/activityData/tasks/`

Each file is named using the activity ID: `{activity-id}.json`

## Usage

### Method 1: Using npm scripts (Recommended)

```bash
# Generate tasks for all activities
npm run generate-tasks

# Get help
npm run generate-tasks:help

# Generate tasks for a specific activity
npm run generate-tasks mattesheriff
```

### Method 2: Using the bash script

```bash
# Generate tasks for all activities
./scripts/generateTasks.sh

# Generate tasks for a specific activity
./scripts/generateTasks.sh mattesheriff

# Get help
./scripts/generateTasks.sh --help
```

### Method 3: Direct node execution

```bash
# Generate tasks for all activities
node scripts/generateTaskFiles.js

# Generate tasks for a specific activity
node scripts/generateTaskFiles.js mattesheriff

# Get help
node scripts/generateTaskFiles.js --help
```

## Task Types

The script automatically determines the appropriate task type based on the activity:

- **Math tasks**: Basic arithmetic, calculations
- **Geometry tasks**: Shapes, areas, perimeters, angles
- **Time tasks**: Clock reading, time calculations, duration

## Example Output

For an activity with ID `mattesheriff` and `number_of_tasks: 9`, the generated file `mattesheriff.json` will contain:

```json
{
  "activityId": "mattesheriff",
  "activityTitle": "Mattesheriff",
  "totalTasks": 9,
  "generatedAt": "2025-07-17T12:00:00.000Z",
  "easy": [
    {
      "id": "mattesheriff_easy_1",
      "difficulty": "easy",
      "question": "Hva er 3 + 4?",
      "answer": "7",
      "type": "addition"
    }
    // ... 2 more easy tasks
  ],
  "medium": [
    // ... 3 medium tasks
  ],
  "hard": [
    // ... 3 hard tasks
  ]
}
```

## Customizing Tasks

To customize the tasks generated for different activities, modify the `taskGenerators` object in `scripts/generateTaskFiles.js`. You can:

1. Add new task types
2. Modify existing questions and answers
3. Add more tasks to each difficulty level
4. Change the logic for determining task types based on activity properties

## Re-running the Script

You can run the script multiple times. It will overwrite existing task files, which is useful when:

- Adding new activities to `activities.json`
- Updating the number of tasks for existing activities
- Modifying the task generation logic

## Requirements

- Node.js (any recent version)
- The script assumes the existence of `public/activityData/activities.json`
