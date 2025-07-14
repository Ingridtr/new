import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-200 py-6 px-6">
      <div className="flex items-center justify-between">
        {/* VENSTRE: Logo + tekst (IKKE sentrert) */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Kalkulek Logo" className="h-20 w-20" />
          <span className="text-2xl font-semibold text-gray-800">Kalkulek</span>
        </div>

        {/* HØYRE: Navigasjonsmeny */}
        <ul className="hidden md:flex items-center space-x-10 text-lg">
          <li>
            <a href="/" className="text-gray-800 hover:underline">
              For ledelsen
            </a>
          </li>
          <li>
            <a href="/kunnskap" className="text-gray-800 hover:underline">
              Kunnskapssiden
            </a>
          </li>
          <li>
            <a href="/om" className="text-gray-800 hover:underline">
              Om Kalkulek
            </a>
          </li>
          <li>
            <a href="/" className="text-gray-800 hover:text-black">
              <FontAwesomeIcon icon={faHouse} className="h-5 w-5 space-x-3" />
              Hjem
            </a>
          </li>
        </ul>

        {/* Hamburger for mobil */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

      {/* Mobilmeny */}
      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-lg text-gray-800">
          <li>
            <a href="/" className="block hover:underline">
              For ledelsen
            </a>
          </li>
          <li>
            <a href="/kunnskap" className="block hover:underline">
              Kunnskapssiden
            </a>
          </li>
          <li>
            <a href="/om" className="block hover:underline">
              Om Kalkulek
            </a>
          </li>
          <li>
            <a href="/" className="block hover:text-black">
              <svg
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l9-9 9 9M4 10v10h16V10"
                />
              </svg>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
