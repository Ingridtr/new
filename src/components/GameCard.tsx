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
}

function GameCard({
  title,
  image,
  onClick,
  time = "5 min",
  location = "Inne/ute",
  tools = "Ingen",
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
      className="border border-black rounded-md w-80 h-96 bg-white shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex flex-col"
      aria-label={`Velg aktivitet: ${title}. Varighet: ${time}. Sted: ${location}. Utstyr: ${tools}`}
      type="button"
    >
      <div
        className="flex justify-between px-3 pt-3  text-sm"
        aria-hidden="true"
      >
        <p>🕒 {time}</p>
        <p>📍 {location}</p>
        <p>🛠️ Utstyr</p>
      </div>
      <p className="font-semibold">{title}</p>
      <ImagePreloader
        src={image}
        alt={`Illustrasjon for aktiviteten ${title}`}
        className="w-full flex-1 object-cover rounded-b-md"
        placeholder="/logo.png"
        fallback=""
      />

      {/* Screen reader only content with better description */}
      <div className="sr-only">
        Aktivitet: {title}. Varighet: {time}. Kan utføres: {location}. Nødvendig
        utstyr: {tools}. Trykk for å se mer informasjon og oppgaver.
      </div>
    </button>
  );
}

export default GameCard;
