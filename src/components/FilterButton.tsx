import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface FilterButtonProps {
  text: string;
  onClick?: () => void;
  ariaLabel?: string;
}

function FilterButton({ text, onClick, ariaLabel }: FilterButtonProps) {
  const buttonAriaLabel = ariaLabel || `Fjern filter: ${text}`;
  
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between border border-black rounded-full px-4 py-2 text-black cursor-pointer min-w-28 min-h-10 text-sm sm:text-base hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={buttonAriaLabel}
      type="button"
    >
      <span className="px-2 truncate" aria-hidden="true">{text}</span>
      <FontAwesomeIcon 
        icon={faXmark} 
        aria-hidden="true"
        className="ml-2 flex-shrink-0"
      />
    </button>
  );
}

export default FilterButton;
