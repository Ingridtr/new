// Types
export interface CompetencyData {
  [grade: string]: {
    [competencyId: number]: string;
  };
}

// Competency data for display
export const competencyData: CompetencyData = {
  "1-2": {
    1: "Sortere og sammenligne tall og former",
    2: "Utforske tall i lek og kunst",
    3: "Telling framover og bakover",
    // ... add more as needed
  },
  // ... more grades
};
