import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { competenciesData } from '../data/competenciesData';

function Competency() {
  const { grade } = useParams<{ grade: string }>();
  const navigate = useNavigate();
  
  const competencies = grade ? competenciesData[grade as keyof typeof competenciesData] || [] : [];
  const gradeDisplayName = grade?.replace('-', '.–') + '. trinn';

  return (
    <div className="bg-white-50 h-screen flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Filter button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/grade')}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Trinn: {gradeDisplayName}
              <span className="ml-2 text-gray-400">×</span>
            </button>
          </div>

          {/* Page title */}
          <h1 className="text-3xl font-bold text-center mb-8">Velg kompetansemål</h1>

          {/* Competencies grid */}
          <div className="space-y-4">
            {competencies.map((competency) => {
              // Only competency 1 is working for grade 1-2
              const isClickable = grade === '1-2' && competency.id === 1;
              
              return (
                <div
                  key={competency.id}
                  className={`bg-white p-6 rounded-lg border border-gray-200 transition-shadow ${
                    isClickable 
                      ? 'hover:shadow-md cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (isClickable) {
                      // Navigate to game selection with competency and grade filters
                      navigate(`/gameSelection?grade=${grade}&competency=${competency.id}&competencyTitle=${encodeURIComponent(competency.title)}`);
                    }
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {competency.id}. {competency.title}
                    {!isClickable && (
                      <span className="text-sm text-gray-400 ml-2">(kommer snart)</span>
                    )}
                  </h3>
                  <p className="text-gray-600">
                    {competency.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Scroll to top button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Competency;
