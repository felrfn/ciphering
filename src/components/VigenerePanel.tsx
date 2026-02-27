"use client";

import { useState } from "react";
import CipherPanel from "./CipherPanel";
import { vigenereEncrypt, vigenereDecrypt } from "@/lib/ciphers/vigenere";

export default function VigenerePanel() {
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
      title="Vigenère Cipher"
      description="Polyalphabetic substitution cipher using a repeating keyword shift (A–Z)."
      inputText={input}
      outputText={output}
      error={error}
      onInputChange={setInput}
      onEncrypt={() => run(vigenereEncrypt)}
      onDecrypt={() => run(vigenereDecrypt)}
      onClear={() => {
        setInput("");
        setOutput("");
        setError("");
      }}
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Key (letters only)
        </label>
        <input
          type="text"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500"
          placeholder="e.g. SECRET"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
    </CipherPanel>
  );
}
