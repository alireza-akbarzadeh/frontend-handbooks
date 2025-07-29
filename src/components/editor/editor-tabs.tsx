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
    <div className="flex flex-1 flex-col">
      <div className="flex border-b bg-slate-50 dark:bg-slate-900">
        {files.map((file) => (
          <div
            key={file.name}
            className={`group flex items-center border-r last:border-r-0 ${
              file === activeFile
                ? "bg-emerald-200 dark:bg-slate-800"
                : "hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <button
              className="flex items-center gap-2 px-3 py-2 font-mono text-sm"
              onClick={() => setActiveFile(file)}
              title={file.name}
            >
              <FileText className="mr-1 h-4 w-4" />
              {file.name}
            </button>
            <button
              className="ml-1 p-1 opacity-60 hover:opacity-100"
              onClick={() => onCloseFile?.(file)}
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {activeFile && (
        <textarea
          className="w-full flex-1 resize-none bg-white p-4 font-mono text-sm outline-none dark:bg-slate-900"
          value={activeFile.content}
          placeholder="Edit file content here..."
          title={`Editor for ${activeFile.name}`}
          onChange={(e) => {
            setFiles(
              files.map((f) =>
                f === activeFile ? { ...f, content: e.target.value } : f,
              ),
            );
          }}
        />
      )}
    </div>
  );
}
