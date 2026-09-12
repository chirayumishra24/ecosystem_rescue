"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ChevronDown, ChevronUp, Zap, HelpCircle, ShieldAlert, Award } from "lucide-react";

export type EcoHeroEmotion =
  | "welcome"
  | "briefing"
  | "investigate"
  | "thinking"
  | "connect"
  | "warning"
  | "detective"
  | "recycling"
  | "web"
  | "scientist"
  | "blitz"
  | "tactical"
  | "crisis"
  | "celebrate";

interface EcoHeroGuideProps {
  emotion: EcoHeroEmotion;
  title: string;
  missionName?: string;
  objective: string;
  steps: string[];
  proTip?: string;
  defaultExpanded?: boolean;
}

const emotionImages: Record<EcoHeroEmotion, string> = {
  welcome: "/eco-hero/welcome.jpg",
  briefing: "/eco-hero/briefing.jpg",
  investigate: "/eco-hero/investigate.jpg",
  thinking: "/eco-hero/thinking.jpg",
  connect: "/eco-hero/connect.jpg",
  warning: "/eco-hero/warning.jpg",
  detective: "/eco-hero/detective.jpg",
  recycling: "/eco-hero/recycling.jpg",
  web: "/eco-hero/web.jpg",
  scientist: "/eco-hero/scientist.jpg",
  blitz: "/eco-hero/blitz.jpg",
  tactical: "/eco-hero/tactical.jpg",
  crisis: "/eco-hero/crisis.jpg",
  celebrate: "/eco-hero/celebrate.jpg",
};

export const EcoHeroGuide: React.FC<EcoHeroGuideProps> = ({
  emotion,
  title,
  missionName = "Field Directive",
  objective,
  steps,
  proTip,
  defaultExpanded = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  const imgSrc = emotionImages[emotion] || emotionImages.welcome;

  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1720px] mx-auto mb-6 transition-all duration-300">
      <div className="clay-card p-4 sm:p-5 2xl:p-7 relative overflow-hidden border-2 border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 shadow-[0_8px_24px_rgba(16,185,129,0.12)]">
        {/* Top bar header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Eco Hero Avatar Preview */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-white shadow-[0_4px_12px_rgba(16,185,129,0.25)] flex-shrink-0 bg-white">
              <img
                src={imgSrc}
                alt="Captain Eco Hero"
                className="w-full h-full object-cover object-top hover:scale-110 transition duration-300"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-black shadow">
                ⚡
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
                  {missionName}
                </span>
                <span className="text-xs font-black text-slate-700 hidden sm:inline">
                  CAPTAIN ECO DIRECTIVE
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                {title}
              </h3>
            </div>
          </div>

          {/* Toggle expand button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="clay-btn clay-btn-white px-3 py-1.5 text-xs font-black text-slate-700 flex items-center gap-1 hover:text-emerald-600 transition active:scale-95"
          >
            <span className="hidden sm:inline">{isOpen ? "Hide Instructions" : "View Instructions"}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>

        {/* Expandable Body */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-emerald-100/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Eco Man Hero Portrait Card */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(16,185,129,0.25),inset_2px_2px_4px_rgba(255,255,255,0.8)] bg-gradient-to-b from-emerald-100 to-white group">
                <img
                  src={imgSrc}
                  alt={`Captain Eco - ${emotion}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/30 to-transparent p-2 text-white">
                  <p className="text-[11px] font-black uppercase tracking-wider text-emerald-200">Captain Eco</p>
                </div>
              </div>
            </div>

            {/* Directive Content & Instruction Steps */}
            <div className="md:col-span-8 flex flex-col gap-2.5">
              {/* Mission Objective Callout */}
              <div className="bg-white/90 rounded-2xl p-3 border-2 border-white shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Phase Objective</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                  {objective}
                </p>
              </div>

              {/* Steps list */}
              <div className="bg-white/80 rounded-2xl p-3 border border-slate-100 shadow-sm">
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                  How Both Teams Play & Score:
                </div>
                <ul className="space-y-1.5 text-xs font-bold text-slate-700">
                  {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip Callout */}
              {proTip && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl px-3 py-2 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 animate-bounce" />
                  <span><strong className="font-black text-amber-950">Eco-Tip:</strong> {proTip}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
