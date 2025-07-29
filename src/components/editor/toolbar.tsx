import React from "react";
import {
  Play,
  Save,
  RotateCcw,
  Copy,
  FolderPlus,
  Trash2,
  Download,
  Upload,
  Settings,
  Terminal,
  FilePlus,
} from "lucide-react";

export type ToolbarProps = {
  onRun: () => void;
  onSave: () => void;
  onReset: () => void;
  onCopy?: () => void;
  onNewFile?: () => void;
  onDeleteFile?: () => void;
  onDownload?: () => void;
  onUpload?: () => void;
  onSettings?: () => void;
  onTerminal?: () => void;
};

export default function Toolbar({
  onRun,
  onSave,
  onReset,
  onCopy,
  onNewFile,
  onDeleteFile,
  onDownload,
  onUpload,
  onSettings,
  onTerminal,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 border-b bg-white p-2 dark:bg-slate-800">
      <button className="btn" onClick={onRun} title="Run (Ctrl+Enter)">
        <Play className="mr-1 h-4 w-4" /> Run
      </button>
      <button className="btn" onClick={onSave} title="Save (Ctrl+S)">
        <Save className="mr-1 h-4 w-4" /> Save
      </button>
      <button className="btn" onClick={onReset} title="Reset">
        <RotateCcw className="mr-1 h-4 w-4" /> Reset
      </button>
      <button className="btn" onClick={onCopy} title="Copy Code">
        <Copy className="mr-1 h-4 w-4" /> Copy
      </button>
      <button className="btn" onClick={onNewFile} title="New File">
        <FilePlus className="mr-1 h-4 w-4" /> New
      </button>
      <button className="btn" onClick={onDeleteFile} title="Delete File">
        <Trash2 className="mr-1 h-4 w-4" /> Delete
      </button>
      <button className="btn" onClick={onDownload} title="Download">
        <Download className="mr-1 h-4 w-4" /> Download
      </button>
      <button className="btn" onClick={onUpload} title="Upload">
        <Upload className="mr-1 h-4 w-4" /> Upload
      </button>
      <button className="btn" onClick={onTerminal} title="Show Terminal">
        <Terminal className="mr-1 h-4 w-4" /> Terminal
      </button>
      <button className="btn" onClick={onSettings} title="Settings">
        <Settings className="mr-1 h-4 w-4" /> Settings
      </button>
    </div>
  );
}
