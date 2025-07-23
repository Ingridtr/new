import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import LesMerButton from "../components/LesMerButton";
import info_data from "/Users/ingrid/Desktop/sommer/new/public/info_data.json";

function Management() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

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
