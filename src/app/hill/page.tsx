"use client";

import { useState } from "react";
import Link from "next/link";
import { hillEncrypt, hillDecrypt } from "@/lib/ciphers/hill";

export default function HillPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState<2 | 3>(2);
  const [matrix, setMatrix] = useState<string[]>(Array(4).fill(""));
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSizeChange = (newSize: 2 | 3) => {
    setSize(newSize);
    setMatrix(Array(newSize * newSize).fill(""));
    setError("");
    setResult("");
  };

  const handleCellChange = (index: number, val: string) => {
    const cleanVal = val.replace(/[^0-9-]/g, "");
    const newMatrix = [...matrix];
    newMatrix[index] = cleanVal;
    setMatrix(newMatrix);
  };

  const handleProcess = (isEncrypt: boolean) => {
    setError("");

    if (matrix.some((val) => val === "")) {
      setError("Isi semua kotak matriksnya dulu.");
      return;
    }

    const keyStr = matrix.join(" ");

    try {
      const output = isEncrypt
        ? hillEncrypt(text, keyStr)
        : hillDecrypt(text, keyStr);
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
            HILL
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
                Matrix Size
              </label>
              <div className="flex gap-2 mb-4 w-full">
                <button
                  onClick={() => handleSizeChange(2)}
                  className={`flex-1 border-4 border-black py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${size === 2 ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
                >
                  2x2
                </button>
                <button
                  onClick={() => handleSizeChange(3)}
                  className={`flex-1 border-4 border-black py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${size === 3 ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
                >
                  3x3
                </button>
              </div>

              <div className="flex items-center justify-center border-4 border-black p-4 bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                  }}
                >
                  {matrix.map((val, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      value={val}
                      onChange={(e) => handleCellChange(i, e.target.value)}
                      className="w-12 h-12 text-center font-bold text-lg border-2 border-black focus:outline-none focus:bg-[#FFD100]/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  ))}
                </div>
              </div>
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
