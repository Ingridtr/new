import React from "react";
import { ImagePreloader } from "./ImagePreloader";

interface GameCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  time?: string;
  location?: string;
  tools: string;
  learningGoal?: string[];
  onDelete?: () => void;
}

function GameCard({
  title,
  image,
  onClick,
  time = "5 min",
  location = "Inne/ute",
  tools = "Ingen",
  onDelete,
}: GameCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="border border-black rounded-md w-full max-w-xs min-h-[25rem] bg-white shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex flex-col"
      aria-label={`Velg aktivitet: ${title}. Varighet: ${time}. Sted: ${location}. Utstyr: ${tools}`}
      type="button"
    >
      <div
        className="flex justify-between px-3 pt-3  text-sm"
        aria-hidden="true"
      >
        <div className="flex justify-between px-3 pt-3 text-sm" aria-hidden="true">
          <p>🕒 {time}</p>
          <p>📍 {location}</p>
          <p>🛠️ {tools}</p>
        </div>

        <p className="font-semibold px-3 mt-1">{title}</p>

        <ImagePreloader
          src={image}
          alt={`Illustrasjon for aktiviteten ${title}`}
          className="w-full h-96 object-cover"
          placeholder="/logo.png"
          fallback=""
        />

        <div className="sr-only">
          Aktivitet: {title}. Varighet: {time}. Kan utføres: {location}. Utstyr: {tools}. Trykk for mer info.
        </div>
      </button>

      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="absolute top-2 right-2 z-10 text-red-600 hover:scale-110 text-xl"
          aria-label="Fjern fra favoritter"
          type="button"
        >
          X
        </button>
      )}
    </div>

  )
}

export default GameCard;
