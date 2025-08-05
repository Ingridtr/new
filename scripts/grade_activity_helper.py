#!/usr/bin/env python3
"""
Integration helper for the new grade-based activity structure.

This script demonstrates how to work with the new grade-based JSON files
and provides utilities for common operations.
"""

import json
import os
from typing import Dict, List, Any

def load_grade_activities(grade_dir: str = "./public/activityData/grades") -> Dict[str, Any]:
    """Load all grade-based activity files"""
    grades = {}
    
    if not os.path.exists(grade_dir):
        print(f"Grade directory {grade_dir} not found!")
        return grades
    
    for filename in os.listdir(grade_dir):
        if filename.endswith('.json'):
            grade_file = os.path.join(grade_dir, filename)
            with open(grade_file, 'r', encoding='utf-8') as f:
                grade_data = json.load(f)
                grades[grade_data['grade']] = grade_data
    
    return grades

def get_activities_by_learning_goal(grades: Dict[str, Any], learning_goal_keyword: str) -> List[Dict]:
    """Find activities that match a learning goal keyword"""
    matching_activities = []
    
    for grade_name, grade_data in grades.items():
        for activity in grade_data['activities']:
            if learning_goal_keyword.lower() in activity['learning_goal'].lower():
                activity_with_grade = activity.copy()
                activity_with_grade['grade'] = grade_name
                matching_activities.append(activity_with_grade)
    
    return matching_activities

def get_activities_by_time(grades: Dict[str, Any], max_minutes: int) -> List[Dict]:
    """Find activities that fit within a time limit"""
    matching_activities = []
    
    for grade_name, grade_data in grades.items():
        for activity in grade_data['activities']:
            time_str = activity['time'].lower()
            # Extract minutes from time string (e.g., "45 minutter" -> 45)
            try:
                minutes = int(''.join(filter(str.isdigit, time_str)))
                if minutes <= max_minutes:
                    activity_with_grade = activity.copy()
                    activity_with_grade['grade'] = grade_name
                    matching_activities.append(activity_with_grade)
            except ValueError:
                continue
    
    return matching_activities

def export_to_old_format(grades: Dict[str, Any], output_file: str = "activities_old_format.json"):
    """Convert new format back to old format for compatibility"""
    old_format_activities = []
    
    for grade_name, grade_data in grades.items():
        for activity in grade_data['activities']:
            old_activity = {
                "id": activity['id'],
                "title": activity['title'],
                "description": " ".join(activity['content']['introduction'] + activity['content']['main']),
                "time": activity['time'],
                "location": activity['location'],
                "tools": activity['tools'],
                "grade": grade_name,
                "learning_goal": activity['learning_goal']
            }
            old_format_activities.append(old_activity)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(old_format_activities, f, ensure_ascii=False, indent=2)
    
    print(f"Exported {len(old_format_activities)} activities to {output_file}")

def main():
    """Demonstration of how to use the new grade-based structure"""
    print("Loading grade-based activities...")
    grades = load_grade_activities("./test_output")  # Use test output for demo
    
    if not grades:
        print("No grade files found!")
        return
    
    print(f"Loaded {len(grades)} grade levels:")
    for grade_name, grade_data in grades.items():
        print(f"  - {grade_name}: {grade_data['total_activities']} activities")
    
    print("\\n" + "="*50)
    print("EXAMPLE: Finding activities about 'tallinja'")
    tallinja_activities = get_activities_by_learning_goal(grades, "tallinja")
    for activity in tallinja_activities:
        print(f"- {activity['title']} ({activity['grade']})")
    
    print("\\n" + "="*50)
    print("EXAMPLE: Finding short activities (≤15 minutes)")
    short_activities = get_activities_by_time(grades, 15)
    for activity in short_activities:
        print(f"- {activity['title']} ({activity['time']}, {activity['grade']})")
    
    print("\\n" + "="*50)
    print("EXAMPLE: Exporting to old format for compatibility")
    export_to_old_format(grades, "test_old_format.json")

if __name__ == "__main__":
    main()
