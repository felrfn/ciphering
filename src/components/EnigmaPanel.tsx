"use client";

import { useState } from "react";
import CipherPanel from "./CipherPanel";
import {
  enigmaProcess,
  ROTOR_OPTIONS,
  DEFAULT_ENIGMA_CONFIG,
  type EnigmaConfig,
} from "@/lib/ciphers/enigma";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function EnigmaPanel() {
  const [config, setConfig] = useState<EnigmaConfig>({
    ...DEFAULT_ENIGMA_CONFIG,
  });
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = () => {
    setError("");
    setOutput("");
    try {
      setOutput(enigmaProcess(input, config));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const setRotor = (slot: 0 | 1 | 2, val: number) => {
    const r = [...config.rotors] as [number, number, number];
    r[slot] = val;
    setConfig({ ...config, rotors: r });
  };

  const setPosition = (slot: 0 | 1 | 2, val: string) => {
    const p = [...config.positions] as [string, string, string];
    p[slot] = val;
    setConfig({ ...config, positions: p });
  };

  const setRing = (slot: 0 | 1 | 2, val: string) => {
    const r = [...config.rings] as [string, string, string];
    r[slot] = val;
    setConfig({ ...config, rings: r });
  };

  const labels = ["Left", "Middle", "Right"];

  return (
    <CipherPanel
      title="Enigma Machine"
      description="Simulated 3-rotor Enigma (Rotors I–V, Reflector B). Symmetric — encrypt twice to decrypt."
      inputText={input}
      outputText={output}
      error={error}
      onInputChange={setInput}
      onEncrypt={run}
      onDecrypt={run}
      onClear={() => {
        setInput("");
        setOutput("");
        setError("");
      }}
    >
      {/* Rotors */}
      <div>
        <p className="text-sm font-medium text-zinc-300 mb-2">Rotors</p>
        <div className="grid grid-cols-3 gap-3">
          {([0, 1, 2] as const).map((slot) => (
            <div key={slot}>
              <label className="block text-xs text-zinc-400 mb-1">
                {labels[slot]}
              </label>
              <select
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.rotors[slot]}
                onChange={(e) => setRotor(slot, parseInt(e.target.value))}
              >
                {ROTOR_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    Rotor {r}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div>
        <p className="text-sm font-medium text-zinc-300 mb-2">
          Starting Positions
        </p>
        <div className="grid grid-cols-3 gap-3">
          {([0, 1, 2] as const).map((slot) => (
            <div key={slot}>
              <label className="block text-xs text-zinc-400 mb-1">
                {labels[slot]}
              </label>
              <select
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.positions[slot]}
                onChange={(e) => setPosition(slot, e.target.value)}
              >
                {LETTERS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Ring settings */}
      <div>
        <p className="text-sm font-medium text-zinc-300 mb-2">
          Ring Settings (Ringstellung)
        </p>
        <div className="grid grid-cols-3 gap-3">
          {([0, 1, 2] as const).map((slot) => (
            <div key={slot}>
              <label className="block text-xs text-zinc-400 mb-1">
                {labels[slot]}
              </label>
              <select
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.rings[slot]}
                onChange={(e) => setRing(slot, e.target.value)}
              >
                {LETTERS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Plugboard */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">
          Plugboard{" "}
          <span className="text-zinc-500 text-xs">
            (optional, e.g. AB CD EF)
          </span>
        </label>
        <input
          type="text"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-500 uppercase"
          placeholder="e.g. AB CD EF GH"
          value={config.plugboard}
          onChange={(e) =>
            setConfig({ ...config, plugboard: e.target.value.toUpperCase() })
          }
        />
        <p className="text-xs text-zinc-500 mt-1">
          Up to 13 letter pairs, space-separated.
        </p>
      </div>
    </CipherPanel>
  );
}
