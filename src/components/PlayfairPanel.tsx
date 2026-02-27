"use client";

import { useState } from "react";
import CipherPanel from "./CipherPanel";
import { playfairEncrypt, playfairDecrypt } from "@/lib/ciphers/playfair";

export default function PlayfairPanel() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (fn: (text: string, key: string) => string) => {
    setError("");
    setOutput("");
    try {
      setOutput(fn(input, key));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <CipherPanel
      title="Playfair Cipher"
      description="Digraph substitution on a 5×5 key square (I/J combined). Spaces in output mark digraph pairs."
      inputText={input}
      outputText={output}
      error={error}
      onInputChange={setInput}
      onEncrypt={() => run(playfairEncrypt)}
      onDecrypt={() => run(playfairDecrypt)}
      onClear={() => {
        setInput("");
        setOutput("");
        setError("");
      }}
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Key
        </label>
        <input
          type="text"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500"
          placeholder="e.g. MONARCHY"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <p className="text-xs text-zinc-500 mt-1">
          J is treated as I. Duplicate letters in keyword are removed.
        </p>
      </div>
    </CipherPanel>
  );
}
