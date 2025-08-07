import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

import useActivities from "../components/GetActivity";
import { getGradeColors } from "../utils/gradeColors";


function GameSelection() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    const storedGrade = localStorage.getItem("selectedGrade");
    const storedGoal = localStorage.getItem("selectedLearningGoal");
    setSelectedGrade(storedGrade);
    setSelectedGoal(storedGoal);
    setIsInitialized(true);
  }, []);

  const navigate = useNavigate();
  
  // Only fetch activities after we've initialized the state from localStorage
  const { activities, loading } = useActivities(
    isInitialized ? selectedGrade : null, 
    isInitialized ? selectedGoal : null
  );

  // Get background color based on selected grade
  const gradeColors = selectedGrade ? getGradeColors(selectedGrade) : { pageBackground: "bg-gray-50" };
  const pageBackgroundClass = gradeColors.pageBackground;

  // Show loading while initializing from localStorage
  if (!isInitialized) {
    return (
      <div className={`flex flex-col min-h-screen ${pageBackgroundClass}`}>
        <Navbar backgroundColor={pageBackgroundClass} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show loading while fetching/filtering activities
  if (loading) {
    return (
      <div className={`flex flex-col min-h-screen ${pageBackgroundClass}`}>
        <Navbar backgroundColor={pageBackgroundClass} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Laster aktiviteter...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${pageBackgroundClass}`}>
      <Navbar backgroundColor={pageBackgroundClass} />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-4 mb-8 flex-wrap">
            {selectedGrade && (
              <FilterButton
                text={` ${selectedGrade}`}
                onClick={() => navigate("/grade")}
                grade={selectedGrade}
              />
            )}

            {selectedGoal && (
              <FilterButton
                text={(() => {
                  const goalText = selectedGoal.includes(':') ? selectedGoal.split(': ')[1] : selectedGoal;
                  return goalText.charAt(0).toUpperCase() + goalText.slice(1);
                })()}
                onClick={() => navigate("/grade/learninggoals")}
                grade={selectedGrade || undefined}
              />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-6">Velg aktivitet</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {activities.map((activity, index) => {
              const handleGameClick = () => {
                localStorage.setItem("selectedGame", activity.title);
                localStorage.setItem("selectedGameId", activity.id);
                localStorage.setItem("selectedGameImage", activity.image);
                localStorage.setItem("selectedActivity", JSON.stringify(activity)); 
                navigate("/infoTask");
              };
              console.log("Aktivitet:", activity.title);
              console.log("Aktivitet ID:", activity.time);
              console.log("Aktivitet bilde:", activity.tools);

              return (
                <GameCard
                  key={index}
                  title={activity.title}
                  image={activity.image}
                  time={`${activity.time} min`}
                  location={activity.location}
                  tools={Array.isArray(activity.tools) ? activity.tools.join(", ") : activity.tools}
                  learningGoal={activity.learningGoals}
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
