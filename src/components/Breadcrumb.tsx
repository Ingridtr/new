import React from "react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Hide crumbs whose label matches any of these regex patterns */
  hidePatterns?: RegExp[];
  /** Hide the current page (last crumb) as well (default true) */
  hideActive?: boolean;
}

const DEFAULT_HIDE: RegExp[] = [
  /^\d+\.\s?trinn$/i, // "2. trinn", "10. trinn"
  /^kompetansemål/i, // "Kompetansemål 1: ..."
  // Andre årstrinn labels
  /^(Sortering|Tallene|Hvor mange|Rekketall|Tiervenner|Plusstykker|Minusstykker|Hoderegning|Geometri|Programmering)$/i,
  // Tredje årstrinn labels  
  /^(Subtraksjon|Multiplikasjon|Multiplikasjon\/Divisjon|Multiplikasjonsformer|Regnegenskaper|Likhet\/ulikhet|Likevekt|Måleenheter|Koordinatsystemet)$/i,
  // Fjerde årstrinn labels
  /^(Divisjon|Divisjonsformer|Divisjonsstrategier|Hverdagssituasjoner|Situasjonsforståelse|Regneuttrykk|Figuranalyse|Algoritmer)$/i,
  // Femte årstrinn labels
  /^(Brøk, prosent, desimal|Brøk|Brøkrepresentasjon|Brøkstrategier|Sannsynlighet|Likninger\/Ulikheter|Økonomi|Programmering)$/i,
  // Sjette årstrinn labels
  /^(Tallinja|Desimalregning|Hverdagssituasjoner|Figurer|Symmetri\/Kongruens|Sirkelen|Areal\/volum|Areal\/omkrets|Formler|Programmering)$/i,
  // Syvende årstrinn labels
  /^(Regnestrategier|Brøk, desimal og prosent|Negative tall|Tallinja|Sammensatte uttrykk|Likninger\/ulikheter|Statistikk|Tabeller\/diagram|Budsjett\/regnskap|Programmering)$/i,
];

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  hidePatterns = DEFAULT_HIDE,
  hideActive = true,
}) => {
  const navigate = useNavigate();

  const visible = React.useMemo(() => {
    // Filter out dynamic picks by label
    let filtered = items.filter(
      (i) => !hidePatterns.some((re) => re.test(i.label))
    );

    // Optionally hide the active/current page (explicit or last)
    if (hideActive) {
      if (filtered.some((i) => i.isActive)) {
        filtered = filtered.filter((i) => !i.isActive);
      } else if (filtered.length > 1) {
        filtered = filtered.slice(0, -1);
      }
    }
    return filtered;
  }, [items, hidePatterns, hideActive]);

  if (visible.length === 0) return null;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {visible.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="hover:text-blue-600 hover:underline focus:outline-none focus:text-blue-600"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
