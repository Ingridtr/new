import learningGoalsByGrade from '../learning_goals_by_grade.json';

// Predefined labels for each grade in the same order as they appear in learning_goals_by_grade.json
const gradeLabelMappings: { [grade: string]: string[] } = {
  "Andre årstrinn": [
    "Sortering", "Tallene", "Telling", "Partall/Oddetall", "Posisjonssystemet", 
    "Tallinja", "Addisjon/subtraksjon", "Hoderegning", "Mønster", "Geometri", 
    "Måling", "Tid", "Lek"
  ],
  "Tredje årstrinn": [
    "Subtraksjon", "Addisjon/subtraksjon", "Multiplikasjon", "Multiplikasjon/Divisjon", 
    "Multiplikasjonsformer", "Regnegenskaper", "Likhet/ulikhet", "Likevekt", 
    "Måleenheter", "Koordinatsystemet", "Lek"
  ],
  "Fjerde årstrinn": [
    "Divisjon", "Divisjonsformer", "Divisjonsstrategier", "Hverdagssituasjoner", 
    "Situasjonsforståelse", "Regneuttrykk", "Figuranalyse", "Måling", "Mønster", "Algoritmer"
  ],
  "Femte årstrinn": [
    "Brøk, prosent, desimal", "Brøk", "Brøkrepresentasjon", "Brøkstrategier", 
    "Hverdagssituasjoner", "Sannsynlighet", "Likninger/Ulikheter", "Økonomi", 
    "Tid", "Programmering"
  ],
  "Sjette årstrinn": [
    "Tallinja", "Desimalregning", "Hverdagssituasjoner", "Figurer", 
    "Symmetri/Kongruens", "Sirkelen", "Areal/volum", "Areal/omkrets", 
    "Formler", "Programmering"
  ],
  "Syvende årstrinn": [
    "Regnestrategier", "Brøk, desimal og prosent", "Negative tall", "Tallinja", 
    "Sammensatte uttrykk", "Likninger/ulikheter", "Statistikk", "Tabeller/diagram", 
    "Budsjett/regnskap", "Programmering"
  ]
};

// Generate learning goal mapping dynamically from JSON file
export const learningGoalLabels: { [grade: string]: { [goalText: string]: string } } = {};

// Initialize mappings from JSON data
Object.keys(learningGoalsByGrade).forEach(grade => {
  const goals = (learningGoalsByGrade as Record<string, unknown>)[grade];
  const labels = gradeLabelMappings[grade];
  
  if (goals && labels && Array.isArray(goals) && goals.length === labels.length) {
    learningGoalLabels[grade] = {};
    goals.forEach((goal: string, index: number) => {
      learningGoalLabels[grade][goal] = labels[index];
      // Also add capitalized version for alternative matching
      const capitalizedGoal = goal.charAt(0).toUpperCase() + goal.slice(1);
      if (capitalizedGoal !== goal) {
        learningGoalLabels[grade][capitalizedGoal] = labels[index];
      }
    });
  }
});

// Function to get the appropriate label for a learning goal
export function getLearningGoalLabel(grade: string, goalText: string, index: number): string {
  const gradeMapping = learningGoalLabels[grade];
  
  if (gradeMapping) {
    // Try exact match first
    const exactMatch = gradeMapping[goalText];
    if (exactMatch) {
      return exactMatch;
    }
    
    // Try to find partial match (in case of slight text variations)
    const partialMatch = Object.keys(gradeMapping).find(key => 
      key.toLowerCase().includes(goalText.toLowerCase().substring(0, 30)) ||
      goalText.toLowerCase().includes(key.toLowerCase().substring(0, 30))
    );
    
    if (partialMatch) {
      return gradeMapping[partialMatch];
    }
  }
  
  // Fall back to the original format for other grades or unmatched goals
  return `Kompetansemål ${index + 1}`;
}
