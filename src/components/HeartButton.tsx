import  { useEffect, useState } from "react"; 

type Props = {
    pageId: string;
}; 

const HeartButton = ({ pageId }: Props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect (() => {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(stored.includes(pageId));
    }, []); 

    const pickFavorites = () => {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]"); 
        //const currentFavorites = JSON.parse(localStorage.)
        let updated; 

    if (stored.includes(pageId)){
        updated = stored.filter((favId: string) => favId !==pageId); 
    } else {
        updated = [...stored, pageId];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
}; 

return (
    <button 
    onClick = {pickFavorites}
        className = "text-2xl hover:scale-110 transition-transform"
        aria-label = "Favorittknapp"
    >
    {isFavorite ? "❤️" : "🤍"}
    </button>
);

}; 
export default HeartButton; 
