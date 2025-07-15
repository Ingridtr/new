import { useState } from 'react';

interface ActionButtonProps {
  type: 'print' | 'showOnScreen';
  title: string;
  location: string;
  duration: string;
  tools: string;
  competencyGoals: string[];
  description: string;
  tasks: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
  variations: string;
  reflectionQuestions: string;
  illustrationImage?: string; // Optional image for show on screen
}

function ActionButton({
  type,
  title,
  location,
  duration,
  tools,
  competencyGoals,
  description,
  tasks,
  variations,
  reflectionQuestions,
  illustrationImage,
}: ActionButtonProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title} - Aktivitet</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.4;
            }
            .print-container {
              max-width: 800px;
              margin: 0 auto;
            }
            .info-section {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 10px;
            }
            .info-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .main-content {
              margin-bottom: 20px;
            }
            h1 {
              color: #333;
              border-bottom: 2px solid #007bff;
              padding-bottom: 10px;
            }
            h2 {
              color: #555;
              margin-top: 25px;
            }
            h3 {
              color: #666;
              margin-top: 15px;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="info-section">
              <div class="info-grid">
                <div class="info-item">
                  <span>📍</span>
                  <span>${location}</span>
                </div>
                <div class="info-item">
                  <span>⏱️</span>
                  <span>${duration}</span>
                </div>
                <div class="info-item">
                  <span>🛠️</span>
                  <span>${tools}</span>
                </div>
              </div>
            </div>

            <div class="main-content">
              <h1>${title}</h1>
              <h2>Kobling til kompetansemål</h2>
              <ul>
                ${competencyGoals.map(goal => `<li>${goal}</li>`).join('')}
              </ul>
            </div>

            <div class="main-content">
              <h2>Beskrivelse</h2>
              <p>${description}</p>
            </div>

            <div class="main-content">
              <h2>Oppgaver</h2>
              
              <h3>Enkel</h3>
              <ul>
                ${tasks.easy.map(task => `<li>${task}</li>`).join('')}
              </ul>

              <h3>Middels</h3>
              <ul>
                ${tasks.medium.map(task => `<li>${task}</li>`).join('')}
              </ul>

              <h3>Vanskelig</h3>
              <ul>
                ${tasks.hard.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>

            <div class="main-content">
              <h2>Variasjoner</h2>
              <p>${variations}</p>
            </div>

            <div class="main-content">
              <h2>Refleksjonsspørsmål [Etter aktiviteten]</h2>
              <p>${reflectionQuestions}</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleShowOnScreen = () => {
    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  const handleAction = () => {
    if (type === 'print') {
      handlePrint();
    } else {
      handleShowOnScreen();
    }
  };

  const getButtonContent = () => {
    if (type === 'print') {
      return (
        <>
          <span>🖨️</span>
          <span>Print aktivitet</span>
        </>
      );
    } else {
      return (
        <>
          <span>📱</span>
          <span>Vis på skjerm</span>
        </>
      );
    }
  };

  return (
    <>
      <button 
        className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
        onClick={handleAction}
      >
        {getButtonContent()}
      </button>

      {/* Fullscreen modal for show on screen */}
      {showFullscreen && type === 'showOnScreen' && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close button */}
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-50"
          >
            ×
          </button>
          
          {/* Content */}
          <div className="w-full h-full flex items-center justify-center p-4">
            {illustrationImage ? (
              <img 
                src={illustrationImage} 
                alt={`${title} illustration`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-white text-center">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl">{description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ActionButton;
