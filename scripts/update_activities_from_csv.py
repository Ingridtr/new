#!/usr/bin/env python3
"""
Update Activities from CSV Script

This script updates existing JSON activity files with new activities from CSV files.
It can:
1. Add new activities to existing grade JSON files
2. Update existing activities with new data
3. Merge multiple CSV files at once
4. Backup original files before making changes

Usage:
    python update_activities_from_csv.py activities.csv
    python update_activities_from_csv.py activities.csv --grade "Andre årstrinn"
    python update_activities_from_csv.py *.csv --backup
    python update_activities_from_csv.py activities.csv --dry-run
"""

import csv
import json
import os
import re
import argparse
import shutil
from datetime import datetime
from typing import Dict, List, Any, Optional

def parse_text_content(text: str) -> List[str]:
    """Parse text content into array format for bullet points and numbered lists."""
    if not text or text.strip() == "":
        return []
    
    text = text.strip()
    
    # Check if text contains numbered list pattern (1. 2. 3. etc.)
    numbered_pattern = r'\d+\.\s+'
    if re.search(numbered_pattern, text):
        items = re.split(numbered_pattern, text)
        items = [item.strip() for item in items if item.strip()]
        return items
    
    # Check if text contains bullet points (-)
    elif '-' in text:
        items = [item.strip() for item in text.split('-') if item.strip()]
        return items
    
    # Single item text
    else:
        return [text]

def extract_grade_from_id_or_learning_goal(activity_id: str, learning_goal: str, force_grade: str = None) -> str:
    """Extract grade from activity ID or learning goal."""
    if force_grade:
        return force_grade
    
    # Try to extract from activity ID first (assuming AXXYY format where A indicates grade 2)
    if activity_id.startswith('A') and len(activity_id) >= 5:
        # For now, assume all A-prefixed IDs are for 2nd grade
        # You can expand this logic for other grades
        return "Andre årstrinn"
    
    # Fallback to learning goal patterns
    grade_patterns = {
        'andre': 'Andre årstrinn',
        'tredje': 'Tredje årstrinn', 
        'fjerde': 'Fjerde årstrinn',
        'femte': 'Femte årstrinn',
        'sjette': 'Sjette årstrinn',
        'syvende': 'Syvende årstrinn',
        '2': 'Andre årstrinn',
        '3': 'Tredje årstrinn',
        '4': 'Fjerde årstrinn', 
        '5': 'Femte årstrinn',
        '6': 'Sjette årstrinn',
        '7': 'Syvende årstrinn'
    }
    
    learning_goal_lower = learning_goal.lower()
    for pattern, grade in grade_patterns.items():
        if pattern in learning_goal_lower:
            return grade
    
    return "Andre årstrinn"  # Default to 2nd grade

def get_grade_filename(grade: str) -> str:
    """Convert grade name to filename format."""
    grade_filename_map = {
        "Andre årstrinn": "2.grade.json",
        "Tredje årstrinn": "3.grade.json",
        "Fjerde årstrinn": "4.grade.json",
        "Femte årstrinn": "5.grade.json",
        "Sjette årstrinn": "6.grade.json",
        "Syvende årstrinn": "7.grade.json",
    }
    return grade_filename_map.get(grade, "2.grade.json")

