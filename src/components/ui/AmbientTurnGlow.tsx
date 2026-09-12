"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";

export const AmbientTurnGlow: React.FC = () => {
  const { activeTeam, currentScreen } = useGame();

  // Don't show glow on intro or results screens
  if (currentScreen === "START" || currentScreen === "FINAL_RESULTS" || currentScreen === "LEARNING_SUMMARY") {
    return null;
  }

  const isExplorers = activeTeam === "EXPLORERS";

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none transition-all duration-700">
      {/* Team A (Left Side) Ambient Aura */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-opacity duration-700 ${
          isExplorers ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Neon Edge Bar */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-b from-blue-400 via-sky-400 to-indigo-500 shadow-[0_0_24px_rgba(56,189,248,0.9)] animate-pulse" />
        
        {/* Soft Radial Ambient Glow */}
        <div className="w-full h-full bg-gradient-to-r from-sky-500/10 via-blue-500/3 to-transparent" />

        {/* Smart Board Watermark Pill */}
        <div className="absolute top-24 left-4 rotate-90 origin-left px-3.5 py-1 rounded-full bg-sky-950/40 backdrop-blur-md border border-sky-400/50 text-[10px] 2xl:text-xs font-black tracking-widest text-sky-300 uppercase shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>TEAM A CONSOLE ACTIVE • 🐺 EXPLORERS</span>
        </div>
      </div>

      {/* Team B (Right Side) Ambient Aura */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-opacity duration-700 ${
          !isExplorers ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Neon Edge Bar */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-b from-amber-400 via-orange-400 to-rose-500 shadow-[0_0_24px_rgba(251,146,60,0.9)] animate-pulse" />
        
        {/* Soft Radial Ambient Glow */}
        <div className="w-full h-full bg-gradient-to-l from-orange-500/10 via-amber-500/3 to-transparent" />

        {/* Smart Board Watermark Pill */}
        <div className="absolute top-24 right-4 -rotate-90 origin-right px-3.5 py-1 rounded-full bg-orange-950/40 backdrop-blur-md border border-orange-400/50 text-[10px] 2xl:text-xs font-black tracking-widest text-orange-300 uppercase shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>TEAM B CONSOLE ACTIVE • 🐯 GUARDIANS</span>
        </div>
      </div>
    </div>
  );
};
