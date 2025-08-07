import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LesMerButton from "../components/LesMerButton";
import info_data from "../../public/info_data.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSchool } from "@fortawesome/free-solid-svg-icons";

function Knowledge() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1>Kunnskapssiden</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white  border rounded-3xl p-8">
                <h2> {info_data.knowledge.title_1}</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {info_data.knowledge.content_1}
                </p>
                <LesMerButton
                  title={info_data.knowledge.title_1_les_mer}
                  content={info_data.knowledge.content_1_les_mer}
                />
              </div>

              <div className="bg-white border rounded-3xl p-8">
                <h2>{info_data.knowledge.title_2}</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {info_data.knowledge.content_2}
                </p>
                <LesMerButton
                  title={info_data.knowledge.title_2_les_mer}
                  content={info_data.knowledge.content_2_les_mer}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border rounded-3xl p-8">
                <h2>{info_data.knowledge_links.title}</h2>
                <ul className="space-y-4">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.tandfonline.com/doi/full/10.1080/00313831.2025.2459905?af=R"
                      className="text-blue-600 hover:underline"
                    >
                      {info_data.knowledge_links.link1}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://ijbnpa.biomedcentral.com/articles/10.1186/s12966-023-01503-4"
                      className="text-blue-600 hover:underline"
                    >
                      {info_data.knowledge_links.link2}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.tandfonline.com/doi/full/10.1080/20020317.2019.1710949#abstract"
                      className="text-blue-600 hover:underline"
                    >
                      {info_data.knowledge_links.link3}
                    </a>
                  </li>
                </ul>
              </div>

              <h2>Samarbeidspartnere</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                  <p>Henrik Løvmyr</p>
                  <p>Spesialpedagog</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                  <p>Hanan Abdelrahman</p>
                  <p>Matematikklærer</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
                  <p>Joschua Liedtke</p>
                  <p>Forsker på universell utforming</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faSchool} className="text-4xl mb-2" />
                  <p>Helle skole</p>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faSchool} className="text-4xl mb-2" />
                  <p>Ski skole</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Knowledge;
