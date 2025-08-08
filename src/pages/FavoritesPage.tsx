import {useEffect, useMemo, useState} from "react";
import { useNavigate } from 'react-router-dom'; 

import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

import GameCard from "../components/GameCard";
import { Activity } from "../data/types";

const GRADES_BASE = "/activityData/grades";
const gradeFiles = [
  "1.grade.json", "2.grade.json","3.grade.json",
  "4.grade.json","5.grade.json","6.grade.json",
  "7.grade.json",
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const navigate = useNavigate();

  // Parse favoritt-IDer trygt
  const readFavoriteIds = (): string[] => {
    try {
      const raw = localStorage.getItem("favorites");
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed.map((x: any) => String(x)) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const favoriteIds = readFavoriteIds();
    if (favoriteIds.length === 0) {
      setFavorites([]);
      return;
    }

    let alive = true;

    (async () => {
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
        const flatRaw: any[] = lists.flatMap((x: any) =>
          Array.isArray(x) ? x : Array.isArray(x?.activities) ? x.activities : []
        );

        // Normaliser til Activity-typen din
        const all: Activity[] = flatRaw.map((a: any) => ({
          id: String(a.id),
          title: String(a.title ?? ""),
          description: String(a.description ?? ""),
          time: String(a.time ?? ""),
          image: String(a.image ?? ""),
          location: String(a.location ?? ""),
          grade: String(a.grade ?? ""),
          number_of_tasks: Number(a.number_of_tasks ?? 0),
          tools: Array.isArray(a.tools)
            ? a.tools.map(String)
            : String(a.tools ?? "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        }));

        const favs = all.filter((a) => favoriteIds.includes(a.id));
        if (alive) setFavorites(favs);
      } catch (err) {
        console.error("Failed to load grade files:", err);
        if (alive) setFavorites([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Fjern fra favoritter (localStorage + state)
  const removeFavorite = (id: string) => {
    const stored = readFavoriteIds();
    const updated = stored.filter((favId) => favId !== String(id));
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites((prev) => prev.filter((a) => a.id !== id));
  };

  // "3. trinn", "3–4. trinn", "3, 4. trinn" -> "3. trinn"
  const gradeKey = (g: string) => {
    const m = g.match(/\d+/);
    return m ? `${parseInt(m[0], 10)}. trinn` : g.trim();
  };

  // Gruppér etter én nøkkel per aktivitet
  const groupedByGrade = useMemo(() => {
    return favorites.reduce<Record<string, Activity[]>>((acc, a) => {
      const key = gradeKey(a.grade);
      (acc[key] ??= []).push(a);
      return acc;
    }, {});
  }, [favorites]);

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
      <Navbar />

      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Dine favoritter</h1>

        {favorites.length === 0 ? (
          <p>Du har ingen favoritter enda.</p>
        ) : (
          sortedGradeLabels.map((gradeLabel) => (
            <section key={gradeLabel} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{gradeLabel}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {groupedByGrade[gradeLabel].map((activity) => (
                  <GameCard
                    key={activity.id}
                    title={activity.title}
                    image={activity.image}
                    time={activity.time}
                    location={activity.location}
                    tools={activity.tools.join(", ")} // GameCard forventer string
                    onClick={() => {
                      localStorage.setItem("selectedGame", activity.title);
                      localStorage.setItem("selectedGameId", activity.id);
                      localStorage.setItem("selectedGameImage", activity.image);
                      localStorage.setItem(
                        "selectedActivity",
                        JSON.stringify(activity)
                      );
                      navigate("/infoTask");
                    }}
                    onDelete={() => removeFavorite(activity.id)} // X vises kun her
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FavoritesPage;