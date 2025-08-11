import { useEffect, useState } from "react";

function FilterBoxes() {
  // Filter states
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>("");
  const [selectedToolsFilter, setSelectedToolsFilter] = useState<string>("");

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (selectedTimeFilter) {
      localStorage.setItem("timeFilter", selectedTimeFilter);
    } else {
      localStorage.removeItem("timeFilter");
    }
    // Dispatch event to notify other components of filter changes
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  }, [selectedTimeFilter]);

  useEffect(() => {
    if (selectedToolsFilter) {
      localStorage.setItem("toolsFilter", selectedToolsFilter);
    } else {
      localStorage.removeItem("toolsFilter");
    }
    // Dispatch event to notify other components of filter changes
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  }, [selectedToolsFilter]);

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedTimeFilter = localStorage.getItem("timeFilter");
    const savedToolsFilter = localStorage.getItem("toolsFilter");
    if (savedTimeFilter) setSelectedTimeFilter(savedTimeFilter);
    if (savedToolsFilter) setSelectedToolsFilter(savedToolsFilter);

    // Listen for external filter changes (like from ActiveFilters component)
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

  return (
    <div className="fixed top-36 right-20 z-40 flex gap-3">
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
          <option value="minimum">Minimum</option>
          <option value="mer">Mer</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FilterBoxes;
