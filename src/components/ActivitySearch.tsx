import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  image: string;
  location: string;
  grade: string;
  number_of_tasks: number;
  tools: string[];
  learning_goal?: string;
  content?: {
    introduction?: string[];
    main?: string[];
    examples?: string[];
    reflection?: string[];
    tips?: string[];
    extra?: string[];
  };
}

interface SearchResult {
  activity: Activity;
  matchScore: number;
  matchedFields: string[];
}

interface ActivitySearchProps {
  className?: string;
  onResultSelect?: (activity: Activity) => void;
  placeholder?: string;
}

const ActivitySearch: React.FC<ActivitySearchProps> = ({ 
  className = "", 
  onResultSelect,
  placeholder = "Søk etter aktiviteter..." 
}) => {
  const [query, setQuery] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Load all activities from grade files
  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true);
      try {
        const gradeFiles = ["2.grade.json", "3.grade.json", "4.grade.json", "5.grade.json", "6.grade.json", "7.grade.json"];
        
        const lists = await Promise.all(
          gradeFiles.map(async (file) => {
            try {
              const response = await fetch(`/activityData/grades/${file}`);
              if (!response.ok) throw new Error(`Failed to load ${file}`);
              return await response.json();
            } catch (error) {
              console.warn(`Failed to load ${file}:`, error);
              return null;
            }
          })
        );

        const allActivities: Activity[] = [];
        
        lists.forEach((gradeData) => {
          if (gradeData?.activities) {
            gradeData.activities.forEach((activity: any) => {
              allActivities.push({
                id: activity.id,
                title: activity.title || '',
                description: activity.learning_goal || '',
                time: activity.time || '',
                image: ``,
                location: activity.location || '',
                grade: gradeData.grade || '',
                number_of_tasks: 1,
                tools: activity.tools ? activity.tools.split(',').map((t: string) => t.trim()) : [],
                learning_goal: activity.learning_goal || '',
                content: activity.content
              });
            });
          }
        });

        setActivities(allActivities);
      } catch (error) {
        console.error('Failed to load activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  // Search function with scoring
  const searchResults = useMemo(() => {
    if (!query.trim() || activities.length === 0) {
      return [];
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const results: SearchResult[] = activities.map(activity => {
      let matchScore = 0;
      const matchedFields: string[] = [];

      // Searchable fields with weights
      const searchFields = [
        { field: 'title', content: activity.title, weight: 10 },
        { field: 'description', content: activity.description, weight: 8 },
        { field: 'learning_goal', content: activity.learning_goal || '', weight: 6 },
        { field: 'tools', content: activity.tools.join(' '), weight: 5 },
        { field: 'location', content: activity.location, weight: 3 },
        { field: 'grade', content: activity.grade, weight: 2 }
      ];

      // Add content fields if available
      if (activity.content) {
        searchFields.push(
          { field: 'introduction', content: activity.content.introduction?.join(' ') || '', weight: 4 },
          { field: 'main', content: activity.content.main?.join(' ') || '', weight: 4 },
          { field: 'examples', content: activity.content.examples?.join(' ') || '', weight: 3 },
          { field: 'tips', content: activity.content.tips?.join(' ') || '', weight: 3 },
          { field: 'reflection', content: activity.content.reflection?.join(' ') || '', weight: 2 },
          { field: 'extra', content: activity.content.extra?.join(' ') || '', weight: 2 }
        );
      }

      searchTerms.forEach(term => {
        searchFields.forEach(({ field, content, weight }) => {
          const lowerContent = content.toLowerCase();
          
          // Exact phrase match (highest score)
          if (lowerContent.includes(term)) {
            matchScore += weight;
            if (!matchedFields.includes(field)) {
              matchedFields.push(field);
            }
            
            // Bonus for exact word match
            const wordRegex = new RegExp(`\\b${term}\\b`, 'i');
            if (wordRegex.test(content)) {
              matchScore += weight * 0.5;
            }
            
            // Bonus for title match
            if (field === 'title') {
              matchScore += weight;
            }
          }
        });
      });

      return {
        activity,
        matchScore,
        matchedFields
      };
    }).filter(result => result.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Show top 10 results

    return results;
  }, [query, activities]);

  const handleResultClick = (activity: Activity) => {
    setShowResults(false);
    setQuery('');
    
    if (onResultSelect) {
      onResultSelect(activity);
    } else {
      // Default navigation behavior
      localStorage.setItem("selectedGame", activity.title);
      localStorage.setItem("selectedGameId", activity.id);
      localStorage.setItem("selectedGameImage", activity.image);
      localStorage.setItem("selectedGrade", activity.grade);
      localStorage.setItem("selectedLearningGoal", activity.description);
      localStorage.setItem("previousPage", window.location.pathname);
      localStorage.setItem("selectedActivity", JSON.stringify(activity));
      navigate("/infoTask");
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return <span key={index} className="bg-yellow-200 font-semibold">{part}</span>;
      }
      return part;
    });
  };

  const getGradeLabel = (grade: string): string => {
    const gradeMap: { [key: string]: string } = {
      'Andre årstrinn': '2. trinn',
      'Tredje årstrinn': '3. trinn',
      'Fjerde årstrinn': '4. trinn',
      'Femte årstrinn': '5. trinn',
      'Sjette årstrinn': '6. trinn',
      'Syvende årstrinn': '7. trinn',
    };
    
    return gradeMap[grade] || grade;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(query.length > 0)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="absolute right-3 top-2.5">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Search Results */}
      {showResults && query.trim() && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-sm text-gray-600 border-b">
                {searchResults.length} resultat{searchResults.length !== 1 ? 'er' : ''} for "{query}"
              </div>
              {searchResults.map(({ activity, matchedFields }) => (
                <button
                  key={activity.id}
                  onClick={() => handleResultClick(activity)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 focus:outline-none focus:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {highlightMatch(activity.title, query)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {highlightMatch(activity.description.substring(0, 100) + (activity.description.length > 100 ? '...' : ''), query)}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {getGradeLabel(activity.grade)}
                        </span>
                        <span>🕒 {activity.time} min</span>
                        <span>📍 {activity.location}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-xs text-gray-400">
                      {matchedFields.length > 0 && (
                        <span>Treff i: {matchedFields.slice(0, 2).join(', ')}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>Ingen aktiviteter funnet for "{query}"</p>
              <p className="text-sm mt-1">Prøv andre søkeord eller sjekk stavemåten</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivitySearch;
