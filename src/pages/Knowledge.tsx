import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LesMerButton from "../components/LesMerButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSchool } from "@fortawesome/free-solid-svg-icons";

function Knowledge() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1>Kunnskapssiden</h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Helhetlig skoletilnærming section */}
              <div className="bg-white rounded-3xl p-8">
                <h2>
                  Helhetlig skoletilnærming og inkludering gjennom Fysisk Aktiv
                  Læring
                </h2>
                <p>
                  Helhetlig skoletilnærming handler om å se hele eleven -
                  faglig, sosialt og emosjonelt- og skape et inkluderende
                  læringsmiljø som legger tilrette for utvikling og deltakelse
                  blant alle elever. Forskning viser at fysisk aktiv læring kan
                  bidra til å fremme ...
                </p>
                <LesMerButton
                  title="Helhetlig skoletilnærming og inkludering gjennom Fysisk Aktiv Læring"
                  content="Helhetlig skoletilnærming handler om å se hele eleven - faglig, sosialt og emosjonelt - og skape et inkluderende læringsmiljø som legger til rette for utvikling og deltakelse blant alle elever.

Forskning viser at fysisk aktiv læring kan bidra til å fremme inkludering ved å:

• Tilby varierte læringskanaler som passer ulike læringsstiler
• Redusere sosiale barrierer gjennom kroppslig aktivitet
• Skape fellesskapsopplevelser som styrker klassemiljøet
• Gi alle elever mulighet til å delta uavhengig av faglig nivå

Fysisk aktiv læring kan være særlig effektivt for elever med ADHD, autisme eller andre utfordringer, da bevegelse kan hjelpe med konsentrasjon og regulering av oppmerksomhet.

Den helhetlige tilnærmingen innebærer også tett samarbeid mellom lærere, spesialpedagoger og andre profesjoner for å sikre at alle elevers behov blir ivaretatt."
                />
              </div>

              {/* Pedagogisk rammeverk section */}
              <div className="bg-white rounded-3xl p-8">
                <h2>Pedagogisk rammeverk</h2>
                <p>
                  Undervisningsopplegget er utviklet med utgangspunkt i
                  kompetansemålene i LK20 og bygger på den sosiokulturelle
                  læringsteorien, embodied learning og CAPADIE modellen. Målet
                  er å legge til rette for aktiv og meningsfull læring for alle
                  elever.
                </p>
                <LesMerButton
                  title="Pedagogisk rammeverk"
                  content="Undervisningsopplegget er utviklet med utgangspunkt i kompetansemålene i LK20 og bygger på følgende pedagogiske teorier:

• Sosiokulturell læringsteori: Læring skjer i samspill med andre og i meningsfulle kontekster
• Embodied learning: Kropp og kognisjon er tett forbundet - vi lærer gjennom hele kroppen
• CAPADIE-modellen: Core Aspects of Physically Active Learning Implementation

Rammeverket inkluderer:

1. Strukturerte aktiviteter som integrerer bevegelse med faginnhold
2. Fleksible tilpasninger for ulike læringsbehov
3. Vurderingsstrategier som tar høyde for varierte uttrykksformer
4. Progresjon fra enkle til mer komplekse bevegelsesoppgaver

Dette sikrer at alle elever kan delta aktivt i læringsprosessen uavhengig av utgangspunkt og forutsetninger."
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Forskningsartikler section */}
              <div className="bg-white rounded-3xl p-8">
                <h2>Forskningsartikler</h2>
                <ul className="space-y-4">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.tandfonline.com/doi/full/10.1080/00313831.2025.2459905?af=R"
                      className="text-blue-600 hover:underline"
                    >
                      Beyond borders: developing the core aspects of physically
                      active learning enactment (CAPABLE) model in the third
                      space
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://ijbnpa.biomedcentral.com/articles/10.1186/s12966-023-01503-4"
                      className="text-blue-600 hover:underline"
                    >
                      Reframing physically active learning as movement-centred
                      pedagogy: a European priority action framework
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.tandfonline.com/doi/full/10.1080/20020317.2019.1710949#abstract"
                      className="text-blue-600 hover:underline"
                    >
                      Embodying education - a bildung theoretical approach to
                      movement integration
                    </a>
                  </li>
                </ul>
              </div>

              {/* Samarbeidspartnere section */}
              <div className="bg-white rounded-3xl p-8">
                <h2>Samarbeidspartnere</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Team Members */}
                  <div className="text-center">
                    <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                    <p>Henrik Løvmyr</p>
                    <p>Spesialpedagog</p>
                  </div>
                  <div className="text-center">
                    <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                    <p>Hanan Abdelrahman</p>
                    <p>Matematikklærer</p>
                  </div>
                  <div className="text-center">
                    <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                    <p>Joschua Liedtke</p>
                    <p>Forsker på universell utforming</p>
                  </div>

                  {/* Schools */}
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faSchool}
                      className="text-4xl mb-2"
                    />
                    <p>Helle skole</p>
                  </div>
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faSchool}
                      className="text-4xl mb-2"
                    />
                    <p>Ski skole</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Knowledge;
