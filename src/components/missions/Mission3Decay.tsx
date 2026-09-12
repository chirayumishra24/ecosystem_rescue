"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { DECAY_TIMELINE, NUTRIENT_CYCLE_STEPS } from "@/lib/questionsData";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { Sliders, ArrowRight, Check, Sparkles, RefreshCw, Layers, Users, Zap } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const Mission3Decay: React.FC = () => {
  const { setScreen, addScore, addHealth, completeMission, showTurnAnnouncement } = useGame();

  // Slider day state: 0 (Day 1), 1 (Day 3), 2 (Day 7), 3 (Day 14), 4 (Day 30)
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [phase, setPhase] = useState<"TIMELINE" | "CYCLE">("TIMELINE");

  // Dual Team Timeline Question States
  const [explorerMicrobe, setExplorerMicrobe] = useState<string | null>(null);
  const [guardianMicrobe, setGuardianMicrobe] = useState<string | null>(null);
  const [firstDecomposerLocked, setFirstDecomposerLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);

  // Dual Team Nutrient Cycle States
  const [activeCycleTeam, setActiveCycleTeam] = useState<"EXPLORERS" | "GUARDIANS">("EXPLORERS");
  const [explorerCycle, setExplorerCycle] = useState<string[]>([]);
  const [guardianCycle, setGuardianCycle] = useState<string[]>([]);
  const [firstCycleLocked, setFirstCycleLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);

  // Modal feedback
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalExplanation, setModalExplanation] = useState<string>("");
  const [dualOutcomes, setDualOutcomes] = useState<{
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  } | null>(null);

  const currentStage = DECAY_TIMELINE[sliderIndex];

  const handleRevealDualMicrobes = () => {
    const expCorrect = explorerMicrobe === "Bacteria & Fungi";
    const grdCorrect = guardianMicrobe === "Bacteria & Fungi";

    const expScore = expCorrect ? (firstDecomposerLocked === "EXPLORERS" ? 125 : 100) : 0;
    const grdScore = grdCorrect ? (firstDecomposerLocked === "GUARDIANS" ? 125 : 100) : 0;

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
        answerChosen: explorerMicrobe || "None",
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: guardianMicrobe || "None",
        badge: "🐯",
      },
    });

    setModalExplanation(
      "Bacteria and fungi are the primary decomposers on Earth. Fungi break down tough cellulose and lignin with extracellular enzymes, while bacteria decompose simpler organic compounds, converting rotting matter into rich soil nutrients."
    );
    setModalOpen(true);
  };

  const handleAddCycleStep = (stepId: string) => {
    sound.playClick();
    const currentSlots = activeCycleTeam === "EXPLORERS" ? explorerCycle : guardianCycle;
    if (currentSlots.includes(stepId)) return;
    const next = [...currentSlots, stepId];

    if (activeCycleTeam === "EXPLORERS") {
      setExplorerCycle(next);
      if (next.length === 5 && !firstCycleLocked) setFirstCycleLocked("EXPLORERS");
    } else {
      setGuardianCycle(next);
      if (next.length === 5 && !firstCycleLocked) setFirstCycleLocked("GUARDIANS");
    }
  };

  const handleResetTeamCycle = (team: "EXPLORERS" | "GUARDIANS") => {
    sound.playClick();
    if (team === "EXPLORERS") {
      setExplorerCycle([]);
    } else {
      setGuardianCycle([]);
    }
  };

  const checkBothCycles = () => {
    const correctOrder = ["step_1", "step_2", "step_3", "step_4", "step_5"];
    const expCorrect = explorerCycle.length === 5 && explorerCycle.every((val, idx) => val === correctOrder[idx]);
    const grdCorrect = guardianCycle.length === 5 && guardianCycle.every((val, idx) => val === correctOrder[idx]);

    const expScore = expCorrect ? (firstCycleLocked === "EXPLORERS" ? 125 : 100) : 0;
    const grdScore = grdCorrect ? (firstCycleLocked === "GUARDIANS" ? 125 : 100) : 0;

    if (expCorrect) addScore(expScore, "EXPLORERS");
    if (grdCorrect) addScore(grdScore, "GUARDIANS");

    if (expCorrect || grdCorrect) {
      sound.playCorrect();
      addHealth(12);
    } else {
      sound.playIncorrect();
    }

    setDualOutcomes({
      explorers: {
        teamName: "Team Explorers",
        isCorrect: expCorrect,
        scoreGained: expScore,
        answerChosen: `${explorerCycle.length}/5 steps aligned`,
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: `${guardianCycle.length}/5 steps aligned`,
        badge: "🐯",
      },
    });

    setModalExplanation(
      "The nutrient recycling loop is complete: Dead Material → Microorganisms → Nutrients → Soil → Plants. The soil humus is enriched, roots absorb vital minerals, and new plant life flourishes!"
    );
    setModalOpen(true);
  };

  const handleModalNext = () => {
    setModalOpen(false);
    setDualOutcomes(null);
    if (phase === "TIMELINE") {
      setPhase("CYCLE");
    } else {
      completeMission(3);
      setScreen("MISSION_4_FOOD_WEB");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="clay-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1">
            <span className="clay-pill bg-emerald-100 text-emerald-800 text-[11px]">MISSION 3 • DECAY & NUTRIENT RECYCLING</span>
            <span className="clay-pill bg-amber-100 text-amber-800 text-[11px]">+200 ⚡ ECO ENERGY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
            {phase === "TIMELINE" ? "Decay Detectives Time-Lapse" : "Nutrient Recycling Drag-and-Connect"}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            {phase === "TIMELINE"
              ? "Drag the timeline slider to investigate biological decomposition over 30 days."
              : "Reconstruct the closed-loop ecological cycle that returns minerals to plants."}
          </p>
        </div>

        {phase === "CYCLE" && (
          <button
            onClick={() => setPhase("TIMELINE")}
            className="clay-btn clay-btn-white text-xs font-black text-teal-700 px-3 py-1.5"
          >
            ← Review 30-Day Slider
          </button>
        )}
      </div>

      {/* Captain Eco Directive */}
      {phase === "TIMELINE" ? (
        <EcoHeroGuide
          emotion="detective"
          missionName="Mission 3 • Phase 1 Directive"
          title="Decomposition Forensic Lab & Moisture Factors"
          objective="Explore the 30-day decomposition time-lapse of organic matter. Uncover how bacteria, fungi, moisture, and warmth convert fallen plant material into mineral-rich humus."
          steps={[
            "Slide the 30-day slider from Day 1 to Day 30 to watch mold and bacteria colonies multiply.",
            "Analyze the biological breakdown and microbial activity at each stage.",
            "Both teams choose the correct primary decomposer principle secretly on your consoles.",
            "Lock in your answer secretly! The quickest correct team scores a +25⚡ Speed Bonus!"
          ]}
          proTip="Without decomposers, dead leaves and branches would pile up endlessly and starve living trees of essential nitrogen and minerals!"
        />
      ) : (
        <EcoHeroGuide
          emotion="recycling"
          missionName="Mission 3 • Phase 2 Directive"
          title="The 5-Step Continuous Nutrient Rebirth Cycle"
          objective="Nutrients are never lost—they are endlessly recycled! Sequence the 5 fundamental steps of the cycle that connects life, death, and regrowth."
          steps={[
            "Switch between Team Explorers and Team Guardians to build each team's 5-stage loop.",
            "Click steps from the bank in chronological order from living plants to soil absorption.",
            "Both teams test their cycles independently to verify the nutrient pathway.",
            "Completing the loop restores critical soil nutrients and energizes the biosphere!"
          ]}
          proTip="Plants absorb minerals through root hair cells, animals consume plants, organisms die, decomposers digest, and minerals return to the soil!"
        />
      )}

      {phase === "TIMELINE" ? (
        /* PHASE 1: Decay Timeline Slider & Biological Breakdown */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 5-Stage Time-Lapse Slider (7 Cols) */}
          <div className="lg:col-span-7 clay-card p-6 sm:p-8 flex flex-col items-center">
            <div className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
              Forest Floor Decomposition Stage: Day {currentStage.day}
            </div>

            {/* Apple Decomposition Visual Progression */}
            <div className="w-full aspect-[16/9] max-h-64 rounded-3xl clay-inset bg-gradient-to-b from-amber-100/60 via-amber-50/50 to-orange-50/40 flex flex-col items-center justify-center p-4 relative overflow-hidden my-4">
              {/* Visual Fruit Stage */}
              <div className="text-7xl sm:text-8xl transition-all duration-500 transform scale-110">
                {sliderIndex === 0 && "🍎"}
                {sliderIndex === 1 && "🍎💧"}
                {sliderIndex === 2 && "🍏🍄"}
                {sliderIndex === 3 && "🟤💧"}
                {sliderIndex === 4 && "🌱🪨"}
              </div>

              <div className="mt-3 text-center">
                <h4 className="text-base sm:text-lg font-black text-slate-800">
                  {currentStage.title}
                </h4>
                <p className="text-xs text-amber-900 font-bold mt-0.5">
                  Status: {currentStage.decayState} • {currentStage.microbeActivity}
                </p>
              </div>

              {/* Day Badge */}
              <div className="absolute top-3.5 left-3.5 clay-pill bg-white/90 text-slate-800 text-xs font-black shadow">
                DAY {currentStage.day}
              </div>
            </div>

            {/* Interactive Timeline Slider */}
            <div className="w-full mt-4">
              <div className="flex justify-between text-xs font-black text-slate-600 mb-2 px-1">
                {DECAY_TIMELINE.map((item, idx) => (
                  <button
                    key={item.day}
                    onClick={() => setSliderIndex(idx)}
                    className={`transition-all ${
                      idx === sliderIndex
                        ? "text-emerald-700 font-black scale-110 underline underline-offset-4"
                        : "hover:text-slate-900 font-bold"
                    }`}
                  >
                    Day {item.day}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="0"
                max="4"
                step="1"
                value={sliderIndex}
                onChange={(e) => setSliderIndex(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-3 rounded-lg bg-emerald-100"
              />

              <p className="text-xs font-bold text-slate-600 text-center mt-3">
                {currentStage.description}
              </p>
            </div>
          </div>

          {/* Right: Simultaneous Decomposer Question (5 Cols) */}
          <div className="lg:col-span-5 clay-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Dual Team Lock-In</span>
                </span>
                <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  ⚡ +25 Speed Bonus
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-800 mb-1">
                Which microbes drive this organic decay?
              </h3>
              <p className="text-xs font-bold text-slate-600 mb-4">
                Both teams analyze the hyphal breakdown and lock in their answer:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Explorers Console */}
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-sky-900">🐺 Explorers</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      explorerMicrobe ? "bg-sky-500 text-white" : "bg-sky-200 text-sky-800"
                    }`}>
                      {explorerMicrobe ? (firstDecomposerLocked === "EXPLORERS" ? "⚡ 1st!" : "🔒") : "..."}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {["Bacteria & Fungi", "Viruses", "Algae", "Protozoa Only"].map((choice) => (
                      <button
                        key={`exp-${choice}`}
                        onClick={() => {
                          sound.playClick();
                          setExplorerMicrobe(choice);
                          if (!firstDecomposerLocked) setFirstDecomposerLocked("EXPLORERS");
                        }}
                        className={`w-full p-2 rounded-xl text-left font-bold text-[11px] transition-all flex items-center justify-between ${
                          explorerMicrobe === choice
                            ? "clay-btn-sky text-white ring-2 ring-sky-400"
                            : "bg-white/80 hover:bg-white text-slate-700 border border-sky-100 shadow-sm"
                        }`}
                      >
                        <span>{choice}</span>
                        <span>{choice === "Bacteria & Fungi" ? "🦠🍄" : choice === "Viruses" ? "💉" : choice === "Algae" ? "🌱" : "🔬"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guardians Console */}
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-900">🐯 Guardians</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      guardianMicrobe ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-800"
                    }`}>
                      {guardianMicrobe ? (firstDecomposerLocked === "GUARDIANS" ? "⚡ 1st!" : "🔒") : "..."}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {["Bacteria & Fungi", "Viruses", "Algae", "Protozoa Only"].map((choice) => (
                      <button
                        key={`grd-${choice}`}
                        onClick={() => {
                          sound.playClick();
                          setGuardianMicrobe(choice);
                          if (!firstDecomposerLocked) setFirstDecomposerLocked("GUARDIANS");
                        }}
                        className={`w-full p-2 rounded-xl text-left font-bold text-[11px] transition-all flex items-center justify-between ${
                          guardianMicrobe === choice
                            ? "clay-btn-amber text-white ring-2 ring-amber-400"
                            : "bg-white/80 hover:bg-white text-slate-700 border border-amber-100 shadow-sm"
                        }`}
                      >
                        <span>{choice}</span>
                        <span>{choice === "Bacteria & Fungi" ? "🦠🍄" : choice === "Viruses" ? "💉" : choice === "Algae" ? "🌱" : "🔬"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reveal Button */}
              <button
                onClick={handleRevealDualMicrobes}
                disabled={!explorerMicrobe && !guardianMicrobe}
                className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all mb-3 ${
                  explorerMicrobe || guardianMicrobe
                    ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Reveal Decomposer Identity & Score</span>
              </button>
            </div>

            <div className="clay-inset p-3 rounded-2xl bg-amber-50/70 text-xs font-bold text-amber-900">
              💡 As fruit decays, microbial enzymes break complex polymers down into nitrogen, phosphorus, and potassium.
            </div>
          </div>
        </div>
      ) : (
        /* PHASE 2: Simultaneous Nutrient Recycling Sequence Builder */
        <div className="clay-card p-6 sm:p-8 max-w-4xl mx-auto">
          {/* Header & Active Team Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-teal-700">
                Nutrient Recycling Chain
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                Connect The 5 Stages of the Nutrient Cycle
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCycleTeam("EXPLORERS");
                  showTurnAnnouncement("EXPLORERS");
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase cursor-pointer ${
                  activeCycleTeam === "EXPLORERS"
                    ? "clay-btn-sky text-white ring-2 ring-sky-400"
                    : "clay-card text-slate-700 hover:bg-slate-100"
                }`}
              >
                🐺 Explorers (Team A) ({explorerCycle.length}/5)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveCycleTeam("GUARDIANS");
                  showTurnAnnouncement("GUARDIANS");
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase cursor-pointer ${
                  activeCycleTeam === "GUARDIANS"
                    ? "clay-btn-amber text-white ring-2 ring-amber-400"
                    : "clay-card text-slate-700 hover:bg-slate-100"
                }`}
              >
                🐯 Guardians (Team B) ({guardianCycle.length}/5)
              </button>
            </div>
          </div>

          {/* Dual Team Cycle Slots Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Explorers Sequence */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              activeCycleTeam === "EXPLORERS" ? "border-sky-400 bg-sky-50/60 ring-2 ring-sky-200" : "border-sky-100 bg-sky-50/20"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-sky-900">🐺 Team Explorers Cycle</span>
                <button
                  onClick={() => handleResetTeamCycle("EXPLORERS")}
                  className="clay-pill bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const stepId = explorerCycle[idx];
                  const stepObj = NUTRIENT_CYCLE_STEPS.find((s) => s.id === stepId);
                  return (
                    <div
                      key={`exp-step-${idx}`}
                      className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-center text-center ${
                        stepObj ? "clay-card bg-emerald-50 border border-emerald-300" : "clay-inset bg-white/60 border border-dashed border-sky-200"
                      }`}
                    >
                      {stepObj ? (
                        <>
                          <span className="text-lg">{stepObj.icon}</span>
                          <span className="text-[8px] font-black text-slate-800 truncate w-full">{stepObj.label}</span>
                        </>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400">{idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guardians Sequence */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              activeCycleTeam === "GUARDIANS" ? "border-amber-400 bg-amber-50/60 ring-2 ring-amber-200" : "border-amber-100 bg-amber-50/20"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-amber-900">🐯 Team Guardians Cycle</span>
                <button
                  onClick={() => handleResetTeamCycle("GUARDIANS")}
                  className="clay-pill bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const stepId = guardianCycle[idx];
                  const stepObj = NUTRIENT_CYCLE_STEPS.find((s) => s.id === stepId);
                  return (
                    <div
                      key={`grd-step-${idx}`}
                      className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-center text-center ${
                        stepObj ? "clay-card bg-emerald-50 border border-emerald-300" : "clay-inset bg-white/60 border border-dashed border-amber-200"
                      }`}
                    >
                      {stepObj ? (
                        <>
                          <span className="text-lg">{stepObj.icon}</span>
                          <span className="text-[8px] font-black text-slate-800 truncate w-full">{stepObj.label}</span>
                        </>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400">{idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clickable Pool of Steps */}
          <div className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
              Click in chronological order to add to {activeCycleTeam === "EXPLORERS" ? "🐺 Explorers" : "🐯 Guardians"}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {NUTRIENT_CYCLE_STEPS.map((step) => {
                const currentSlots = activeCycleTeam === "EXPLORERS" ? explorerCycle : guardianCycle;
                const isUsed = currentSlots.includes(step.id);
                return (
                  <button
                    key={step.id}
                    disabled={isUsed}
                    onClick={() => handleAddCycleStep(step.id)}
                    className={`p-3 rounded-2xl text-left transition-all flex items-center gap-3 ${
                      isUsed
                        ? "clay-inset opacity-40 cursor-not-allowed bg-slate-100"
                        : "clay-card hover:bg-slate-50 active:scale-95 shadow"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <span className="text-xs font-black text-slate-800 block">{step.label}</span>
                      <span className="text-[11px] font-semibold text-slate-600">{step.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Button */}
          <button
            onClick={checkBothCycles}
            disabled={explorerCycle.length < 5 && guardianCycle.length < 5}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              explorerCycle.length === 5 || guardianCycle.length === 5
                ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Check className="w-5 h-5" />
            <span>Verify Both Teams&apos; Nutrient Cycles</span>
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={(dualOutcomes?.explorers.isCorrect || dualOutcomes?.guardians.isCorrect) ?? false}
        pointsAwarded={100}
        explanation={modalExplanation}
        teamOutcomes={dualOutcomes || undefined}
        onNext={handleModalNext}
        nextButtonText={
          phase === "TIMELINE"
            ? "Connect Nutrient Recycling Cycle →"
            : "Proceed to Food Web Rescue →"
        }
      />
    </div>
  );
};
