import { useNavigate } from "react-router-dom";

function GradeButton() {
  const navigate = useNavigate();

  const handleGradeClick = (grade: string) => {
    localStorage.setItem("selectedGrade", grade);
    navigate(`learninggoals`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 py-8 px-4 place-items-center">
      {[
        {
          grade: "Andre årstrinn",
          label: "1. - 2. trinn",
          bg: "bg-orange-200",
          hover: "hover:bg-orange-300",
        },
        {
          grade: "Tredje årstrinn",
          label: "3. trinn",
          bg: "bg-emerald-200",
          hover: "hover:bg-emerald-300",
        },
        {
          grade: "Fjerde årstrinn",
          label: "4. trinn",
          bg: "bg-cyan-200",
          hover: "hover:bg-cyan-300",
        },
        {
          grade: "Femte årstrinn",
          label: "5. trinn",
          bg: "bg-sky-200",
          hover: "hover:bg-sky-300",
        },
        {
          grade: "Sjette årstrinn",
          label: "6. trinn",
          bg: "bg-purple-200",
          hover: "hover:bg-purple-300",
        },
        {
          grade: "Syvende årstrinn",
          label: "7. trinn",
          bg: "bg-rose-200",
          hover: "hover:bg-rose-300",
        },
      ].map(({ grade, label, bg, hover }) => (
        <button
          key={grade}
          onClick={() => handleGradeClick(grade)}
          className={`${bg} ${hover} text-black font-bold rounded-xl text-3xl text-center flex items-center justify-center transition-colors w-full max-w-[320px] min-w-[200px] h-[200px]`}
        >
          <p>{label}</p>
        </button>
      ))}
    </div>
  );
}

export default GradeButton;
