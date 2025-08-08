import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  backgroundColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ backgroundColor = "bg-white" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
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
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenuAndNavigate = (path: string) => {
    setMenuOpen(false);
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
            <a href="/management" role="menuitem">
              For ledelsen
            </a>
          </li>
          <li role="none">
            <a href="/knowledge" role="menuitem">
              Kunnskapssiden
            </a>
          </li>
          <li role="none">
            <a href="/about" role="menuitem">
              Om oss
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
              onClick={() => closeMenuAndNavigate("/management")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>For ledelsen</p>
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
              onClick={() => closeMenuAndNavigate("/favorites")}
              className="block w-full text-left hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              role="menuitem"
            >
              <p>Min side</p>
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
