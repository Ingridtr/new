# CSV to Grade-based JSON Converter

This script converts a CSV file with activity data into JSON files organized by grade level.

## CSV Format

Your CSV file should have these columns:
- `ID`: Unique identifier for the activity
- `Learning goal`: The learning objective (used for grade detection if no Grade column)
- `Title`: Activity title
- `Time`: Duration of the activity
- `Location`: Where the activity takes place
- `Tools`: Required materials/tools
- `Groupsize`: Recommended group size
- `Grade`: (Optional) Explicit grade level
- `Introduction`: Introduction text
- `Main`: Main activity description
- `Examples`: Examples or additional information
- `Reflection`: Reflection questions/content
- `Tips`: Tips for teachers
- `Extra`: Extra information or extensions

## Text Formatting

The script automatically converts text formatting:
- **Bullet points**: Text separated by `-` becomes an array of bullet points
- **Numbered lists**: Text with numbered patterns (`1. 2. 3.` etc.) becomes an array of numbered items

### Examples:

**Bullet points input:**
```
Start activity - Divide into groups - Complete task - Discuss results
```

**Becomes:**
```json
[
  "Start activity",
  "Divide into groups", 
  "Complete task",
  "Discuss results"
]
```

**Numbered list input:**
```
1. First step here 2. Second step here 3. Third step here
```

**Becomes:**
```json
[
  "First step here",
  "Second step here",
  "Third step here"
]
```

## Usage

### Basic usage:
```bash
python scripts/csv_to_grade_json.py your_activities.csv
```

### Specify output directory:
```bash
python scripts/csv_to_grade_json.py your_activities.csv --output-dir ./output/grades
```

### Force a specific grade level:
```bash
python scripts/csv_to_grade_json.py your_activities.csv --force-grade "Andre årstrinn"
```

This is useful when:
- Your CSV file contains only activities for one grade level
- The automatic grade detection is not working correctly
- Your CSV has formatting issues that prevent proper grade detection

## Output

The script creates separate JSON files for each grade level:
- `andre_aarstrinn.json` (2nd grade)
- `tredje_aarstrinn.json` (3rd grade)
- `fjerde_aarstrinn.json` (4th grade)
- `femte_aarstrinn.json` (5th grade)
- `sjette_aarstrinn.json` (6th grade)
- `syvende_aarstrinn.json` (7th grade)

Each JSON file contains:
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

## Grade Detection

The script detects grade levels in this order:
1. Uses the `Grade` column if present
2. Searches the `Learning goal` text for grade indicators
3. Falls back to "Generelt" if no grade can be determined

Grade patterns recognized:
- Norwegian: `andre`, `tredje`, `fjerde`, `femte`, `sjette`, `syvende`
- Numbers: `2`, `3`, `4`, `5`, `6`, `7`
- Explicit: `år 2`, `år 3`, etc.

## Testing

Test the script with the example file:
```bash
python scripts/csv_to_grade_json.py scripts/example_activities_with_grade.csv --output-dir ./test_output
```
