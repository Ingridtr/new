import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

import GameCard from "../components/GameCard";
import { Activity } from "../data/types";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

const GRADES_BASE = "/activityData/grades";
const gradeFiles = [
  "2.grade.json",
  "3.grade.json",
  "4.grade.json",
  "5.grade.json",
  "6.grade.json",
  "7.grade.json",
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [toolsFilter, setToolsFilter] = useState<string>("");
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

  // Parse favoritt-IDer trygt
  const readFavoriteIds = (): string[] => {
    try {
      const raw = localStorage.getItem("favorites");
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed.map((x: unknown) => String(x)) : [];
    } catch {
      return [];
    }
  };

  // Function to load favorites
  const loadFavorites = useCallback(async () => {
    const favoriteIds = readFavoriteIds();
    if (favoriteIds.length === 0) {
      setFavorites([]);
      return;
    }

    try {
      // Hent alle trinnfiler parallelt
      const lists = await Promise.all(
        gradeFiles.map((f) =>
          fetch(`${GRADES_BASE}/${f}`).then((r) => {
            if (!r.ok) throw new Error(`Failed to load ${f}`);
            return r.json();
          })
        )
      );

      // Noen filer kan ha { activities: [...] } i stedet for [...]
      const flatRaw: Record<string, unknown>[] = [];
      lists.forEach((x: unknown) => {
        if (Array.isArray(x)) {
          // If it's already an array, add each item with default grade
          flatRaw.push(
            ...x.map((activity: unknown) => ({
              ...(activity as Record<string, unknown>),
              parentGrade: "Ukjent trinn",
            }))
          );
        } else if (x && typeof x === 'object' && 'activities' in x && Array.isArray(x.activities)) {
          // If it has activities property, add each activity with the parent grade
          const gradeData = x as { activities: unknown[]; grade?: string };
          flatRaw.push(
            ...gradeData.activities.map((activity: unknown) => ({
              ...(activity as Record<string, unknown>),
              parentGrade: gradeData.grade || "Ukjent trinn",
            }))
          );
        }
      });

      // Normaliser til Activity-typen din
      const all: Activity[] = flatRaw.map((a: Record<string, unknown>) => ({
        id: String(a.id),
        title: String(a.title ?? ""),
        description: String(a.learning_goal ?? ""), // Use learning_goal as description since that's available
        time: String(a.time ?? ""),
        image: `/activityPictures/${String(a.title ?? "")
          .toLowerCase()
          .replace(/[^a-zæøå0-9\s]+/g, "")
          .replace(/\s+/g, "-")}.png`, // Generate proper image path
        location: String(a.location ?? ""),
        grade: String(a.parentGrade ?? "Ukjent trinn"), // Use the parent grade we extracted
        number_of_tasks: 1, // Default since not available in grade data
        tools: Array.isArray(a.tools)
          ? a.tools.map(String)
          : String(a.tools ?? "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
      }));

      const favs = all.filter((a) => favoriteIds.includes(a.id));
      setFavorites(favs);
    } catch (err) {
      console.error("Failed to load grade files:", err);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Listen for storage changes to update favorites when they change in other tabs/components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "favorites") {
        loadFavorites();
      }
    };

    // Listen for storage events (changes from other tabs)
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom events (changes from same tab)
    const handleCustomStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesChanged", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesChanged", handleCustomStorageChange);
    };
  }, [loadFavorites]);

  // Fjern fra favoritter (localStorage + state)
  const removeFavorite = (id: string) => {
    const stored = readFavoriteIds();
    const updated = stored.filter((favId) => favId !== String(id));
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites((prev) => prev.filter((a) => a.id !== id));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  };

  // "3. trinn", "3–4. trinn", "3, 4. trinn" -> "3. trinn"
  const gradeKey = (g: string) => {
    const m = g.match(/\d+/);
    return m ? `${parseInt(m[0], 10)}. trinn` : g.trim();
  };

  // Filter activities based on time and tools
  const filteredFavorites = useMemo(() => {
    return favorites.filter((activity) => {
      // Time filter
      if (timeFilter) {
        const activityTime = parseInt(activity.time);
        const filterTime = parseInt(timeFilter);
        if (isNaN(activityTime) || isNaN(filterTime)) return false;
        // Allow some tolerance (±5 minutes)
        if (Math.abs(activityTime - filterTime) > 5) return false;
      }

      // Tools filter
      if (toolsFilter) {
        const activityToolsString = activity.tools.join(' ').toLowerCase();
        const searchTerms = toolsFilter.toLowerCase().split(' ').filter(term => term.trim());
        // Check if all search terms are found in the tools
        if (!searchTerms.every(term => activityToolsString.includes(term))) return false;
      }

      return true;
    });
  }, [favorites, timeFilter, toolsFilter]);

  // Get unique time values for filter dropdown
  const availableTimes = useMemo(() => {
    const times = favorites.map(activity => activity.time).filter(Boolean);
    return [...new Set(times)].sort((a, b) => parseInt(a) - parseInt(b));
  }, [favorites]);

  // Gruppér etter én nøkkel per aktivitet
  const groupedByGrade = useMemo(() => {
    return filteredFavorites.reduce<Record<string, Activity[]>>((acc, a) => {
      const key = gradeKey(a.grade);
      (acc[key] ??= []).push(a);
      return acc;
    }, {});
  }, [filteredFavorites]);

  // Sortér trinn 1..7
  const gradeNum = (label: string) => {
    const m = label.match(/\d+/);
    return m ? parseInt(m[0], 10) : 999;
  };

  const sortedGradeLabels = useMemo(
    () =>
      Object.keys(groupedByGrade).sort(
        (a, b) => gradeNum(a) - gradeNum(b) || a.localeCompare(b, "nb")
      ),
    [groupedByGrade]
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar backgroundColor="bg-gray-50" />

      <div className="flex-1 flex flex-col justify-center">
        <button
          className="fixed top-36 right-6 z-50 text-2xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => navigate(-1)}
          aria-label="Lukk favorittside og gå tilbake"
        >
          ×
        </button>
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <h1>Dine favoritter</h1>

          {/* Filter controls */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Filtrer aktiviteter</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Time filter */}
              <div className="flex-1">
                <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Tid (minutter):
                </label>
                <select
                  id="time-filter"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Alle tider</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time} min
                    </option>
                  ))}
                </select>
              </div>

              {/* Tools filter */}
              <div className="flex-1">
                <label htmlFor="tools-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Søk i hjelpemidler:
                </label>
                <input
                  id="tools-filter"
                  type="text"
                  value={toolsFilter}
                  onChange={(e) => setToolsFilter(e.target.value)}
                  placeholder="f.eks. ball, terning, papir..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Clear filters button */}
              {(timeFilter || toolsFilter) && (
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setTimeFilter("");
                      setToolsFilter("");
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    Nullstill filtre
                  </button>
                </div>
              )}
            </div>
          </div>

          {favorites.length === 0 ? (
            <p>Du har ingen favoritter enda.</p>
          ) : filteredFavorites.length === 0 ? (
            <p>Ingen aktiviteter matcher dine filterkriterier.</p>
          ) : (
            sortedGradeLabels.map((gradeLabel) => (
              <section key={gradeLabel} className="mb-6">
                <h2>{gradeLabel}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
                  {groupedByGrade[gradeLabel].map((activity) => (
                    <GameCard
                      key={activity.id}
                      title={activity.title}
                      image={activity.image}
                      time={activity.time}
                      location={activity.location}
                      tools={activity.tools.join(", ")}
                      showHeartButton={true}
                      onClick={() => {
                        localStorage.setItem("selectedGame", activity.title);
                        localStorage.setItem("selectedGameId", activity.id);
                        localStorage.setItem(
                          "selectedGameImage",
                          activity.image
                        );
                        localStorage.setItem("selectedGrade", activity.grade);
                        localStorage.setItem(
                          "selectedLearningGoal",
                          activity.description
                        );
                        localStorage.setItem("previousPage", "/favorites");
                        localStorage.setItem(
                          "selectedActivity",
                          JSON.stringify(activity)
                        );
                        navigate("/infoTask");
                      }}
                      onDelete={() => removeFavorite(activity.id)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
