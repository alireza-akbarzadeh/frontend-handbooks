import React, { useState, useRef, useEffect } from "react";

type FileDropdownProps = {
  onCreate: (filename: string) => void;
  onCancel?: () => void;
  className?: string;
};

const FileDropdown: React.FC<FileDropdownProps> = ({
  onCreate,
  onCancel,
  className,
}) => {
  const [filename, setFilename] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCreate = () => {
    if (filename.trim()) {
      onCreate(filename.trim());
      setFilename("");
      onCancel?.();
    }
  };

  return (
    <div className={`relative ${className || ""}`}>
      <input
        ref={inputRef}
        className="w-40 rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        placeholder="New file (e.g. index.js)"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreate();
          if (e.key === "Escape") onCancel?.();
        }}
        onBlur={onCancel}
      />
      <button
        className="ml-2 rounded bg-emerald-500 px-2 py-1 text-xs text-white hover:bg-emerald-600"
        onClick={handleCreate}
        disabled={!filename.trim()}
        tabIndex={-1}
      >
        Create
      </button>
    </div>
  );
};

export default FileDropdown;
