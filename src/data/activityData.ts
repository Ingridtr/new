import { ActivityData } from '../types/interfaces';

// Game activities database - only basic sheriff game for now
export const gameActivities: Record<string, ActivityData> = {
  'sheriff-basic': {
    title: "Mattesheriff",
    image: "/sheriff.png",
    time: "5 min",
    location: "Inne/ute",
    equipment: "Ingen",
    competencyGoals: [
      "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur, representere tallene på ulike måter og oversette mellom de ulike representasjonene"
    ],
    description: "Elevene stiller seg i en sirkel med en sheriff i midten. Sheriffen peker på en elev og stiller et spørsmål. Eleven må svare raskt og riktig for å forbli i spillet.",
    tasks: {
      easy: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ],
      medium: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ],
      hard: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8"
      ]
    },
    variations: "Varier hvem som står i midten",
    reflectionQuestions: "Hvordan kom du frem til svaret?"
  }
};

// Helper function to get activity data by game ID
export const getActivityData = (gameId: string): ActivityData | null => {
  return gameActivities[gameId] || null;
};
