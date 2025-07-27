import React from 'react';

interface RelateddocsProps {
    topics: {
        html?: string[];
        css?: string[];
        javascript?: string[];
        frameworks?: string[];
        tools?: string[];
    };
}

const topicLabels = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    frameworks: "Frameworks",
    tools: "Tools & Workflow"
};

export function Relateddocs({ topics }: RelateddocsProps) {
    // Filter out empty topic categories
    const topicEntries = Object.entries(topics).filter(
        ([_, links]) => links && links.length > 0
    ) as [keyof typeof topicLabels, string[]][];

    if (topicEntries.length === 0) return null;

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Related docs</h3>
            <div className="space-y-4">
                {topicEntries.map(([category, links]) => (
                    <div key={category} className="space-y-2">
                        <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {topicLabels[category]}
                        </h4>
                        <ul className="space-y-1">
                            {links.map((link, index) => {
                                // Split the link into URL and text parts
                                const parts = link.split('|');
                                const url = parts.length > 1 ? parts[0].trim() : link;
                                const text = parts.length > 1 ? parts[1].trim() : link;

                                return (
                                    <li key={index}>
                                        <a
                                            href={url.startsWith('/') ? url : `/docs/${category}/${url}`}
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        >
                                            {text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}