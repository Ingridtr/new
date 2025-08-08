// Grade color mapping utility
// This utility provides consistent colors for each grade level across the application

interface GradeColors {
  bg: string;
  hover: string;
  focus: string;
  border: string;
  pageBackground: string; // Very light background for pages
}

const gradeColorMap: Record<string, GradeColors> = {
  "Andre årstrinn": {
    bg: "bg-orange-200",
    hover: "hover:bg-orange-300",
    focus: "focus:ring-orange-500",
    border: "border-orange-300",
    pageBackground: "bg-orange-50"
  },
  "Tredje årstrinn": {
    bg: "bg-emerald-200",
    hover: "hover:bg-emerald-300",
    focus: "focus:ring-emerald-500",
    border: "border-emerald-300",
    pageBackground: "bg-emerald-50"
  },
  "Fjerde årstrinn": {
    bg: "bg-cyan-200",
    hover: "hover:bg-cyan-300",
    focus: "focus:ring-cyan-500",
    border: "border-cyan-300",
    pageBackground: "bg-cyan-50"
  },
  "Femte årstrinn": {
    bg: "bg-sky-200",
    hover: "hover:bg-sky-300",
    focus: "focus:ring-sky-500",
    border: "border-sky-300",
    pageBackground: "bg-sky-50"
  },
  "Sjette årstrinn": {
    bg: "bg-purple-200",
    hover: "hover:bg-purple-300",
    focus: "focus:ring-purple-500",
    border: "border-purple-300",
    pageBackground: "bg-purple-50"
  },
  "Syvende årstrinn": {
    bg: "bg-rose-200",
    hover: "hover:bg-rose-300",
    focus: "focus:ring-rose-500",
    border: "border-rose-300",
    pageBackground: "bg-rose-50"
  },
};

// Default colors for non-grade buttons or unknown grades
const defaultColors: GradeColors = {
  bg: "bg-gray-100",
  hover: "hover:bg-gray-200",
  focus: "focus:ring-blue-500",
  border: "border-gray-300",
  pageBackground: "bg-gray-50"
};

/**
 * Get colors for a specific grade
 * @param grade - The grade name (e.g., "Andre årstrinn")
 * @returns Grade colors object
 */
export function getGradeColors(grade: string): GradeColors {
  return gradeColorMap[grade] || defaultColors;
}

/**
 * Get all available grade colors
 * @returns Object mapping grade names to their colors
 */
export function getAllGradeColors(): Record<string, GradeColors> {
  return gradeColorMap;
}

/**
 * Check if a grade has defined colors
 * @param grade - The grade name to check
 * @returns True if the grade has defined colors
 */
export function hasGradeColors(grade: string): boolean {
  return grade in gradeColorMap;
}
