import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';

function Management() {
  return (
    <div className="bg-white-50 h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">For ledelsen</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-min overflow-y-auto">
            <InfoCard 
              title="Hvorfor velge Kalkulek?"
              description="Kalkulek gir lærere konkrete, forskningsbaserte verktøy for å integrere fysisk aktivitet i fagundervisningen – uten å ofre læringstid."
              bulletPoints={[
                "Økt elevengasjement og læring",
                "Bedre konsentrasjon og klassemiljø",
                "Støtter helhetlig undervisning og LK20"
              ]}
            />
            
            <InfoCard 
              title="SEFAL - kompetanseheving for lærere"
              description="SEFAL(Senter for Fysisk Aktiv Læring) tilbyr et program for systematisk kompetanseheving i fysisk aktiv læring, utviklet i samarbeid med Høgskolen på Vestlandet."
              bulletPoints={[
                "Faglig påfyll og konkrete undervisningsopplegg",
                "Støtte til implementering i egen praksis"
              ]}
            />
            
            <InfoCard 
              title="Implementering og kostnad"
              description="Kontakt oss for mer informasjon om implementering og kostnader."
            />
            
            <InfoCard 
              title="Erfaringer fra andre skoler"
              description="Vår partnerskole i Kragerø, Helle skole, har jobbet med FAL som undervisningsmetode i teoretiske fag fra 2015 gjennom prosjektet Liv og Røre, i samarbeid med Høyskolen på Vestlandet. Resultatene fra prosjektet viser at fysisk aktiv læring (FAL) ikke kun styrker elevenes faglige forståelse, men også har positiv effekt på læringsmiljø, motivasjon og trivsel."
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Management;