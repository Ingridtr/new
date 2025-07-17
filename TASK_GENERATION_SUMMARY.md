# Task Generation System - Summary

## What was created

I've successfully created a comprehensive task generation system for your activities. Here's what was set up:

### 📁 Files Created

1. **`scripts/generateTaskFiles.js`** - Main Node.js script for generating task files
2. **`scripts/generateTasks.sh`** - Bash wrapper script with colored output
3. **`scripts/README.md`** - Comprehensive documentation
4. **`public/activityData/tasks/`** - Directory containing all generated task files
5. **`public/activityData/tasks/index.ts`** - TypeScript index for easy importing

### 📋 Generated Task Files

The script successfully generated **20 task files** for all activities with `number_of_tasks > 0`:

- `mattesheriff.json`, `tallinje.json`, `stiv-heks.json`, `poster-skattejakt.json`
- `pastandsveggene.json`, `nappe-hale.json`, `laere-klokka.json`, `problemlosning-hverdagen.json`
- `regnefrisbee.json`, `bingo.json`, `hoderegning-kortstokk.json`, `hangman-figurer.json`
- `tiervenner.json`, `terningskast.json`, `hvem-er-jeg.json`, `geometridans.json`
- `ranger-meg.json`, `mattememory.json`, `stafett.json`, `hundrenett.json`

### 🏗️ Task Structure

Each task file contains:
- **Activity metadata** (ID, title, total tasks, generation timestamp)
- **For 9 tasks**: Split into `easy`, `medium`, `hard` (3 tasks each)
- **For other counts**: Mixed difficulty tasks

### 🎯 Smart Task Assignment

The script automatically determines appropriate task types:
- **Math tasks**: For general activities (addition, subtraction, multiplication, division)
- **Time tasks**: For clock/time-related activities (time reading, calculations, duration)
- **Geometry tasks**: For shape/figure activities (areas, perimeters, angles)

## 🚀 How to Use

### Generate all task files:
```bash
npm run generate-tasks
```

### Generate for specific activity:
```bash
npm run generate-tasks mattesheriff
```

### Using bash script:
```bash
./scripts/generateTasks.sh
./scripts/generateTasks.sh mattesheriff
```

### Get help:
```bash
npm run generate-tasks:help
./scripts/generateTasks.sh --help
```

## 📊 Example Output

A generated task file looks like this:

```json
{
  "activityId": "mattesheriff",
  "activityTitle": "Mattesheriff",
  "totalTasks": 9,
  "generatedAt": "2025-07-17T09:54:41.985Z",
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

## 🔧 Customization

To customize tasks:
1. Edit the `taskGenerators` object in `scripts/generateTaskFiles.js`
2. Add new task types, questions, or modify existing ones
3. Re-run the script to regenerate files

## ✅ Features

- ✅ Automatically processes all activities with tasks
- ✅ Intelligently categorizes tasks by activity type
- ✅ Generates appropriate difficulty levels
- ✅ Creates unique task IDs
- ✅ Supports single activity generation
- ✅ Includes comprehensive error handling
- ✅ Provides multiple usage methods (npm, bash, direct node)
- ✅ Full documentation and help system
- ✅ TypeScript index for easy importing

## 🔄 Re-running

The script can be run multiple times safely - it will overwrite existing files, making it perfect for:
- Adding new activities
- Updating task counts
- Modifying task generation logic

The system is now ready for use and can be easily extended as your project grows!
