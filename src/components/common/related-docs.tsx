import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface Doc {
  slug: string;
  data: {
    title: string;
    description?: string;
  };
}

interface CategoryMetadata {
  [key: string]: {
    title: string;
    color: string;
    icon: string;
  };
}

interface RelatedDocsProps {
  relatedDocs: Doc[];
  categoryMetadata: CategoryMetadata;
}

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
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50 dark:from-slate-900/30 dark:via-slate-800/20 dark:to-slate-900/30 rounded-2xl opacity-60 animate-pulse"></div>

      <div className="relative">
        {/* Enhanced Header */}
        <div className="flex items-center gap-3 mb-8 group animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-50 animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
            Related Documentation
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedDocs.map((doc, index) => {
            const [docCategory] = doc.slug.split("/");
            const catMeta = categoryMetadata[docCategory] || {
              color: "gray",
              title: "Documentation",
              icon: "",
            };
            const colors = generateCategoryGradients(catMeta.color, index);
            const isHovered = hoveredDoc === doc.slug;

            return (
              <div
                key={doc.slug}
                className={`relative group transform transition-all duration-500 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredDoc(doc.slug)}
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
                  className="relative block p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl group/link"
                >
                  {/* Category Header with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`relative p-2 rounded-lg bg-gradient-to-br ${
                        colors.gradient
                      } shadow-lg transition-all duration-300 ${
                        isHovered ? "scale-110 rotate-3" : ""
                      }`}
                    >
                      {catMeta.icon ? (
                        <img
                          src={catMeta.icon || "/placeholder.svg"}
                          alt=""
                          width="16"
                          height="16"
                          className="w-4 h-4 brightness-0 invert drop-shadow-sm"
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-white/80"></div>
                      )}
                      {isHovered && (
                        <div className="absolute inset-0 rounded-lg bg-white/20 animate-ping"></div>
                      )}
                    </div>
                    <span
                      className={`text-sm font-semibold bg-gradient-to-r ${
                        colors.gradient
                      } bg-clip-text text-transparent transition-all duration-300 ${
                        isHovered ? "scale-105" : ""
                      }`}
                    >
                      {catMeta.title}
                    </span>
                    <div
                      className={`flex-1 h-px bg-gradient-to-r ${
                        colors.gradient
                      } opacity-30 transition-all duration-300 ${
                        isHovered ? "opacity-60" : ""
                      }`}
                    ></div>
                  </div>

                  {/* Document Title */}
                  <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-slate-100 group-hover/link:text-slate-700 dark:group-hover/link:text-slate-200 transition-colors duration-300">
                    {doc.data.title}
                  </h3>

                  {/* Description */}
                  {doc.data.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 group-hover/link:text-slate-500 dark:group-hover/link:text-slate-300 transition-colors duration-300">
                      {doc.data.description}
                    </p>
                  )}

                  {/* Animated Arrow */}
                  <div
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isHovered
                        ? `text-transparent bg-gradient-to-r ${colors.gradient} bg-clip-text translate-x-1`
                        : `${colors.textColor} opacity-0 group-hover/link:opacity-100`
                    }`}
                  >
                    <span>Read more</span>
                    <ExternalLink
                      className={`w-4 h-4 transition-all duration-300 ${
                        isHovered ? "scale-110 translate-x-1" : ""
                      }`}
                    />
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover/link:opacity-5 transition-opacity duration-300 pointer-events-none`}
                  ></div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Floating gradient orbs for ambient effect */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div
          className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse pointer-events-none"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
}
