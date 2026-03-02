"use client";

import Link from "next/link";

const CIPHERS = [
  { id: "affine", name: "Affine Cipher" },
  { id: "enigma", name: "Enigma Machine" },
  { id: "hill", name: "Hill Cipher" },
  { id: "playfair", name: "Playfair Cipher" },
  { id: "vigenere", name: "Vigenere Cipher" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F4] text-black p-8 font-mono flex flex-col items-center justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase border-4 border-black bg-[#FFD100] px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
        CIPHERING - FELRFN
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {CIPHERS.map((cipher) => (
          <Link
            href={`/${cipher.id}`}
            key={cipher.id}
            className="group relative block bg-white border-4 border-black p-6 transition-transform hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD100]"
          >
            <h2 className="text-2xl font-bold uppercase mb-2 group-hover:underline decoration-4 underline-offset-4">
              {cipher.name}
            </h2>
            <div className="text-sm font-bold bg-black text-white px-2 py-1 inline-block mt-4">
              START &gt;
            </div>
          </Link>
        ))}
      </div>

      <a
        href="https://github.com/felrfn/ciphering"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-16 group relative block bg-white border-4 border-black px-6 py-4
             transition-transform hover:-translate-y-1 hover:-translate-x-1
             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
             hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
             hover:bg-[#FFD100]"
      >
        <span className="font-bold uppercase text-sm group-hover:underline decoration-4 underline-offset-4">
          github
        </span>
      </a>
    </main>
  );
}
