"use client";

import { useState } from "react";
import VigenerePanel from "@/components/VigenerePanel";
import AffinePanel from "@/components/AffinePanel";
import PlayfairPanel from "@/components/PlayfairPanel";
import HillPanel from "@/components/HillPanel";
import EnigmaPanel from "@/components/EnigmaPanel";

const TABS = [
  { id: "vigenere", label: "Vigenère" },
  { id: "affine", label: "Affine" },
  { id: "playfair", label: "Playfair" },
  { id: "hill", label: "Hill" },
  { id: "enigma", label: "Enigma" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [active, setActive] = useState<TabId>("vigenere");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Cipher <span className="text-indigo-400">Calculator</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Encrypt and decrypt classical ciphers — all computed in your
            browser.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 min-w-fit px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${active === tab.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cipher panels */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          {active === "vigenere" && <VigenerePanel />}
          {active === "affine" && <AffinePanel />}
          {active === "playfair" && <PlayfairPanel />}
          {active === "hill" && <HillPanel />}
          {active === "enigma" && <EnigmaPanel />}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          All computations run client-side · No data is sent to any server
        </p>
      </div>
    </main>
  );
}
