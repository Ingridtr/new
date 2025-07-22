import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import info_data from "/Users/ingrid/Desktop/mappe uten navn/new/public/info_data.json";

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="max-w-2xl">
              <h1>{info_data.about.title}</h1>
              <p style={{ whiteSpace: "pre-line" }}>
                {info_data.about.content}
              </p>
            </div>

            <div className="mt-8 lg:mt-24 lg:ml-8">
              <p>Laget i samarbeid av:</p>
              <div className="flex items-center space-x-2">
                <a
                  href="https://udir.no"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/udir_logo.png"
                    alt="Udir Logo"
                    className="h-10 w-auto"
                  />
                </a>
                <p>&</p>
                <a
                  href="https://ludenso.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/Ludenso_logo.png"
                    alt="Ludenso Logo"
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
