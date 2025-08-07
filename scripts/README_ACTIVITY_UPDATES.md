# Activity Update Scripts

This folder contains scripts to help you manage and update activity data from CSV files.

## Quick Usage

### Simple Update
```bash
# Update activities from a CSV file
./scripts/update_activities.sh new_activities.csv
```

### With Options
```bash
# Preview changes without actually updating
./scripts/update_activities.sh activities.csv --dry-run

# Create backup before updating
./scripts/update_activities.sh activities.csv --backup

# Force all activities to specific grade
./scripts/update_activities.sh activities.csv --grade "Andre årstrinn"

# Update multiple CSV files at once
./scripts/update_activities.sh *.csv --backup
```

## CSV File Format

Your CSV file should have these columns:

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| ID | ✅ Yes | Activity ID in AXXYY format | A0101 |
| Title | ✅ Yes | Activity title | "Lag en maurtue!" |
| Time | No | Duration in minutes | "15" |
| Location | No | Where to do activity | "Inne / ute" |
| Tools | No | Required tools | "Ingen" |
| Groupsize | No | Group size | "3-5" |
| Learning goal | No | Learning objective | "Ordne tal, mengder..." |
| Introduction | No | Activity introduction | "I denne aktiviteten..." |
| Main | No | Main activity steps | "1. Samle elevene 2. Del dem..." |
| Examples | No | Examples or variations | "Eksempel 1: ..." |
| Reflection | No | Reflection questions | "Hva lærte dere?" |
| Tips | No | Tips for teachers | "Tips: Bruk..." |
| Extra | No | Additional information | "Ekstra info..." |

### Text Formatting in CSV

- **Bullet points**: Use `-` to separate items
  - Example: `"Punkt 1 - Punkt 2 - Punkt 3"`
  - Becomes: `["Punkt 1", "Punkt 2", "Punkt 3"]`

- **Numbered lists**: Use `1. 2. 3.` format
  - Example: `"1. Første steg 2. Andre steg 3. Tredje steg"`
  - Becomes: `["Første steg", "Andre steg", "Tredje steg"]`

## What the Script Does

1. **Reads your CSV file** with new or updated activities
2. **Loads existing JSON files** from `public/activityData/grades/`
3. **Merges the data**:
   - Adds new activities (based on ID)
   - Updates existing activities with new data
   - Preserves activities not in the CSV
4. **Updates the JSON files** with the merged data
5. **Reports what was changed**

## Safety Features

- **Backup creation**: Use `--backup` to create timestamped backups
- **Dry run mode**: Use `--dry-run` to preview changes
- **Validation**: Checks for required fields before processing
- **Error handling**: Continues processing even if some rows fail

## Examples

### Adding 5 new activities for 2nd grade:
```bash
./scripts/update_activities.sh new_grade2_activities.csv --grade "Andre årstrinn" --backup
```

Output:
```
📄 Processing new_grade2_activities.csv...
➕ Will add new activity A0108: Tall-memory
➕ Will add new activity A0109: Regnekonkurranse
➕ Will add new activity A0110: Matematikk-bingo
➕ Will add new activity A0111: Tallsangen
➕ Will add new activity A0112: Geometri-lek

📊 Summary for Andre årstrinn:
   📈 New activities: 5
   🔄 Updated activities: 0
   📝 Total activities: 50
   💾 Backup created: ./public/activityData/grades/2.grade.json.backup_20250807_143022
   ✅ Updated ./public/activityData/grades/2.grade.json
```

### Updating existing activities:
If your CSV contains activities with IDs that already exist, they will be updated:

```bash
./scripts/update_activities.sh updated_activities.csv --dry-run
```

Output:
```
🔄 Will update activity A0101: Lag en maurtue! (updated version)
🔄 Will update activity A0102: Tallsystemet (updated version)

🧪 [DRY RUN] Would save to: ./public/activityData/grades/2.grade.json
```

## Troubleshooting

### Common Issues:

1. **"CSV file not found"**
   - Check the file path is correct
   - Make sure you're in the project root directory

2. **"Missing ID or Title"**
   - Ensure your CSV has ID and Title columns
   - Check that rows have values in these columns

3. **"Permission denied"**
   - Run: `chmod +x scripts/update_activities.sh`

### Getting Help:
```bash
./scripts/update_activities.sh --help
```

## Advanced Usage

### Direct Python Script
If you need more control, you can run the Python script directly:

```bash
python3 scripts/update_activities_from_csv.py --help
```

### Multiple Grade Levels
The script automatically detects grade levels from:
1. Activity ID patterns (A = 2nd grade by default)
2. Learning goal text content
3. Force with `--grade` parameter
