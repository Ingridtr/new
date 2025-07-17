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
  return (
    <button
      onClick={onClick}
      className="border border-black rounded-md max-w-[320px] bg-white shadow hover:shadow-md transition"
    >
      <div className="flex justify-between px-3 pt-3 font-semibold text-sm">
        <div className="flex gap-1 items-center">🕒 {time}</div>
        <div className="flex gap-1 items-center">📍 {location}</div>
        <div className="flex gap-1 items-center">🛠️ {tools}</div>
      </div>
      <div className="text-center font-bold text-lg mt-1">{title}</div>
      <img
        src={image}
        alt={title}
        className="w-full h-[400px] object-cover rounded-b-md"
      />
    </button>
  );
}

export default GameCard;
