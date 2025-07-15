import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="bg-white-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto py-12 flex flex-row justify-between">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">Om Kalkulek</h1>
          <p className="text-lg mb-4">
            Kalkulek er en nettbasert løsning som tilbyr varierte og engasjerende
            undervisningsopplegg for lærere på 1.-7. trinn, med mål om å
            integrere fysisk aktiv læring (FAL) i matematikkundervisningen.
          </p>
          <p className="text-lg mb-4">
            Oppleggene er utviklet med et solid pedagogisk grunnlag og er tett
            knyttet til kompetansemålene i LK20. Målet er å støtte elevenes
            faglige utvikling, styrke læringsmiljøet, og øke motivasjonen for
            matematikk - gjennom bevegelse og praktisk deltakelse.
          </p>
          <p className="text-lg mb-4">
            Forskning viser at i hver klasse er det i snitt tre elever som ikke
            mestrer grunnleggende regnearter som addisjon og subtraksjon. I
            tillegg har en betydelig andel elever utfordringer knyttet til
            matematikkvansker og ADHD. Studier peker på at fysisk aktiv læring
            bidrar til bedre faglig forståelse og inkluderer flere elever enn
            tradisjonelle undervisningsformer.
          </p>
        </div>

        <div className="ml-8 mt-24">
          <p className="text-sm mb-4">Laget i samarbeid av:</p>
          <div className="flex items-center space-x-2">
            <img src="/Ludenso_logo.png" alt="Ludenso Logo" className="h-8" />
            <span className="text-lg">&</span>
            <img src="/udir_logo.png" alt="Udir Logo" className="h-8" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;