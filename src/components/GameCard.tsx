import React from "react";
import { ImagePreloader } from "./ImagePreloader";
import HeartButton from "./HeartButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

interface GameCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  time?: string;
  location?: string;
  tools: string;
  learningGoal?: string[];
  onDelete?: () => void;
  activityId?: string; // Add activityId prop for heart button
  showHeartButton?: boolean; // Add option to show heart button
}

function GameCard({
  title,
  image,
  onClick,
  time = "5",
  location = "Inne/ute",
  tools = "Ingen",
  onDelete,
  activityId,
  showHeartButton = false,
}: GameCardProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        type="button"
        onClick={onClick}
        onKeyDown={handleKeyPress}
        className="border border-black rounded-md w-full h-full bg-white shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex flex-col text-left overflow-hidden"
        aria-label={`Velg aktivitet: ${title}. Varighet: ${time}. Sted: ${location}. Utstyr: ${tools}`}
      >
        <div className="flex px-3 gap-3 pt-3 text-sm" aria-hidden="true">
          <p>🕒 {time} min</p>
          <p>📍 {location}</p>
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
          Aktivitet: {title}. Varighet: {time}. Kan utføres: {location}. Utstyr:{" "}
          {tools}. Trykk for mer info.
        </div>
      </button>

      {onDelete && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className=" absolute text-2xl hover:scale-110 transition-transform top-2 right-2 z-10 mx-3  "
          aria-label="Fjern fra favoritter"
        >
          <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#e32400" }} />
        </div>
      )}

      {showHeartButton && activityId && (
        <div
          className="absolute top-2 right-2 z-10 mx-3"
          onClick={(e) => e.stopPropagation()}
        >
          <HeartButton pageId={activityId} />
        </div>
      )}
    </div>
  );
}
export default GameCard;
