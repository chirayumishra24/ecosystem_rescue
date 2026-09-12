"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";

export const TugOfWarBar: React.FC = () => {
  const { teams } = useGame();

  const expScore = teams.EXPLORERS.score;
  const grdScore = teams.GUARDIANS.score;
  const total = expScore + grdScore;

  // Calculate percentage (default to 50/50 if 0 points)
  let expPercent = 50;
  if (total > 0) {
    expPercent = Math.min(85, Math.max(15, Math.round((expScore / total) * 100)));
  }

  const scoreDiff = Math.abs(expScore - grdScore);
  const leader =
    expScore > grdScore ? "EXPLORERS" : grdScore > expScore ? "GUARDIANS" : "TIED";

  return (
    <div
      className="hidden md:flex flex-col items-center justify-center w-28 lg:w-40 2xl:w-56 px-1 select-none"
      title={`Live Classroom Tug-of-War: Explorers ${expScore} ⚡ vs Guardians ${grdScore} ⚡`}
    >
      {/* Momentum Badge */}
      <div className="flex items-center justify-between w-full text-[9px] 2xl:text-[11px] font-black uppercase mb-1">
        <span className="text-blue-700 font-extrabold truncate">
          {leader === "EXPLORERS" ? `+${scoreDiff}⚡` : ""}
        </span>
        <span className="text-slate-500 tracking-wider">
          {leader === "TIED" ? "⚖️ TIED" : "MOMENTUM"}
        </span>
        <span className="text-orange-700 font-extrabold truncate">
          {leader === "GUARDIANS" ? `+${scoreDiff}⚡` : ""}
        </span>
      </div>

      {/* Tug of War Dynamic Track */}
      <div className="relative w-full h-2.5 sm:h-3 2xl:h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-inner flex">
        {/* Explorers Territory (Blue) */}
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 transition-all duration-700 shadow-sm"
          style={{ width: `${expPercent}%` }}
        />
        {/* Guardians Territory (Orange) */}
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 shadow-sm"
          style={{ width: `${100 - expPercent}%` }}
        />

        {/* Center Battle Indicator Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-700"
          style={{ left: `${expPercent}%` }}
        />
      </div>
    </div>
  );
};
