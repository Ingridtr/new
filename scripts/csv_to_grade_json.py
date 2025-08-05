#!/usr/bin/env python3
"""
CSV to Grade-based JSON Converter for Activities

This script converts a CSV file with activity data into JSON files organized by grade.
The CSV should have these columns: ID, Learning goal, Title, Time, Location, Tools, 
Groupsize, Introduction, Main, Examples, Reflection, Tips, Extra

Text formatting:
- Text divided with "-" becomes bullet points (array)
- Text divided with "1,2,3..." becomes numbered lists (array)
"""

import csv
import json
import os
import re
import argparse
from typing import Dict, List, Any

def parse_text_content(text: str) -> List[str]:
    """
    Parse text content and convert to appropriate format:
    - Split on "-" for bullet points
    - Split on numbered patterns (1., 2., 3., etc.) for numbered lists
    - Return as array of strings
    """
    if not text or text.strip() == "":
        return []
    
    text = text.strip()
    
    # Check if text contains numbered list pattern (1. 2. 3. etc.)
    numbered_pattern = r'\d+\.\s+'
    if re.search(numbered_pattern, text):
        # Split on numbered patterns and clean up
        items = re.split(numbered_pattern, text)
        # Remove empty first element (text before first number)
        items = [item.strip() for item in items if item.strip()]
        return items
    
    # Check if text contains bullet points (-)
    elif '-' in text:
        # Split on dash and clean up
        items = [item.strip() for item in text.split('-') if item.strip()]
        return items
    
    # Single item text
    else:
        return [text]

def extract_grade_from_learning_goal(learning_goal: str, grade_column: str = None) -> str:
    """
    Extract grade from learning goal string or dedicated grade column.
    """
    # If we have a dedicated grade column, use that first
    if grade_column and grade_column.strip():
        return grade_column.strip()
    
    # Common Norwegian grade patterns
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
        '7': 'Syvende årstrinn',
        'år 2': 'Andre årstrinn',
        'år 3': 'Tredje årstrinn',
        'år 4': 'Fjerde årstrinn',
        'år 5': 'Femte årstrinn',
        'år 6': 'Sjette årstrinn',
        'år 7': 'Syvende årstrinn'
    }
    
    learning_goal_lower = learning_goal.lower()
    for pattern, grade in grade_patterns.items():
        if pattern in learning_goal_lower:
            return grade
    
    # Default fallback - you might want to handle this differently
    return "Generelt"

def convert_csv_to_grade_json(csv_file_path: str, output_dir: str = "./public/activityData/grades", force_grade: str = None):
    """
    Convert CSV file to grade-based JSON files
    """
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Dictionary to store activities by grade
    activities_by_grade: Dict[str, List[Dict[str, Any]]] = {}
    
    # Read and process CSV
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        # Clean up column names (remove extra whitespace)
        reader.fieldnames = [field.strip() if field else field for field in reader.fieldnames]
        
        for row in reader:
            # Create a cleaned row dictionary with trimmed keys
            cleaned_row = {key.strip(): value for key, value in row.items() if key}
            
            try:
                # Extract and clean data with better error handling
                activity_id = cleaned_row.get('ID', '').strip()
                learning_goal = cleaned_row.get('Learning goal', '').strip()
                title = cleaned_row.get('Title', '').strip()
                time = cleaned_row.get('Time', '').strip()
                location = cleaned_row.get('Location', '').strip()
                tools = cleaned_row.get('Tools', '').strip()
                groupsize = cleaned_row.get('Groupsize', '').strip()
                introduction = parse_text_content(cleaned_row.get('Introduction', ''))
                main = parse_text_content(cleaned_row.get('Main', ''))
                examples = parse_text_content(cleaned_row.get('Examples', ''))
                reflection = parse_text_content(cleaned_row.get('Reflection', ''))
                tips = parse_text_content(cleaned_row.get('Tips', ''))
                extra = parse_text_content(cleaned_row.get('Extra', ''))
                
                # Skip rows with missing essential data
                if not activity_id or not title:
                    print(f"Skipping row with missing ID or Title: {cleaned_row}")
                    continue
                
                # Determine grade
                if force_grade:
                    grade = force_grade
                else:
                    # Check if there's a dedicated Grade column
                    grade_column = cleaned_row.get('Grade', '')
                    # Determine grade from learning goal or grade column
                    grade = extract_grade_from_learning_goal(learning_goal, grade_column)
                
                # Create activity object
                activity = {
                    "id": activity_id,
                    "title": title,
                    "time": time,
                    "location": location,
                    "tools": tools,
                    "groupsize": groupsize,
                    "learning_goal": learning_goal,
                    "content": {
                        "introduction": introduction,
                        "main": main,
                        "examples": examples,
                        "reflection": reflection,
                        "tips": tips,
                        "extra": extra
                    }
                }
                
                # Add to grade-based collection
                if grade not in activities_by_grade:
                    activities_by_grade[grade] = []
                
                activities_by_grade[grade].append(activity)
                
            except Exception as e:
                print(f"Error processing row: {e}")
                print(f"Row data: {cleaned_row}")
                continue
    
    # Write JSON files for each grade
    for grade, activities in activities_by_grade.items():
        # Create safe filename
        safe_grade = grade.lower().replace(' ', '_').replace('å', 'aa')
        filename = f"{safe_grade}.json"
        filepath = os.path.join(output_dir, filename)
        
        # Create grade object
        grade_data = {
            "grade": grade,
            "total_activities": len(activities),
            "activities": activities
        }
        
        # Write to file
        with open(filepath, 'w', encoding='utf-8') as jsonfile:
            json.dump(grade_data, jsonfile, ensure_ascii=False, indent=2)
        
        print(f"Created {filepath} with {len(activities)} activities")
    
    print(f"\\nConversion completed! Created {len(activities_by_grade)} grade files.")
    print(f"Grades processed: {', '.join(activities_by_grade.keys())}")

def main():
    parser = argparse.ArgumentParser(description='Convert CSV activities to grade-based JSON files')
    parser.add_argument('csv_file', help='Path to the CSV file')
    parser.add_argument('--output-dir', default='./public/activityData/grades', 
                       help='Output directory for JSON files (default: ./public/activityData/grades)')
    parser.add_argument('--force-grade', help='Force all activities to use this grade level (e.g., "Andre årstrinn")')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.csv_file):
        print(f"Error: CSV file '{args.csv_file}' not found!")
        return
    
    print(f"Converting {args.csv_file} to grade-based JSON files...")
    convert_csv_to_grade_json(args.csv_file, args.output_dir, args.force_grade)

if __name__ == "__main__":
    main()
