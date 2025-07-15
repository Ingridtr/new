import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-1 flex flex-row justify-between items-start py-24 px-6 gap-12 flex-wrap"
        style={{
          width: "40vw",
          minWidth: "30vw",
          height: "4vw",
          minHeight: "30vw",
        }}
      >
        <h1 className="text-6xl font-bold mb-4">
          Lær matematikk gjennom fysisk aktivitet
        </h1>
        <p className="text-2xl text-black py-5">
          Over 300 aktiviteter basert på UDIR sin læreplan i matematikk 1.–7.
          trinn
        </p>

        <div className="flex items-center space-x-6 py-14">
          <img
            src="/bird.png"
            alt="Bird"
            style={{ width: "20vw", minWidth: "300px" }}
          />

          <a
            href="/"
            className="bg-sky-200 hover:bg-sky-300 text-black font-bold rounded text-center flex items-center justify-center"
            style={{
              width: "10vw",
              height: "3vw",
              fontSize: "2vw",
              minWidth: "200px",
              minHeight: "150px",
            }}
          >
            Hopp i gang!
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
