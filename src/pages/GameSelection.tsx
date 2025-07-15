import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";

function GameSelection() {
  const [selectedGrade, setSelectedGrade] = useState("1.–2. trinn");
  const [selectedTopic, setSelectedTopic] = useState("Tall og mengde");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex gap-4 mt-8 ml-12 flex-wrap">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-8 px-6 max-w-7xl mx-auto overflow-hidden text-ellipsis">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
      <Footer />
    </div>
  );
}

export default GameSelection;