def load_existing_grade_data(grade_file_path: str) -> Dict[str, Any]:
    """Load existing grade data from JSON file."""
    if os.path.exists(grade_file_path):
        with open(grade_file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        # Return empty structure if file doesn't exist
        grade_name = os.path.basename(grade_file_path).replace('.grade.json', '').replace('2', 'Andre årstrinn')
        return {
            "grade": grade_name,
            "total_activities": 0,
            "activities": []
        }

def create_activity_from_csv_row(row: Dict[str, str]) -> Dict[str, Any]:
    """Create activity object from CSV row data."""
    # Clean up the row data
    cleaned_row = {key.strip(): value.strip() if value else "" for key, value in row.items() if key}
    
    activity = {
        "id": cleaned_row.get('ID', ''),
        "title": cleaned_row.get('Title', ''),
        "time": cleaned_row.get('Time', ''),
        "location": cleaned_row.get('Location', ''),
        "tools": cleaned_row.get('Tools', ''),
        "groupsize": cleaned_row.get('Groupsize', ''),
        "learning_goal": cleaned_row.get('Learning goal', ''),
        "content": {
            "introduction": parse_text_content(cleaned_row.get('Introduction', '')),
            "main": parse_text_content(cleaned_row.get('Main', '')),
            "examples": parse_text_content(cleaned_row.get('Examples', '')),
            "reflection": parse_text_content(cleaned_row.get('Reflection', '')),
            "tips": parse_text_content(cleaned_row.get('Tips', '')),
            "extra": parse_text_content(cleaned_row.get('Extra', ''))
        }
    }
    
    return activity

def backup_file(file_path: str) -> str:
    """Create a backup of the file with timestamp."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{file_path}.backup_{timestamp}"
    shutil.copy2(file_path, backup_path)
    return backup_path

def update_activities_from_csv(csv_files: List[str], 
                             output_dir: str = "./public/activityData/grades", 
                             force_grade: str = None,
                             create_backup: bool = False,
                             dry_run: bool = False) -> None:
    """Update JSON files with activities from CSV files."""
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Dictionary to store all changes by grade
    changes_by_grade: Dict[str, Dict[str, List[Dict[str, Any]]]] = {}
    
    # Process each CSV file
    for csv_file in csv_files:
        if not os.path.exists(csv_file):
            print(f"⚠️  Warning: CSV file '{csv_file}' not found, skipping...")
            continue
            
        print(f"📄 Processing {csv_file}...")
        
        with open(csv_file, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            # Clean up column names
            reader.fieldnames = [field.strip() if field else field for field in reader.fieldnames]
            
            for row in reader:
                try:
                    activity = create_activity_from_csv_row(row)
                    
                    # Skip rows with missing essential data
                    if not activity['id'] or not activity['title']:
                        print(f"⚠️  Skipping row with missing ID or Title: {activity}")
                        continue
                    
                    # Determine grade
                    grade = extract_grade_from_id_or_learning_goal(
                        activity['id'], 
                        activity['learning_goal'], 
                        force_grade
                    )
                    
                    # Initialize grade in changes dict
                    if grade not in changes_by_grade:
                        changes_by_grade[grade] = {"new": [], "updated": []}
                    
                    changes_by_grade[grade]["new"].append(activity)
                    
                except Exception as e:
                    print(f"❌ Error processing row: {e}")
                    continue
    
    # Process changes for each grade
    for grade, changes in changes_by_grade.items():
        grade_filename = get_grade_filename(grade)
        grade_file_path = os.path.join(output_dir, grade_filename)
        
        # Load existing data
        existing_data = load_existing_grade_data(grade_file_path)
        existing_activities = existing_data.get("activities", [])
        
        # Create a map of existing activities by ID for quick lookup
        existing_by_id = {activity["id"]: activity for activity in existing_activities}
        
        # Separate new activities from updates
        new_activities = []
        updated_activities = []
        
        for activity in changes["new"]:
            if activity["id"] in existing_by_id:
                updated_activities.append(activity)
            else:
                new_activities.append(activity)
        
        # Update existing activities and add new ones
        final_activities = []
        
        # Keep existing activities, update if needed
        for existing_activity in existing_activities:
            activity_id = existing_activity["id"]
            updated_activity = next((a for a in updated_activities if a["id"] == activity_id), None)
            
            if updated_activity:
                final_activities.append(updated_activity)
                print(f"🔄 Will update activity {activity_id}: {updated_activity['title']}")
            else:
                final_activities.append(existing_activity)
        
        # Add new activities
        for new_activity in new_activities:
            final_activities.append(new_activity)
            print(f"➕ Will add new activity {new_activity['id']}: {new_activity['title']}")
        
        # Create updated grade data
        updated_grade_data = {
            "grade": grade,
            "total_activities": len(final_activities),
            "activities": final_activities
        }
        
        # Show summary
        print(f"\n📊 Summary for {grade}:")
        print(f"   📈 New activities: {len(new_activities)}")
        print(f"   🔄 Updated activities: {len(updated_activities)}")
        print(f"   📝 Total activities: {len(final_activities)}")
        
        if dry_run:
            print(f"   🧪 [DRY RUN] Would save to: {grade_file_path}")
            continue
        
        # Create backup if requested
        if create_backup and os.path.exists(grade_file_path):
            backup_path = backup_file(grade_file_path)
            print(f"   💾 Backup created: {backup_path}")
        
        # Write updated data
        with open(grade_file_path, 'w', encoding='utf-8') as f:
            json.dump(updated_grade_data, f, ensure_ascii=False, indent=2)
        
        print(f"   ✅ Updated {grade_file_path}")
    
    if dry_run:
        print(f"\n🧪 DRY RUN completed. No files were modified.")
    else:
        print(f"\n✅ Update completed! Processed {len(changes_by_grade)} grade levels.")

def main():
    parser = argparse.ArgumentParser(
        description='Update grade JSON files with activities from CSV files',
        epilog='''
Examples:
  python update_activities_from_csv.py activities.csv
  python update_activities_from_csv.py *.csv --backup
  python update_activities_from_csv.py activities.csv --grade "Andre årstrinn" --dry-run
        ''',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument('csv_files', nargs='+', help='CSV file(s) to process')
    parser.add_argument('--output-dir', default='./public/activityData/grades',
                       help='Directory containing grade JSON files (default: ./public/activityData/grades)')
    parser.add_argument('--grade', '--force-grade', dest='force_grade',
                       help='Force all activities to use this grade level (e.g., "Andre årstrinn")')
    parser.add_argument('--backup', action='store_true',
                       help='Create backup files before making changes')
    parser.add_argument('--dry-run', action='store_true',
                       help='Show what would be changed without making actual changes')
    
    args = parser.parse_args()
    
    # Validate CSV files exist
    missing_files = [f for f in args.csv_files if not os.path.exists(f)]
    if missing_files:
        print(f"❌ Error: CSV file(s) not found: {', '.join(missing_files)}")
        return
    
    print(f"🚀 Starting update process...")
    print(f"📁 Input files: {', '.join(args.csv_files)}")
    print(f"📂 Output directory: {args.output_dir}")
    if args.force_grade:
        print(f"🎯 Forced grade: {args.force_grade}")
    if args.backup:
        print(f"💾 Backup enabled")
    if args.dry_run:
        print(f"🧪 DRY RUN mode - no files will be modified")
    print()
    
    update_activities_from_csv(
        args.csv_files,
        args.output_dir,
        args.force_grade,
        args.backup,
        args.dry_run
    )

if __name__ == "__main__":
    main()
