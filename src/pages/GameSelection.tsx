import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import { Game, gamesDatabase, competencyData } from "../data";

function GameSelection() {
  const { grade, competencyId } = useParams<{ grade: string; competencyId: string }>();
  const navigate = useNavigate();
  
  const [games, setGames] = useState<Game[]>([]);
  const [competencyTitle, setCompetencyTitle] = useState("");

  useEffect(() => {
    if (grade && competencyId) {
      const gradeGames = gamesDatabase[grade as keyof typeof gamesDatabase];
      if (gradeGames) {
        const competencyGames = gradeGames[parseInt(competencyId) as keyof typeof gradeGames] || [];
        setGames(competencyGames);
      }
      
      const gradeCompetencies = competencyData[grade as keyof typeof competencyData];
      if (gradeCompetencies) {
        const title = gradeCompetencies[parseInt(competencyId) as keyof typeof gradeCompetencies] || "";
        setCompetencyTitle(title);
      }
    }
  }, [grade, competencyId]);

  const gradeDisplayName = grade?.replace('-', '.–') + '. trinn';

  return (
    <div className="bg-gray-50 h-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-4 mb-8 flex-wrap">
            <FilterButton
              text={`Trinn: ${gradeDisplayName}`}
              onRemove={() => navigate("/grade")}
            />
            <FilterButton
              text={`Kompetansemål: ${competencyId}. ${competencyTitle}`}
              onRemove={() => navigate(`/competency/${grade}`)}
            />
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">Velg aktivitet</h1>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  time={game.time}
                  location={game.location}
                  equipment={game.equipment}
                  onClick={() => navigate(`/infoTask/${game.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Ingen aktiviteter tilgjengelig for dette kompetansemålet ennå.</p>
              <button
                onClick={() => navigate(`/competency/${grade}`)}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Gå tilbake til kompetansemål
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GameSelection;
