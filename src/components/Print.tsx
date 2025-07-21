interface PrintComponentProps {
  title: string;
  location: string;
  duration: string;
  tools: string[];
  learningGoals: string[];
  description: string;
  tasks: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
  variations: string;
  reflectionQuestions: string;
}

function PrintComponent({
  title,
  location,
  duration,
  tools,
  learningGoals,
  description,
  tasks,
  variations,
  reflectionQuestions,
}: PrintComponentProps) {
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title} - Aktivitet</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 1.25rem;
              line-height: 1.4;
            }
            .print-container {
              max-width: 50rem;
              margin: 0 auto;
            }
            .info-section {
              background: #f8f9fa;
              padding: 0.9375rem;
              margin-bottom: 1.25rem;
            }
            .main-content {
              background: white;
              padding: 1.25rem;
              margin-bottom: 1.25rem;
            }
            h1 {
              text-align: center;
              font-size: 1.75rem;
              margin-bottom: 1.25rem;
            }
            h2 {
              font-size: 1.125rem;
              font-weight: bold;
              margin-bottom: 0.625rem;
            }
            h3 {
              font-size: 1rem;
              font-weight: bold;
              margin-top: 0.9375rem;
              margin-bottom: 0.5rem;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 0.625rem;
              margin-bottom: 1.25rem;
            }
            .info-item {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            ul {
              margin: 0.625rem 0;
              padding-left: 1.25rem;
            }
            li {
              margin-bottom: 0.3125rem;
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
                  <span role="img" aria-label="Sted">📍</span>
                  <span>${location}</span>
                </div>
                <div class="info-item">
                  <span role="img" aria-label="Varighet">⏱️</span>
                  <span>${duration}</span>
                </div>
                <div class="info-item">
                  <span role="img" aria-label="Utstyr">🛠️</span>
                  <span>${tools}</span>
                </div>
              </div>
            </div>

            <div class="main-content">
              <h1>${title}</h1>
              <h2>Kobling til kompetansemål</h2>
              <ul>
                ${learningGoals.map((goal) => `<li>${goal}</li>`).join("")}
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
                ${tasks.easy.map((task) => `<li>${task}</li>`).join("")}
              </ul>

              <h3>Middels</h3>
              <ul>
                ${tasks.medium.map((task) => `<li>${task}</li>`).join("")}
              </ul>

              <h3>Vanskelig</h3>
              <ul>
                ${tasks.hard.map((task) => `<li>${task}</li>`).join("")}
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
      aria-label="Print aktivitet"
    >
      <span role="img" aria-label="Printer">🖨️</span>
      <p>Print aktivitet</p>
    </button>
  );
}

export default PrintComponent;
