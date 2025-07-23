import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import info_data from "../../public/info_data.json";

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full bg-white border rounded-3xl p-8 lg:max-w-2xl">
              <h1>{info_data.about.title}</h1>
              <p style={{ whiteSpace: "pre-line" }}>
                {info_data.about.content}
              </p>
            </div>
            <img
              src="/ludenso.jpeg"
              alt="About Image"
              className="w-full h-auto object-contain mt-8 lg:mt-0 lg:ml-0 lg:max-w-lg rounded-xl"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
