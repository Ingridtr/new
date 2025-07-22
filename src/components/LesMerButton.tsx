import { useState, useEffect, useRef } from "react";
import { trapFocus, announceSuccess } from "../utils/accessibility";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const cleanup = trapFocus(modalRef.current);
      return cleanup;
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    announceSuccess(`Åpnet informasjonsvindu: ${title}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    announceSuccess("Informasjonsvindu lukket");
    // Return focus to the button that opened the modal
    setTimeout(() => {
      openButtonRef.current?.focus();
    }, 100);
  };

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={handleOpenModal}
        className={`bg-sky-200 my-4 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${className}`}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        type="button"
      >
        {buttonText}
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
          style={{ whiteSpace: "pre-line" }}
        >
          <div 
            ref={modalRef}
            className="bg-white p-8 rounded-2xl max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title">{title}</h2>
            <div id="modal-content">
              <p>{content}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mt-4"
              aria-label={`Lukk informasjonsvindu: ${title}`}
              type="button"
            >
              Lukk
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LesMerButton;
