import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GradeButton from "../components/GradeButton";

function Grade() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1 className="text-center py-16">Velg trinn</h1>
      <GradeButton />

      <Footer />
    </div>
  );
}

export default Grade;
