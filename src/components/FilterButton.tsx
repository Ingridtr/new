interface FilterButtonProps {
  text: string;
  onRemove: () => void;
}

function FilterButton({ text, onRemove }: FilterButtonProps) {
  return (
    <button
      className="flex items-center justify-between border border-black rounded-full px-4 py-2 text-black"
      style={{
        width: "auto",
        minWidth: "120px",
        height: "2.5vw",
        minHeight: "40px",
      }}
    >
      <span className="mr-2">{text}</span>
      <span
        className="text-xl font-bold cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </span>
    </button>
  );
}

export default FilterButton;
