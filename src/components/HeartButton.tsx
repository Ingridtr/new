import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

type Props = {
  pageId: string;
};

const HeartButton = ({ pageId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(stored.includes(pageId));
  }, []);

  const pickFavorites = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (stored.includes(pageId)) {
      updated = stored.filter((favId: string) => favId !== pageId);
    } else {
      updated = [...stored, pageId];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  };

  return (
    <button
      onClick={pickFavorites}
      className="text-2xl hover:scale-110 transition-transform"
      aria-label="Favorittknapp"
    >
      {isFavorite ? (
        <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#e32400" }} />
      ) : (
        <FontAwesomeIcon icon={faHeartRegular} style={{ color: "#000000" }} />
      )}
    </button>
  );
};
export default HeartButton;
