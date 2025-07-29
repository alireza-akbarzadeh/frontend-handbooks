import React, { useState } from "react";
import FileDropdown from "./file-dropdown";
import { FileIcon, PlusIcon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

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
    <aside className="flex w-48 flex-col border-r border-gray-700 bg-gray-900 p-2 text-gray-300">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">Files</span>
        <button
          className="text-gray-400 hover:text-gray-100"
          onClick={() => setShowInput(true)}
          title="Add file"
        >
          <PlusIcon className="h-4 w-4" />
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
          <ContextMenu key={file.name}>
            <ContextMenuTrigger onContextMenu={(e) => e.preventDefault()}>
              <li key={file.name}>
                <button
                  className="flex w-full items-center rounded px-2 py-1 text-left text-sm hover:bg-gray-700"
                  onClick={() => setActiveFile(file)}
                >
                  <FileIcon className="mr-2 h-4 w-4 text-gray-500" />
                  {file.name}
                </button>
              </li>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Rename</ContextMenuItem>
              <ContextMenuItem>Delete</ContextMenuItem>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Cut</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </ul>
    </aside>
  );
}
