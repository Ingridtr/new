import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import LesMerButton from "../components/LesMerButton";
import info_data from "../../public/info_data.json";
import { useNavigate } from "react-router-dom";

function Management() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />
      <button
        className="fixed top-36 right-6 z-30 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("/")}
        aria-label="Lukk aktivitetsside og gå tilbake"
      >
        ×
      </button>

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1>Alt du trenger å vite om Kalkulek</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white  border rounded-3xl p-8">
                <h2> {info_data.management.title_2}</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {info_data.management.content_2}
                </p>
                {/* <LesMerButton
                  title={info_data.management.title_1_les_mer}
                  content={info_data.management.content_1_les_mer}
                /> */}
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white border rounded-3xl p-8">
                <h2>{info_data.management.title_1}</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {info_data.management.content_1}
                </p>
                {/* <LesMerButton
                  title={info_data.management.title_3_les_mer}
                  content={info_data.management.content_3_les_mer}
                /> */}
              </div>
              <div className="bg-white border rounded-3xl p-8">
                <h2>{info_data.management.title_4}</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {info_data.management.content_4}
                </p>
                {/* <LesMerButton
                  title={info_data.management.title_4_les_mer}
                  content={info_data.management.content_4_les_mer}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Management;
