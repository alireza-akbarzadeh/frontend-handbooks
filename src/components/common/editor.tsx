"use client";

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Play,
  RotateCcw,
  Copy,
  Maximize2,
  Minimize2,
  Code2,
  Eye,
  Palette,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CodeFile {
  name: string;
  language: string;
  content: string;
  icon: string;
}

export function PlaygroundEditor() {
  const [activeTab, setActiveTab] = useState("html");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [files, setFiles] = useState<CodeFile[]>([
    {
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playground</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #1f2937;
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        .btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.2s;
        }
        .btn:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to Playground</h1>
        <p>Start building something amazing!</p>
        <button class="btn" onclick="celebrate()">Click me!</button>
        <div id="output"></div>
    </div>
    
    <script>
        function celebrate() {
            const output = document.getElementById('output');
            output.innerHTML = '<p style="margin-top: 1rem; color: #059669;">🎉 Great job! Keep coding!</p>';
            console.log('Button clicked! 🎉');
        }
    </script>
</body>
</html>`,
      icon: "🌐",
    },
    {
      name: "style.css",
      language: "css",
      content: `/* Add your custom styles here */
.custom-animation {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`,
      icon: "🎨",
    },
    {
      name: "script.js",
      language: "javascript",
      content: `// Your JavaScript code here
console.log("Welcome to the playground! 🚀");

// Example: Interactive elements
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded and ready!");
    
    // Add some interactivity
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
        });
    });
});

// Example function
function createSparkle() {
    console.log("✨ Creating sparkle effect!");
    return "Sparkle created!";
}`,
      icon: "⚡",
    },
  ]);

  const getCurrentFile = () => {
    return files.find((file) => file.language === activeTab) || files[0];
  };

  const updateFileContent = (content: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.language === activeTab ? { ...file, content } : file,
      ),
    );
  };

  const runCode = async () => {
    setIsRunning(true);
    setConsoleOutput([]);

    // Simulate running animation
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const htmlFile = files.find((f) => f.language === "html");
      const cssFile = files.find((f) => f.language === "css");
      const jsFile = files.find((f) => f.language === "javascript");

      let htmlContent = htmlFile?.content || "";

      // Inject CSS if exists
      if (cssFile?.content) {
        const cssInjection = `<style>${cssFile.content}</style>`;
        htmlContent = htmlContent.replace("</head>", `${cssInjection}</head>`);
      }

      // Inject JS if exists
      if (jsFile?.content) {
        const jsInjection = `<script>${jsFile.content}</script>`;
        htmlContent = htmlContent.replace("</body>", `${jsInjection}</body>`);
      }

      // Add console capture
      const consoleCapture = `
        <script>
          const originalLog = console.log;
          console.log = function(...args) {
            originalLog.apply(console, args);
            window.parent.postMessage({
              type: 'console',
              data: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
            }, '*');
          };
        </script>
      `;
      htmlContent = htmlContent.replace("</head>", `${consoleCapture}</head>`);

      setOutput(htmlContent);
    } catch (error) {
      console.error("Error running code:", error);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setFiles([
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Playground</title>
</head>
<body>
    <h1>Hello, World! 🌍</h1>
    <p>Start coding here...</p>
</body>
</html>`,
        icon: "🌐",
      },
      {
        name: "style.css",
        language: "css",
        content: `/* Your styles here */
body {
    font-family: system-ui, sans-serif;
    margin: 2rem;
    background: #f8fafc;
}`,
        icon: "🎨",
      },
      {
        name: "script.js",
        language: "javascript",
        content: `// Your JavaScript here
console.log("Ready to code! 🚀");`,
        icon: "⚡",
      },
    ]);
    setConsoleOutput([]);
    setOutput("");
  };

  const copyCode = async () => {
    const currentFile = getCurrentFile();
    await navigator.clipboard.writeText(currentFile.content);
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console") {
        setConsoleOutput((prev) => [...prev, event.data.data]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Auto-run on mount
  useEffect(() => {
    runCode();
  }, []);

  return (
    <div
      className={`flex h-full flex-col ${isFullscreen ? "bg-background fixed inset-0 z-50" : ""}`}
    >
      {/* Header */}
      <motion.div
        className="bg-card flex items-center justify-between border-b p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold">Developer Playground</h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            <Zap className="mr-1 h-3 w-3" />
            Live Preview
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyCode}
            className="hidden bg-transparent sm:flex"
          >
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Running
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Run
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <motion.div
          className="flex w-1/2 flex-col border-r"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex h-full flex-col"
          >
            <div className="bg-muted/50 flex items-center justify-between px-4 py-2">
              <TabsList className="grid w-full grid-cols-3">
                {files.map((file) => (
                  <TabsTrigger
                    key={file.language}
                    value={file.language}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span>{file.icon}</span>
                    {file.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {files.map((file) => (
              <TabsContent
                key={file.language}
                value={file.language}
                className="m-0 flex-1"
              >
                <Editor
                  height="100%"
                  language={file.language}
                  value={file.content}
                  onChange={(value) => updateFileContent(value || "")}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          className="flex w-1/2 flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <Eye className="text-primary h-4 w-4" />
              <span className="text-sm font-medium">Live Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {/* Preview */}
            <div className="flex-1 bg-white">
              {output ? (
                <iframe
                  ref={iframeRef}
                  srcDoc={output}
                  className="h-full w-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="text-muted-foreground flex h-full items-center justify-center">
                  <div className="text-center">
                    <Palette className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>Click "Run" to see your code in action</p>
                  </div>
                </div>
              )}
            </div>

            {/* Console */}
            {consoleOutput.length > 0 && (
              <motion.div
                className="max-h-32 overflow-y-auto border-t bg-gray-900 font-mono text-sm text-green-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-b border-gray-700 bg-gray-800 px-3 py-2">
                  <span className="text-xs text-gray-400">Console Output</span>
                </div>
                <div className="space-y-1 p-3">
                  {consoleOutput.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-0.5 text-xs text-gray-500">
                        {">"}
                      </span>
                      <span className="text-green-400">{log}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
