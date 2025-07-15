import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-sky-200 py-6 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Kalkulek Logo"
            className="cursor-pointer"
            onClick={() => navigate("/")}
            style={{
              width: "4vw",
              minWidth: "60px",
              height: "4vw",
              minHeight: "60px",
            }}
          />
          <span
            className="lg:text-3xl sm:text-xl font-semi-bold cursor-pointer text-black"
            onClick={() => navigate("/")}
          >
            Kalkulek
          </span>
        </div>

        {/*Navigasjonsmeny */}
        <ul className="hidden md:flex items-center space-x-16 lg:text-xl sm:text-sm font-semi-bold cursor-pointer text-black">
          <li>
            <a href="/Management" className="text-black hover:underline">
              For ledelsen
            </a>
          </li>
          <li>
            <a href="/Info" className="text-black hover:underline">
              Kunnskapssiden
            </a>
          </li>
          <li>
            <a href="/About" className="text-black hover:underline">
              Om Kalkulek
            </a>
          </li>
          <li>
            <a href="/" className="text-black hover:text-black space-x-1">
              <FontAwesomeIcon icon={faHouse} className="h-5 w-5 " />
              <span>Hjem</span>
            </a>
          </li>
        </ul>

        {/* Mobilmeny */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="h-6 w-6 text-black"
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

      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-3 text-lg text-black">
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
              <span className="">Hjem</span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
