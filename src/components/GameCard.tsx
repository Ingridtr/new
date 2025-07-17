interface GameCardProps {
  title: string;
  image: string;
  onClick?: () => void;
  time?: string;
  location?: string;
  tools?: string;
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
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="border border-black rounded-md max-w-[320px] bg-white shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`Velg aktivitet: ${title}. Varighet: ${time}. Sted: ${location}. Utstyr: ${tools}`}
      type="button"
    >
      <div className="flex justify-between px-3 pt-3 font-semibold text-sm" aria-hidden="true">
        <div className="flex gap-1 items-center">🕒 {time}</div>
        <div className="flex gap-1 items-center">📍 {location}</div>
        <div className="flex gap-1 items-center">🛠️ {tools}</div>
      </div>
      <div className="text-center font-bold text-lg mt-1" aria-hidden="true">
        {title}
      </div>
      <img
        src={image}
        alt={`Illustrasjon for aktiviteten ${title}`}
        className="w-full h-[400px] object-cover rounded-b-md"
      />
      
      {/* Screen reader only content with better description */}
      <div className="sr-only">
        Aktivitet: {title}. 
        Varighet: {time}. 
        Kan utføres: {location}. 
        Nødvendig utstyr: {tools}.
        Trykk for å se mer informasjon og oppgaver.
      </div>
    </button>
  );
}

export default GameCard;
