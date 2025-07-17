#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACTIVITIES_FILE = path.join(__dirname, '../public/activityData/activities.json');

// Norwegian grade names (mapping to make it easy)
const GRADE_NAMES = [
    "Andre årstrinn", 
    "Tredje årstrinn",
    "Fjerde årstrinn",
    "Femte årstrinn",
    "Sjette årstrinn",
    "Syende årstrinn"
];

// Function to get random grades for an activity
function getRandomGrades() {
    const numGrades = Math.floor(Math.random() * 3) + 1; // 1-3 grades
    const gradeIndices = new Set();
    
    while (gradeIndices.size < numGrades) {
        gradeIndices.add(Math.floor(Math.random() * GRADE_NAMES.length)); // Use all available grades
    }
    
    return Array.from(gradeIndices).map(index => GRADE_NAMES[index]);
}

// Update activities.json
function updateActivitiesJson() {
    try {
        // Read the current activities file
        const activitiesData = JSON.parse(fs.readFileSync(ACTIVITIES_FILE, 'utf8'));
        
        console.log('🔄 Updating activities.json...');
        
        // Update each activity
        const updatedActivities = activitiesData.map(activity => {
            // Remove learning_goal and add dummy grades
            const { learning_goal, ...activityWithoutLearningGoal } = activity;
            
            // Add dummy grades if empty
            if (!activityWithoutLearningGoal.grade || activityWithoutLearningGoal.grade.trim() === '') {
                activityWithoutLearningGoal.grade = getRandomGrades().join(', ');
            }
            
            return activityWithoutLearningGoal;
        });
        
        // Write back to file
        fs.writeFileSync(ACTIVITIES_FILE, JSON.stringify(updatedActivities, null, 2));
        
        console.log('✅ Successfully updated activities.json');
        console.log('   - Removed learning_goal field from all activities');
        console.log('   - Added dummy grade values to empty grade fields');
        
        return updatedActivities;
        
    } catch (error) {
        console.error('❌ Error updating activities.json:', error.message);
        process.exit(1);
    }
}

// Run the update
if (import.meta.url === `file://${process.argv[1]}`) {
    updateActivitiesJson();
}
