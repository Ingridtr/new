import { useNavigate } from 'react-router-dom';

function GradeButton(){
    const navigate = useNavigate();

    const handleGradeClick = (grade: string) => {
        navigate(`/competency/${grade}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14 py-8 place-items-center">
            <button 
                onClick={() => handleGradeClick('1-2')}
                className="bg-orange-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-orange-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 1. - 2. trinn </p>
            </button>
            <button 
                onClick={() => handleGradeClick('3')}
                className="bg-emerald-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-emerald-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 3. trinn </p>
            </button>
            <button 
                onClick={() => handleGradeClick('4')}
                className="bg-cyan-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-cyan-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 4. trinn </p>
            </button>
            <button 
                onClick={() => handleGradeClick('5')}
                className="bg-sky-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-sky-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 5. trinn </p>
            </button>
            <button 
                onClick={() => handleGradeClick('6')}
                className="bg-purple-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-purple-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 6. trinn </p>
            </button>
            <button 
                onClick={() => handleGradeClick('7')}
                className="bg-rose-200 text-black font-bold rounded-xl text-center flex items-center justify-center hover:bg-rose-300 transition-colors" 
                style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}
            >
                <p> 7. trinn </p>
            </button>
            
        </div>
    );
}

export default GradeButton;