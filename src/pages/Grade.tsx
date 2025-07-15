import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GradeButton from "../components/GradeButton";

function Grade() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Velg trinn</h1>
          <GradeButton />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Grade;
