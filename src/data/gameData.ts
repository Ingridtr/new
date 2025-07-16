// Types
export interface GameData {
  title: string;
  location: string;
  duration: string;
  tools: string[];
  competencyGoals: string[];
  description: string;
  tasks: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
  variations: string;
  reflectionQuestions: string;
}

export interface GameDataDatabase {
  [gameId: string]: GameData;
}

// Game data database
export const gameDataDatabase: GameDataDatabase = {
  "mattesheriff-1-2-1": {
    title: "Mattesheriff",
    location: "Inne / ute",
    duration: "5 minutter",
    tools: ["Ingen"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Elevene stiller seg i en sirkel med en sheriff i midten. Sheriffen peker på en elev som må bøye seg ned. Cowboyene på hver side av denne eleven skal duellere i et mattestykke.",
    tasks: {
      easy: [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8",
      ],
      medium: [
        "Hva er 12 – 4? → 8",
        "Hva kommer før 30? → 29",
        "Hva er halvparten av 10? → 5",
      ],
      hard: [
        "Hva er 8 + 7? → 15",
        "Hva er det tredobbelte av 3? → 9",
        "Hva er 100 – 37? → 63",
      ],
    },
    variations: "Varier hvem som står i midten",
    reflectionQuestions: "Hvordan kom du frem til svaret?",
  },
  "pastandsveggene-1-2-1": {
    title: "Påstandsveggene",
    location: "Inne (ute)",
    duration: "15 minutter",
    tools: ["Ingen"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Elevene beveger seg rundt i rommet. Læreren leser opp påstander, og elevene skal posisjonere seg ved den veggen som representerer deres svar.",
    tasks: {
      easy: [
        "5 er større enn 3 → Sant/Usant",
        "En sirkel har 4 hjørner → Sant/Usant",
        "10 er et partall → Sant/Usant",
      ],
      medium: [
        "Alle firkanter er kvadrater → Sant/Usant",
        "15 er mindre enn 12 → Sant/Usant",
        "En trekant har 3 sider → Sant/Usant",
      ],
      hard: [
        "Alle rektangler er firkanter → Sant/Usant",
        "25 er et oddetall → Sant/Usant",
        "En rombe har 4 like sider → Sant/Usant",
      ],
    },
    variations: "Bruk forskjellige typer påstander, la elevene lage egne påstander",
    reflectionQuestions: "Hvorfor plasserte du deg ved denne veggen? Kan du forklare svaret ditt?",
  },
  "koordinatsystemet-1-2-1": {
    title: "Koordinatsystemet",
    location: "Ute",
    duration: "45 minutter",
    tools: ["Tau eller kritt", "Tallkort", "Objekter å plassere"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og formar ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Lag et stort koordinatsystem på bakken med tau eller kritt. Elevene skal plassere objekter på riktige posisjoner og sammenligne plasseringer.",
    tasks: {
      easy: [
        "Plasser objektet på posisjon (2,1)",
        "Finn objektet som er lengst til høyre",
        "Hvilke objekter er på samme linje?",
      ],
      medium: [
        "Plasser tre objekter på en rett linje",
        "Finn objektet som er nærmest origo (0,0)",
        "Bytt plass på to objekter",
      ],
      hard: [
        "Lag et mønster med objektene",
        "Plasser objekter så de danner en firkant",
        "Sorter objektene etter avstand fra origo",
      ],
    },
    variations: "Bruk forskjellige objekter, la elevene være 'levende' koordinater",
    reflectionQuestions: "Hvordan beskriver du posisjonen til objektet? Hva skjer hvis vi flytter det?",
  },
  "tallsafari-1-2-1": {
    title: "Tallsafari",
    location: "Ute",
    duration: "20 minutter",
    tools: ["Ingen"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Elevene går på 'safari' ute og skal finne og sammenligne mengder av forskjellige objekter i naturen.",
    tasks: {
      easy: [
        "Finn 5 steiner",
        "Tell bladene på en kvist",
        "Finn noe som er større enn hånden din",
      ],
      medium: [
        "Finn tre forskjellige mengder og sorter dem fra minst til størst",
        "Sammenlign to hauger med objekter",
        "Finn objekter som kan grupperes",
      ],
      hard: [
        "Lag grupper med like mange objekter",
        "Finn objekter som kan sorteres på tre forskjellige måter",
        "Estimer og tell - hvor nært kom du?",
      ],
    },
    variations: "Besøk forskjellige områder, bruk sesongens objekter",
    reflectionQuestions: "Hvordan sorterte du objektene? Kunne du gjort det på en annen måte?",
  },
  "formleken-1-2-1": {
    title: "Formleken",
    location: "Inne",
    duration: "10 minutter",
    tools: ["Geometriske former", "Sorteringsbrett"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Elevene leker med geometriske former og skal sortere dem etter forskjellige egenskaper som farge, størrelse og form.",
    tasks: {
      easy: [
        "Sorter formene etter farge",
        "Finn alle sirklene",
        "Lag en haug med røde former",
      ],
      medium: [
        "Sorter etter størrelse - stor, medium, liten",
        "Finn former med hjørner og former uten hjørner",
        "Lag grupper med like former",
      ],
      hard: [
        "Sorter på to egenskaper samtidig (farge og form)",
        "Lag et mønster med formene",
        "Finn formen som er annerledes - hvorfor?",
      ],
    },
    variations: "Bruk forskjellige materialer, lat elevene lage egne sorteringskategorier",
    reflectionQuestions: "Hvorfor sorterte du formene slik? Finnes det andre måter å sortere på?",
  },
  "sorteringsspill-1-2-1": {
    title: "Sorteringsspill",
    location: "Inne/ute",
    duration: "15 minutter",
    tools: ["Forskjellige sorteringsmateriell", "Kurver eller bokser"],
    competencyGoals: [
      "Sortere og sammenligne tall og former: Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter",
    ],
    description:
      "Et aktivt sorteringsspill hvor elevene løper mellom stasjoner og sorterer objekter etter forskjellige kriterier.",
    tasks: {
      easy: [
        "Sorter objektene i to grupper",
        "Finn alle objektene som er like",
        "Plasser objektene i riktig kurv",
      ],
      medium: [
        "Sorter etter tre forskjellige egenskaper",
        "Lag den største og minste gruppen",
        "Finn objektet som ikke hører hjemme",
      ],
      hard: [
        "Lag et sorteringssystem med flere nivåer",
        "Sorter først etter en egenskap, så etter en annen",
        "Forklar sorteringssystemet til en venn",
      ],
    },
    variations: "Tidsutfordringer, lag konkurranse mellom grupper",
    reflectionQuestions: "Hvilken sorteringsmåte var mest effektiv? Hvorfor valgte du den strategien?",
  },
  // Add more games as needed
};
