import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-full">
            {/* Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Lær matematikk gjennom fysisk aktivitet
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700">
                Over 300 aktiviteter basert på UDIR sin læreplan i matematikk 1.–7. trinn
              </p>
              
              <div className="pt-4">
                <a
                  href="/Grade"
                  className="inline-flex items-center justify-center bg-sky-200 hover:bg-sky-300 text-black font-bold rounded-xl px-8 py-4 text-lg sm:text-xl transition-colors min-w-[200px] min-h-[80px]"
                >
                  Hopp i gang!
                </a>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/bird.png"
                alt="Bird"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
