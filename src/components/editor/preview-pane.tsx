import { ExternalLink, RotateCcw } from "lucide-react";
import { useRef } from "react";

export type PreviewPaneProps = {
  output: string;
  onReload?: () => void;
  onOpenInNewTab?: () => void;
  height?: number | string;
};

export default function PreviewPane({
  output,
  onReload,
  onOpenInNewTab,
  height = "12rem",
}: PreviewPaneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Set height via CSS variable
  const containerStyle = {
    "--preview-pane-height":
      typeof height === "number" ? `${height}px` : height,
  } as React.CSSProperties;

  // Reload iframe content
  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = output;
    }
    onReload?.();
  };

  // Open preview in a new tab
  const handleOpenInNewTab = () => {
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenInNewTab?.();
  };

  return (
    <div
      className={`preview-pane-container relative border-t bg-white dark:bg-slate-900`}
      data-height={height}
      style={containerStyle}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button
          className="text-emerald-600 opacity-60 hover:opacity-100"
          title="Reload Preview"
          onClick={handleReload}
          type="button"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          className="text-blue-600 opacity-60 hover:opacity-100"
          title="Open in New Tab"
          onClick={handleOpenInNewTab}
          type="button"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      <iframe
        ref={iframeRef}
        title="Preview"
        srcDoc={output}
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin"
      />
    </div>
  );
}
