"use client";

import { useState } from "react";
import CipherPanel from "./CipherPanel";
import { hillEncrypt, hillDecrypt } from "@/lib/ciphers/hill";

const EXAMPLE_2X2 = "6 24 1 13";
const EXAMPLE_3X3 = "6 24 1 13 16 10 20 17 15";

export default function HillPanel() {
  const [keyStr, setKeyStr] = useState(EXAMPLE_2X2);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (fn: (text: string, key: string) => string) => {
    setError("");
    setOutput("");
    try {
      setOutput(fn(input, keyStr));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <CipherPanel
      title="Hill Cipher"
      description="Matrix multiplication mod 26. Supports 2×2 (4 values) or 3×3 (9 values) key matrices."
      inputText={input}
      outputText={output}
      error={error}
      onInputChange={setInput}
      onEncrypt={() => run(hillEncrypt)}
      onDecrypt={() => run(hillDecrypt)}
      onClear={() => {
        setInput("");
        setOutput("");
        setError("");
      }}
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Key Matrix
        </label>
        <input
          type="text"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500"
          placeholder="e.g. 6 24 1 13 (2×2) or 9 numbers (3×3)"
          value={keyStr}
          onChange={(e) => setKeyStr(e.target.value)}
        />
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => setKeyStr(EXAMPLE_2X2)}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Use 2×2 example
          </button>
          <button
            type="button"
            onClick={() => setKeyStr(EXAMPLE_3X3)}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Use 3×3 example
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          Key matrix must be invertible mod 26. Non-alpha chars are stripped;
          text is padded with X.
        </p>
      </div>
    </CipherPanel>
  );
}
