"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { ScreenType } from "@/lib/types";
import { Check, Lock, MapPin, Trophy, Sparkles, Compass, Shield, ArrowLeft } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const MapScreen: React.FC = () => {
  const {
    setScreen,
    goBack,
    completedMissions,
    isMissionUnlocked,
    ecosystemHealth,
  } = useGame();

  const missions: {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
    screen: ScreenType;
    energy: string;
  }[] = [
    {
      id: 1,
      title: "Microbe Investigation",
      subtitle: "Soil, pond water & microscope clues",
      icon: "🔬",
      screen: "MISSION_1_INVESTIGATION",
      energy: "+100 ⚡",
    },
    {
      id: 2,
      title: "Food Chain Builder",
      subtitle: "Trophic levels & What-If scenarios",
      icon: "🌱",
      screen: "MISSION_2_FOOD_CHAIN",
      energy: "+150 ⚡",
    },
    {
      id: 3,
      title: "Decay Detectives",
      subtitle: "Day 1-30 decomposition & nutrient cycles",
      icon: "🍂",
      screen: "MISSION_3_DECAY",
      energy: "+200 ⚡",
    },
    {
      id: 4,
      title: "Food Web Rescue",
      subtitle: "Multi-trophic network & crisis cascade",
      icon: "🕸",
      screen: "MISSION_4_FOOD_WEB",
      energy: "+200 ⚡",
    },
    {
      id: 5,
      title: "Microbe Food Lab",
      subtitle: "Beneficial fermentation & food biotech",
      icon: "🧫",
      screen: "MISSION_5_FOOD_LAB",
      energy: "+200 ⚡",
    },
    {
      id: 6,
      title: "Final Ecosystem Crisis",
      subtitle: "5-stage emergency biosphere recovery",
      icon: "🏆",
      screen: "FINAL_CRISIS",
      energy: "+500 ⚡",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 clay-card p-6 sm:p-7">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={goBack}
              className="clay-btn clay-btn-white px-3 py-1 text-xs font-black text-slate-700 flex items-center gap-1.5 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>Back</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-pill bg-white border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Classroom Mission Path</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
            ECOSYSTEM EXPEDITION MAP
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Complete all missions in sequence to restore the ecosystem to 100%!
          </p>
        </div>

        {/* Floating Wooden Sign Motif */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 shadow-[4px_6px_14px_rgba(245,158,11,0.15)] text-center">
          <span className="text-[11px] font-black text-amber-700 tracking-wider uppercase block">
            Field Naturalist Note
          </span>
          <p className="text-sm font-serif italic text-amber-900 font-bold">
            “Different organisms. One connected world.”
          </p>
        </div>
      </div>

      {/* Captain Eco Map Guide Directive */}
      <EcoHeroGuide
        emotion="briefing"
        missionName="Expedition Navigation"
        title="Expedition Sector Map & Progress Path"
        objective="Deploy your science teams across 5 distinct ecosystem biomes. Complete missions sequentially to unlock high-stakes challenges and restore the living world."
        steps={[
          "Missions unlock sequentially as your squads restore balance.",
          "Both teams compete simultaneously in every unlocked sector.",
          "Track unlocked status and current Biosphere health meter at any time."
        ]}
        proTip="Click on any unlocked mission card below to launch straight into the field investigation!"
        defaultExpanded={false}
      />

      {/* Interactive Path Trail Layout */}
      <div className="relative clay-card p-6 sm:p-10 overflow-hidden mb-8">
        {/* Decorative river svg curve behind points */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 150 Q 250 80 450 160 T 850 120 T 1150 180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M 50 150 Q 250 80 450 160 T 850 120 T 1150 180"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeDasharray="14 14"
            className="animate-flow-line"
          />
        </svg>

        {/* Mission Nodes Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => {
            const isUnlocked = isMissionUnlocked(mission.id);
            const isCompleted = completedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                onClick={() => {
                  if (isUnlocked) setScreen(mission.screen);
                }}
                className={`group relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 clay-card ${
                  isCompleted
                    ? "bg-gradient-to-b from-emerald-50/90 to-teal-50/70 border-2 border-emerald-300 shadow-[8px_12px_24px_rgba(16,185,129,0.15)] cursor-pointer hover:scale-105"
                    : isUnlocked
                    ? "border-3 border-teal-400 shadow-[10px_16px_30px_rgba(20,184,166,0.25)] ring-4 ring-teal-200/50 cursor-pointer hover:scale-105 animate-clay-glow"
                    : "bg-slate-100/60 border-2 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Status Badge Top Right */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl clay-inset flex items-center justify-center text-2xl shadow-sm">
                    {mission.icon}
                  </div>

                  <div>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 bg-teal-100 text-teal-800 border border-teal-200 text-xs font-black px-3 py-1 rounded-full shadow-sm animate-pulse">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-slate-200/80 text-slate-500 text-xs font-black px-3 py-1 rounded-full">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-slate-500 mb-1">
                    <span>MISSION {mission.id}</span>
                    <span className="text-amber-600 font-extrabold">{mission.energy}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    {mission.subtitle}
                  </p>
                </div>

                {/* Action footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black">
                  <span className={isUnlocked ? "text-emerald-700" : "text-slate-400"}>
                    {isCompleted ? "Revisit Station" : isUnlocked ? "Launch Mission →" : "Complete previous mission"}
                  </span>
                  {mission.id === 6 && (
                    <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Classroom Rounds Direct Access Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setScreen("ECO_CHALLENGE")}
          className="flex items-center justify-between p-5 rounded-3xl clay-card hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-3.5 text-left">
            <span className="text-4xl">⚡</span>
            <div>
              <h4 className="font-black text-slate-900 text-base">60-Second Eco Challenge</h4>
              <p className="text-xs text-amber-700 font-bold">Rapid-fire timed competition across all topics</p>
            </div>
          </div>
          <span className="text-xs font-black text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-sm">
            Play Blitz →
          </span>
        </button>

        <button
          onClick={() => setScreen("RISK_ROUND")}
          className="flex items-center justify-between p-5 rounded-3xl clay-card hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-3.5 text-left">
            <span className="text-4xl">🎯</span>
            <div>
              <h4 className="font-black text-slate-900 text-base">Strategic Risk Round</h4>
              <p className="text-xs text-purple-700 font-bold">Wager 10, 25, or 50 Eco Energy to catch up</p>
            </div>
          </div>
          <span className="text-xs font-black text-purple-900 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200 shadow-sm">
            Wager Round →
          </span>
        </button>
      </div>
    </div>
  );
};
