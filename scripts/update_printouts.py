#!/usr/bin/env python3
"""
Script to update the 'extra' field in activity JSON files with relative paths to printout files.
The script maps printout files to activities based on activity IDs found in the filename.

Supported file formats:
- Images: .png, .jpg, .jpeg, .gif, .svg
- Documents: .docx

File naming convention:
- With descriptor: {activityId}_{descriptor}.{extension} (e.g., 20502_bamse.png)
- Without descriptor: {activityId}.{extension} (e.g., 20301.png)
"""

import os
import json
import glob
from typing import Dict, List

def get_printout_files() -> Dict[str, List[str]]:
    """
    Scan the printOuts folder and group files by activity ID.
    Returns a dictionary mapping activity IDs to lists of relative file paths.
    """
    printouts_dir = "public/printOuts"
    printout_mapping = {}
    
    # Get all files in the printOuts directory
    printout_files = glob.glob(os.path.join(printouts_dir, "*"))
    
    for file_path in printout_files:
        filename = os.path.basename(file_path)
        
        # Skip if not a supported file type (images or docx)
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.docx')):
            continue
            
        # Extract activity ID (number before "_" or entire filename without extension if no "_")
        if "_" in filename:
            activity_id = filename.split("_")[0]
        else:
            activity_id = os.path.splitext(filename)[0]
        
        # Create relative path from public folder
        relative_path = f"printOuts/{filename}"
        
        if activity_id not in printout_mapping:
            printout_mapping[activity_id] = []
        
        printout_mapping[activity_id].append(relative_path)
    
    return printout_mapping

def update_grade_file(file_path: str, printout_mapping: Dict[str, List[str]]) -> int:
    """
    Update a single grade JSON file with printout paths.
    Returns the number of activities updated.
    """
    print(f"Processing {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated_count = 0
    
    for activity in data.get('activities', []):
        activity_id = activity.get('id', '')
        
        if activity_id in printout_mapping:
            # Update the extra field with printout paths
            old_extra = activity.get('content', {}).get('extra', [])
            new_extra = printout_mapping[activity_id]
            
            if 'content' not in activity:
                activity['content'] = {}
            
            activity['content']['extra'] = new_extra
            updated_count += 1
            
            print(f"  Updated activity {activity_id}: {activity.get('title', 'Unknown')}")
            print(f"    Old extra: {old_extra}")
            print(f"    New extra: {new_extra}")
    
    # Write the updated data back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return updated_count

def main():
    """Main function to update all grade files."""
    print("Starting printout mapping update...")
    
    # Get mapping of activity IDs to printout files
    printout_mapping = get_printout_files()
    
    print(f"Found printouts for {len(printout_mapping)} activities:")
    for activity_id, files in printout_mapping.items():
        print(f"  Activity {activity_id}: {len(files)} files")
        for file in files:
            print(f"    - {file}")
    
    # Find all grade JSON files
    grade_files = glob.glob("public/activityData/grades/*.json")
    
    total_updated = 0
    
    for grade_file in grade_files:
        updated_count = update_grade_file(grade_file, printout_mapping)
        total_updated += updated_count
    
    print(f"\nCompleted! Updated {total_updated} activities across {len(grade_files)} grade files.")

if __name__ == "__main__":
    main()
