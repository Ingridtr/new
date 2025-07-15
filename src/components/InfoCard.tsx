import LesMerButton from './LesMerButton';

interface InfoCardProps {
  title: string;
  description: string;
  bulletPoints?: string[];
  modalContent?: string; // Additional content for modal
}

function InfoCard({ title, description, bulletPoints, modalContent = "Mer informasjon kommer snart..." }: InfoCardProps) {
  return (
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
      <LesMerButton 
        title={title}
        content={modalContent}
      />
    </div>
  );
}

export default InfoCard;