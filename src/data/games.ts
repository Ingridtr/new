// Types
export interface Game {
  id: string;
  title: string;
  image: string;
  time: string;
  location: string;
  equipment: string;
}

export interface GamesDatabase {
  [grade: string]: {
    [competencyId: number]: Game[];
  };
}

// Game database
export const gamesDatabase: GamesDatabase = {
  "1-2": {
    1: [ // Competency 1: "Sortere og sammenligne tall og former"
      {
        id: "mattesheriff-1-2-1",
        title: "Mattesheriff",
        image: "/sheriff.png",
        time: "5 min",
        location: "Inne/ute",
        equipment: "Ingen",
      },
      {
        id: "pastandsveggene-1-2-1",
        title: "Påstandsveggene",
        image: "/påstandsveggene.png",
        time: "15 min",
        location: "Inne (ute)",
        equipment: "Ingen",
      },
      {
        id: "koordinatsystemet-1-2-1",
        title: "Koordinatsystemet",
        image: "/koordinatsystemet.png",
        time: "45 min",
        location: "Ute",
        equipment: "Utstyrsliste",
      },
      {
        id: "tallsafari-1-2-1",
        title: "Tallsafari",
        image: "/sheriff.png", // placeholder
        time: "20 min",
        location: "Ute",
        equipment: "Ingen",
      },
      {
        id: "formleken-1-2-1",
        title: "Formleken",
        image: "/påstandsveggene.png", // placeholder
        time: "10 min",
        location: "Inne",
        equipment: "Former",
      },
      {
        id: "sorteringsspill-1-2-1",
        title: "Sorteringsspill",
        image: "/koordinatsystemet.png", // placeholder
        time: "15 min",
        location: "Inne/ute",
        equipment: "Sorteringsmateriell",
      },
    ],
    2: [], // Other competencies for grade 1-2 (empty for now)
    3: [],
    // ... more competencies
  },
  "3": {
    // Grade 3 games (empty for now)
  },
  // ... more grades
};
