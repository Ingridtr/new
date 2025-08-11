import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

// Function to generate breadcrumb items based on current location and stored context
const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  
  // Always start with home
  items.push({ label: 'Hjem', path: '/' });

  // Get stored context from localStorage
  const selectedGrade = localStorage.getItem('selectedGrade');
  const selectedLearningGoal = localStorage.getItem('selectedLearningGoal');
  const previousPage = localStorage.getItem('previousPage');

  // Add breadcrumbs based on current path
  switch (pathname) {
    case '/':
      items[0].isActive = true;
      break;

    case '/grade':
      items.push({ label: 'Velg trinn', isActive: true });
      break;

    case '/grade/learninggoals':
      items.push({ label: 'Velg trinn', path: '/grade' });
      if (selectedGrade) {
        const gradeLabel = getGradeLabel(selectedGrade);
        items.push({ label: gradeLabel, path: '/grade' });
      }
      items.push({ label: 'Velg læringsmål', isActive: true });
      break;

    case '/gameSelection':
      items.push({ label: 'Velg trinn', path: '/grade' });
      if (selectedGrade) {
        const gradeLabel = getGradeLabel(selectedGrade);
        items.push({ label: gradeLabel, path: '/grade' });
      }
      if (selectedLearningGoal) {
        items.push({ label: 'Velg læringsmål', path: '/grade/learninggoals' });
        const goalLabel = formatLearningGoalLabel(selectedLearningGoal);
        items.push({ label: goalLabel, path: '/grade/learninggoals' });
      }
      items.push({ label: 'Velg aktivitet', isActive: true });
      break;

    case '/infoTask': {
      const selectedGame = localStorage.getItem('selectedGame');
      
      // Add breadcrumbs based on where we came from
      if (previousPage === '/favorites') {
        items.push({ label: 'Mine favoritter', path: '/favorites' });
      } else {
        // Coming from game selection flow
        items.push({ label: 'Velg trinn', path: '/grade' });
        if (selectedGrade) {
          const gradeLabel = getGradeLabel(selectedGrade);
          items.push({ label: gradeLabel, path: '/grade' });
        }
        if (selectedLearningGoal) {
          items.push({ label: 'Velg læringsmål', path: '/grade/learninggoals' });
          const goalLabel = formatLearningGoalLabel(selectedLearningGoal);
          items.push({ label: goalLabel, path: '/grade/learninggoals' });
        }
        items.push({ label: 'Velg aktivitet', path: '/gameSelection' });
      }
      
      if (selectedGame) {
        items.push({ label: selectedGame, isActive: true });
      } else {
        items.push({ label: 'Aktivitetsinformasjon', isActive: true });
      }
      break;
    }

    case '/favorites':
      items.push({ label: 'Mine favoritter', isActive: true });
      break;

    case '/search':
      items.push({ label: 'Søk', isActive: true });
      break;

    case '/about':
      items.push({ label: 'Om oss', isActive: true });
      break;

    case '/knowledge':
      items.push({ label: 'Kunnskap', isActive: true });
      break;

    default: {
      // For any other path, just show the current page
      const pathParts = pathname.split('/').filter(Boolean);
      if (pathParts.length > 0) {
        items.push({ label: pathParts[pathParts.length - 1], isActive: true });
      }
    }
  }

  return items;
};

// Helper function to convert grade names to readable labels
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

// Helper function to format learning goal labels
const formatLearningGoalLabel = (learningGoal: string): string => {
  // If it's a long learning goal, truncate it
  if (learningGoal.length > 50) {
    return learningGoal.substring(0, 47) + '...';
  }
  return learningGoal;
};

export const useBreadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const items = generateBreadcrumbs(location.pathname);
    setBreadcrumbs(items);
  }, [location.pathname]);

  // Also update breadcrumbs when localStorage changes (for dynamic content)
  useEffect(() => {
    const handleStorageChange = () => {
      const items = generateBreadcrumbs(location.pathname);
      setBreadcrumbs(items);
    };

    window.addEventListener('favoritesChanged', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('favoritesChanged', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location.pathname]);

  return breadcrumbs;
};

export default useBreadcrumbs;
