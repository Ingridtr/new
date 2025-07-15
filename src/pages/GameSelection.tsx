import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";

function GameSelection() {
  const [selectedGrade] = useState("1.–2. trinn");
  const [selectedTopic] = useState("Tall og mengde");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter buttons */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {selectedGrade && (
              <FilterButton
                text={`Trinn: ${selectedGrade}`}
                onRemove={() => navigate("/Grade")}
              />
            )}
            {selectedTopic && (
              <FilterButton
                text={`Tema: ${selectedTopic}`}
                onRemove={() => navigate("/")}
              />
            )}
          </div>

          {/* Game cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GameSelection;
