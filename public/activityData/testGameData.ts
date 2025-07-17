import { getGameDescription, getTasksForGrade } from './gameDescriptionUtils';

// Test function to verify the data structure is working
export function testGameData() {
  console.log("=== Testing Game Data Structure ===");
  
  // Test 1: Get Mattesheriff data
  const mattesheriff = getGameDescription("mattesheriff");
  console.log("Mattesheriff data:", mattesheriff);
  
  // Test 2: Get tasks for grade 1-2
  const tasks1_2 = getTasksForGrade("mattesheriff", "1-2");
  console.log("Tasks for grade 1-2:", tasks1_2);
  
  // Test 3: Get tasks for grade 3
  const tasks3 = getTasksForGrade("mattesheriff", "3");
  console.log("Tasks for grade 3:", tasks3);
  
  // Test 4: Test non-existent game
  const nonExistent = getGameDescription("non-existent");
  console.log("Non-existent game:", nonExistent);
  
  // Test 5: Test koordinatsystemet for grade 1-2 (should be empty)
  const koordinat1_2 = getTasksForGrade("koordinatsystemet", "1-2");
  console.log("Koordinatsystemet for grade 1-2 (should be empty):", koordinat1_2);
  
  console.log("=== Test Complete ===");
}

// Auto-run the test
testGameData();
