"use client";

import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import { X } from "lucide-react";
import PracticeAreaCard, { iconMap } from "./PracticeAreaCard";

type Area = {
  title: string;
  icon: string;
  description: string;
  details?: string[];
};

export default function PracticeAreaGrid({ areas }: { areas: Area[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Measure tallest card and set uniform height via CSS variable */
  const syncHeights = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");
    // Reset so we can measure natural heights
    cards.forEach((c) => (c.style.minHeight = ""));
    let max = 0;
    cards.forEach((c) => {
      max = Math.max(max, c.offsetHeight);
    });
    cards.forEach((c) => (c.style.minHeight = `${max}px`));
  }, []);

  useEffect(() => {
    syncHeights();
    const ro = new ResizeObserver(syncHeights);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, [syncHeights, areas]);

  return (
    <div
      ref={gridRef}
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
    >
      {areas.map((area, i) => {
        const hasDetails = area.details && area.details.length > 0;
        const isActive = activeIndex === i;

        return (
          <Fragment key={area.title}>
            <div
              data-card
              onClick={
                hasDetails
                  ? () => setActiveIndex(isActive ? null : i)
                  : undefined
              }
              className="flex"
            >
              <PracticeAreaCard {...area} />
            </div>

            {isActive && hasDetails && (
              <ExpandedPanel
                area={area}
                onClose={() => setActiveIndex(null)}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function ExpandedPanel({
  area,
  onClose,
}: {
  area: Area;
  onClose: () => void;
}) {
  const Icon = iconMap[area.icon] || iconMap.Shield;

  return (
    <div
      className="bg-navy-800 col-span-full rounded-2xl p-8 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-8">
        {/* Left: icon + title */}
        <div className="shrink-0">
          <div className="bg-accent mb-3 flex h-14 w-14 items-center justify-center rounded-xl">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-lg font-bold tracking-wide text-white">
            {area.title}
          </h3>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/60">
            {area.description}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden self-stretch border-l border-white/10 sm:block" />

        {/* Right: detail questions */}
        <div className="min-w-0 flex-1">
          <ul className="grid gap-3 md:grid-cols-2">
            {area.details!.map((d, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-white/80"
              >
                <span className="text-accent mt-0.5 shrink-0">›</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="shrink-0 cursor-pointer text-white/40 transition hover:text-white"
          aria-label="Sluiten"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
