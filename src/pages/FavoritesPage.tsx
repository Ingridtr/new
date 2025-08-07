import {useEffect, useState} from "react";
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


return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar/>
    
    <div className = "p-4">
        <h1 className ="text-xl font-bold mb-4">Dine favoritter</h1>
        {favorites.length === 0 ? (
            <p>Du har ingen favoritter enda.</p>
        ): (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favorites.map((activity) => {
            const handleClick = () => {
                localStorage.setItem("selectedGame", activity.title);
                localStorage.setItem("selectedGameId", activity.id);
                localStorage.setItem("selectedGameImage", activity.image);
                localStorage.setItem("selectedActivity", JSON.stringify(activity)); 
                navigate("/infoTask");
            }
    
            return (
    <div key={activity.id} className="relative">
      <GameCard
        title={activity.title}
        image={activity.image}
        time={activity.time}
        location={activity.location}
        tools={Array.isArray(activity.tools) ? activity.tools.join(", ") : activity.tools}
        onClick={handleClick}
        onDelete={() => removeFavorite(activity.id)}
      />
    
    </div>
  );
          })};
        </div>
        )}
    </div>
    
    <Footer/>
    </div>
    
        );   
}

export default FavoritesPage;
