"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { Zap, Sparkles } from "lucide-react";

export const TurnAnnouncement: React.FC = () => {
  const { turnAnnouncement, teams } = useGame();

  if (!turnAnnouncement) return null;

  const isTeamA = turnAnnouncement.team === "EXPLORERS";
  const teamProfile = teams[turnAnnouncement.team];

  return (
    <aside
      aria-label="Team Turn Notification"
      key={turnAnnouncement.key}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4 select-none animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Dimmed backdrop to highlight the turn */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px] transition-opacity duration-300" />

      {/* Main Announcement Card */}
      <div
        className={`relative z-10 w-full max-w-2xl p-8 sm:p-12 rounded-[32px] sm:rounded-[44px] border-4 sm:border-8 border-white text-center text-white shadow-2xl transform transition-all animate-bounce ${
          isTeamA
            ? "bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 shadow-[0_25px_70px_rgba(37,99,235,0.65)]"
            : "bg-gradient-to-br from-orange-600 via-amber-600 to-rose-700 shadow-[0_25px_70px_rgba(234,88,12,0.65)]"
        }`}
        style={{ animationIterationCount: 2 }}
      >
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/50 text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-md">
          <Zap className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
          <span>SMART BOARD TURN ANNOUNCEMENT</span>
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        {/* Mascot Icon */}
        <div className="text-7xl sm:text-9xl mb-2 filter drop-shadow-xl transform hover:scale-110 transition-transform">
          {isTeamA ? "🐺" : "🐯"}
        </div>

        {/* Big Turn Title */}
        <h2 className="text-4xl sm:text-7xl font-black tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
          {isTeamA ? "TEAM A TURN" : "TEAM B TURN"}
        </h2>

        {/* Team Subtitle */}
        <p className="text-xl sm:text-3xl font-extrabold mt-2 text-white/95 drop-shadow">
          {teamProfile.name}
        </p>

        {/* Console indicator badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/40 text-sm sm:text-base font-black tracking-wider uppercase shadow-inner">
          <span>{isTeamA ? "🔵 Left Side of Smart Board Active" : "🟠 Right Side of Smart Board Active"}</span>
        </div>
      </div>
    </aside>
  );
};
