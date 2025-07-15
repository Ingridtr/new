import { useNavigate } from "react-router-dom";

function GameCard() {
  const navigate = useNavigate();

  return (
    <button
      className="border border-black text-black font-bold text-center flex items-center justify-center mx-auto"
      style={{
        width: "350px",
        height: "500px",
      }}
      onClick={() => navigate("/infoTask")}
    >
      Spillkort
    </button>
  );
}

export default GameCard;