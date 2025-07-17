function Footer() {
  return (
    <footer className="bg-gray-200 w-full mt-auto py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <div className="flex gap-4 items-center">
        <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
          <img src="/udir_logo.png" alt="Udir Logo" className="h-6 w-auto" />
        </a>
        <a href="https://ludenso.com" target="_blank" rel="noopener noreferrer">
          <img
            src="/Ludenso_logo.png"
            alt="Ludenso Logo"
            className="h-6 w-auto"
          />
        </a>
      </div>

      <a
        href="mailto:kontakt@example.com?subject=&body="
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/mail.png" alt="Mail icon" className="h-5 w-5" />
        <p>Kontakt</p>
      </a>
    </footer>
  );
}

export default Footer;
