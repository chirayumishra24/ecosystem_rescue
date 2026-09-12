"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { ArrowRight, ArrowLeft, BookOpen, Compass, Trophy, Zap, CheckCircle2, Heart } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const HowToPlayScreen: React.FC = () => {
  const { setScreen, goBack, teams } = useGame();

  const rules = [
    {
      num: 1,
      title: "Explore Each Mission",
      desc: "Travel across 5 unique ecosystem biomes from the soil microscope to the food biotech lab.",
      icon: "🗺️",
      color: "border-blue-500/40 bg-blue-950/30",
    },
    {
      num: 2,
      title: "Interactive Challenges",
      desc: "Operate a virtual microscope, drag food chain links, adjust decay timelines, and rewire food webs.",
      icon: "🔬",
      color: "border-emerald-500/40 bg-emerald-950/30",
    },
    {
      num: 3,
      title: "Detective Clues",
      desc: "Analyze clues one by one to deduce whether a microorganism is Bacteria, Fungi, Protozoa, or Algae.",
      icon: "🕵️",
      color: "border-amber-500/40 bg-amber-950/30",
    },
    {
      num: 4,
      title: "Earn ⚡ Eco Energy",
      desc: "Every correct discovery awards +100 to +200 Eco Energy directly to your team's live score.",
      icon: "⚡",
      color: "border-yellow-500/40 bg-yellow-950/30",
    },
    {
      num: 5,
      title: "Restore The Ecosystem",
      desc: "Watch the biosphere transform from a withered 20% wasteland into a 100% vibrant living world.",
      icon: "🌱",
      color: "border-teal-500/40 bg-teal-950/30",
    },
    {
      num: 6,
      title: "Classroom Champion",
      desc: "Participate in the 60s Eco Challenge & Risk Round to crown the winning science squad!",
      icon: "🏆",
      color: "border-orange-500/40 bg-orange-950/30",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Captain Eco Academy Guide */}
      <EcoHeroGuide
        emotion="briefing"
        missionName="Field Academy"
        title="Classroom Rules of Engagement & Scoring"
        objective="Master simultaneous two-team gameplay to maximize learning, maintain honest competition, and restore nature together."
        steps={[
          "Both teams deliberate quietly within your group without calling answers aloud.",
          "Select answers privately on your team's designated console [LOCKED 🔒].",
          "First team to correctly lock in earns a +25⚡ Speed Bonus!",
          "Review scientific explanations together after each reveal to master key concepts."
        ]}
        proTip="No team can cheat by waiting—answers stay secret until both teams are locked in and revealed!"
      />
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill bg-white border-2 border-white text-emerald-700 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Mission Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          HOW TO PLAY
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 max-w-xl mx-auto">
          Six straightforward steps to investigate microorganisms and rescue the biosphere.
        </p>
      </div>

      {/* 6 Step Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-10">
        {rules.map((rule) => (
          <div
            key={rule.num}
            className="rounded-3xl p-6 transition-all hover:scale-[1.02] clay-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl">{rule.icon}</span>
              <span className="w-8 h-8 rounded-2xl clay-inset flex items-center justify-center font-black text-xs text-slate-800">
                {rule.num}
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 mb-1.5">{rule.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Classroom Scoreboard Preview */}
      <div className="w-full max-w-md clay-card p-6 mb-10 text-center">
        <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Live Classroom Scoreboard
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50/80 border-2 border-blue-200/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-blue-700 text-xs font-black uppercase">
              <span>🐺 Team Explorers</span>
            </div>
            <div className="text-2xl font-black text-slate-800 mt-1 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{teams.EXPLORERS.score}</span>
            </div>
          </div>

          <div className="bg-orange-50/80 border-2 border-orange-200/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-orange-700 text-xs font-black uppercase">
              <span>🐯 Team Guardians</span>
            </div>
            <div className="text-2xl font-black text-slate-800 mt-1 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{teams.GUARDIANS.score}</span>
            </div>
          </div>
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
          onClick={() => setScreen("MAP")}
          className="flex items-center gap-3 px-10 sm:px-14 py-4 rounded-3xl clay-btn clay-btn-emerald font-black text-lg"
        >
          <Compass className="w-5 h-5" />
          <span>ENTER ECOSYSTEM MAP</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
