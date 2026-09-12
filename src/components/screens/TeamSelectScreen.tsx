"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { TeamId } from "@/lib/types";
import { ArrowRight, ArrowLeft, CheckCircle2, Users, Compass, Shield, Sparkles } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const TeamSelectScreen: React.FC = () => {
  const { setScreen, goBack, activeTeam, setActiveTeam } = useGame();
  const [selectedTeam, setSelectedTeam] = useState<TeamId>(activeTeam);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleSelect = (team: TeamId) => {
    setSelectedTeam(team);
    setActiveTeam(team);
    setConfirmed(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Captain Eco Team Directive */}
      <EcoHeroGuide
        emotion="welcome"
        missionName="Enlistment Directive"
        title="Form Your Science Squads: Explorers vs Guardians"
        objective="Divide your classroom into two collaborative science squads. Both teams will tackle all missions concurrently to earn Eco Energy and restore nature."
        steps={[
          "🔵 Team Explorers (The Wolves): Specialize in discovery, field investigation, and rapid diagnosis.",
          "🟠 Team Guardians (The Tigers): Specialize in protection, system balance, and sustainable repair.",
          "Both teams deliberate together in class and submit secret answers on their team's console."
        ]}
        proTip="Assign roles inside each team: a Chief Biologist, a Microscope Operator, a Scribe, and a Timekeeper!"
      />
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-pill bg-white border-2 border-white text-emerald-700 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
          <Users className="w-4 h-4 text-emerald-500" />
          <span>Classroom Two-Team Setup</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          CHOOSE YOUR TEAM
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 max-w-xl mx-auto">
          Enlist your squad. Both teams will collaborate and compete across the ecosystem missions!
        </p>
      </div>

      {/* Main Selection Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-10">
        {/* TEAM EXPLORERS (Blue) */}
        <div
          onClick={() => handleSelect("EXPLORERS")}
          className={`relative cursor-pointer rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 clay-card ${
            selectedTeam === "EXPLORERS"
              ? "border-4 border-blue-400 bg-gradient-to-b from-blue-50/90 via-white to-blue-50 scale-[1.02] shadow-[14px_18px_36px_rgba(37,99,235,0.2)]"
              : "hover:scale-[1.01] opacity-90"
          }`}
        >
          {selectedTeam === "EXPLORERS" && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-2xl shadow-sm">
                🐺
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">TEAM EXPLORERS</h3>
                <p className="text-xs font-black text-blue-600 uppercase tracking-wide">
                  Team A • Blue
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-blue-700 italic mb-6">
              “Discover • Investigate • Restore”
            </p>

            {/* Mascot Illustration Visual */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-3xl clay-inset flex flex-col items-center justify-center p-4 mb-6">
              <div className="text-6xl sm:text-7xl mb-2 animate-float">
                🔭🧑‍🔬
              </div>
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Dr. Kai • Field Lead
              </span>
              <p className="text-[11px] text-slate-600 font-medium text-center mt-1">
                Specialist in microscope optics, soil microscopy, and microbial tracking.
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("EXPLORERS");
            }}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all clay-btn ${
              selectedTeam === "EXPLORERS"
                ? "clay-btn-blue text-white"
                : "clay-btn-white text-blue-700"
            }`}
          >
            {selectedTeam === "EXPLORERS" ? "✓ Team Explorers Enlisted" : "Join Team A"}
          </button>
        </div>

        {/* TEAM GUARDIANS (Orange) */}
        <div
          onClick={() => handleSelect("GUARDIANS")}
          className={`relative cursor-pointer rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 clay-card ${
            selectedTeam === "GUARDIANS"
              ? "border-4 border-orange-400 bg-gradient-to-b from-orange-50/90 via-white to-orange-50 scale-[1.02] shadow-[14px_18px_36px_rgba(234,88,12,0.2)]"
              : "hover:scale-[1.01] opacity-90"
          }`}
        >
          {selectedTeam === "GUARDIANS" && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white p-1.5 rounded-full shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-2xl shadow-sm">
                🐯
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">TEAM GUARDIANS</h3>
                <p className="text-xs font-black text-orange-600 uppercase tracking-wide">
                  Team B • Orange
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-orange-700 italic mb-6">
              “Protect • Solve • Rebuild”
            </p>

            {/* Mascot Illustration Visual */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-3xl clay-inset flex flex-col items-center justify-center p-4 mb-6">
              <div className="text-6xl sm:text-7xl mb-2 animate-float" style={{ animationDelay: "1.5s" }}>
                📱👩‍🌾
              </div>
              <span className="text-xs font-black text-orange-700 uppercase tracking-wider">
                Maya • Ecological Officer
              </span>
              <p className="text-[11px] text-slate-600 font-medium text-center mt-1">
                Specialist in trophic dynamics, food webs, and nutrient decay cycling.
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("GUARDIANS");
            }}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all clay-btn ${
              selectedTeam === "GUARDIANS"
                ? "clay-btn-orange text-white"
                : "clay-btn-white text-orange-700"
            }`}
          >
            {selectedTeam === "GUARDIANS" ? "✓ Team Guardians Enlisted" : "Join Team B"}
          </button>
        </div>

        {/* OUR MISSION Clipboard Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 clay-card bg-gradient-to-b from-amber-50/90 to-amber-100/70 border-4 border-amber-200/90 flex flex-col justify-between">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-700 rounded-b-2xl shadow-md flex items-center justify-center">
            <div className="w-8 h-2 bg-stone-400 rounded-full" />
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xl">📋</span>
              <h3 className="text-2xl font-black tracking-tight text-stone-900 uppercase">
                OUR MISSION
              </h3>
            </div>

            <div className="space-y-4 text-stone-800 font-medium text-sm leading-relaxed">
              <p>
                The ecosystem is in trouble. Vital decomposers and microbial networks have diminished, breaking critical links in food chains and food webs.
              </p>
              <p>
                Use your knowledge about microorganisms to solve interactive challenges, earn Eco Energy, and restore the natural balance.
              </p>
              <div className="p-3 bg-amber-200/60 rounded-2xl border border-amber-300 font-bold text-xs text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Classroom tip: Teams can alternate turns each mission or answer collaboratively!</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-300/80 text-center">
            <p className="font-serif italic text-base text-stone-700 font-bold">
              “Are you ready to make a difference?” 🍃
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation & Continue */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-emerald-700 text-sm font-black uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {selectedTeam === "EXPLORERS" ? "TEAM EXPLORERS READY!" : "TEAM GUARDIANS READY!"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-8 py-4 rounded-3xl clay-btn clay-btn-white font-black text-slate-700 text-base"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
            <span>BACK</span>
          </button>

          <button
            onClick={() => setScreen("HOW_TO_PLAY")}
            className="flex items-center gap-3 px-10 sm:px-14 py-4 rounded-3xl clay-btn clay-btn-emerald font-black text-lg"
          >
            <span>HOW TO PLAY & RULES</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
