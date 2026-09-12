"use client";

import React from "react";

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Ambient Light Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl animate-float-gentle" />
      <div className="absolute top-[30%] right-[-8%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-transparent blur-3xl animate-float-reverse" />
      <div className="absolute bottom-[-10%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-amber-100/40 via-emerald-100/30 to-transparent blur-3xl animate-float-gentle" />

      {/* Floating 3D Clay Microbial & Botanical Elements */}
      {/* 1. Friendly Microbe Spore (Top Right) */}
      <div className="absolute top-20 right-[12%] w-20 h-20 rounded-full bg-gradient-to-br from-teal-300 via-emerald-200 to-teal-400 opacity-60 shadow-[8px_12px_24px_rgba(20,184,166,0.25),inset_4px_4px_8px_rgba(255,255,255,0.9),inset_-4px_-4px_8px_rgba(13,148,136,0.3)] animate-float-gentle flex items-center justify-center text-xl">
        <span className="opacity-80">🦠</span>
      </div>

      {/* 2. Soft Clay Spore Bubble (Left Mid) */}
      <div className="absolute top-64 left-[6%] w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 via-blue-200 to-cyan-400 opacity-50 shadow-[6px_10px_20px_rgba(56,189,248,0.25),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(14,165,233,0.3)] animate-float-reverse flex items-center justify-center text-lg">
        <span className="opacity-80">💧</span>
      </div>

      {/* 3. Floating Nature Leaf (Right Mid) */}
      <div className="absolute top-[55%] right-[8%] w-14 h-14 rounded-2xl rotate-12 bg-gradient-to-br from-green-300 via-emerald-200 to-green-400 opacity-55 shadow-[6px_10px_18px_rgba(34,197,94,0.25),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(22,163,74,0.3)] animate-float-gentle flex items-center justify-center text-lg">
        <span className="opacity-80">🍃</span>
      </div>

      {/* 4. Sunlight Ray Dot (Bottom Left) */}
      <div className="absolute bottom-24 left-[15%] w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 opacity-50 shadow-[5px_8px_16px_rgba(245,158,11,0.25),inset_3px_3px_5px_rgba(255,255,255,0.9),inset_-3px_-3px_5px_rgba(217,119,6,0.3)] animate-float-reverse flex items-center justify-center text-base">
        <span className="opacity-80">✨</span>
      </div>

      {/* 5. Subterranean Decomposer Clay Pebble (Bottom Right) */}
      <div className="absolute bottom-32 right-[18%] w-16 h-16 rounded-3xl -rotate-6 bg-gradient-to-br from-orange-300 via-amber-200 to-orange-400 opacity-45 shadow-[6px_10px_20px_rgba(249,115,22,0.25),inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(234,88,12,0.3)] animate-float-gentle flex items-center justify-center text-lg">
        <span className="opacity-80">🍄</span>
      </div>

      {/* Subtle Organic Rolling Clay Hills at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-36 opacity-30 text-emerald-200"
        viewBox="0 0 1440 220"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C320,180 540,60 880,130 C1120,180 1340,90 1440,110 L1440,220 L0,220 Z"
          fill="currentColor"
        />
        <path
          d="M0,160 C240,110 600,200 960,140 C1200,100 1380,170 1440,150 L1440,220 L0,220 Z"
          fill="#a7f3d0"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
