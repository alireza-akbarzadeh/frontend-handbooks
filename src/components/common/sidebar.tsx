import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface SidebarProps {
    currentPath: string;
}

interface NavItem {
    title: string;
    path: string;
    items?: NavItem[];
    badge?: 'new' | 'updated' | 'experimental';
}

const navItems: NavItem[] = [
    {
        title: "Introduction",
        path: "/content/introduction",
    },
    {
        title: "HTML",
        path: "/content/html",
        items: [
            { title: "Semantic HTML", path: "/content/html/semantics" },
            { title: "Accessibility", path: "/content/html/accessibility" },
            { title: "Forms", path: "/content/html/forms" },
            { title: "SEO Fundamentals", path: "/content/html/seo", badge: "new" },
        ]
    },
    {
        title: "CSS",
        path: "/content/css",
        items: [
            { title: "Flexbox", path: "/content/css/flexbox" },
            { title: "Grid", path: "/content/css/grid" },
            { title: "Responsive Design", path: "/content/css/responsive" },
            { title: "Tailwind CSS", path: "/content/css/tailwind" },
            { title: "Animations", path: "/content/css/animations", badge: "updated" },
        ]
    },
    {
        title: "JavaScript",
        path: "/content/javascript",
        items: [
            { title: "ES6+ Features", path: "/content/javascript/es6" },
            { title: "Promises & Async/Await", path: "/content/javascript/async" },
            { title: "DOM Manipulation", path: "/content/javascript/dom" },
            { title: "Web APIs", path: "/content/javascript/web-apis" },
            { title: "Performance", path: "/content/javascript/performance" },
        ]
    },
    {
        title: "Frameworks",
        path: "/content/frameworks",
        items: [
            { title: "Astro", path: "/content/frameworks/astro", badge: "new" },
            { title: "React", path: "/content/frameworks/react" },
            { title: "Vue", path: "/content/frameworks/vue" },
            { title: "Svelte", path: "/content/frameworks/svelte" },
        ]
    },
    {
        title: "Tooling",
        path: "/content/tooling",
        items: [
            { title: "Git & GitHub", path: "/content/tooling/git" },
            { title: "Vite", path: "/content/tooling/vite" },
            { title: "Package Managers", path: "/content/tooling/package-managers" },
            { title: "Testing", path: "/content/tooling/testing" },
        ]
    },
    {
        title: "Best Practices",
        path: "/content/best-practices",
        items: [
            { title: "Performance", path: "/content/best-practices/performance" },
            { title: "Security", path: "/content/best-practices/security" },
            { title: "Deployment", path: "/content/best-practices/deployment" },
        ]
    },
];

const navLinkStyles = cva(
    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
    {
        variants: {
            isActive: {
                true: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white",
                false: "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            }
        },
        defaultVariants: {
            isActive: false
        }
    }
);

const NavLink = ({ item, currentPath, depth = 0 }: { item: NavItem; currentPath: string; depth?: number }) => {
    const isActive = currentPath === item.path;
    const hasChildren = item.items && item.items.length > 0;
    const [isOpen, setIsOpen] = React.useState(isActive || currentPath.startsWith(item.path + "/"));

    return (
        <li className="space-y-1">
            <div className="flex items-center justify-between">
                <a
                    href={item.path}
                    className={cn(
                        navLinkStyles({ isActive }),
                        depth > 0 ? "ml-4" : ""
                    )}
                >
                    {item.title}
                    {item.badge && (
                        <span className={cn(
                            "ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            item.badge === "new" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" :
                                item.badge === "updated" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                                    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                        )}>
              {item.badge}
            </span>
                    )}
                </a>
                {hasChildren && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <ul className="mt-1 space-y-1">
                    {item.items!.map((child) => (
                        <NavLink key={child.path} item={child} currentPath={currentPath} depth={depth + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export function Sidebar({ currentPath }: SidebarProps) {
    return (
        <nav className="space-y-6">
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Documentation</h3>
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink key={item.path} item={item} currentPath={currentPath} />
                    ))}
                </ul>
            </div>
        </nav>
    );
}