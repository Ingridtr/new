import { useState } from "react";

interface LesMerButtonProps {
  title: string;
  content: string;
  buttonText?: string;
  className?: string;
}

function LesMerButton({
  title,
  content,
  buttonText = "Les mer her",
  className = "",
}: LesMerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors ${className}`}
      >
        {buttonText}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h1>{title}</h1>
            <p>{content}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors"
            >
              <a>Lukk</a>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LesMerButton;
