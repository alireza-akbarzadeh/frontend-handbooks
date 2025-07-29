import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface TableOfdocssProps {
  headings: {
    id: string;
    text: string;
    level: number;
  }[];
}

export function TableOfdocss({ headings }: TableOfdocssProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break; // Exit early for the first visible one
          }
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 1.0, // Fully visible
      },
    );

    const observedElements: HTMLElement[] = [];

    const timeout = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedElements.push(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timeout);
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [headings]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        On This Page
      </h3>
      <nav className="text-sm">
        <ul className="space-y-2">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 2) * 16}px` }}>
              <a
                href={`#${id}`}
                className={cn(
                  "block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors",
                  activeId === id &&
                    "text-blue-600 dark:text-blue-400 font-medium",
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
