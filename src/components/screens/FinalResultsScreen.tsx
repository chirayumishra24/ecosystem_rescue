"use client";

import React, { useEffect } from "react";
import { useGame } from "@/lib/gameStore";
import confetti from "canvas-confetti";
import { Trophy, ArrowRight, Zap, Sparkles, Award } from "lucide-react";

export const FinalResultsScreen: React.FC = () => {
  const { setScreen, teams, ecosystemHealth } = useGame();

  const explorerScore = teams.EXPLORERS.score;
  const guardianScore = teams.GUARDIANS.score;

  const isTie = explorerScore === guardianScore;
  const winner =
    explorerScore > guardianScore ? teams.EXPLORERS : teams.GUARDIANS;

  useEffect(() => {
    // Launch celebratory confetti cascade
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Trophy and Crown Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl clay-card bg-amber-100 flex items-center justify-center text-5xl sm:text-6xl mx-auto mb-4 border-2 border-amber-300 animate-bounce">
          🏆
        </div>

        <div className="clay-pill bg-amber-100 text-amber-900 inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Classroom Expedition Champion</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
          {isTie ? "IT'S A TIE! BOTH TEAMS WIN!" : `${winner.name.toUpperCase()} WINS BY HIGHEST SCORE!`}
        </h1>

        <p className="text-lg sm:text-2xl font-black text-emerald-700 mt-2">
          {isTie
            ? "Both squads matched wits and restored the biosphere together! 🌿"
            : `“Congratulations ${winner.name}! You scored the most Eco Energy and saved Earth!” 🌿`}
        </p>
      </div>

      {/* Team Comparison Duel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-10">
        {/* Team Explorers */}
        <div
          className={`rounded-3xl p-6 sm:p-8 transition-all ${
            winner.id === "EXPLORERS"
              ? "clay-card bg-blue-50/90 border-2 border-blue-400 ring-4 ring-blue-200 scale-[1.02]"
              : "clay-card bg-white/80 opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl clay-btn-blue text-white flex items-center justify-center text-3xl shadow">
                🐺
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">TEAM EXPLORERS</h3>
                <span className="text-xs text-blue-700 font-bold">
                  Discover • Investigate • Restore
                </span>
              </div>
            </div>

            {winner.id === "EXPLORERS" && (
              <span className="clay-pill bg-amber-200 text-amber-950 text-xs font-black uppercase tracking-wider">
                Winner 👑
              </span>
            )}
          </div>

          <div className="clay-inset p-4 rounded-2xl bg-white/70 mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Eco Energy</span>
            <div className="flex items-center gap-1.5 text-3xl font-black text-slate-800 mt-1">
              <Zap className="w-7 h-7 text-amber-500 fill-amber-500" />
              <span>{explorerScore}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Ecosystem Restored</span>
              <span className="text-emerald-700 font-black">{ecosystemHealth}%</span>
            </div>
            <div className="w-full h-3 clay-inset rounded-full overflow-hidden bg-slate-200">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${ecosystemHealth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Team Guardians */}
        <div
          className={`rounded-3xl p-6 sm:p-8 transition-all ${
            winner.id === "GUARDIANS"
              ? "clay-card bg-orange-50/90 border-2 border-orange-400 ring-4 ring-orange-200 scale-[1.02]"
              : "clay-card bg-white/80 opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl clay-btn-orange text-white flex items-center justify-center text-3xl shadow">
                🐯
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">TEAM GUARDIANS</h3>
                <span className="text-xs text-orange-700 font-bold">
                  Protect • Solve • Rebuild
                </span>
              </div>
            </div>

            {winner.id === "GUARDIANS" && (
              <span className="clay-pill bg-amber-200 text-amber-950 text-xs font-black uppercase tracking-wider">
                Winner 👑
              </span>
            )}
          </div>

          <div className="clay-inset p-4 rounded-2xl bg-white/70 mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Eco Energy</span>
            <div className="flex items-center gap-1.5 text-3xl font-black text-slate-800 mt-1">
              <Zap className="w-7 h-7 text-amber-500 fill-amber-500" />
              <span>{guardianScore}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Ecosystem Restored</span>
              <span className="text-emerald-700 font-black">{Math.max(20, ecosystemHealth - 5)}%</span>
            </div>
            <div className="w-full h-3 clay-inset rounded-full overflow-hidden bg-slate-200">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${Math.max(20, ecosystemHealth - 5)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button to Educational Learning Summary */}
      <button
        onClick={() => setScreen("LEARNING_SUMMARY")}
        className="clay-btn clay-btn-emerald flex items-center gap-3 px-10 py-4 sm:py-5 text-white font-black text-lg"
      >
        <span>VIEW KEY SCIENTIFIC TAKEAWAYS</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
