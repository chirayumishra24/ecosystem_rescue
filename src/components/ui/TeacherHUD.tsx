"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { ScreenType } from "@/lib/types";
import { Play, Pause, Compass, Sparkles, X, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export const TeacherHUD: React.FC = () => {
  const { isPaused, togglePause, jumpToMission, currentScreen } = useGame();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const missionList: { label: string; screen: ScreenType; icon: string; energy: string }[] = [
    { label: "Mission 1: Microbe Lab", screen: "MISSION_1_INVESTIGATION", icon: "🔬", energy: "+100⚡" },
    { label: "Mission 2: Food Chain", screen: "MISSION_2_FOOD_CHAIN", icon: "🌱", energy: "+150⚡" },
    { label: "Mission 3: Decay Detectives", screen: "MISSION_3_DECAY", icon: "🍂", energy: "+200⚡" },
    { label: "Mission 4: Food Web", screen: "MISSION_4_FOOD_WEB", icon: "🕸️", energy: "+200⚡" },
    { label: "Mission 5: Food Lab", screen: "MISSION_5_FOOD_LAB", icon: "🧫", energy: "+200⚡" },
    { label: "Eco Challenge (60s Blitz)", screen: "ECO_CHALLENGE", icon: "⚡", energy: "+250⚡" },
    { label: "Strategic Risk Round", screen: "RISK_ROUND", icon: "🎯", energy: "+300⚡" },
    { label: "Final Biosphere Crisis", screen: "FINAL_CRISIS", icon: "🚨", energy: "+500⚡" },
    { label: "Final Podium & Champion", screen: "FINAL_RESULTS", icon: "🏆", energy: "Results" },
    { label: "Ecosystem Map Overview", screen: "MAP", icon: "🗺️", energy: "Map" },
  ];

  return (
    <>
      {/* 1. Full Screen "Pause & Discuss" Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md select-none animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white border-4 border-amber-300 rounded-[36px] p-8 sm:p-12 text-center shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl sm:text-5xl mx-auto mb-4 animate-pulse">
              ⏸️
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>TEACHER DISCUSSION MODE ACTIVE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
              CLASSROOM DISCUSSION
            </h2>

            <p className="text-base sm:text-xl text-slate-700 font-bold max-w-lg mx-auto leading-relaxed mb-8">
              Screen and challenge timers are paused. Deliberate quietly within your team and listen to your teacher’s directive.
            </p>

            <button
              onClick={togglePause}
              className="px-10 sm:px-14 py-4 sm:py-5 rounded-3xl clay-btn clay-btn-emerald font-black text-lg sm:text-xl flex items-center justify-center gap-3 mx-auto shadow-lg touch-manipulation active:scale-95"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>RESUME GAMEPLAY</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Quick Mission Jump Drawer Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm select-none animate-in fade-in duration-150">
          <div className="w-full max-w-2xl clay-card bg-white p-6 sm:p-8 rounded-[32px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Quick Mission Navigator
                  </h3>
                  <p className="text-xs font-bold text-slate-500">
                    Jump directly to any mission stage for your classroom lesson
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Missions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {missionList.map((m) => (
                <button
                  key={m.screen}
                  onClick={() => {
                    jumpToMission(m.screen);
                    setMenuOpen(false);
                  }}
                  className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm text-left flex items-center justify-between transition-all touch-manipulation active:scale-95 ${
                    currentScreen === m.screen
                      ? "clay-btn-emerald text-white shadow-md ring-2 ring-emerald-400"
                      : "clay-card bg-slate-50 hover:bg-emerald-50/60 text-slate-800 border-2 border-white hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl flex-shrink-0">{m.icon}</span>
                    <span className="truncate">{m.label}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${
                    currentScreen === m.screen ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {m.energy}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick Action Widget on Screen Bottom-Right for Teachers */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 select-none">
        <button
          onClick={togglePause}
          title={isPaused ? "Resume Mission" : "Pause for Classroom Discussion"}
          className={`px-3.5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition-all touch-manipulation ${
            isPaused
              ? "bg-amber-500 text-white animate-pulse"
              : "bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white border-2 border-white shadow-slate-900/10"
          }`}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
          <span className="hidden sm:inline">{isPaused ? "Resume" : "Pause & Discuss"}</span>
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          title="Jump directly to any mission"
          className="px-3.5 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 border-2 border-white shadow-lg active:scale-95 transition-all text-xs font-black uppercase tracking-wider flex items-center gap-1.5 touch-manipulation"
        >
          <Compass className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Jump Mission</span>
        </button>
      </div>
    </>
  );
};
