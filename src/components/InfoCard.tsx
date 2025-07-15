interface InfoCardProps {
  title: string;
  description: string;
  bulletPoints?: string[];
  buttonText?: string;
  onClick?: () => void;
}

function InfoCard({ title, description, bulletPoints, buttonText = "Les mer her", onClick }: InfoCardProps) {
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
      <button 
        onClick={onClick} 
        className="bg-sky-200 px-4 py-2 rounded-full hover:bg-sky-300 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default InfoCard;