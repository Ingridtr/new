interface PrintOutComponentProps {
  id: string;
  title: string;

  extra: string[];
}

function PrintOutComponent({ id, title, extra }: PrintOutComponentProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const imagesHTML = extra
        .map(
          (src) =>
            `<img src="${src}" alt="Hjelpemiddel" style="width:100%; margin-bottom: 20px;" />`
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
            padding: 2rem;
            background: white;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 2rem;
          }
          @media print {
            img {
              page-break-after: always;
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
