
import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

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
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">On This Page</h3>
        <nav className="text-sm">
          <ul className="space-y-2">
            {headings.map((heading) => (
                <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}>
                  <a
                      href={`#${heading.id}`}
                      className={cn(
                          "block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors",
                          activeId === heading.id && "text-blue-600 dark:text-blue-400 font-medium"
                      )}
                  >
                    {heading.text}
                  </a>
                </li>
            ))}
          </ul>
        </nav>
      </div>
  );
}