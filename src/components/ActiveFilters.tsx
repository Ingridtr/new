import { useEffect, useState } from "react";

function ActiveFilters() {
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [toolsFilter, setToolsFilter] = useState<string>("");

  // Load filters from localStorage and listen for changes
  useEffect(() => {
    const updateFilters = () => {
      const savedTimeFilter = localStorage.getItem("timeFilter") || "";
      const savedToolsFilter = localStorage.getItem("toolsFilter") || "";
      setTimeFilter(savedTimeFilter);
      setToolsFilter(savedToolsFilter);
    };

    // Initial load
    updateFilters();

    // Listen for filter changes
    const handleFilterChange = () => {
      updateFilters();
    };

    window.addEventListener("filtersChanged", handleFilterChange);
    
    return () => {
      window.removeEventListener("filtersChanged", handleFilterChange);
    };
  }, []);

  const removeTimeFilter = () => {
    localStorage.removeItem("timeFilter");
    setTimeFilter("");
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  };

  const removeToolsFilter = () => {
    localStorage.removeItem("toolsFilter");
    setToolsFilter("");
    window.dispatchEvent(new CustomEvent("filtersChanged"));
  };

  const getFilterLabel = (filterType: string, value: string) => {
    if (filterType === "time") {
      return `${value} min`;
    } else if (filterType === "tools") {
      switch (value) {
        case "ingen": return "Ingen";
        case "minimum": return "Minimum";
        case "mer": return "Mer";
        default: return value;
      }
    }
    return value;
  };

  // Don't render anything if no filters are active
  if (!timeFilter && !toolsFilter) {
    return null;
  }

  return (
    <div className="fixed top-36 right-80 z-40 flex gap-2">
      {timeFilter && (
        <div className="bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-sm text-blue-800">
            {getFilterLabel("time", timeFilter)}
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
      
      {toolsFilter && (
        <div className="bg-green-100 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-sm text-green-800">
            {getFilterLabel("tools", toolsFilter)}
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
  );
}

export default ActiveFilters;
