"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/lib/gameStore";
import { Shield, Sparkles, Volume2, VolumeX, Map, RefreshCw, Zap, ArrowLeft, Maximize, Minimize } from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    goBack,
    canGoBack,
    activeTeam,
    switchTeam,
    teams,
    ecosystemHealth,
    scorePop,
    soundEnabled,
    toggleSound,
    resetGame,
  } = useGame();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).msFullscreenElement
    ) {
      const docEl = document.documentElement as any;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch((err: any) => {
          console.error(`Error attempting to enable fullscreen: ${err?.message}`);
        });
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      const doc = document as any;
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch((err: any) => {
          console.error(`Error attempting to exit fullscreen: ${err?.message}`);
        });
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  const getScreenLabel = () => {
    switch (currentScreen) {
      case "START":
        return "Ecosystem Rescue Headquarters";
      case "MISSION_INTRO":
        return "Mission Briefing";
      case "TEAM_SELECT":
        return "Team Enlistment";
      case "HOW_TO_PLAY":
        return "Field Academy Guide";
      case "MAP":
        return "Ecosystem Map Overview";
      case "MISSION_1_INVESTIGATION":
        return "Mission 1: Microbe Investigation";
      case "MISSION_1_CLUES":
        return "Mission 1: Detective Clue Lab";
      case "MISSION_2_FOOD_CHAIN":
        return "Mission 2: Food Chain Builder";
      case "MISSION_2_WHAT_IF":
        return "Mission 2: What-If Scenarios";
      case "MISSION_3_DECAY":
        return "Mission 3: Decay Detectives";
      case "MISSION_3_NUTRIENT_CYCLE":
        return "Mission 3: Nutrient Recycling";
      case "MISSION_4_FOOD_WEB":
        return "Mission 4: Food Web Rescue";
      case "MISSION_4_CRISIS":
        return "Mission 4: Food Web Crisis";
      case "MISSION_5_FOOD_LAB":
        return "Mission 5: Microbe Food Lab";
      case "ECO_CHALLENGE":
        return "⚡ 60s Eco Challenge Blitz";
      case "RISK_ROUND":
        return "🎯 Strategic Risk Round";
      case "FINAL_CRISIS":
        return "🚨 Final Ecosystem Crisis";
      case "FINAL_RESULTS":
        return "🏆 Final Score & Podium";
      case "LEARNING_SUMMARY":
        return "📖 Scientific Key Takeaways";
      default:
        return "Ecosystem Rescue";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-2 border-white shadow-[0_6px_20px_rgba(15,23,42,0.06)] px-2.5 sm:px-6 2xl:px-12 py-2 sm:py-3 2xl:py-4 transition-all select-none">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-0.5 sm:px-2">
        {/* Left: Brand & Mission indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          {canGoBack && (
            <button
              onClick={goBack}
              title="Return to previous stage"
              className="clay-btn clay-btn-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs 2xl:text-sm font-black text-slate-700 flex items-center gap-1.5 active:scale-95 shadow-sm touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button
            onClick={() => setScreen("START")}
            className="flex items-center gap-2 sm:gap-2.5 group text-left transition touch-manipulation"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 2xl:w-14 2xl:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[4px_6px_12px_rgba(16,185,129,0.3),inset_2px_2px_4px_rgba(255,255,255,0.8)] group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-lg 2xl:text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">
                  ECOSYSTEM RESCUE
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] 2xl:text-xs text-emerald-700 font-bold hidden sm:block">
                Investigate • Solve • Restore
              </p>
            </div>
          </button>

          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 2xl:px-4 2xl:py-2 rounded-full bg-white/90 border border-slate-200/80 text-xs 2xl:text-sm font-bold text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {getScreenLabel()}
          </div>
        </div>

        {/* Center: Team Scoreboards */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Team Explorers */}
          <button
            onClick={switchTeam}
            title="Click to toggle active team turn"
            className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 2xl:px-5 py-1.5 sm:py-2 2xl:py-3 rounded-2xl transition-all touch-manipulation ${
              activeTeam === "EXPLORERS"
                ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 shadow-[6px_8px_18px_rgba(37,99,235,0.2),inset_2px_2px_4px_rgba(255,255,255,0.9)] scale-105"
                : "bg-white/80 border-2 border-slate-100 opacity-75 hover:opacity-100 shadow-sm"
            }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 2xl:w-11 2xl:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs sm:text-sm 2xl:text-xl font-bold text-white shadow-md shadow-blue-500/30">
              🐺
            </div>
            <div className="text-left">
              <div className="text-[9px] sm:text-[10px] 2xl:text-xs uppercase font-black text-blue-700 flex items-center gap-1">
                <span>Explorers</span>
                {activeTeam === "EXPLORERS" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-base 2xl:text-xl font-black text-slate-800">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 text-amber-500 fill-amber-400" />
                <span>{teams.EXPLORERS.score}</span>
              </div>
            </div>

            {/* Score Pop animation */}
            {scorePop && scorePop.team === "EXPLORERS" && (
              <div
                key={scorePop.key}
                className="absolute -top-7 right-2 text-xs sm:text-base 2xl:text-lg font-black text-blue-700 animate-bounce bg-white border-2 border-blue-400 px-2 sm:px-2.5 py-0.5 rounded-full shadow-lg"
              >
                +{scorePop.amount} ⚡
              </div>
            )}
          </button>

          {/* VS Divider */}
          <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-black text-slate-400 hidden sm:inline">
            VS
          </span>

          {/* Team Guardians */}
          <button
            onClick={switchTeam}
            title="Click to toggle active team turn"
            className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 2xl:px-5 py-1.5 sm:py-2 2xl:py-3 rounded-2xl transition-all touch-manipulation ${
              activeTeam === "GUARDIANS"
                ? "bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400 shadow-[6px_8px_18px_rgba(234,88,12,0.2),inset_2px_2px_4px_rgba(255,255,255,0.9)] scale-105"
                : "bg-white/80 border-2 border-slate-100 opacity-75 hover:opacity-100 shadow-sm"
            }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 2xl:w-11 2xl:h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xs sm:text-sm 2xl:text-xl font-bold text-white shadow-md shadow-orange-500/30">
              🐯
            </div>
            <div className="text-left">
              <div className="text-[9px] sm:text-[10px] 2xl:text-xs uppercase font-black text-orange-700 flex items-center gap-1">
                <span>Guardians</span>
                {activeTeam === "GUARDIANS" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-base 2xl:text-xl font-black text-slate-800">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 text-amber-500 fill-amber-400" />
                <span>{teams.GUARDIANS.score}</span>
              </div>
            </div>

            {/* Score Pop animation */}
            {scorePop && scorePop.team === "GUARDIANS" && (
              <div
                key={scorePop.key}
                className="absolute -top-7 right-2 text-xs sm:text-base 2xl:text-lg font-black text-orange-700 animate-bounce bg-white border-2 border-orange-400 px-2 sm:px-2.5 py-0.5 rounded-full shadow-lg"
              >
                +{scorePop.amount} ⚡
              </div>
            )}
          </button>
        </div>

        {/* Right: Ecosystem Health & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Health Gauge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs 2xl:text-sm font-black text-slate-700">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 text-emerald-600" />
              <span className="hidden xs:inline">Health:</span>
              <span
                className={`font-black ${
                  ecosystemHealth < 50
                    ? "text-rose-600"
                    : ecosystemHealth < 80
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {ecosystemHealth}%
              </span>
            </div>
            <div className="w-16 xs:w-20 sm:w-32 2xl:w-48 h-2.5 sm:h-3 2xl:h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner mt-1">
              <div
                className={`h-full transition-all duration-700 rounded-full shadow-sm ${
                  ecosystemHealth < 50
                    ? "bg-gradient-to-r from-rose-500 to-amber-400"
                    : ecosystemHealth < 80
                    ? "bg-gradient-to-r from-amber-400 to-emerald-500"
                    : "bg-gradient-to-r from-emerald-500 to-teal-400"
                }`}
                style={{ width: `${ecosystemHealth}%` }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setScreen("MAP")}
              title="View Ecosystem Map"
              className="p-2 sm:p-2.5 2xl:p-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border-2 border-white shadow-[3px_4px_8px_rgba(15,23,42,0.06),inset_1px_1px_2px_rgba(255,255,255,0.9)] transition hover:scale-105 touch-manipulation"
            >
              <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
            </button>
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute Sound FX" : "Unmute Sound FX"}
              className={`p-2 sm:p-2.5 2xl:p-3 rounded-2xl border-2 border-white shadow-[3px_4px_8px_rgba(15,23,42,0.06),inset_1px_1px_2px_rgba(255,255,255,0.9)] transition hover:scale-105 touch-manipulation ${
                soundEnabled
                  ? "bg-white text-emerald-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
              )}
            </button>
            <button
              onClick={() => {
                if (confirm("Reset game back to start?")) resetGame();
              }}
              title="Reset Game Session"
              className="p-2 sm:p-2.5 2xl:p-3 rounded-2xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 border-2 border-white shadow-[3px_4px_8px_rgba(15,23,42,0.06),inset_1px_1px_2px_rgba(255,255,255,0.9)] transition hover:scale-105 touch-manipulation"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Full Screen Mode" : "Enter Full Screen Mode"}
              className={`clay-btn px-2.5 sm:px-3 2xl:px-5 py-1.5 sm:py-2 2xl:py-3 text-xs 2xl:text-base font-black flex items-center gap-1.5 active:scale-95 transition-all shadow-sm touch-manipulation ${
                isFullscreen
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 border-2 border-emerald-400"
                  : "clay-btn-white text-slate-700 hover:text-emerald-700"
              }`}
              aria-label={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
            >
              {isFullscreen ? (
                <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-emerald-600 sm:text-white animate-pulse" />
              ) : (
                <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
              )}
              <span className="hidden sm:inline font-extrabold uppercase tracking-wider text-[11px] 2xl:text-sm">
                {isFullscreen ? "Exit Full" : "Full Screen"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
