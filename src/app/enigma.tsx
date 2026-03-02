"use client";

import { useState } from "react";
import Link from "next/link";
import {
  enigmaProcess,
  EnigmaConfig,
  ROTOR_OPTIONS,
} from "@/lib/ciphers/enigma";

export default function EnigmaPage() {
  const [text, setText] = useState("");
  const [rotors, setRotors] = useState<[number, number, number]>([1, 2, 3]);
  const [positions, setPositions] = useState<[string, string, string]>([
    "A",
    "A",
    "A",
  ]);
  const [rings, setRings] = useState<[string, string, string]>(["A", "A", "A"]);
  const [plugboard, setPlugboard] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const updateArray = <T,>(
    arr: [T, T, T],
    index: number,
    val: T,
  ): [T, T, T] => {
    const newArr = [...arr] as [T, T, T];
    newArr[index] = val;
    return newArr;
  };

  const handlePositionChange = (index: number, val: string) => {
    const clean =
      val
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(-1) || "A";
    setPositions(updateArray(positions, index, clean));
  };

  const handleRingChange = (index: number, val: string) => {
    const clean =
      val
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(-1) || "A";
    setRings(updateArray(rings, index, clean));
  };

  const handleProcess = () => {
    setError("");
    try {
      const config: EnigmaConfig = { rotors, positions, rings, plugboard };
      const output = enigmaProcess(text, config);
      setResult(output);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem.");
      setResult("");
    }
  };

  const slotLabels = ["Left Rotor", "Mid Rotor", "Right Rotor"];

  return (
    <main className="min-h-screen bg-[#F4F4F4] text-black p-4 md:p-8 font-mono flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Link
          href="/"
          className="inline-block mb-6 border-4 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD100] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
        >
          &lt; Back to Arcade
        </Link>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          <div className="absolute -top-6 -right-6 md:-right-10 border-4 border-black bg-[#FFD100] px-4 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
            ENIGMA
          </div>

          <div className="space-y-6 mt-4">
            <div>
              <label className="block font-bold mb-2 uppercase text-sm">
                Input Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border-4 border-black p-3 h-32 resize-y focus:outline-none focus:bg-[#FFD100]/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                placeholder="Masukkan teks di sini..."
              />
            </div>

            <div className="border-4 border-black bg-gray-100 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <label className="block font-bold mb-4 uppercase text-sm border-b-2 border-black pb-2">
                Machine Settings
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-2 border-black p-3 bg-white"
                  >
                    <span className="text-xs font-bold uppercase text-center bg-black text-white py-1">
                      {slotLabels[i]}
                    </span>

                    <div>
                      <label className="text-xs font-bold uppercase">
                        Type
                      </label>
                      <select
                        value={rotors[i]}
                        onChange={(e) =>
                          setRotors(
                            updateArray(rotors, i, parseInt(e.target.value)),
                          )
                        }
                        className="w-full border-2 border-black p-1 font-bold focus:outline-none bg-white cursor-pointer"
                      >
                        {ROTOR_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            Rotor {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs font-bold uppercase">
                          Pos
                        </label>
                        <input
                          type="text"
                          value={positions[i]}
                          onChange={(e) =>
                            handlePositionChange(i, e.target.value)
                          }
                          className="w-full border-2 border-black p-1 font-bold text-center focus:outline-none focus:bg-[#FFD100]/20 uppercase"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold uppercase">
                          Ring
                        </label>
                        <input
                          type="text"
                          value={rings[i]}
                          onChange={(e) => handleRingChange(i, e.target.value)}
                          className="w-full border-2 border-black p-1 font-bold text-center focus:outline-none focus:bg-[#FFD100]/20 uppercase"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  Plugboard (Pairs)
                </label>
                <input
                  type="text"
                  value={plugboard}
                  onChange={(e) =>
                    setPlugboard(
                      e.target.value.toUpperCase().replace(/[^A-Z\s]/g, ""),
                    )
                  }
                  className="w-full border-2 border-black p-3 uppercase focus:outline-none focus:bg-[#FFD100]/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="Contoh: AB CD EF"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500 text-white border-4 border-black p-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
                ERROR: {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleProcess}
                className="flex-1 bg-[#FFD100] border-4 border-black p-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Encrypt
              </button>
              <button
                onClick={handleProcess}
                className="flex-1 bg-black text-white border-4 border-black p-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:text-[#FFD100] active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Decrypt
              </button>
            </div>

            {result && (
              <div className="mt-8">
                <label className="block font-bold mb-2 uppercase text-sm">
                  Result
                </label>
                <div className="w-full border-4 border-black p-4 min-h-32 bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] wrap-break-word whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
