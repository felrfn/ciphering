"use client";

import { useState } from "react";

interface CipherPanelProps {
  title: string;
  description: string;
  children: React.ReactNode;
  inputText: string;
  outputText: string;
  error: string;
  onInputChange: (val: string) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  onClear: () => void;
}

export default function CipherPanel({
  title,
  description,
  children,
  inputText,
  outputText,
  error,
  onInputChange,
  onEncrypt,
  onDecrypt,
  onClear,
}: CipherPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-zinc-400 mt-1">{description}</p>
      </div>

      {/* Key inputs */}
      <div className="space-y-3">{children}</div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Input Text
        </label>
        <textarea
          className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onEncrypt}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Encrypt
        </button>
        <button
          onClick={onDecrypt}
          className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Decrypt
        </button>
        <button
          onClick={onClear}
          className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-zinc-300">
            Output
          </label>
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className="text-xs text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-emerald-300 text-sm resize-none focus:outline-none placeholder:text-zinc-600"
          placeholder="Output will appear here..."
          value={outputText}
        />
      </div>
    </div>
  );
}
