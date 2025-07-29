"use client";

import type { InferEntrySchema } from "astro:content";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import type { RelatedDocsProps } from "../../types/docs";

// Astro content collection types

// Generate dynamic gradient colors based on category color
const generateCategoryGradients = (color: string, index: number) => {
  const gradientMap: { [key: string]: any } = {
    blue: {
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      bgGradient:
        "from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-teal-950/20",
      borderGradient:
        "from-blue-200 via-cyan-200 to-teal-200 dark:from-blue-800 dark:via-cyan-800 dark:to-teal-800",
      shadowColor: "shadow-blue-500/20 dark:shadow-blue-400/10",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    red: {
      gradient: "from-red-400 via-rose-500 to-pink-500",
      bgGradient:
        "from-red-50 via-rose-50 to-pink-50 dark:from-red-950/20 dark:via-rose-950/20 dark:to-pink-950/20",
      borderGradient:
        "from-red-200 via-rose-200 to-pink-200 dark:from-red-800 dark:via-rose-800 dark:to-pink-800",
      shadowColor: "shadow-red-500/20 dark:shadow-red-400/10",
      textColor: "text-red-600 dark:text-red-400",
    },
    green: {
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      bgGradient:
        "from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20",
      borderGradient:
        "from-green-200 via-emerald-200 to-teal-200 dark:from-green-800 dark:via-emerald-800 dark:to-teal-800",
      shadowColor: "shadow-green-500/20 dark:shadow-green-400/10",
      textColor: "text-green-600 dark:text-green-400",
    },
    purple: {
      gradient: "from-purple-400 via-violet-500 to-indigo-500",
      bgGradient:
        "from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950/20 dark:via-violet-950/20 dark:to-indigo-950/20",
      borderGradient:
        "from-purple-200 via-violet-200 to-indigo-200 dark:from-purple-800 dark:via-violet-800 dark:to-indigo-800",
      shadowColor: "shadow-purple-500/20 dark:shadow-purple-400/10",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    yellow: {
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      bgGradient:
        "from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20",
      borderGradient:
        "from-yellow-200 via-amber-200 to-orange-200 dark:from-yellow-800 dark:via-amber-800 dark:to-orange-800",
      shadowColor: "shadow-yellow-500/20 dark:shadow-yellow-400/10",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
    orange: {
      gradient: "from-orange-400 via-red-500 to-pink-500",
      bgGradient:
        "from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-pink-950/20",
      borderGradient:
        "from-orange-200 via-red-200 to-pink-200 dark:from-orange-800 dark:via-red-800 dark:to-pink-800",
      shadowColor: "shadow-orange-500/20 dark:shadow-orange-400/10",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    pink: {
      gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
      bgGradient:
        "from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-fuchsia-950/20",
      borderGradient:
        "from-rose-200 via-pink-200 to-fuchsia-200 dark:from-rose-800 dark:via-pink-800 dark:to-fuchsia-800",
      shadowColor: "shadow-rose-500/20 dark:shadow-rose-400/10",
      textColor: "text-rose-600 dark:text-rose-400",
    },
    indigo: {
      gradient: "from-indigo-400 via-purple-500 to-violet-500",
      bgGradient:
        "from-indigo-50 via-purple-50 to-violet-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-violet-950/20",
      borderGradient:
        "from-indigo-200 via-purple-200 to-violet-200 dark:from-indigo-800 dark:via-purple-800 dark:to-violet-800",
      shadowColor: "shadow-indigo-500/20 dark:shadow-indigo-400/10",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
    gray: {
      gradient: "from-slate-400 via-gray-500 to-zinc-500",
      bgGradient:
        "from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950/20 dark:via-gray-950/20 dark:to-zinc-950/20",
      borderGradient:
        "from-slate-200 via-gray-200 to-zinc-200 dark:from-slate-800 dark:via-gray-800 dark:to-zinc-800",
      shadowColor: "shadow-slate-500/20 dark:shadow-slate-400/10",
      textColor: "text-slate-600 dark:text-slate-400",
    },
  };

  // Fallback colors if the color isn't in our map
  const fallbackColors = [
    gradientMap.blue,
    gradientMap.purple,
    gradientMap.green,
    gradientMap.red,
    gradientMap.yellow,
    gradientMap.orange,
    gradientMap.pink,
    gradientMap.indigo,
  ];

  return gradientMap[color] || fallbackColors[index % fallbackColors.length];
};

export function RelatedDocsEnhanced({
  relatedDocs,
  categoryMetadata,
}: RelatedDocsProps) {
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);

  if (relatedDocs.length === 0) return null;

  return (
    <div className="relative mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50 opacity-60 dark:from-slate-900/30 dark:via-slate-800/20 dark:to-slate-900/30"></div>

      <div className="relative">
        {/* Enhanced Header */}
        <div className="group animate-in fade-in-0 slide-in-from-top-4 mb-8 flex items-center gap-3 duration-700">
          <div className="relative">
            <div className="animate-spin-slow h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>
          </div>
          <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-2xl font-bold text-transparent transition-all duration-500 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100">
            Related Documentation
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-slate-700"></div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedDocs.map((doc, index) => {
            const [docCategory] = doc.slug.split("/");
            const catMeta = categoryMetadata[docCategory] || {
              color: "gray",
              title: "Documentation",
              icon: "/placeholder.svg?height=16&width=16",
            };
            const colors = generateCategoryGradients(catMeta.color, index);
            const isHovered = hoveredDoc === doc.id;

            return (
              <div
                key={doc.id}
                className={`group animate-in fade-in-0 slide-in-from-bottom-4 relative transform transition-all duration-500 hover:scale-[1.02]`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredDoc(doc.id)}
                onMouseLeave={() => setHoveredDoc(null)}
              >
                {/* Animated gradient border */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                    colors.borderGradient
                  } p-[1px] transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 shadow-lg " + colors.shadowColor
                      : "opacity-60"
                  }`}
                >
                  <div
                    className={`h-full w-full rounded-xl bg-gradient-to-br ${colors.bgGradient} transition-all duration-300`}
                  ></div>
                </div>

                <a
                  href={`/docs/${doc.slug}`}
                  className="group/link relative block rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* Category Header with Icon */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`relative rounded-lg bg-gradient-to-br p-2 ${
                        colors.gradient
                      } shadow-lg transition-all duration-300 ${
                        isHovered ? "scale-110 rotate-3" : ""
                      }`}
                    >
                      <img
                        src={catMeta.icon || "/placeholder.svg"}
                        alt={catMeta.title}
                        width="16"
                        height="16"
                        className="h-4 w-4 brightness-0 drop-shadow-sm invert"
                      />
                      {isHovered && (
                        <div className="absolute inset-0 animate-ping rounded-lg bg-white/20"></div>
                      )}
                    </div>
                    <span
                      className={`bg-gradient-to-r text-sm font-semibold ${
                        colors.gradient
                      } bg-clip-text text-transparent transition-all duration-300 ${
                        isHovered ? "scale-105" : ""
                      }`}
                    >
                      {catMeta.title}
                    </span>
                    <div
                      className={`h-px flex-1 bg-gradient-to-r ${
                        colors.gradient
                      } opacity-30 transition-all duration-300 ${
                        isHovered ? "opacity-60" : ""
                      }`}
                    ></div>
                  </div>

                  {/* Document Title */}
                  <h3 className="mb-3 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover/link:text-slate-700 dark:text-slate-100 dark:group-hover/link:text-slate-200">
                    {doc.data.title}
                  </h3>

                  {/* Description */}
                  {doc.data.description && (
                    <p className="mb-4 line-clamp-2 text-sm text-slate-600 transition-colors duration-300 group-hover/link:text-slate-500 dark:text-slate-400 dark:group-hover/link:text-slate-300">
                      {doc.data.description}
                    </p>
                  )}

                  {/* Document metadata */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                      {doc.collection}
                    </span>
                    {doc.filePath && (
                      <span className="flex items-center gap-1 truncate">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                        {doc.filePath.split("/").pop()}
                      </span>
                    )}
                  </div>

                  {/* Animated Arrow */}
                  <div
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isHovered
                        ? `bg-gradient-to-r text-transparent ${colors.gradient} translate-x-1 bg-clip-text`
                        : `${colors.textColor} opacity-0 group-hover/link:opacity-100`
                    }`}
                  >
                    <span>Read more</span>
                    <ExternalLink
                      className={`h-4 w-4 transition-all duration-300 ${
                        isHovered ? "translate-x-1 scale-110" : ""
                      }`}
                    />
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.gradient} pointer-events-none opacity-0 transition-opacity duration-300 group-hover/link:opacity-5`}
                  ></div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Floating gradient orbs for ambient effect */}
        <div className="pointer-events-none absolute top-8 right-8 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl"></div>
        <div
          className="pointer-events-none absolute bottom-8 left-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-pink-400/10 to-orange-400/10 blur-2xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
