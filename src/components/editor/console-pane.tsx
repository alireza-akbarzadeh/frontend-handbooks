import React, { useRef } from "react";
import { Trash2 } from "lucide-react";

export type ConsolePaneProps = {
  logs: string[];
  onClear?: () => void;
  height?: number | string; // Optional: allow custom height
};

export default function ConsolePane({
  logs,
  onClear,
  height = "6rem",
}: ConsolePaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when logs change
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className="relative border-t border-gray-700 bg-gray-800 font-mono text-xs text-gray-300"
      style={{ height }}
    >
      <button
        className="absolute top-2 right-2 z-10 text-gray-400 opacity-60 hover:opacity-100"
        title="Clear Console"
        onClick={onClear}
        type="button"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <div
        ref={containerRef}
        className="h-full overflow-y-auto p-2 pr-8"
        style={{ paddingTop: "2rem" }}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500">Console is empty.</div>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  );
}
