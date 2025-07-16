interface FilterButtonProps {
  text: string;
  onClick?: () => void;
}

function FilterButton({ text, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between border border-black rounded-full px-4 py-2 text-black cursor-pointer"
      style={{
        width: "auto",
        minWidth: "120px",
        height: "2.5vw",
        minHeight: "40px",
      }}
    >
      <span className="mr-2">{text}</span>×
    </button>
  );
}

export default FilterButton;
