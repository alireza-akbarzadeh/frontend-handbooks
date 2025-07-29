import React, { useState } from "react";
import FileDropdown from "./file-dropdown";

// Define the type for a file object
export type PlaygroundFile = {
  name: string;
  content: string;
  [key: string]: any; // Extend as needed for metadata, type, etc.
};

export type FileTreeProps = {
  files: PlaygroundFile[];
  setActiveFile: (file: PlaygroundFile) => void;
  onCreateFile: (filename: string) => void;
};

export default function FileTree({
  files,
  setActiveFile,
  onCreateFile,
}: FileTreeProps) {
  const [showInput, setShowInput] = useState(false);

  return (
    <aside className="flex w-48 flex-col border-r bg-slate-100 p-2 dark:bg-slate-900">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">Files</span>
        <button
          className="text-lg text-emerald-600 hover:text-emerald-800"
          onClick={() => setShowInput(true)}
          title="Add file"
        >
          ＋
        </button>
      </div>
      {showInput && (
        <FileDropdown
          onCreate={(filename) => {
            onCreateFile(filename);
            setShowInput(false);
          }}
          onCancel={() => setShowInput(false)}
        />
      )}
      <ul className="flex-1 space-y-1">
        {files.map((file) => (
          <li key={file.name}>
            <button
              className="w-full rounded px-2 py-1 text-left hover:bg-emerald-100 dark:hover:bg-slate-800"
              onClick={() => setActiveFile(file)}
            >
              <span className="mr-2">📄</span>
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
