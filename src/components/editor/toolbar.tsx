import React from "react";
import {
  Play,
  Save,
  RotateCcw,
  Copy,
  Trash2,
  Download,
  Upload,
  Settings,
  Terminal,
  FilePlus,
  PanelLeft,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"; 

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
  onToggleSidebar?: () => void;
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
  onToggleSidebar,
}: ToolbarProps) {
  const toolbarItems = [
    { icon: PanelLeft, title: "Toggle Sidebar", onClick: onToggleSidebar },
    { icon: Play, title: "Run (Ctrl+Enter)", onClick: onRun },
    { icon: Save, title: "Save (Ctrl+S)", onClick: onSave },
    { icon: RotateCcw, title: "Reset", onClick: onReset },
    { icon: Copy, title: "Copy Code", onClick: onCopy },
    { icon: FilePlus, title: "New File", onClick: onNewFile },
    { icon: Trash2, title: "Delete File", onClick: onDeleteFile },
    { icon: Download, title: "Download", onClick: onDownload },
    { icon: Upload, title: "Upload", onClick: onUpload },
    { icon: Terminal, title: "Show Terminal", onClick: onTerminal },
    { icon: Settings, title: "Settings", onClick: onSettings },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-4 border-r border-gray-700 bg-gray-800 p-2 text-gray-300">
        {toolbarItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button
                className="flex items-center rounded p-2 text-sm hover:bg-gray-700"
                onClick={item.onClick}
                title={item.title} 
              >
                <item.icon className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
