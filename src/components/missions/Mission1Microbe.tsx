"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { MICROBE_SAMPLES } from "@/lib/questionsData";
import { MicroscopeCanvas } from "../3d/MicroscopeCanvas";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { Sliders, Sun, Search, Sparkles, Check, HelpCircle, ArrowRight, Zap, Users } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

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

      {/* Captain Eco Directive Banner */}
      <EcoHeroGuide
        emotion="investigate"
        missionName="Mission 1 Directive"
        title="Microscopic Specimen Identification & Forensic Investigation"
        objective="Inspect the living microscopic specimen under 1000× magnification. Adjust Fine Focus and Light Intensity dials to reveal cell walls, flagella, or spores, then classify the microbe."
        steps={[
          "Adjust Focus and Light sliders until the cellular organism resolves sharply.",
          "Examine cell morphology: rod-shaped bacilli, branched fungal hyphae, amoeboid blobs, or photosynthetic algae.",
          "Both teams deliberate privately and select your classification on your team console.",
          "Hit [CONFIRM & LOCK IN 🔒] secretly. Fastest correct lock-in claims the +25⚡ Speed Bonus!"
        ]}
        proTip="Bacteria are single-celled with no nucleus; fungi form branching thread-like hyphae; algae have green photosynthetic pigments; protozoa move actively like tiny animals!"
      />

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

        {/* Right: Detective Clues & Specimen Dossier (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Detective Clues Box */}
          <div className="clay-card p-5 sm:p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black uppercase tracking-wider text-teal-800 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Microbe Clue Dossier</span>
                </h3>
                {revealedCluesCount < currentSample.clues.length && (
                  <button
                    onClick={() => setRevealedCluesCount((prev) => Math.min(currentSample.clues.length, prev + 1))}
                    className="clay-pill bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-black px-2.5 py-1 transition active:scale-95"
                  >
                    + Reveal Next Clue ({revealedCluesCount}/{currentSample.clues.length})
                  </button>
                )}
              </div>

              <div className="space-y-2.5 mb-4">
                {currentSample.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                  <div
                    key={idx}
                    className="clay-inset p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white/70 shadow-inner"
                  >
                    <span className="text-amber-500 font-black text-base flex-shrink-0">💡</span>
                    <span className="leading-relaxed">{clue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Specimen Metadata Card */}
            <div className="clay-inset p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs text-slate-700">
              <div className="flex items-center justify-between font-black text-[11px] uppercase tracking-wider text-teal-900 mb-1">
                <span>Sample Origin</span>
                <span>{currentSample.location}</span>
              </div>
              <p className="text-slate-600 font-medium leading-tight">
                Synthesize microscope cell motility and shape with these diagnostic clues to choose the microbe kingdom below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Simultaneous 2-Team Showdown Arena */}
      <div className="w-full clay-card p-6 sm:p-8 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
                Simultaneous Team Showdown
              </h3>
              <span className="clay-pill bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Live Dual Lock-In
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              What type of microorganism is this specimen? Both teams choose and lock in secretly!
            </p>
          </div>

          <div className="clay-pill bg-amber-100 border border-amber-200 text-amber-900 px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5 shadow-sm flex-shrink-0">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
            <span>+25 ⚡ Speed Bonus for 1st Pick</span>
          </div>
        </div>

        {/* Left (Team Explorers) vs Right (Team Guardians) Screen Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
          {/* LEFT SIDE: Team Explorers Console */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-sky-50/90 via-white to-blue-50/80 border-2 border-sky-300 shadow-[0_8px_20px_rgba(37,99,235,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-sky-200 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl clay-btn-blue text-white flex items-center justify-center text-xl flex-shrink-0 shadow">
                    🐺
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-black uppercase text-sky-900 block truncate">
                      Team Explorers
                    </span>
                    <span className="text-[10px] text-sky-600 font-bold block truncate">
                      Discover • Investigate • Restore
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-black px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 shadow-sm transition-all ${
                    explorerAnswer
                      ? firstLocked === "EXPLORERS"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-pulse"
                        : "bg-sky-500 text-white"
                      : "bg-sky-100 text-sky-800 border border-sky-200"
                  }`}
                >
                  {explorerAnswer
                    ? firstLocked === "EXPLORERS"
                      ? "⚡ LOCKED 1st! (+25⚡)"
                      : "🔒 LOCKED SECRETLY"
                    : "AWAITING CHOICE..."}
                </span>
              </div>

              <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5">
                Select Classification:
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["Bacteria", "Fungi", "Protozoa", "Algae"] as const).map((choice) => (
                  <button
                    key={`exp-${choice}`}
                    onClick={() => handleExplorerPick(choice)}
                    className={`p-3.5 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-between active:scale-95 ${
                      explorerAnswer === choice
                        ? "clay-btn-sky text-white ring-2 ring-sky-400 shadow-lg shadow-sky-500/20"
                        : "clay-card bg-white hover:bg-sky-50/50 text-slate-700 border-2 border-white hover:border-sky-200"
                    }`}
                  >
                    <span>{choice}</span>
                    <span className="text-lg">
                      {choice === "Bacteria" && "🦠"}
                      {choice === "Fungi" && "🍄"}
                      {choice === "Protozoa" && "🔬"}
                      {choice === "Algae" && "🌱"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-[11px] text-sky-800 font-bold">
              <span>Status: {explorerAnswer ? "Decision recorded ✓" : "Deliberating..."}</span>
              <span className="text-sky-600">Left Side Squad</span>
            </div>
          </div>

          {/* RIGHT SIDE: Team Guardians Console */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/90 via-white to-orange-50/80 border-2 border-orange-300 shadow-[0_8px_20px_rgba(234,88,12,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-200 gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl clay-btn-amber text-white flex items-center justify-center text-xl flex-shrink-0 shadow">
                    🐯
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-black uppercase text-amber-900 block truncate">
                      Team Guardians
                    </span>
                    <span className="text-[10px] text-orange-600 font-bold block truncate">
                      Protect • Solve • Rebuild
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-black px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 shadow-sm transition-all ${
                    guardianAnswer
                      ? firstLocked === "GUARDIANS"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-pulse"
                        : "bg-orange-500 text-white"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {guardianAnswer
                    ? firstLocked === "GUARDIANS"
                      ? "⚡ LOCKED 1st! (+25⚡)"
                      : "🔒 LOCKED SECRETLY"
                    : "AWAITING CHOICE..."}
                </span>
              </div>

              <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5">
                Select Classification:
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["Bacteria", "Fungi", "Protozoa", "Algae"] as const).map((choice) => (
                  <button
                    key={`grd-${choice}`}
                    onClick={() => handleGuardianPick(choice)}
                    className={`p-3.5 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-between active:scale-95 ${
                      guardianAnswer === choice
                        ? "clay-btn-amber text-white ring-2 ring-orange-400 shadow-lg shadow-orange-500/20"
                        : "clay-card bg-white hover:bg-amber-50/50 text-slate-700 border-2 border-white hover:border-amber-200"
                    }`}
                  >
                    <span>{choice}</span>
                    <span className="text-lg">
                      {choice === "Bacteria" && "🦠"}
                      {choice === "Fungi" && "🍄"}
                      {choice === "Protozoa" && "🔬"}
                      {choice === "Algae" && "🌱"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800 font-bold">
              <span>Status: {guardianAnswer ? "Decision recorded ✓" : "Deliberating..."}</span>
              <span className="text-orange-600">Right Side Squad</span>
            </div>
          </div>
        </div>

        {/* Prominent Wide Reveal Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleRevealDualAnswers}
            disabled={!explorerAnswer && !guardianAnswer}
            className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all ${
              explorerAnswer || guardianAnswer
                ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-lg shadow-emerald-500/25"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-inner"
            }`}
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>Reveal Answers & Award Points</span>
          </button>

          <p className="text-xs text-slate-500 font-bold mt-2 text-center">
            {explorerAnswer && guardianAnswer
              ? "Both teams have locked in their secret decisions! Click above to reveal."
              : explorerAnswer || guardianAnswer
              ? "1 of 2 teams locked in. You may reveal now or wait for the other team."
              : "Both teams: make your choices on the left and right consoles above."}
          </p>
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
