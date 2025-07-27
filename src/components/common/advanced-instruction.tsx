import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.tsx";
import {Badge} from "../ui/badge.tsx";

interface InstructionStep {
    id: string;
    title: string;
    description: string;
    badge?: "new" | "updated" | "tip" | "warning" | "core";
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Updated to component type
}

interface LearningPathItem {
    id: string;
    title: string;
    description: string;
    path: string;
    badge?: "new" | "updated" | "core";
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AdvancedInstructionProps {
    title: string;
    description?: string;
    learningObjectives?: string[];
    steps?: InstructionStep[];
    learningPath?: LearningPathItem[];
    callToAction?: {
        title: string;
        description: string;
        links: { label: string; href: string; variant?: "default" | "secondary" | "outline" | "destructive" | null | undefined }[];
    };
    className?: string;
}

const badgeVariants = cva("ml-2", {
    variants: {
        variant: {
            new: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-900",
            updated: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900",
            tip: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-900",
            warning: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-900",
            core: "bg-slate-100 text-slate-800 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-700",
        },
    },
    defaultVariants: {
        variant: "core",
    },
});

const InstructionItem: React.FC<{ item: InstructionStep | LearningPathItem; isPathItem?: boolean }> = ({
                                                                                                           item,
                                                                                                           isPathItem = false,
                                                                                                       }) => {
    const getBadgeVariant = (
        badgeType: string | undefined
    ): VariantProps<typeof badgeVariants>["variant"] => {
        if (!badgeType) return "core";
        return badgeType as VariantProps<typeof badgeVariants>["variant"];
    };

    // Icon component rendering with props if provided
    const Icon = item.icon;

    return (
        <li
            className={cn(
                "flex items-start gap-3 py-2",
                isPathItem ? "border-b border-slate-200 dark:border-slate-700 last:border-0 pb-4 last:pb-0" : ""
            )}
        >
            {Icon && (
                <div className="flex-shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                </div>
            )}
            <div>
                <div className="flex items-center">
                    <span className={cn("font-medium", isPathItem ? "text-base" : "text-sm")}>{item.title}</span>
                    {item.badge && <Badge className={badgeVariants({ variant: getBadgeVariant(item.badge) })}>{item.badge}</Badge>}
                </div>
                <p className={cn("text-slate-600 dark:text-slate-400 mt-1", isPathItem ? "text-sm" : "text-xs")}>
                    {item.description}
                    {isPathItem && "path" in item && (
                        <a href={item.path} className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
                            Start &rarr;
                        </a>
                    )}
                </p>
            </div>
        </li>
    );
};

const AdvancedInstruction: React.FC<AdvancedInstructionProps> = ({
                                                                     title,
                                                                     description,
                                                                     learningObjectives,
                                                                     steps,
                                                                     learningPath,
                                                                     callToAction,
                                                                     className,
                                                                 }) => {
    return (
        <Card className={cn("w-full shadow-sm", className)}>
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
                {learningObjectives && learningObjectives.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span> What You'll Learn
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {learningObjectives.map((objective, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-0.5">•</span>
                                    <span className="text-slate-700 dark:text-slate-300">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {steps && steps.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span> Key Concepts & Steps
                        </h3>
                        <ol className="relative space-y-4 pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                            {steps.map((step) => (
                                <InstructionItem key={step.id} item={step} />
                            ))}
                        </ol>
                    </section>
                )}

                {learningPath && learningPath.length > 0 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <span className="bg-purple-500 w-2 h-2 rounded-full mr-2"></span> Suggested Learning Path
                        </h3>
                        <ul className="space-y-0">
                            {learningPath.map((pathItem) => (
                                <InstructionItem key={pathItem.id} item={pathItem} isPathItem />
                            ))}
                        </ul>
                    </section>
                )}

                {callToAction && (
                    <section className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{callToAction.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 mb-4">{callToAction.description}</p>
                        <div className="flex flex-wrap gap-3">
                            {callToAction.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900",
                                        link.variant === "outline"
                                            ? "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </section>
                )}
            </CardContent>
        </Card>
    );
};

export default AdvancedInstruction;
