import { useNavigate, useSearchParams } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import { BaseGameInfo } from "../types/interfaces";

function GameSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get parameters from URL
  const gradeParam = searchParams.get('grade');
  const competencyParam = searchParams.get('competency');
  const competencyTitleParam = searchParams.get('competencyTitle');
  
  // Set display values based on URL parameters or defaults
  const selectedGrade = gradeParam ? `${gradeParam.replace('-', '.–')}. trinn` : "1.–2. trinn";
  const selectedTopic = competencyTitleParam ? decodeURIComponent(competencyTitleParam) : "Tall og mengde";

  const games: BaseGameInfo[] = [
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
            {gradeParam && (
              <FilterButton
                text={`Trinn: ${selectedGrade}`}
                onRemove={() => navigate("/grade")}
              />
            )}
            {competencyTitleParam && (
              <FilterButton
                text={`Kompetansemål: ${selectedTopic}`}
                onRemove={() => navigate(`/competency/${gradeParam}`)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {games.map((game, index) => (
              <GameCard
                key={index}
                title={game.title}
                image={game.image}
                time={game.time}
                location={game.location}
                equipment={game.equipment}
                onClick={() => navigate(`/infoTask?gameTitle=${encodeURIComponent(game.title)}&grade=${gradeParam}&competency=${competencyParam}`)}
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
