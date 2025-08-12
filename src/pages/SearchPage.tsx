import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ActivitySearch from "../components/ActivitySearch";
import Breadcrumb from "../components/Breadcrumb";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <div className="flex-1 flex flex-col justify-center">
        <button
          className="fixed top-36 right-6 z-50 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("/")}
          aria-label="Lukk aktivitetsside og gå tilbake"
        >
          ×
        </button>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbs} className="mb-6" />

          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              Søk etter aktiviteter
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Finn aktiviteter basert på emne, trinn, eller nøkkelord
            </p>

            <ActivitySearch
              className="mb-8"
              placeholder="Søk etter aktiviteter (f.eks. 'brøk', 'geometri', 'telling'...)"
            />

            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-lg font-semibold mb-4">Søketips</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Populære søk:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Brøk og brøkregning</li>
                    <li>• Geometri og former</li>
                    <li>• Telling og tallforståelse</li>
                    <li>• Måling og enheter</li>
                    <li>• Multiplikasjon</li>
                    <li>• Problemløsning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Søk på:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Aktivitetstittel</li>
                    <li>• Læringsmål</li>
                    <li>• Utstyr som trengs</li>
                    <li>• Trinn (2. trinn, 3. trinn...)</li>
                    <li>• Sted (inne, ute, gymsalen...)</li>
                    <li>• Innhold og beskrivelse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
