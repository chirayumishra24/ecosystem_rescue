"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { BookOpen, RefreshCw, Printer, Sparkles, CheckCircle2 } from "lucide-react";

export const LearningSummaryScreen: React.FC = () => {
  const { resetGame } = useGame();

  const takeaways = [
    {
      topic: "MICROORGANISMS",
      icon: "🦠",
      summary: "Microorganisms are found in virtually every environment — from deep forest topsoil to ocean depths and inside living organisms. They include bacteria, fungi, protozoa, and microscopic algae.",
      color: "border-teal-500/40 bg-teal-950/30 text-teal-300",
    },
    {
      topic: "FOOD CHAINS & FOOD WEBS",
      icon: "🌱",
      summary: "Living organisms are intimately connected. Solar energy enters ecosystems via photosynthetic producers, passing along trophic chains to herbivores, carnivores, and apex predators with ~10% transfer efficiency.",
      color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300",
    },
    {
      topic: "DECAY & DECOMPOSITION",
      icon: "🍂",
      summary: "Decomposers like bacteria and fungal hyphae secrete specialized enzymes that break down dead leaves, fallen fruit, and organic waste into fundamental chemical compounds.",
      color: "border-amber-500/40 bg-amber-950/30 text-amber-300",
    },
    {
      topic: "THE NUTRIENT CYCLE",
      icon: "🧪",
      summary: "Without decomposition, nutrients would stay trapped in dead biomass forever. Microbes recycle nitrogen, phosphorus, and potassium back into the topsoil to nourish growing plants in a closed loop.",
      color: "border-blue-500/40 bg-blue-950/30 text-blue-300",
    },
    {
      topic: "BENEFICIAL MICROBES IN FOOD",
      icon: "🥛",
      summary: "Far from being only germs, beneficial microbes are foundational to human culture. Lactic acid bacteria ferment yogurt and pickles, while yeasts produce carbon dioxide to make bread rise.",
      color: "border-purple-500/40 bg-purple-950/30 text-purple-300",
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="clay-pill bg-emerald-100 text-emerald-900 inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Field Science Curriculum Synthesis</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-800">
          KEY SCIENTIFIC TAKEAWAYS
        </h1>
        <p className="text-sm sm:text-base font-bold text-slate-600 mt-2 max-w-xl mx-auto">
          Core concepts investigated during the Ecosystem Rescue mission.
        </p>
      </div>

      {/* 5 Educational Pillars List */}
      <div className="space-y-4 w-full mb-10">
        {takeaways.map((item, idx) => (
          <div
            key={idx}
            className="clay-card p-5 sm:p-6 transition-all hover:scale-[1.01] flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="text-4xl flex-shrink-0 clay-inset p-3 rounded-2xl bg-white/70 shadow-sm">
              {item.icon}
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1 text-slate-700">
                <span>{idx + 1}. {item.topic}</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-bold leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Central Philosophy Banner */}
      <div className="w-full clay-card p-6 sm:p-8 text-center mb-10 bg-emerald-50/70 border-2 border-emerald-300">
        <Sparkles className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
        <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
          “Understand the smallest organisms. Restore the biggest system.”
        </h2>
        <p className="text-xs sm:text-sm italic text-emerald-800 mt-2 font-black">
          Healthy Ecosystems. Brighter Tomorrows. 🍃
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handlePrint}
          className="clay-btn clay-btn-white flex items-center gap-2 px-6 py-3.5 text-slate-700 font-black text-sm"
        >
          <Printer className="w-4 h-4 text-teal-600" />
          <span>Print Classroom Notes</span>
        </button>

        <button
          onClick={resetGame}
          className="clay-btn clay-btn-emerald flex items-center gap-2 px-8 py-3.5 text-white font-black text-sm uppercase tracking-wider"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Start New Classroom Mission</span>
        </button>
      </div>
    </div>
  );
};
