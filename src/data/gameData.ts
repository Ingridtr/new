import { Game } from '../types/interfaces';

// Competency-to-games mapping - only for grade 1-2, competency 1
export const competencyGamesMapping = {
  '1-2': {
    1: [ // Competency 1: "Sortere og sammenligne tall og former"
      {
        id: 'sheriff-basic',
        title: 'Mattesheriff',
        image: '/sheriff.png',
        time: '5 min',
        location: 'Inne/ute',
        equipment: 'Ingen',
        competencyIds: [1],
        grades: ['1-2']
      }
    ]
    // Only competency 1 is working for now
  }
  // Only grade 1-2 is working for now
};

// Helper function to get games for a specific competency
export const getGamesForCompetency = (grade: string, competencyId: number): Game[] => {
  const gradeData = competencyGamesMapping[grade as keyof typeof competencyGamesMapping];
  if (!gradeData) return [];
  
  const competencyGames = gradeData[competencyId as keyof typeof gradeData];
  return competencyGames || [];
};

// Helper function to get all games for a grade (when no specific competency is selected)
export const getAllGamesForGrade = (grade: string): Game[] => {
  const gradeData = competencyGamesMapping[grade as keyof typeof competencyGamesMapping];
  if (!gradeData) return [];
  
  const allGames: Game[] = [];
  Object.values(gradeData).forEach(games => {
    allGames.push(...games);
  });
  
  return allGames;
};

// Default fallback games (for when no specific mapping exists)
export const defaultGames: Game[] = [
  {
    id: 'sheriff-basic',
    title: 'Mattesheriff',
    image: '/sheriff.png',
    time: '5 min',
    location: 'Inne/ute',
    equipment: 'Ingen',
    competencyIds: [1],
    grades: ['1-2']
  }
];
