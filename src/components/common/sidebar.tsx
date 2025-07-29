import * as React from "react";

import { cn } from "../../lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion.tsx";

// Define TypeScript interfaces
interface NavItem {
  title: string;
  path: string;
  items?: NavItem[]; // Recursive type for nested items
  badge?: "new" | "updated" | "experimental";
}

interface SidebarProps {
  currentPath: string;
  // Optional: Allow passing navItems as prop for flexibility
  // navItems?: NavItem[];
}

// Define navigation data (consider moving this to a separate file like lib/nav-data.ts)
const navItems: NavItem[] = [
  {
    title: "Introduction",
    path: "/docs/introduction",
  },
  {
    title: "HTML",
    path: "/docs/html",
    items: [
      { title: "Semantic HTML", path: "/docs/html/semantics" },
      { title: "Accessibility", path: "/docs/html/accessibility" },
      { title: "Forms", path: "/docs/html/forms" },
      { title: "SEO Fundamentals", path: "/docs/html/seo", badge: "new" },
    ],
  },
  {
    title: "CSS",
    path: "/docs/css",
    items: [
      { title: "Flexbox", path: "/docs/css/flexbox" },
      { title: "Grid", path: "/docs/css/grid" },
      { title: "Responsive Design", path: "/docs/css/responsive" },
      { title: "Tailwind CSS", path: "/docs/css/tailwind" },
      { title: "Animations", path: "/docs/css/animations", badge: "updated" },
    ],
  },
  {
    title: "JavaScript",
    path: "/docs/javascript",
    items: [
      { title: "ES6+ Features", path: "/docs/javascript/es6" },
      { title: "Promises & Async/Await", path: "/docs/javascript/async" },
      { title: "DOM Manipulation", path: "/docs/javascript/dom" },
      { title: "Web APIs", path: "/docs/javascript/web-apis" },
      { title: "Performance", path: "/docs/javascript/performance" },
    ],
  },
  {
    title: "Frameworks",
    path: "/docs/frameworks",
    items: [
      { title: "Astro", path: "/docs/frameworks/astro", badge: "new" },
      { title: "React", path: "/docs/frameworks/react" },
      { title: "Vue", path: "/docs/frameworks/vue" },
      { title: "Svelte", path: "/docs/frameworks/svelte" },
    ],
  },
  {
    title: "Tooling",
    path: "/docs/tooling",
    items: [
      { title: "Git & GitHub", path: "/docs/tooling/git" },
      { title: "Vite", path: "/docs/tooling/vite" },
      { title: "Package Managers", path: "/docs/tooling/package-managers" },
      { title: "Testing", path: "/docs/tooling/testing" },
    ],
  },
  {
    title: "Best Practices",
    path: "/docs/best-practices",
    items: [
      { title: "Performance", path: "/docs/best-practices/performance" },
      { title: "Security", path: "/docs/best-practices/security" },
      { title: "Deployment", path: "/docs/best-practices/deployment" },
    ],
  },
];

// Helper function to determine if a path is active
const isItemActive = (itemPath: string, currentPath: string): boolean => {
  return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
};

// Helper function to get default open accordion values
const getDefaultOpenItems = (
  items: NavItem[],
  currentPath: string,
): string[] => {
  return items
    .filter((item) => isItemActive(item.path, currentPath))
    .map((item) => item.path);
};

// Badge Component (Optional: Extract for reusability)
const Badge: React.FC<{ type: "new" | "updated" | "experimental" }> = ({
  type,
}) => {
  const baseClasses =
    "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const typeClasses = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    updated:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    experimental:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100", // Fallback for experimental
  };

  return (
    <span
      className={cn(baseClasses, typeClasses[type] || typeClasses.experimental)}
    >
      {type}
    </span>
  );
};

// Main Sidebar Component
export function Sidebar({ currentPath }: SidebarProps) {
  // Determine which top-level accordion items should be open by default
  const defaultOpenItems = React.useMemo(
    () => getDefaultOpenItems(navItems, currentPath),
    [currentPath],
  );

  return (
    <nav className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Documentation
        </h3>

        <Accordion
          type="single"
          className="space-y-1"
          defaultValue={defaultOpenItems}
        >
          {navItems.map((item) => {
            const isActive = isItemActive(item.path, currentPath);
            const hasChildren = item.items && item.items.length > 0;

            if (hasChildren) {
              return (
                <AccordionItem
                  key={item.path}
                  value={item.path}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={cn(
                      "w-full flex justify-between items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:no-underline",
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                    )}
                  >
                    <span className="flex items-center">
                      {item.title}
                      {item.badge && <Badge type={item.badge} />}
                    </span>
                    {/* ChevronRight icon from lucide-react, rotated by shadcn/ui */}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pl-4 mt-1 space-y-1">
                    {item.items!.map((child) => {
                      const childActive = isItemActive(child.path, currentPath); // Use helper here too
                      return (
                        <a
                          key={child.path}
                          href={child.path}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            childActive
                              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                              : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                          )}
                        >
                          <span className="flex items-center">
                            {child.title}
                            {child.badge && <Badge type={child.badge} />}
                          </span>
                        </a>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                )}
              >
                <span className="flex items-center">
                  {item.title}
                  {item.badge && <Badge type={item.badge} />}
                </span>
              </a>
            );
          })}
        </Accordion>
      </div>
    </nav>
  );
}
