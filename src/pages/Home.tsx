import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center" role="main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text, Duck and Button */}
            <div className="space-y-4">
              {/* Text Content */}
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-black">
                  Lær matematikk gjennom fysisk aktivitet
                </h1>
                <p className="text-base lg:text-lg text-gray-700">
                  Over 300 aktiviteter basert på UDIR sin læreplan i matematikk
                  1.–7. trinn
                </p>
              </div>

              {/* Duck and Button Together */}
              <div className="flex items-center gap-4 pt-2">
                <img
                  src="/bird.png"
                  alt="Illustrasjon av fugl som representerer læring gjennom bevegelse"
                  style={{width: "15vw"}}
                />
                <a
                  href="/Grade"
                  className="inline-flex items-center justify-center bg-sky-200 hover:bg-sky-300 focus:bg-sky-300 font-bold rounded-xl px-6 py-3 transition-colors min-w-[180px] min-h-[60px] text-black focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  aria-label="Start med å velge trinn for matematikkaktiviteter"
                >
                  Hopp i gang!
                </a>
              </div>
            </div>

            {/* Right Side - Large Image */}
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
