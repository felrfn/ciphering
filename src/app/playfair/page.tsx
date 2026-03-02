"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { playfairEncrypt, playfairDecrypt } from "@/lib/ciphers/playfair";

export default function PlayfairPage() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [keyError, setKeyError] = useState("");

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    setKey(val);

    const checkDuplicates = new Set(val.replace(/J/g, "I"));
    if (val.length !== checkDuplicates.size) {
      setKeyError(
        "Kunci tidak boleh mengandung huruf ganda (I dan J dihitung sama).",
      );
    } else {
      setKeyError("");
    }
  };

  const grid = useMemo(() => {
    const validKey = keyError ? "" : key.toUpperCase().replace(/J/g, "I");
    const seen = new Set<string>();
    const square: string[] = [];
    const clean = validKey + "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    for (const ch of clean) {
      if (!seen.has(ch)) {
        seen.add(ch);
        square.push(ch);
      }
    }
    return square;
  }, [key, keyError]);

  const handleProcess = (isEncrypt: boolean) => {
    setError("");
    if (!key) {
      setError("Isi KEY dulu.");
      return;
    }
    if (keyError) {
      setError("Benerin dulu kuncinya sebelum lanjut.");
      return;
    }
    try {
      const output = isEncrypt
        ? playfairEncrypt(text, key)
        : playfairDecrypt(text, key);
      setResult(output);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem.");
      setResult("");
    }
  };

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
            PLAYFAIR
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-4">
            <div className="flex-1 space-y-6">
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

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={key}
                  onChange={handleKeyChange}
                  className={`w-full border-4 border-black p-3 uppercase focus:outline-none focus:bg-[#FFD100]/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${keyError ? "border-red-500 bg-red-50" : ""}`}
                  placeholder="Contoh: THRONE"
                />
                {keyError && (
                  <div className="text-red-600 text-xs font-bold mt-2 uppercase border-l-4 border-red-600 pl-2">
                    {keyError}
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500 text-white border-4 border-black p-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
                  ERROR: {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => handleProcess(true)}
                  className="flex-1 bg-[#FFD100] border-4 border-black p-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Encrypt
                </button>
                <button
                  onClick={() => handleProcess(false)}
                  className="flex-1 bg-black text-white border-4 border-black p-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:text-[#FFD100] active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Decrypt
                </button>
              </div>
            </div>

            <div className="w-full md:w-64 flex flex-col items-center">
              <label className="block font-bold mb-2 uppercase text-sm w-full text-center">
                5x5 Grid (I/J)
              </label>
              <div className="grid grid-cols-5 gap-1 border-4 border-black p-1 bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {grid.map((char, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg bg-white border-2 border-black"
                  >
                    {char}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold mt-4 text-center text-gray-500 uppercase">
                *Read Only. Generated from key.
              </p>
            </div>
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
    </main>
  );
}
