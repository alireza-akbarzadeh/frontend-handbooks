import { useState, useEffect } from "react";
import FileTree, { type PlaygroundFile } from "./file-tree";
import EditorTabs from "./editor-tabs";
import Toolbar from "./toolbar";
import PreviewPane from "./preview-pane";
import ConsolePane from "./console-pane";
import FileDropdown from "./file-dropdown";
import {
  fetchPlayground,
  savePlayground,
} from "../../pages/api/playgroundClient";

export function PlaygroundEditor({ playgroundId }: { playgroundId: string }) {
  const [files, setFiles] = useState<PlaygroundFile[]>([]);
  const [activeFile, setActiveFile] = useState<PlaygroundFile | null>(null);
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);

  // Fetch playground data on mount
  useEffect(() => {
    fetchPlayground(playgroundId).then((data) => {
      setFiles(data.files);
      setActiveFile(data.files[0]);
    });
  }, [playgroundId]);

  // Example handlers (expand as needed)
  const handleCreateFile = (filename: string) => {
    if (!files.find((f) => f.name === filename)) {
      const newFile = { name: filename, content: "" };
      setFiles([...files, newFile]);
      setActiveFile(newFile);
    }
  };

  const handleCloseFile = (file: PlaygroundFile) => {
    const filtered = files.filter((f) => f !== file);
    setFiles(filtered);
    if (activeFile === file) setActiveFile(filtered[0] || null);
  };

  const handleRun = () => {
    // Example: just set output to active file content
    setOutput(activeFile?.content || "");
    setConsoleOutput((prev) => [...prev, "Code executed."]);
  };

  const handleSave = () => {
    savePlayground(playgroundId, { files });
    setConsoleOutput((prev) => [...prev, "Playground saved."]);
  };

  const handleReset = () => {
    setFiles([]);
    setActiveFile(null);
    setOutput("");
    setConsoleOutput([]);
  };

  return (
    <div className="flex h-full">
      <FileTree
        files={files}
        setActiveFile={setActiveFile}
        onCreateFile={handleCreateFile}
      />
      <div className="flex flex-1 flex-col">
        <Toolbar onRun={handleRun} onSave={handleSave} onReset={handleReset} />
        <EditorTabs
          files={files}
          activeFile={activeFile}
          setFiles={setFiles}
          setActiveFile={setActiveFile}
          onCloseFile={handleCloseFile}
        />
        <PreviewPane output={output} />
        <ConsolePane
          logs={consoleOutput}
          onClear={() => setConsoleOutput([])}
        />
      </div>
      {showInput && (
        <FileDropdown
          onCreate={(filename) => {
            handleCreateFile(filename);
            setShowInput(false);
          }}
          onCancel={() => setShowInput(false)}
        />
      )}
    </div>
  );
}
