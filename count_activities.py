#!/usr/bin/env python3
"""
Script to count activities across all grades (2-7).
Counts the number of activity IDs in each grade file.
"""

import json
import os
from pathlib import Path

def count_activities():
    """Count activities in each grade file and return totals."""
    
    # Define the path to the grades directory
    grades_dir = Path("public/activityData/grades")
    
    # Dictionary to store counts for each grade
    grade_counts = {}
    total_activities = 0
    
    # Process grades 2-7
    for grade_num in range(2, 8):
        grade_file = grades_dir / f"{grade_num}.grade.json"
        
        if grade_file.exists():
            try:
                with open(grade_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Count activities by counting the number of items in the activities array
                activity_count = len(data.get("activities", []))
                grade_counts[grade_num] = activity_count
                total_activities += activity_count
                
                print(f"Grade {grade_num}: {activity_count} activities")
                
                # Verify with the total_activities field if it exists
                if "total_activities" in data:
                    stated_total = data["total_activities"]
                    if stated_total != activity_count:
                        print(f"  ⚠️  Warning: File states {stated_total} activities, but we counted {activity_count}")
                
            except json.JSONDecodeError as e:
                print(f"Error reading {grade_file}: Invalid JSON - {e}")
            except Exception as e:
                print(f"Error processing {grade_file}: {e}")
        else:
            print(f"Grade {grade_num}: File not found ({grade_file})")
            grade_counts[grade_num] = 0
    
    return grade_counts, total_activities

def main():
    """Main function to run the activity counter."""
    print("🔢 Counting activities across all grades...\n")
    
    grade_counts, total = count_activities()
    
    print("\n" + "="*40)
    print("📊 SUMMARY:")
    print("="*40)
    
    for grade, count in grade_counts.items():
        print(f"Grade {grade}: {count:2d} activities")
    
    print("-"*40)
    print(f"TOTAL:   {total:2d} activities")
    print("="*40)
    
    # Additional statistics
    if grade_counts:
        avg_per_grade = total / len([c for c in grade_counts.values() if c > 0])
        print(f"Average per grade: {avg_per_grade:.1f} activities")
        
        max_grade = max(grade_counts.items(), key=lambda x: x[1])
        min_grade = min(grade_counts.items(), key=lambda x: x[1])
        
        print(f"Most activities: Grade {max_grade[0]} ({max_grade[1]} activities)")
        print(f"Least activities: Grade {min_grade[0]} ({min_grade[1]} activities)")

if __name__ == "__main__":
    main()
