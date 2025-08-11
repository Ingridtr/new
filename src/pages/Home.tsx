import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {

  
  // Clear any selected grade/learning goal when returning to home
  useEffect(() => {
    localStorage.removeItem("selectedGrade");
    localStorage.removeItem("selectedLearningGoal");
    // Dispatch event to update navbar to sky blue
    window.dispatchEvent(
      new CustomEvent("gradeChanged", { detail: { grade: null } })
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <main className="flex-1 flex items-center" role="main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-3">
                <h1>Lær matematikk gjennom fysisk aktivitet</h1>
                <p>
                  Over 300 aktiviteter basert på UDIR sin læreplan i matematikk
                  1.–7. trinn
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src="/bird.png"
                  alt="Illustrasjon av fugl som representerer læring gjennom bevegelse"
                  className="w-24 h-auto md:w-32 lg:w-40 max-w-xs"
                />
                <div className="flex flex-col gap-3">
                  <a
                    href="/grade"
                    className="inline-flex items-center justify-center bg-sky-200 hover:bg-sky-300 focus:bg-sky-300 font-bold rounded-xl px-6 py-3 transition-colors min-w-44 min-h-14 text-black focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    aria-label="Start med å velg trinn for matematikkaktiviteter"
                  >
                    Hopp i gang!
                  </a>
                  
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-end">
              <img
                src="/frontpage.png"
                alt="Barn som deltar i matematikkaktiviteter med fysisk bevegelse"
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
