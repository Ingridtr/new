// Types
export interface Competency {
  id: number;
  title: string;
  description: string;
}

export interface CompetenciesData {
  [grade: string]: Competency[];
}

// Define competencies for each grade
export const competenciesData: CompetenciesData = {
  '1-2': [
    {
      id: 1,
      title: "Sortere og sammenligne tall og former",
      description: "Ordne tall, mengder og former ut fra egenskaper, sammenligne dem og reflektere over om det kan gjøres på flere måter"
    },
    {
      id: 2,
      title: "Utforske tall i lek og kunst",
      description: "Utforske tall, mengder og telling i lek, natur, billedkunst, musikk og barnelitteratur, representere tallene på ulike måter og oversette mellom de ulike representasjonene"
    },
    {
      id: 3,
      title: "Telling framover og bakover",
      description: "Eksperimentere med telling både forlengs og baklengs, velge ulike startpunkter og ulik differanse og beskrive mønster i tellingene"
    },
    {
      id: 4,
      title: "Oppdage partall & oddetall",
      description: "Utforske og beskrive generelle egenskaper ved partall og oddetall"
    },
    {
      id: 5,
      title: "Forstå posisjonssystemet",
      description: "Beskrive posisjonssystemet ved hjelp av ulike representasjoner"
    },
    {
      id: 6,
      title: "Bruk tallinjen i regning",
      description: "Plassere tall på tallinjen og bruke tallinjen i regning og problemløsning"
    },
    {
      id: 7,
      title: "Addisjon og subtraksjon i praksis",
      description: "Utforske addisjon og subtraksjon og bruke dette til å formulere og løse problemer fra lek og egen hverdag"
    },
    {
      id: 8,
      title: "Addisjon: kommutativ og assosiativ + hoderegning",
      description: "Utforske den kommutative og den assosiative egenskapen ved addisjon og bruke dette i hoderegning"
    },
    {
      id: 9,
      title: "Finn mønsteret",
      description: "Kjenne igjen og beskrive repeterende enheter i mønstre og lage egne mønstre"
    },
    {
      id: 10,
      title: "Geometriske figurer fra nærmiljø",
      description: "Utforske, tegne og beskrive geometriske figurer fra sitt eget nærmiljø og argumentere for måter å sortere dem på etter egenskaper"
    },
    {
      id: 11,
      title: "Måling av lengde og areal",
      description: "Måle og sammenligne størrelser som gjelder lengde og areal, ved hjelp av ikke-standardiserte og standardiserte måleenheter, beskrive hvordan og samtale om resultatene"
    },
    {
      id: 12,
      title: "Klokke og kalender",
      description: "Forklare hvordan man kan beskrive tid ved hjelp av klokke og kalender"
    },
    {
      id: 13,
      title: "Regler og instruksjoner i lek",
      description: "Lage og følge regler og trinnvise instruksjoner i lek og spill"
    }
  ],
  '3': [
    {
      id: 1,
      title: "Tallsystemer og plassverdier",
      description: "Forstå tallsystemer, plassverdier og kunne representere tall på ulike måter"
    },
    {
      id: 2,
      title: "De fire regneartene",
      description: "Utforske og anvende addisjon, subtraksjon, multiplikasjon og divisjon"
    },
    {
      id: 3,
      title: "Brøk som del av helhet",
      description: "Forstå brøk som deler av en helhet og kunne sammenligne enkle brøker"
    },
    {
      id: 4,
      title: "Geometriske former og egenskaper",
      description: "Identifisere og beskrive egenskaper ved to- og tredimensjonale figurer"
    },
    {
      id: 5,
      title: "Måling og enheter",
      description: "Måle lengde, masse, volum og tid med passende enheter"
    },
    {
      id: 6,
      title: "Mønster og strukturer",
      description: "Gjenkjenne, beskrive og lage mønstre med tall og figurer"
    }
  ],
  '4': [
    {
      id: 1,
      title: "Store tall og desimaltall",
      description: "Arbeide med store tall og enkle desimaltall"
    },
    {
      id: 2,
      title: "Multiplikasjon og divisjon",
      description: "Utvikle strategier for multiplikasjon og divisjon"
    },
    {
      id: 3,
      title: "Brøk og desimaltall",
      description: "Sammenligne og regne med brøk og desimaltall"
    },
    {
      id: 4,
      title: "Symmetri og transformasjoner",
      description: "Utforske symmetri og enkle transformasjoner"
    },
    {
      id: 5,
      title: "Areal og omkrets",
      description: "Beregne areal og omkrets av enkle figurer"
    },
    {
      id: 6,
      title: "Data og statistikk",
      description: "Samle, organisere og presentere data"
    }
  ],
  '5': [
    {
      id: 1,
      title: "Negative tall",
      description: "Forstå og regne med negative tall"
    },
    {
      id: 2,
      title: "Prosent og forhold",
      description: "Utforske prosent og enkle forhold"
    },
    {
      id: 3,
      title: "Algebra og likninger",
      description: "Løse enkle algebraiske uttrykk og likninger"
    },
    {
      id: 4,
      title: "Koordinatsystem",
      description: "Arbeide med koordinatsystem og grafer"
    },
    {
      id: 5,
      title: "Volum og overflate",
      description: "Beregne volum og overflate av enkle figurer"
    },
    {
      id: 6,
      title: "Sannsynlighet",
      description: "Utforske enkle sannsynlighetsberegninger"
    }
  ],
  '6': [
    {
      id: 1,
      title: "Tallsystemer og algoritmer",
      description: "Forstå ulike tallsystemer og utvikle algoritmer"
    },
    {
      id: 2,
      title: "Brøk, desimal og prosent",
      description: "Sammenhenger mellom brøk, desimaltall og prosent"
    },
    {
      id: 3,
      title: "Geometriske konstruksjoner",
      description: "Utføre geometriske konstruksjoner og bevis"
    },
    {
      id: 4,
      title: "Funksjoner og grafer",
      description: "Utforske lineære funksjoner og deres grafer"
    },
    {
      id: 5,
      title: "Statistikk og analyse",
      description: "Analysere data og trekke konklusjoner"
    },
    {
      id: 6,
      title: "Problemløsning",
      description: "Løse sammensatte matematiske problemer"
    }
  ],
  '7': [
    {
      id: 1,
      title: "Rasjonale tall",
      description: "Arbeide med rasjonale tall og tallinja"
    },
    {
      id: 2,
      title: "Algebraiske uttrykk",
      description: "Manipulere og forenkle algebraiske uttrykk"
    },
    {
      id: 3,
      title: "Likninger og ulikninger",
      description: "Løse lineære likninger og ulikninger"
    },
    {
      id: 4,
      title: "Geometriske bevis",
      description: "Gjennomføre enkle geometriske bevis"
    },
    {
      id: 5,
      title: "Proporsjonalitet",
      description: "Forstå og anvende proporsjonale sammenhenger"
    },
    {
      id: 6,
      title: "Kritisk tenkning",
      description: "Utvikle kritisk tenkning og argumentasjon"
    }
  ]
};
