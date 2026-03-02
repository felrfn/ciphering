"use client";

import { useState } from "react";
import Link from "next/link";
import { vigenereEncrypt, vigenereDecrypt } from "@/lib/ciphers/vigenere";

export default function VigenerePage() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleProcess = (isEncrypt: boolean) => {
    setError("");
    try {
      const output = isEncrypt
        ? vigenereEncrypt(text, key)
        : vigenereDecrypt(text, key);
      setResult(output);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
      setResult("");
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F4F4] text-black p-4 md:p-8 font-mono flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link
          href="/"
          className="inline-block mb-6 border-4 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD100] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
        >
          &lt; Back to Arcade
        </Link>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          <div className="absolute -top-6 -right-6 md:-right-10 border-4 border-black bg-[#FFD100] px-4 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-3">
            VIGENERE
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
            <div className="border-2 border-black bg-gray-100 p-2">
              <span className="text-xs font-bold block mb-1 uppercase">
                Variant
              </span>
              <span className="font-bold">Standard Cipher</span>
            </div>
            <div className="border-2 border-black bg-gray-100 p-2">
              <span className="text-xs font-bold block mb-1 uppercase">
                Alphabet
              </span>
              <span className="font-bold">A - Z</span>
            </div>
          </div>

          <div className="space-y-6">
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
                onChange={(e) => setKey(e.target.value)}
                className="w-full border-4 border-black p-3 uppercase focus:outline-none focus:bg-[#FFD100]/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                placeholder="Contoh: SECRET"
              />
            </div>

            {error && (
              <div className="bg-red-500 text-white border-4 border-black p-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
