import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface FilterButtonProps {
  text: string;
  onClick?: () => void;
}

function FilterButton({ text, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between border border-black rounded-full px-4 py-2 text-black cursor-pointer min-w-[120px] min-h-[40px] text-sm sm:text-base"
    >
      <p className="px-2 truncate">{text}</p>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}

export default FilterButton;
