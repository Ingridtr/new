interface PrintOutComponentProps {
  id: string;
  title: string;

  extra: string[];
}

function PrintOutComponent({ id, title, extra }: PrintOutComponentProps) {
  const handlePrint = () => {
    const images = extra.filter(src => 
      src.toLowerCase().endsWith('.png') || 
      src.toLowerCase().endsWith('.jpg') || 
      src.toLowerCase().endsWith('.jpeg') || 
      src.toLowerCase().endsWith('.gif') || 
      src.toLowerCase().endsWith('.svg')
    );
    
    const docxFiles = extra.filter(src => 
      src.toLowerCase().endsWith('.docx')
    );
    
    const pdfFiles = extra.filter(src => 
      src.toLowerCase().endsWith('.pdf')
    );

    const pdfFiles = extra.filter(src => 
      src.toLowerCase().endsWith('.pdf')
    );

    // Download docx files directly
    docxFiles.forEach(src => {
      const link = document.createElement('a');
      link.href = src;
      link.download = src.split('/').pop() || 'dokument.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    pdfFiles.forEach(src => {
      const link = document.createElement('a');
      link.href = src;
      link.download = src.split('/').pop() || 'dokument.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Only open print window if there are images
    if (images.length > 0) {
      const printWindow = window.open("", "_blank");

      if (printWindow) {
        const imagesHTML = images
          .map(
            (src) =>
              `<div class="image-container">
                <img src="${src}" alt="Hjelpemiddel" />
              </div>`
          )
          .join("");

        const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
        ${id}
          <title>${title} - Hjelpemidler</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 1rem;
              background: white;
              margin: 0;
            }
            .image-container {
              padding: 20px;
              page-break-inside: avoid;
              page-break-after: always;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 80vh;
              box-sizing: border-box;
            }
            img {
              max-width: 90%;
              max-height: 80vh;
              object-fit: contain;
              display: block;
              margin: 0 auto;
            }
            h1 {
              text-align: center;
              margin-bottom: 2rem;
              page-break-after: avoid;
            }
            @media print {
              body {
                padding: 0.5in;
              }
              .image-container {
                page-break-inside: avoid;
                page-break-after: always;
                margin: 0;
                padding: 0.25in;
              }
              .image-container:last-of-type {
                page-break-after: auto;
              }
              img {
                max-width: 100%;
                max-height: 9in;
                page-break-inside: avoid;
              }
              h1 {
                page-break-after: avoid;
                margin-bottom: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          <h1>${title} – Hjelpemidler</h1>
          ${imagesHTML}
        </body>
        </html>
      `;

        printWindow.document.write(printContent);
        printWindow.document.close();

        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };
  if (!extra || extra.length === 0) return null;

  return (
    <button
      className="flex items-center gap-2 hover:bg-pink-300 rounded cursor-pointer transition-colors w-full text-left"
      onClick={handlePrint}
      aria-label="Print aktivitet"
    >
      <span role="img" aria-label="Printer">
        Print ut hjelpemidler
      </span>
    </button>
  );
}

export default PrintOutComponent;
