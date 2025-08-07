# Activity Restructuring - Quick Start Guide

## What I've Created for You

### 1. Main Conversion Script
**File:** `scripts/csv_to_grade_json.py`
- Converts your CSV export into grade-based JSON files
- Handles bullet points (text with `-`) and numbered lists (text with `1. 2. 3.`)
- Automatically detects grade levels
- Creates separate JSON files for each grade

### 2. Type Definitions  
**File:** `public/activityData/gradeTypes.ts`
- TypeScript interfaces for the new structure
- Use these in your React components

### 3. Helper Script
**File:** `scripts/grade_activity_helper.py`
- Utilities for working with the new grade-based structure
- Examples of how to query and filter activities
- Can export back to old format if needed

### 4. Documentation
**File:** `scripts/README_CSV_Converter.md`
- Detailed documentation on how to use the converter
- Examples of CSV format and text formatting

## How to Use

### Step 1: Prepare Your CSV
Export your Excel file as CSV with these columns:
```
ID, Learning goal, Title, Time, Location, Tools, Groupsize, Grade, Introduction, Main, Examples, Reflection, Tips, Extra
```

### Step 2: Convert to JSON
```bash
# Basic conversion (auto-detects grade from learning goals)
npm run convert-csv your_activities.csv

# Force a specific grade level (useful when auto-detection fails)
python scripts/csv_to_grade_json.py your_activities.csv --force-grade "Andre årstrinn"

# Or specify output directory
python scripts/csv_to_grade_json.py your_activities.csv --output-dir ./public/activityData/grades
```

### Step 3: Results
You'll get separate JSON files for each grade:
- `andre_aarstrinn.json` (2nd grade)
- `tredje_aarstrinn.json` (3rd grade)
- `fjerde_aarstrinn.json` (4th grade)
- etc.

## Text Formatting Examples

### Bullet Points (use `-`)
**Input:** `Start activity - Divide groups - Complete task`
**Output:** `["Start activity", "Divide groups", "Complete task"]`

### Numbered Lists (use `1. 2. 3.`)
**Input:** `1. First step 2. Second step 3. Third step`
**Output:** `["First step", "Second step", "Third step"]`

## JSON Structure
```json
{
  "grade": "Andre årstrinn",
  "total_activities": 5,
  "activities": [
    {
      "id": "activity-id",
      "title": "Activity Title",
      "time": "30 minutter",
      "location": "Ute",
      "tools": "Required tools",
      "groupsize": "Hele klassen",
      "learning_goal": "Learning objective",
      "content": {
        "introduction": ["Introduction text"],
        "main": ["Main activity steps"],
        "examples": ["Examples"],
        "reflection": ["Reflection questions"], 
        "tips": ["Teaching tips"],
        "extra": ["Extra information"]
      }
    }
  ]
}
```

## Test Files Included
- `scripts/example_activities_with_grade.csv` - Example CSV format
- Use this to test the conversion before using your real data

## Next Steps
1. Export your Excel as CSV with the correct column names
2. Run the conversion script
3. Update your React components to use the new grade-based structure
4. Consider using the TypeScript interfaces I created

The script is ready to use with your data! 🎉
