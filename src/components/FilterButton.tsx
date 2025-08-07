import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getGradeColors } from "../utils/gradeColors";

interface FilterButtonProps {
  text: string;
  onClick?: () => void;
  ariaLabel?: string;
  grade?: string; // Optional grade to apply specific colors
}

function FilterButton({ text, onClick, ariaLabel, grade }: FilterButtonProps) {
  const buttonAriaLabel = ariaLabel || `Fjern filter: ${text}`;
  
  // Get colors based on grade, fallback to default gray styling
  const colors = grade ? getGradeColors(grade) : {
    bg: "bg-white",
    hover: "hover:bg-gray-50",
    focus: "focus:ring-blue-500",
    border: "border-black"
  };
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between border ${colors.border} rounded-full px-4 py-2 text-black cursor-pointer min-w-28 min-h-10 text-sm sm:text-base ${colors.bg} ${colors.hover} ${colors.focus} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
      aria-label={buttonAriaLabel}
      type="button"
    >
      <p aria-hidden="true">{text}</p>
      <FontAwesomeIcon 
        icon={faXmark} 
        aria-hidden="true"
        className="ml-2 flex-shrink-0"
      />
    </button>
  );
}

export default FilterButton;
