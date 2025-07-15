import { useState } from 'react';

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
  className = "" 
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="mb-6 whitespace-pre-line">{content}</div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors"
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
