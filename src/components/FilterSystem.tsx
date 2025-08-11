import { useEffect, useState } from "react";

function FilterSystem() {
  // Filter states
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>("");
  const [selectedToolsFilter, setSelectedToolsFilter] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedTimeFilter = localStorage.getItem("timeFilter") || "";
    const savedToolsFilter = localStorage.getItem("toolsFilter") || "";
    setSelectedTimeFilter(savedTimeFilter);
    setSelectedToolsFilter(savedToolsFilter);
    setIsInitialized(true);

    // Listen for external filter changes (like from remove buttons)
    const handleExternalFilterChange = () => {
      const updatedTimeFilter = localStorage.getItem("timeFilter") || "";
      const updatedToolsFilter = localStorage.getItem("toolsFilter") || "";
      setSelectedTimeFilter(updatedTimeFilter);
      setSelectedToolsFilter(updatedToolsFilter);
    };

    window.addEventListener("filtersChanged", handleExternalFilterChange);
    
    return () => {
      window.removeEventListener("filtersChanged", handleExternalFilterChange);
    };
  }, []);

  // Save filters to localStorage only after initialization and when user changes them
  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    if (selectedTimeFilter) {
      localStorage.setItem("timeFilter", selectedTimeFilter);
    } else {
      localStorage.removeItem("timeFilter");
    }
    // Dispatch event to notify other components of filter changes
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  }, [selectedTimeFilter, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    if (selectedToolsFilter) {
      localStorage.setItem("toolsFilter", selectedToolsFilter);
    } else {
      localStorage.removeItem("toolsFilter");
    }
    // Dispatch event to notify other components of filter changes
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  }, [selectedToolsFilter, isInitialized]);

  const removeTimeFilter = () => {
    localStorage.removeItem("timeFilter");
    setSelectedTimeFilter("");
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  };

  const removeToolsFilter = () => {
    localStorage.removeItem("toolsFilter");
    setSelectedToolsFilter("");
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  };

  const getFilterLabel = (filterType: string, value: string) => {
    if (filterType === "time") {
      return `${value} min`;
    } else if (filterType === "tools") {
      switch (value) {
        case "ingen": return "Ingen";
        case "minimum": return "Penn og papir";
        case "mer": return "Mer";
        default: return value;
      }
    }
    return value;
  };

  return (
    <div className="fixed top-36 right-20 z-50 flex items-center gap-3">
      {/* Active filter indicators - show to the left of dropdowns */}
      {(selectedTimeFilter || selectedToolsFilter) && (
        <div className="flex gap-2">
          {selectedTimeFilter && (
            <div className="bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-sm text-blue-800">
                {getFilterLabel("time", selectedTimeFilter)}
              </span>
              <button
                onClick={removeTimeFilter}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                aria-label="Fjern tidsfilter"
              >
                ×
              </button>
            </div>
          )}
          
          {selectedToolsFilter && (
            <div className="bg-green-100 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-sm text-green-800">
                {getFilterLabel("tools", selectedToolsFilter)}
              </span>
              <button
                onClick={removeToolsFilter}
                className="text-green-600 hover:text-green-800 hover:bg-green-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                aria-label="Fjern utstyrfilter"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter dropdowns - always visible */}
      <div className="flex gap-3">
        {/* Time filter */}
        <div className="relative">
          <select
            value={selectedTimeFilter}
            onChange={(e) => setSelectedTimeFilter(e.target.value)}
            className={`appearance-none border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              selectedTimeFilter ? 'bg-gray-300 text-gray-800' : 'bg-white text-gray-700'
            }`}
          >
            <option value="">Tid</option>
            <option value="5">5 min</option>
            <option value="15">15 min</option>
            <option value="45">45 min</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Tools filter */}
        <div className="relative">
          <select
            value={selectedToolsFilter}
            onChange={(e) => setSelectedToolsFilter(e.target.value)}
            className={`appearance-none border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              selectedToolsFilter ? 'bg-gray-300 text-gray-800' : 'bg-white text-gray-700'
            }`}
          >
            <option value="">Utstyr</option>
            <option value="ingen">Ingen</option>
            <option value="minimum">Penn og papir</option>
            <option value="mer">Mer</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSystem;
