import { useState, useEffect } from "react";
import FileTree, { type PlaygroundFile } from "./file-tree";
import EditorTabs from "./editor-tabs";
import Toolbar from "./toolbar";
import PreviewPane from "./preview-pane";
import ConsolePane from "./console-pane";
import FileDropdown from "./file-dropdown";
import { Editor, loader } from "@monaco-editor/react";
import { ResizableBox } from 'react-resizable'; // Import ResizableBox
import 'react-resizable/css/styles.css'; // Import resizable styles

import {
  fetchPlayground,
  savePlayground,
} from "../../pages/api/playgroundClient";

// Configure Monaco Editor for TypeScript/JSX
loader.config({
  paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs' }
});

loader.init().then(monaco => {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    strict: true,
    skipLibCheck: true
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  // Register a language association for .tsx files if not already present
  monaco.languages.register({ id: 'typescript', extensions: ['.ts', '.tsx'] });
});

export function PlaygroundEditor({ playgroundId }: { playgroundId: string }) {
  const [files, setFiles] = useState<PlaygroundFile[]>([]);
  const [activeFile, setActiveFile] = useState<PlaygroundFile | null>(null);
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showConsole, setShowConsole] = useState(false); // Terminal closed by default
  const [showSidebar, setShowSidebar] = useState(true); // Sidebar visible by default
  const [sidebarWidth, setSidebarWidth] = useState(200); // Initial sidebar width


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

  const handleFileContentChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      setFiles(
        files.map((file) =>
          file === activeFile ? { ...file, content: value } : file,
        ),
      );
    }
  };

  const handleToggleConsole = () => {
    setShowConsole(!showConsole);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleResize = (event:any, {element, size, handle}:any) => {
    setSidebarWidth(size.width);
  };

  return (
    <div className="flex h-full bg-gray-900 text-gray-300">
      <Toolbar
        onRun={handleRun}
        onSave={handleSave}
        onReset={handleReset}
        onTerminal={handleToggleConsole}
        onToggleSidebar={handleToggleSidebar}
      />
      {showSidebar && (
         <ResizableBox
            width={sidebarWidth}
            height={Infinity}
            axis="x"
            minConstraints={[100, Infinity]}
            maxConstraints={[400, Infinity]}
            onResize={handleResize}
            className="flex flex-col"
          >
            <FileTree
              files={files}
              setActiveFile={setActiveFile}
              onCreateFile={handleCreateFile}
            />
          </ResizableBox>
      )}
      <div className="flex flex-1 flex-col">
        <EditorTabs
          files={files}
          activeFile={activeFile}
          setFiles={setFiles}
          setActiveFile={setActiveFile}
          onCloseFile={handleCloseFile}
        />
        {activeFile && (
          <div className="flex-1 flex flex-col">
            <Editor
              height="50vh"
              language={activeFile.name.endsWith('.tsx') || activeFile.name.endsWith('.ts') ? 'typescript' : activeFile.name.split('.').pop()} // Set language to typescript for .ts and .tsx files
              theme="vs-dark"
              value={activeFile.content}
              onChange={handleFileContentChange}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
            <PreviewPane output={output} />
          </div>
        )}
        {showConsole && (
          <ConsolePane
            logs={consoleOutput}
            onClear={() => setConsoleOutput([])}
          />
        )}
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
