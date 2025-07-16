import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GradeButton from "../components/GradeButton";

function Grade() {
  return (
    <div className="bg-gray-50 h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center min-h-full">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Velg trinn</h1>
            <GradeButton />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Grade;
