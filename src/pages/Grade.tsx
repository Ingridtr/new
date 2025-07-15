import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grade_buttons from "../components/Grade_button";

function Grade() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1 className="text-center py-16">Velg trinn</h1>
      <Grade_buttons />

      <Footer />
    </div>
  );
}

export default Grade;
