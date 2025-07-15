import { useState } from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  bulletPoints?: string[];
  modalContent?: string; // Additional content for modal
}

function InfoCard({ title, description, bulletPoints, modalContent = "Mer informasjon kommer snart..." }: InfoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="border rounded-3xl p-8 bg-white">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        {bulletPoints && (
          <ul className="list-disc list-inside mb-4">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors"
        >
          Les mer her
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-2xl mx-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-4">{modalContent}</p>
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

export default InfoCard;