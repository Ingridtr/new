import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  backgroundColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor = "bg-white" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const rightMenuButtonRef = useRef<HTMLButtonElement>(null);
  const rightMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === "Escape" && rightMenuOpen) {
        setRightMenuOpen(false);
        rightMenuButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !menuButtonRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
      
      if (
        rightMenuRef.current &&
        !rightMenuRef.current.contains(e.target as Node) &&
        !rightMenuButtonRef.current?.contains(e.target as Node)
      ) {
        setRightMenuOpen(false);
      }
    };

    if (menuOpen || rightMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, rightMenuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleRightMenu = () => {
    setRightMenuOpen(!rightMenuOpen);
  };

  const closeMenuAndNavigate = (path: string) => {
    setMenuOpen(false);
    setRightMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border ${backgroundColor} py-4 px-6`}
      role="navigation"
      aria-label="Hovednavigasjon"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/")}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Gå til forsiden"
          >
            <img
              src="/logo.png"
              alt="Kalkulek Logo"
              className="cursor-pointer w-16 h-16 min-w-12 min-h-12 lg:w-20 lg:h-20"
            />
          </button>
          <button
            className="text-2xl font-semi-bold cursor-pointer text-black hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            onClick={() => navigate("/")}
            aria-label="Kalkulek - gå til forsiden"
          >
            Kalkulek
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <ul
            className="hidden md:flex items-center space-x-16 lg:text-xl sm:text-sm font-semi-bold text-black"
            role="menubar"
          >
            <li role="none">
              <a href="/favorites" role="menuitem">
                Min side
              </a>
            </li>
            <li role="none">
              <a href="/grade" role="menuitem">
                Oppgaver
              </a>
            </li>
            <li role="none">
              <a href="/search" role="menuitem">
                🔍 Søk
              </a>
            </li>
            <li role="none">
              <a href="/" role="menuitem" aria-label="Gå til forsiden">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                <span>Hjem</span>
              </a>
            </li>
          </ul>

          {/* Right Hamburger Menu for Desktop */}
          <div className="relative hidden md:block">
            <button
              ref={rightMenuButtonRef}
              onClick={toggleRightMenu}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-2 text-black hover:bg-gray-100"
              aria-expanded={rightMenuOpen}
              aria-controls="right-menu"
              aria-label={rightMenuOpen ? "Lukk meny" : "Åpne meny"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>

            {/* Right Menu Dropdown */}
            {rightMenuOpen && (
              <div
                ref={rightMenuRef}
                id="right-menu"
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                role="menu"
                aria-labelledby="right-menu-button"
              >
                <a
                  href="/knowledge"
                  className="block px-4 py-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded mx-1"
                  role="menuitem"
                  onClick={() => setRightMenuOpen(false)}
                >
                  Kunnskapssiden
                </a>
                <a
                  href="/about"
                  className="block px-4 py-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded mx-1"
                  role="menuitem"
                  onClick={() => setRightMenuOpen(false)}
                >
                  Om oss
                </a>
                <a
                  href="/management"
                  className="block px-4 py-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded mx-1"
                  role="menuitem"
                  onClick={() => setRightMenuOpen(false)}
                >
                  For ledelsen
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Lukk mobilmeny" : "Åpne mobilmeny"}
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden mt-4 space-y-3 text-lg text-black rounded-lg p-4"
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/search")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>🔍 Søk</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/favorites")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>Min side</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/grade")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>Oppgaver</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/knowledge")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>Kunnskapssiden</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/about")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>Om oss</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/management")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>For ledelsen</p>
            </button>
          </li>
          <li role="none">
            <button
              onClick={() => closeMenuAndNavigate("/")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
              aria-label="Gå til forsiden"
            >
              <p>Hjem</p>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
