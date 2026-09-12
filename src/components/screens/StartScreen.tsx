"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { ArrowRight, Sparkles, Compass, AlertTriangle, ShieldCheck } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const StartScreen: React.FC = () => {
  const { setScreen } = useGame();
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none">
      {/* Eco Hero Welcome Directive */}
      <EcoHeroGuide
        emotion="welcome"
        missionName="Field Command Directive"
        title="Welcome Recruits to Ecosystem Rescue Headquarters!"
        objective="The ecosystem balance is critically damaged. Two rival environmental science teams—Team Explorers and Team Guardians—must investigate microscopic life, reconstruct food chains, solve decomposition mysteries, and restore planetary health!"
        steps={[
          "Enlist your classroom into Team Explorers (Blue) and Team Guardians (Orange).",
          "Both teams compete simultaneously on every challenge with secret answer lock-in.",
          "First team to correctly lock in answers claims a +25⚡ Speed Bonus!",
          "Earn cumulative Eco Energy to restore the Biosphere Health to 100%!"
        ]}
        proTip="Deliberate quietly with your teammates—both teams play at the same time, so speed and accuracy win the cup!"
        defaultExpanded={false}
      />
      {/* Hero Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill bg-white/90 border-2 border-white text-emerald-700 text-xs sm:text-sm font-black uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Two-Team Interactive Classroom Mission</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 drop-shadow-sm">
          ECOSYSTEM{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            RESCUE
          </span>
        </h1>

        <p className="mt-2.5 text-lg sm:text-2xl font-black text-emerald-700 tracking-wide">
          Investigate • Solve • Restore
        </p>

        <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
          A healthier planet starts with knowledge. Understand the smallest organisms to restore the biggest system.
        </p>
      </div>

      {/* Interactive Split Landscape: Damaged vs Healthy */}
      <div className="relative z-10 w-full max-w-5xl my-6 rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 aspect-[16/9] max-h-[440px]">
        {/* Damaged Layer (Left Underneath) */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950/90 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center gap-2 text-amber-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 w-fit text-xs font-black uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Damaged Ecosystem (Critical)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs text-xs">
            <div className="bg-stone-900/80 border border-stone-700/80 rounded-lg p-2 text-stone-300">
              🍂 Dry, dead leaf accumulation
            </div>
            <div className="bg-stone-900/80 border border-stone-700/80 rounded-lg p-2 text-stone-300">
              🥀 Soil nutrient depletion
            </div>
            <div className="bg-stone-900/80 border border-stone-700/80 rounded-lg p-2 text-stone-300">
              🌫 Murky polluted water
            </div>
            <div className="bg-stone-900/80 border border-stone-700/80 rounded-lg p-2 text-stone-300">
              ⚠️ Food chain collapse
            </div>
          </div>

          <div className="text-4xl sm:text-6xl opacity-40">
            🍂 🪵 🪨 🥀
          </div>
        </div>

        {/* Healthy Layer (Right Clamped by Slider) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-teal-900 to-cyan-950 flex flex-col justify-between p-6 sm:p-8 transition-all overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="flex items-center gap-2 text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 w-fit text-xs font-black uppercase tracking-wider ml-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Restored Ecosystem (Balanced)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs text-xs ml-auto text-right">
            <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-lg p-2 text-emerald-200">
              🌲 Lush canopy & clean water
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-lg p-2 text-emerald-200">
              🦠 Active soil microbes
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-lg p-2 text-emerald-200">
              🦋 Returning pollinators
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-lg p-2 text-emerald-200">
              ☀️ Resilient food web
            </div>
          </div>

          <div className="text-4xl sm:text-6xl opacity-70 text-right">
            🦌 🦅 🌲 💧 🌸
          </div>
        </div>

        {/* Interactive Slider Divider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-white shadow-xl flex items-center justify-center text-xs font-black text-white">
            ↔
          </div>
        </div>

        {/* Draggable Range Input over the landscape */}
        <input
          type="range"
          min="10"
          max="90"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
          aria-label="Compare Damaged vs Restored Ecosystem"
        />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-1 rounded-full text-[11px] font-bold text-slate-300 border border-slate-700/80 pointer-events-none">
          Drag slider to compare Damaged vs Restored
        </div>
      </div>

      {/* Feature Pills */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 my-2">
        {["EXPLORE", "INVESTIGATE", "LEARN", "COMPETE", "RESTORE"].map((item, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 rounded-2xl clay-card text-[11px] sm:text-xs font-black text-slate-700 tracking-wider"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Primary CTA Button */}
      <div className="relative z-10 my-4">
        <button
          onClick={() => setScreen("MISSION_INTRO")}
          className="group relative flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-3xl clay-btn clay-btn-emerald font-black text-lg sm:text-xl transition-all duration-300"
        >
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: "12s" }} />
          <span>BEGIN MISSION</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
