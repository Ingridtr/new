import { useNavigate } from "react-router-dom";
import { announceSuccess } from "../utils/accessibility";

function GradeButton() {
  const navigate = useNavigate();

  const handleGradeClick = (grade: string, label: string) => {
    localStorage.setItem("selectedGrade", grade);
    announceSuccess(`${label} er valgt. Navigerer til kompetansemål.`);
    navigate(`learninggoals`);
  };

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 py-8 px-4 place-items-center"
      role="group"
      aria-labelledby="grade-selection-heading"
    >
      <h2 id="grade-selection-heading" className="sr-only">
        Velg trinn for matematikkaktiviteter
      </h2>
      {[
        {
          grade: "Andre årstrinn",
          label: "1. - 2. trinn",
          bg: "bg-orange-200",
          hover: "hover:bg-orange-300",
          focus: "focus:ring-orange-500",
        },
        {
          grade: "Tredje årstrinn",
          label: "3. trinn",
          bg: "bg-emerald-200",
          hover: "hover:bg-emerald-300",
          focus: "focus:ring-emerald-500",
        },
        {
          grade: "Fjerde årstrinn",
          label: "4. trinn",
          bg: "bg-cyan-200",
          hover: "hover:bg-cyan-300",
          focus: "focus:ring-cyan-500",
        },
        {
          grade: "Femte årstrinn",
          label: "5. trinn",
          bg: "bg-sky-200",
          hover: "hover:bg-sky-300",
          focus: "focus:ring-sky-500",
        },
        {
          grade: "Sjette årstrinn",
          label: "6. trinn",
          bg: "bg-purple-200",
          hover: "hover:bg-purple-300",
          focus: "focus:ring-purple-500",
        },
        {
          grade: "Syvende årstrinn",
          label: "7. trinn",
          bg: "bg-rose-200",
          hover: "hover:bg-rose-300",
          focus: "focus:ring-rose-500",
        },
      ].map(({ grade, label, bg, hover, focus }) => (
        <button
          key={grade}
          onClick={() => handleGradeClick(grade, label)}
          className={`${bg} ${hover} ${focus} text-black font-bold rounded-xl text-3xl text-center flex items-center justify-center transition-colors w-full max-w-80 min-w-48 h-48 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          aria-label={`Velg ${label} for matematikkaktiviteter`}
          type="button"
        >
          <span aria-hidden="true">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default GradeButton;
