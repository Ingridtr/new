import { GameDescriptions } from './types';

export const gameDescriptions: GameDescriptions = {
  "mattesheriff": {
    "id": "mattesheriff",
    "title": "Mattesheriff",
    "location": "Inne / ute",
    "duration": "5 minutter",
    "tools": ["Ingen"],
    "competencyGoals": [
      "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur, representere tallene på ulike måter og oversette mellom de ulike representasjonene"
    ],
    "description": "Elevene stiller seg i en sirkel med en sheriff i midten. Sheriffen peker på en elev som må bøye seg ned. Cowboyene på hver side av denne eleven skal duellere i et mattestykke.",
    "tasks": {
      "easy": [
        "Hva er 5 + 2? → 7",
        "Hva kommer etter 19? → 20",
        "Hva er det dobbelte av 4? → 8",
        "Hva er 10 - 3? → 7",
        "Tell fra 1 til 15"
      ],
      "medium": [
        "Hva er 12 – 4? → 8",
        "Hva kommer før 30? → 29",
        "Hva er halvparten av 10? → 5",
        "Hva er 6 × 3? → 18",
        "Tell baklengs fra 25 til 15"
      ],
      "hard": [
        "Hva er 8 + 7? → 15",
        "Hva er det tredobbelte av 3? → 9",
        "Hva er 100 – 37? → 63",
        "Hva er 144 ÷ 12? → 12",
        "Hva er 15% av 80? → 12"
      ]
    },
    "gradeMapping": {
      "Andre årstrinn": ["easy", "medium", "hard"],
      "Tredje årstrinn": ["easy", "medium", "hard"],
      "Fjerde årstrinn": ["easy", "medium", "hard"],
      "Femte årstrinn": ["easy", "medium", "hard"],
      "Sjette årstrinn": ["easy", "medium", "hard"],
      "Syvende årstrinn": ["easy", "medium", "hard"]
    },
    "variations": "Varier hvem som står i midten",
    "reflectionQuestions": "Hvordan kom du frem til svaret?"
  },
  "pastandsveggene": {
    "id": "pastandsveggene",
    "title": "Påstandsveggene",
    "location": "Inne (ute)",
    "duration": "15 minutter",
    "tools": ["Ingen"],
    "competencyGoals": [
      "Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter"
    ],
    "description": "Elevene beveger seg rundt i rommet mellom forskjellige vegger som representerer påstander. De må posisjonere seg basert på om de er enige eller uenige med påstanden.",
    "tasks": {
      "easy": [
        "5 er større enn 3 → Sant",
        "En sirkel har hjørner → Usant",
        "10 kommer etter 9 → Sant",
        "En firkant har 4 sider → Sant",
        "2 + 2 = 5 → Usant"
      ],
      "medium": [
        "15 + 5 = 20 → Sant",
        "En firkant har 3 sider → Usant",
        "Halvparten av 16 er 8 → Sant",
        "12 er et partall → Sant",
        "En trekant har 4 hjørner → Usant"
      ],
      "hard": [
        "7 × 8 = 56 → Sant",
        "En trekant kan ha 2 like sider → Sant",
        "25% av 100 er 20 → Usant",
        "√64 = 8 → Sant",
        "En parallellogram har alltid rette vinkler → Usant"
      ]
    },
    "gradeMapping": {
      "Andre årstrinn": ["easy", "medium", "hard"],
      "Tredje årstrinn": ["easy", "medium", "hard"],
      "Fjerde årstrinn": ["easy", "medium", "hard"],
      "Femte årstrinn": ["easy", "medium", "hard"],
      "Sjette årstrinn": ["easy", "medium", "hard"],
      "Syvende årstrinn": ["easy", "medium", "hard"]
    },
    "variations": "Bruk forskjellige typer påstander, la elevene lage egne påstander",
    "reflectionQuestions": "Hvorfor valgte du den posisjonen? Kan du forklare svaret ditt?"
  },
  "koordinatsystemet": {
    "id": "koordinatsystemet",
    "title": "Koordinatsystemet",
    "location": "Ute",
    "duration": "45 minutter",
    "tools": ["Tau eller kritt", "Markører", "Oppgavekort"],
    "competencyGoals": [
      "Arbeide med koordinatsystem og grafer",
      "Plassere tall på tallinjen og bruke tallinjen i regning og problemløsning"
    ],
    "description": "Elevene lager et stort koordinatsystem på bakken og bruker kroppen til å utforske posisjoner, avstander og retninger.",
    "tasks": {
      "easy": [
        "Gå til posisjon (2, 1)",
        "Finn punktet som er 3 skritt til høyre",
        "Hvilket punkt er nærmest origo?",
        "Plassér deg på x-aksen",
        "Gå 2 skritt oppover fra (1,1)"
      ],
      "medium": [
        "Tegn en linje fra (0,0) til (3,3)",
        "Finn avstanden mellom (1,2) og (4,2)",
        "Hvilket punkt ligger på y-aksen?",
        "Beregn avstanden mellom to punkter på samme linje",
        "Plassér punkter som lager en firkant"
      ],
      "hard": [
        "Beregn avstanden mellom (1,1) og (4,5)",
        "Tegn en parallell linje til y = x + 1",
        "Finn skjæringspunktet mellom to linjer",
        "Beregn arealet av en trekant med hjørner i koordinatsystemet",
        "Transformer en figur ved rotasjon rundt origo"
      ]
    },
    "gradeMapping": {
      "Andre årstrinn": ["easy", "medium", "hard"],
      "Tredje årstrinn": ["easy", "medium", "hard"],
      "Fjerde årstrinn": ["easy", "medium", "hard"],
      "Femte årstrinn": ["easy", "medium", "hard"],
      "Sjette årstrinn": ["easy", "medium", "hard"],
      "Syvende årstrinn": ["easy", "medium", "hard"]
    },
    "variations": "Bruk forskjellige skalaer, legg til negative tall, bruk forskjellige former",
    "reflectionQuestions": "Hvordan fant du veien til punktet? Hva skjer hvis vi endrer skalaen?"
  },
  "tallsafari": {
    "id": "tallsafari",
    "title": "Tallsafari",
    "location": "Ute",
    "duration": "20 minutter",
    "tools": ["Oppgavekort", "Penn"],
    "competencyGoals": [
      "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur"
    ],
    "description": "Elevene går på jakt etter tall og former i naturen og rundt skolen. De skal finne og dokumentere matematikk i omgivelsene.",
    "tasks": {
      "easy": [
        "Finn 5 forskjellige tall rundt skolen",
        "Tell hvor mange trær du ser",
        "Finn noe som har form som en sirkel",
        "Finn tall mindre enn 10",
        "Tell vinduer på en bygning"
      ],
      "medium": [
        "Finn tall som er større enn 10",
        "Tell hvor mange vinduer som er på en side av bygningen",
        "Finn geometriske former og navngi dem",
        "Estimer høyden på et tre",
        "Finn eksempler på symmetri"
      ],
      "hard": [
        "Beregn omkretsen av skolegården",
        "Finn eksempler på symmetri i naturen",
        "Estimér avstander og mål dem",
        "Beregn arealet av en blomsterbed",
        "Finn eksempler på geometriske sekvenser i naturen"
      ]
    },
    "gradeMapping": {
      "Andre årstrinn": ["easy", "medium", "hard"],
      "Tredje årstrinn": ["easy", "medium", "hard"],
      "Fjerde årstrinn": ["easy", "medium", "hard"],
      "Femte årstrinn": ["easy", "medium", "hard"],
      "Sjette årstrinn": ["easy", "medium", "hard"],
      "Syvende årstrinn": ["easy", "medium", "hard"]
    },
    "variations": "Bruk forskjellige temaer, la elevene lage egne oppgaver, bruk teknologi for dokumentasjon",
    "reflectionQuestions": "Hvor fant du flest tall? Hvilke former var vanligst?"
  }
};
