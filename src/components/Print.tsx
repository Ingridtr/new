import { ActivityData } from '../types/interfaces';

interface PrintComponentProps extends ActivityData {
  // Print component uses all ActivityData properties
}

function PrintComponent(props: PrintComponentProps) {
  const {
    title,
    image,
    time,
    location,
    equipment,
    competencyGoals,
    description,
    tasks,
    variations,
    reflectionQuestions,
  } = props;
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
              margin-bottom: 20px;
            }
            .main-content {
              background: white;
              padding: 20px;
              margin-bottom: 20px;
            }
            h1 {
              text-align: center;
              font-size: 28px;
              margin-bottom: 20px;
            }
            h2 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            h3 {
              font-size: 16px;
              font-weight: bold;
              margin-top: 15px;
              margin-bottom: 8px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin-bottom: 20px;
            }
            .info-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            li {
              margin-bottom: 5px;
            }
            .page-break {
              page-break-before: always;
            }
            @media print {
              body { margin: 0; }
              .info-section, .main-content {
                break-inside: avoid;
              }
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
                  <span>${time}</span>
                </div>
                <div class="info-item">
                  <span>🛠️</span>
                  <span>${equipment}</span>
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

  return (
    <button 
      className="flex items-center gap-2 hover:bg-gray-50 rounded cursor-pointer transition-colors w-full text-left"
      onClick={handlePrint}
    >
      <span>🖨️</span>
      <span>Print aktivitet</span>
    </button>
  );
}

export default PrintComponent;
