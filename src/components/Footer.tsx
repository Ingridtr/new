function Footer() {
  return (
    <footer className="bg-gray-200 w-full mt-auto py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <div className="flex gap-4 items-center">
        <img src="/udir_logo.png" alt="Udir Logo" className="h-6 w-auto" />
        <img src="/Ludenso_logo.png" alt="Ludenso Logo" className="h-6 w-auto" />
      </div>

      <a
        href="mailto:kontakt@example.com?subject=Hello&body=Write your message here"
        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
      >
        <img src="/mail.png" alt="Mail icon" className="h-5 w-5" />
        <span>Kontakt</span>
      </a>
    </footer>
  );
}

export default Footer;
