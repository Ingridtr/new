import { useState, useEffect } from 'react';

const FavoritesTest = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(stored);
  }, []);
  
  const addTestFavorite = () => {
    const testId = 'A0101';
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updated = [...stored, testId];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };
  
  const clearFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify([]));
    setFavorites([]);
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };
  
  return (
    <div className="p-4 bg-white border rounded">
      <h2 className="text-lg font-bold mb-2">Favorites Test</h2>
      <p>Current favorites: {JSON.stringify(favorites)}</p>
      <div className="mt-2">
        <button 
          onClick={addTestFavorite}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Test Favorite (A0101)
        </button>
        <button 
          onClick={clearFavorites}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Favorites
        </button>
      </div>
    </div>
  );
};

export default FavoritesTest;
