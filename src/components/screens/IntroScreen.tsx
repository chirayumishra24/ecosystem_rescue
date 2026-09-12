"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { BiosphereCanvas } from "../3d/BiosphereCanvas";
import { AlertCircle, ArrowRight, ArrowLeft, ShieldAlert, Sparkles, HeartPulse } from "lucide-react";

export const IntroScreen: React.FC = () => {
  const { setScreen, goBack, ecosystemHealth } = useGame();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Warning Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill bg-rose-50/90 border-2 border-rose-200 text-rose-700 text-xs sm:text-sm font-black uppercase tracking-wider mb-4 animate-pulse shadow-sm">
        <AlertCircle className="w-4 h-4 text-rose-500" />
        <span>Ecosystem Emergency In Progress</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-center text-slate-900 mb-3">
        Something Has Gone Wrong.
      </h1>

      <p className="text-base sm:text-xl text-slate-600 font-medium text-center max-w-2xl mb-8">
        The ecosystem is losing its balance. Microorganisms, food chains, food webs, and decomposition all play critical roles in sustaining life.
      </p>

      {/* 3D Degraded Biosphere */}
      <div className="w-full max-w-2xl mb-8 clay-card p-3">
        <BiosphereCanvas health={ecosystemHealth} />
      </div>

      {/* Health Status Metric Card */}
      <div className="w-full max-w-xl clay-card p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-rose-600 font-black text-sm uppercase tracking-wider">
            <HeartPulse className="w-5 h-5 animate-pulse" />
            <span>Critical Health Index</span>
          </div>
          <span className="text-2xl font-black text-rose-600">
            {ecosystemHealth}%
          </span>
        </div>

        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${ecosystemHealth}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-3 text-center font-bold">
          Nutrient cycling halted • Decomposers impaired • Trophic links severed
        </p>
      </div>

      {/* Narrative Directive Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-center">
        <div className="p-5 rounded-3xl clay-card">
          <div className="text-3xl mb-2">🔬</div>
          <h4 className="font-black text-slate-800 text-sm">1. Investigate</h4>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Analyze soil, pond water & decay samples to discover vital microorganisms.
          </p>
        </div>
        <div className="p-5 rounded-3xl clay-card">
          <div className="text-3xl mb-2">⚡</div>
          <h4 className="font-black text-slate-800 text-sm">2. Solve Challenges</h4>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Rebuild trophic chains, rewire the food web, and earn Eco Energy.
          </p>
        </div>
        <div className="p-5 rounded-3xl clay-card">
          <div className="text-3xl mb-2">🌱</div>
          <h4 className="font-black text-slate-800 text-sm">3. Restore Balance</h4>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Rise from 20% to 100% health and crown the classroom champion!
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-8 py-4 rounded-3xl clay-btn clay-btn-white font-black text-slate-700 text-base"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-600" />
          <span>BACK</span>
        </button>

        <button
          onClick={() => setScreen("TEAM_SELECT")}
          className="flex items-center gap-3 px-10 sm:px-14 py-4 rounded-3xl clay-btn clay-btn-emerald font-black text-lg"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>START INVESTIGATION</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
