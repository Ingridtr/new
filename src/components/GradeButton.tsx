function GradeButton(){

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14 py-8 place-items-center">
            <button className="bg-orange-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 1. - 2. trinn </p>
            </button>
            <button className="bg-emerald-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 3. trinn </p>
            </button>
            <button className="bg-cyan-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 4. trinn </p>
            </button>
            <button className="bg-sky-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 5. trinn </p>
            </button>
            <button className="bg-purple-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 6. trinn </p>
            </button>
            <button className="bg-rose-200 text-black font-bold rounded-xl text-center flex items-center justify-center " style={{width: "20vw", height: "10vw", fontSize: "2vw", minWidth: "200px", minHeight: "150px"}}>
                <p> 7. trinn </p>
            </button>
            
        </div>
    )



}

export default GradeButton;