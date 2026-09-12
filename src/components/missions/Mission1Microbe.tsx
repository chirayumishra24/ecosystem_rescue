"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { MICROBE_SAMPLES } from "@/lib/questionsData";
import { MicroscopeCanvas } from "../3d/MicroscopeCanvas";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { Sliders, Sun, Search, Sparkles, Check, HelpCircle, ArrowRight, Zap, Users } from "lucide-react";

export const Mission1Microbe: React.FC = () => {
  const { setScreen, addScore, addHealth, completeMission } = useGame();
  const [sampleIndex, setSampleIndex] = useState<number>(0);
  const [focus, setFocus] = useState<number>(50); // Sharp focus at 50
  const [light, setLight] = useState<number>(65);

  // Simultaneous 2-team selection states
  const [explorerAnswer, setExplorerAnswer] = useState<string | null>(null);
  const [guardianAnswer, setGuardianAnswer] = useState<string | null>(null);
  const [firstLocked, setFirstLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);
  const [dualOutcomes, setDualOutcomes] = useState<{
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  } | null>(null);

  const [revealedCluesCount, setRevealedCluesCount] = useState<number>(2);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const currentSample = MICROBE_SAMPLES[sampleIndex];

  const handleScan = () => {
    setIsScanning(true);
    sound.playMicroscopeScan();
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  const handleExplorerPick = (choice: string) => {
    sound.playClick();
    setExplorerAnswer(choice);
    if (!firstLocked) setFirstLocked("EXPLORERS");
  };

  const handleGuardianPick = (choice: string) => {
    sound.playClick();
    setGuardianAnswer(choice);
    if (!firstLocked) setFirstLocked("GUARDIANS");
  };

  const handleRevealDualAnswers = () => {
    const expCorrect = explorerAnswer === currentSample.microorganism;
    const grdCorrect = guardianAnswer === currentSample.microorganism;

    const expScore = expCorrect ? (firstLocked === "EXPLORERS" ? 125 : 100) : 0;
    const grdScore = grdCorrect ? (firstLocked === "GUARDIANS" ? 125 : 100) : 0;

    if (expCorrect) addScore(expScore, "EXPLORERS");
    if (grdCorrect) addScore(grdScore, "GUARDIANS");

    if (expCorrect || grdCorrect) {
      sound.playCorrect();
      addHealth(8);
    } else {
      sound.playIncorrect();
    }

    setDualOutcomes({
      explorers: {
        teamName: "Team Explorers",
        isCorrect: expCorrect,
        scoreGained: expScore,
        answerChosen: explorerAnswer || "None",
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: guardianAnswer || "None",
        badge: "🐯",
      },
    });
    setModalOpen(true);
  };

  const handleNext = () => {
    setModalOpen(false);
    setExplorerAnswer(null);
    setGuardianAnswer(null);
    setFirstLocked(null);
    setDualOutcomes(null);
    setRevealedCluesCount(2);

    if (sampleIndex < MICROBE_SAMPLES.length - 1) {
      setSampleIndex((prev) => prev + 1);
    } else {
      completeMission(1);
      setScreen("MISSION_2_FOOD_CHAIN");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Mission Banner */}
      <div className="clay-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">
            <span className="clay-pill bg-emerald-100 text-emerald-800 text-[11px]">MISSION 1 • MICROORGANISMS</span>
            <span className="clay-pill bg-amber-100 text-amber-800 text-[11px]">+100 ⚡ ECO ENERGY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
            Microbe Investigation Laboratory
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Sample {sampleIndex + 1} of {MICROBE_SAMPLES.length}: <span className="text-teal-700">{currentSample.name}</span> ({currentSample.location})
          </p>
        </div>

        {/* Sample Navigator Tabs */}
        <div className="flex items-center gap-2">
          {MICROBE_SAMPLES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setSampleIndex(idx);
                setExplorerAnswer(null);
                setGuardianAnswer(null);
                setFirstLocked(null);
                setDualOutcomes(null);
              }}
              className={`w-10 h-10 rounded-2xl font-black text-sm transition-transform active:scale-95 ${
                idx === sampleIndex
                  ? "clay-btn-emerald text-white shadow-md"
                  : "clay-card text-slate-600 hover:text-slate-900"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace: Microscope View + Investigation Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Microscope Stage (7 Cols) */}
        <div className="lg:col-span-7 clay-card p-5 sm:p-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-600" />
              <span>Specimen: {currentSample.name}</span>
            </span>
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="clay-btn clay-btn-blue text-xs font-black uppercase tracking-wider px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "Scanning..." : "Scan Sample"}</span>
            </button>
          </div>

          {/* 3D Canvas in Clay Inset Container */}
          <div className="my-2 clay-inset p-2 rounded-3xl bg-slate-900/90 shadow-inner">
            <MicroscopeCanvas
              shape={currentSample.shape}
              color={currentSample.visualColor}
              focus={focus}
              light={light}
            />
          </div>

          {/* Microscope Controls: Focus & Light Dials */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 clay-inset p-4 rounded-2xl bg-amber-50/50">
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Objective Fine Focus</span>
                </span>
                <span className={Math.abs(focus - 50) < 10 ? "text-emerald-700 font-black" : "text-amber-600 font-bold"}>
                  {Math.abs(focus - 50) < 10 ? "Sharp Optics ✓" : "Slight Blur"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={focus}
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Condenser Substage Light</span>
                </span>
                <span className="text-amber-700 font-black">{light}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={light}
                onChange={(e) => setLight(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Detective Clues & Questions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Detective Clues Box */}
          <div className="clay-card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-teal-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Microbe Clue File</span>
              </h3>
              {revealedCluesCount < currentSample.clues.length && (
                <button
                  onClick={() => setRevealedCluesCount((prev) => Math.min(currentSample.clues.length, prev + 1))}
                  className="text-xs font-black text-teal-700 hover:text-teal-800 underline"
                >
                  + Reveal Next Clue
                </button>
              )}
            </div>

            <div className="space-y-2.5 mb-2">
              {currentSample.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                <div
                  key={idx}
                  className="clay-inset p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white/70"
                >
                  <span className="text-amber-500 font-black">💡</span>
                  <span>{clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question: Identify Microbe Type (Simultaneous 2-Team Deck) */}
          <div className="clay-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                <span>Simultaneous Team Lock-In</span>
              </h3>
              <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                ⚡ +25 Speed Bonus for 1st Pick
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600 mb-4">
              What type of microorganism is this specimen? Both teams choose and lock in!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Team Explorers Console */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 shadow-inner">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🐺</span>
                    <span className="text-xs font-black uppercase text-sky-900">Team Explorers</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    explorerAnswer ? "bg-sky-500 text-white animate-pulse" : "bg-sky-200 text-sky-800"
                  }`}>
                    {explorerAnswer ? (firstLocked === "EXPLORERS" ? "⚡ LOCKED 1st!" : "🔒 LOCKED") : "AWAITING..."}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["Bacteria", "Fungi", "Protozoa", "Algae"] as const).map((choice) => (
                    <button
                      key={`exp-${choice}`}
                      onClick={() => handleExplorerPick(choice)}
                      className={`p-2.5 rounded-xl font-black text-xs text-left transition-all flex items-center justify-between active:scale-95 ${
                        explorerAnswer === choice
                          ? "clay-btn-sky text-white ring-2 ring-sky-400"
                          : "bg-white/80 hover:bg-white text-slate-700 border border-sky-100 shadow-sm"
                      }`}
                    >
                      <span>{choice}</span>
                      <span className="text-sm">
                        {choice === "Bacteria" && "🦠"}
                        {choice === "Fungi" && "🍄"}
                        {choice === "Protozoa" && "🔬"}
                        {choice === "Algae" && "🌱"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Guardians Console */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-inner">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🐯</span>
                    <span className="text-xs font-black uppercase text-amber-900">Team Guardians</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    guardianAnswer ? "bg-amber-500 text-white animate-pulse" : "bg-amber-200 text-amber-800"
                  }`}>
                    {guardianAnswer ? (firstLocked === "GUARDIANS" ? "⚡ LOCKED 1st!" : "🔒 LOCKED") : "AWAITING..."}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["Bacteria", "Fungi", "Protozoa", "Algae"] as const).map((choice) => (
                    <button
                      key={`grd-${choice}`}
                      onClick={() => handleGuardianPick(choice)}
                      className={`p-2.5 rounded-xl font-black text-xs text-left transition-all flex items-center justify-between active:scale-95 ${
                        guardianAnswer === choice
                          ? "clay-btn-amber text-white ring-2 ring-amber-400"
                          : "bg-white/80 hover:bg-white text-slate-700 border border-amber-100 shadow-sm"
                      }`}
                    >
                      <span>{choice}</span>
                      <span className="text-sm">
                        {choice === "Bacteria" && "🦠"}
                        {choice === "Fungi" && "🍄"}
                        {choice === "Protozoa" && "🔬"}
                        {choice === "Algae" && "🌱"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reveal Button */}
            <button
              onClick={handleRevealDualAnswers}
              disabled={!explorerAnswer && !guardianAnswer}
              className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                explorerAnswer || guardianAnswer
                  ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Reveal Answers & Award Points</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={(dualOutcomes?.explorers.isCorrect || dualOutcomes?.guardians.isCorrect) ?? false}
        pointsAwarded={100}
        explanation={currentSample.explanation}
        teamOutcomes={dualOutcomes || undefined}
        onNext={handleNext}
        nextButtonText={sampleIndex < MICROBE_SAMPLES.length - 1 ? "Next Specimen →" : "Proceed to Food Chain Builder →"}
      />
    </div>
  );
};
