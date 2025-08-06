interface PrintComponentProps {
  id: string;
  title: string;
  time: string;
  location: string;
  tools: string[];
  groupsize: string;
  learning_goals: string[];
  content: {
    introduction: string;
    main: string;
    examples: string[];
    reflection: string[];
  };
  tips: string;
  extra: string;
}

function PrintComponent({
  id,
  title,
  time,
  location,
  tools,
  groupsize,
  learning_goals,
  content: { introduction, main, examples, reflection },
  tips,
  extra,
}: PrintComponentProps) {
  const handlePrint = () => {
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
                  <span>${time}</span>
                </div>
                <div class="info-item">
                  <span role="img" aria-label="Utstyr">🛠️</span>
                  <span>${tools.join(", ")}</span>
                </div>
                <div class="info-item">
                  <span role="img" aria-label="Gruppe">👥</span>
                  <span>${groupsize}</span>
                </div>
              </div>
            </div>

            <div class="main-content">
              <h1>${title}</h1>
            
              <p>${introduction}</p>
              <h2>Slik gjør du</h2>
              <p>${main}</p>
              <h2>Eksempler</h2>
              <ul>
                ${examples.map((ex) => `<li>${ex}</li>`).join("")}
              </ul>
              <h2>Tips</h2>
              <p>${tips}</p>
              <h2>Refleksjonsspørsmål</h2>
              <ul>
                ${reflection.map((q) => `<li>${q}</li>`).join("")}
              </ul>
              
    
            </div>
            <h2>Kobling til kompetansemål</h2>
              <ul>
                ${learning_goals.map((goal) => `<li>${goal}</li>`).join("")}
              </ul>
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
      className="flex items-center gap-2 hover:bg-pink-300 rounded cursor-pointer transition-colors w-full text-left"
      onClick={handlePrint}
      aria-label="Print aktivitet"
    >
      <span role="img" aria-label="Printer">
        Print ut aktivitet som PDF
      </span>
    </button>
  );
}

export default PrintComponent;
