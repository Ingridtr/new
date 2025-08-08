import {useEffect, useMemo, useState} from "react";
import { useNavigate } from 'react-router-dom'; 

import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import activities from "../data/activities.json";
import GameCard from "../components/GameCard";
import { Activity } from "../data/types";


const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Activity[]>([]);
    const navigate = useNavigate(); 
    
    useEffect( () => {
        const stored = localStorage.getItem("favorites");
        const favoriteIds = JSON.parse(stored || "[]");
        const favActivities = activities .filter((activity) => favoriteIds.includes(activity.id))
            .map((activity) => ({
                ...activity,
                tools: typeof activity.tools === "string"
                    ? activity.tools.split(",").map((t) => t.trim())
                    : activity.tools,
                grade: Array.isArray(activity.grade)
            ? activity.grade.join(", ") 
            : activity.grade,
  }));
        
        setFavorites(favActivities);
    }, []);

    const removeFavorite = (id: string) => {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        const updated = stored.filter((favId: string) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites((prev) => prev.filter((a) => a.id !== id));
    };

    const gradeKey = (g: string) => {
        const m = g.match(/\d+/);
        return m ? `${parseInt(m[0], 10)}. trinn` : g.trim();
};

    
    const groupedByGrade = useMemo(() => {
  return favorites.reduce<Record<string, Activity[]>>((acc, a) => {
    const key = gradeKey(a.grade);
    (acc[key] ??= []).push(a);   // <-- bare ÉN push per aktivitet
    return acc;
  }, {});
}, [favorites]);

    //Sorter numerisk på tallet i teksten 
    const gradeNum = (label: string) => {
        const num = (label.match(/\d+/));
        return num ? parseInt(num[0], 10) :999;
     }
    const sortedGradeLabels = useMemo(
        () => Object.keys(groupedByGrade).sort((a, b) => gradeNum(a) - gradeNum(b) || a.localeCompare(b, 'nb') ), 
        [groupedByGrade]
    );




return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar/>
    
    <div className = "p-4">
        <h1 className ="text-xl font-bold mb-4">Dine favoritter</h1>
        {favorites.length === 0 ? (
            <p>Du har ingen favoritter enda.</p>
        ): (
            sortedGradeLabels.map(gradeLabel => (
        <section key={gradeLabel} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{gradeLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {groupedByGrade[gradeLabel].map(activity => (
              <GameCard
                key={activity.id}
                title={activity.title}
                image={activity.image}
                time={activity.time}
                location={activity.location}
                tools={activity.tools.join(", ")}  // Activity.tools er string[]
                onClick={() => {
                  localStorage.setItem("selectedGame", activity.title);
                  localStorage.setItem("selectedGameId", activity.id);
                  localStorage.setItem("selectedGameImage", activity.image);
                  localStorage.setItem("selectedActivity", JSON.stringify(activity));
                  navigate("/infoTask");
                }}
                onDelete={() => removeFavorite(activity.id)} // X kun på favorittsiden
              />
            ))}
          </div>
        </section>
      ))
            
        )}
    </div>
    
    <Footer/>
    </div>
    
        );   
}

export default FavoritesPage;
