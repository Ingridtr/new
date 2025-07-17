import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import gamesData from "../../public/activityData/games.json";

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
          <h1 className="text-3xl font-bold mb-6">Velg aktivitet</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {gamesData.map((game, index) => {
              const handleGameClick = () => {
                // Store the selected game in localStorage
                localStorage.setItem("selectedGame", game.title);
                localStorage.setItem("selectedGameId", game.id);
                localStorage.setItem("selectedGameImage", game.image);
                navigate("/infoTask");
              };

              return (
                <GameCard
                  key={index}
                  title={game.title}
                  image={game.image}
                  time={game.time}
                  location={game.location}
                  tools={game.tools}
                  onClick={handleGameClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default GameSelection;
