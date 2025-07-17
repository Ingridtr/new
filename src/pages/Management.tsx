import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';

function Management() {
  const cardContent = {
    whyKalkulek: {
      title: "Hvorfor velge Kalkulek?",
      description: "Kalkulek gir lærere konkrete, forskningsbaserte verktøy for å integrere fysisk aktivitet i fagundervisningen – uten å ofre læringstid.",
      bulletPoints: [
        "Økt elevengasjement og læring",
        "Bedre konsentrasjon og klassemiljø",
        "Støtter helhetlig undervisning og LK20"
      ],
      modalContent: `
        ## Fordeler med Kalkulek

        ### Forskningsbasert tilnærming
        - Dokumentert effekt på læring og konsentrasjon
        - Utviklet i samarbeid med pedagoger og forskere
        - Kontinuerlig evaluering og forbedring

        ### Praktisk implementering
        - Enkelt å integrere i eksisterende undervisning
        - Fleksible løsninger for ulike klasserom
        - Omfattende støtte og veiledning

        ### Målbare resultater
        - Bedre læringsutbytte
        - Økt elevengasjement
        - Forbedret klassemiljø
      `
    },
    sefal: {
      title: "SEFAL - kompetanseheving for lærere",
      description: "SEFAL(Senter for Fysisk Aktiv Læring) tilbyr et program for systematisk kompetanseheving i fysisk aktiv læring, utviklet i samarbeid med Høgskolen på Vestlandet.",
      bulletPoints: [
        "Faglig påfyll og konkrete undervisningsopplegg",
        "Støtte til implementering i egen praksis"
      ],
      modalContent: `
        ## Kompetansehevingsprogrammet

        ### Programinnhold
        - Teoretisk og praktisk opplæring
        - Workshops og erfaringsdeling
        - Individuell veiledning

        ### Gjennomføring
        - Modulbasert opplæring
        - Fleksibel timeplan
        - Både digital og fysisk deltakelse
      `
    },
    implementation: {
      title: "Implementering og kostnad",
      description: "Kontakt oss for mer informasjon om implementering og kostnader.",
      modalContent: `
        ## Implementering av Kalkulek

        ### Oppstartspakke
        - Innledende kartlegging
        - Tilpasset implementeringsplan
        - Opplæring av nøkkelpersonell

        ### Kostnadsstruktur
        - Fleksible betalingsmodeller
        - Tilpasset skolens størrelse
        - Inkludert support og oppfølging

        ### Kontakt oss
        For detaljert pristilbud og implementeringsplan, 
        send en e-post til: kontakt@kalkulek.no
      `
    },
    experiences: {
      title: "Erfaringer fra andre skoler",
      description: "Vår partnerskole i Kragerø, Helle skole, har jobbet med FAL som undervisningsmetode i teoretiske fag fra 2015 gjennom prosjektet Liv og Røre, i samarbeid med Høyskolen på Vestlandet. Resultatene fra prosjektet viser at fysisk aktiv læring (FAL) ikke kun styrker elevenes faglige forståelse, men også har positiv effekt på læringsmiljø, motivasjon og trivsel.",
      modalContent: `
        ## Suksesshistorier

        ### Helle skole, Kragerø
        - 30% økning i elevengasjement
        - Betydelig forbedring i matematikkresultater
        - Redusert uro i klasserommet

        ### Andre erfaringer
        - Positive tilbakemeldinger fra lærere
        - Økt inkludering av elever med ulike behov
        - Bedre samarbeid mellom elevene

        ### Forskningsresultater
        Detaljerte forskningsresultater og evalueringer 
        er tilgjengelige på forespørsel.
      `
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">For ledelsen</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InfoCard {...cardContent.whyKalkulek} />
            <InfoCard {...cardContent.sefal} />
            <InfoCard {...cardContent.implementation} />
            <InfoCard {...cardContent.experiences} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Management;