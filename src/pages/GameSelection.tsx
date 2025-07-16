import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function GameSelection() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  useEffect(() => {
    const storedGrade = localStorage.getItem("selectedGrade");
    setSelectedGrade(storedGrade);
  }, []);
  useEffect(() => {
    const storedGoal = localStorage.getItem("selectedLearningGoal");
    setSelectedGoal(storedGoal);
  }, []);

  const navigate = useNavigate();

  const games = [
    {
      title: "Mattesheriff",
      image: "/sheriff.png",
      time: "5 min",
      location: "Inne/ute",
      equipment: "Ingen",
    },
    {
      title: "Påstandsveggene",
      image: "/påstandsveggene.png",
      time: "15 min",
      location: "Inne (ute)",
      equipment: "Ingen",
    },
    {
      title: "Koordinatsystemet",
      image: "/koordinatsystemet.png",
      time: "45 min",
      location: "Ute",
      equipment: "Utstyrsliste",
    },
    {
      title: "Mattesheriff",
      image: "/sheriff.png",
      time: "5 min",
      location: "Inne/ute",
      equipment: "Ingen",
    },
    {
      title: "Påstandsveggene",
      image: "/påstandsveggene.png",
      time: "15 min",
      location: "Inne (ute)",
      equipment: "Ingen",
    },
    {
      title: "Koordinatsystemet",
      image: "/koordinatsystemet.png",
      time: "45 min",
      location: "Ute",
      equipment: "Utstyrsliste",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-4 mb-8 flex-wrap">
            {selectedGrade && (
              <FilterButton
                text={` ${selectedGrade}`}
                onClick={() => navigate("/Grade")}
              />
            )}

            {selectedGoal && (
              <FilterButton
                text={`Kompetansemål: ${selectedGoal}`}
                onClick={() => navigate(-1)}
              />
            )}
          </div>
          <h1>Velg aktivitet</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
            {games.map((game, index) => (
              <GameCard
                key={index}
                title={game.title}
                image={game.image}
                time={game.time}
                location={game.location}
                equipment={game.equipment}
                onClick={() => navigate("/infoTask")}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default GameSelection;
