import { useNavigate } from "react-router-dom";
import FilterButton from "../components/FilterButton";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import FilterSystem from "../components/FilterSystem";
import { useEffect, useState, useMemo } from "react";

import useActivities from "../components/GetActivity";
import { getGradeColors } from "../utils/gradeColors";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { getLearningGoalLabel } from "../utils/learningGoalMapping";


function GameSelection() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filterChange, setFilterChange] = useState(0); // Trigger re-filter when filters change
  
  useEffect(() => {
    const storedGrade = localStorage.getItem("selectedGrade");
    const storedGoal = localStorage.getItem("selectedLearningGoal");
    setSelectedGrade(storedGrade);
    setSelectedGoal(storedGoal);
    setIsInitialized(true);

    // Listen for filter changes from FilterBoxes component
    const handleFilterChange = () => {
      setFilterChange(prev => prev + 1);
    };

    window.addEventListener("filtersChanged", handleFilterChange);
    
    return () => {
      window.removeEventListener("filtersChanged", handleFilterChange);
    };
  }, []);

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  
  // Only fetch activities after we've initialized the state from localStorage
  const { activities, loading } = useActivities(
    isInitialized ? selectedGrade : null, 
    isInitialized ? selectedGoal : null
  );

  // Filter activities based on saved filters from localStorage
  const filteredActivities = useMemo(() => {
    if (!activities || activities.length === 0) return activities;

    const timeFilter = localStorage.getItem("timeFilter");
    const toolsFilter = localStorage.getItem("toolsFilter");

    return activities.filter((activity) => {
      // Time filter
      if (timeFilter && timeFilter !== "") {
        const activityTime = parseInt(activity.time);
        const filterTime = parseInt(timeFilter);
        if (isNaN(activityTime) || isNaN(filterTime)) return false;
        // Exact match for the selected time
        if (activityTime !== filterTime) return false;
      }

      // Tools filter
      if (toolsFilter && toolsFilter !== "") {
        const activityTools = Array.isArray(activity.tools) 
          ? activity.tools.join(" ").toLowerCase() 
          : String(activity.tools).toLowerCase();

        switch (toolsFilter) {
          case "ingen": {
            // Check if tools contains "ingen" or is empty/minimal
            return activityTools.includes("ingen") || activityTools === "" || activityTools === "ingen";
          }
          
          case "minimum": {
            // Check for basic tools like papir, penn, skrivesaker
            const basicTools = ["papir", "penn", "blyant", "skriv", "tavle", "kritt"];
            const hasOnlyBasicTools = basicTools.some(tool => activityTools.includes(tool));
            const hasNoComplexTools = !["ball", "terning", "konkreter", "målebånd", "stoppeklokke"].some(tool => activityTools.includes(tool));
            return hasOnlyBasicTools && hasNoComplexTools;
          }
          
          case "mer": {
            // Check for more advanced tools
            const advancedTools = ["ball", "terning", "konkreter", "målebånd", "stoppeklokke", "ballonger"];
            return advancedTools.some(tool => activityTools.includes(tool));
          }
          
          default:
            return true;
        }
      }

      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, filterChange]);

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
        <button
          className="fixed top-36 right-6 z-60 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate("")}
          aria-label="Lukk aktivitetsside og gå tilbake"
        >
          ×
        </button>

        {/* Filter system with dropdowns and active indicators */}
        <FilterSystem />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          
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
                  // Extract the goal text (remove "Kompetansemål X:" prefix if present)
                  const goalText = selectedGoal.includes(':') ? selectedGoal.split(': ')[1] : selectedGoal;
                  
                  // Get the index from the selectedGoal string (e.g., "Kompetansemål 1:" -> index 0)
                  const goalMatch = selectedGoal.match(/Kompetansemål\s+(\d+)/i);
                  const goalIndex = goalMatch ? parseInt(goalMatch[1], 10) - 1 : 0;
                  
                  // Use the mapping function to get the proper label
                  const displayLabel = selectedGrade ? getLearningGoalLabel(selectedGrade, goalText, goalIndex) : `Kompetansemål ${goalIndex + 1}`;
                  
                  // Return the display label or fallback to capitalized goal text
                  return displayLabel.includes('Kompetansemål') 
                    ? goalText.charAt(0).toUpperCase() + goalText.slice(1)
                    : displayLabel;
                })()}
                onClick={() => navigate("/grade/learninggoals")}
                grade={selectedGrade || undefined}
              />
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-6">Velg aktivitet</h1>
          {filteredActivities.length === 0 && activities.length > 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Ingen aktiviteter matcher dine filterkriterier.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {filteredActivities.map((activity, index) => {
                const handleGameClick = () => {
                  localStorage.setItem("selectedGame", activity.title);
                  localStorage.setItem("selectedGameId", activity.id);
                  localStorage.setItem("selectedGameImage", activity.image);
                  localStorage.setItem("previousPage", "/gameSelection"); // Store where we came from
                  localStorage.setItem("selectedActivity", JSON.stringify(activity)); 
                  navigate("/infoTask");
                };

                return (
                  <GameCard
                    key={index}
                    title={activity.title}
                    image={activity.image}
                    time={`${activity.time}`}
                    location={activity.location}
                    tools={Array.isArray(activity.tools) ? activity.tools.join(", ") : activity.tools}
                    learningGoal={activity.learningGoals}
                    onClick={handleGameClick}
                    activityId={activity.id}
                    showHeartButton={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default GameSelection;
