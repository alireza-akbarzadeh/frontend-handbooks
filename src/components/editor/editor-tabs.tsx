import React from "react";
import { X, FileText } from "lucide-react";

export type PlaygroundFile = {
  name: string;
  content: string;
  [key: string]: any;
};

export type EditorTabsProps = {
  files: PlaygroundFile[];
  activeFile: PlaygroundFile | null;
  setFiles: (files: PlaygroundFile[]) => void;
  setActiveFile: (file: PlaygroundFile) => void;
  onCloseFile?: (file: PlaygroundFile) => void;
  onRenameFile?: (file: PlaygroundFile, newName: string) => void;
};
export default function EditorTabs({
  files,
  activeFile,
  setFiles,
  setActiveFile,
  onCloseFile,
  onRenameFile,
}: EditorTabsProps) {
  return (
    <div className="flex border-b border-gray-700 bg-gray-800 text-gray-300">
      {files.map((file) => (
        <div
          key={file.name}
          className={`group flex items-center border-r border-gray-700 px-3 py-2 text-sm ${
            file === activeFile
              ? "bg-gray-900 text-gray-100"
              : "hover:bg-gray-700"
          }`}
        >
          <button
            className="flex items-center gap-2"
            onClick={() => setActiveFile(file)}
            title={file.name}
          >
            <FileText className="h-4 w-4 text-gray-500" />
            {file.name}
          </button>
          <button
            className="ml-2 opacity-60 hover:opacity-100"
            onClick={() => onCloseFile?.(file)}
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
