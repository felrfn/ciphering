"use client";

import { useState } from "react";
import CipherPanel from "./CipherPanel";
import { affineEncrypt, affineDecrypt, VALID_A } from "@/lib/ciphers/affine";

export default function AffinePanel() {
  const [a, setA] = useState("5");
  const [b, setB] = useState("8");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (fn: (text: string, a: number, b: number) => string) => {
    setError("");
    setOutput("");
    try {
      const aNum = parseInt(a, 10);
      const bNum = parseInt(b, 10);
      setOutput(fn(input, aNum, bNum));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <CipherPanel
      title="Affine Cipher"
      description="C = (a·P + b) mod 26. 'a' must be coprime with 26."
      inputText={input}
      outputText={output}
      error={error}
      onInputChange={setInput}
      onEncrypt={() => run(affineEncrypt)}
      onDecrypt={() => run(affineDecrypt)}
      onClear={() => {
        setInput("");
        setOutput("");
        setError("");
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Key a{" "}
            <span className="text-zinc-500 text-xs">(coprime with 26)</span>
          </label>
          <select
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={a}
            onChange={(e) => setA(e.target.value)}
          >
            {VALID_A.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Key b <span className="text-zinc-500 text-xs">(0–25)</span>
          </label>
          <input
            type="number"
            min={0}
            max={25}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </div>
      </div>
    </CipherPanel>
  );
}
