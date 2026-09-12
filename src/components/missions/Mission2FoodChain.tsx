"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FOOD_CHAIN_ORGANISMS, WHAT_IF_SCENARIOS } from "@/lib/questionsData";
import { Organism } from "@/lib/types";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { ArrowRight, Check, RefreshCw, Zap, AlertCircle, HelpCircle, Users } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const Mission2FoodChain: React.FC = () => {
  const { setScreen, addScore, addHealth, completeMission, showTurnAnnouncement } = useGame();

  // Phase toggle
  const [phase, setPhase] = useState<"BUILDER" | "WHAT_IF">("BUILDER");

  // Dual Team Food Chain Builder states
  const [activeBuilderTeam, setActiveBuilderTeam] = useState<"EXPLORERS" | "GUARDIANS">("EXPLORERS");
  const [explorerSlots, setExplorerSlots] = useState<(Organism | null)[]>([null, null, null, null]);
  const [guardianSlots, setGuardianSlots] = useState<(Organism | null)[]>([null, null, null, null]);
  const [firstChainFilled, setFirstChainFilled] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);
  const [animatingEnergy, setAnimatingEnergy] = useState<boolean>(false);

  // Dual Team What-If scenario states
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [explorerScenarioPick, setExplorerScenarioPick] = useState<string | null>(null);
  const [guardianScenarioPick, setGuardianScenarioPick] = useState<string | null>(null);
  const [firstScenarioLocked, setFirstScenarioLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);

  // Modal feedback
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalExplanation, setModalExplanation] = useState<string>("");
  const [dualOutcomes, setDualOutcomes] = useState<{
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  } | null>(null);

  // Validate chain helper
  const isChainValid = (slots: (Organism | null)[]) => {
    const [s0, s1, s2, s3] = slots;
    if (!s0 || !s1 || !s2 || !s3) return false;
    return (
      s0.id === "grass" &&
      (s1.id === "caterpillar" || s1.id === "rabbit") &&
      (s2.id === "bird" || s2.id === "snake") &&
      s3.id === "eagle"
    );
  };

  // Handle organism slot assignment
  const handleSelectOrganism = (org: Organism) => {
    sound.playClick();
    const currentSlots = activeBuilderTeam === "EXPLORERS" ? explorerSlots : guardianSlots;
    const firstEmptyIndex = currentSlots.findIndex((slot) => slot === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...currentSlots];
      nextSlots[firstEmptyIndex] = org;
      if (activeBuilderTeam === "EXPLORERS") {
        setExplorerSlots(nextSlots);
        if (!nextSlots.includes(null) && !firstChainFilled) {
          setFirstChainFilled("EXPLORERS");
        }
      } else {
        setGuardianSlots(nextSlots);
        if (!nextSlots.includes(null) && !firstChainFilled) {
          setFirstChainFilled("GUARDIANS");
        }
      }
    }
  };

  const handleClearSlot = (team: "EXPLORERS" | "GUARDIANS", index: number) => {
    sound.playClick();
    if (team === "EXPLORERS") {
      const next = [...explorerSlots];
      next[index] = null;
      setExplorerSlots(next);
    } else {
      const next = [...guardianSlots];
      next[index] = null;
      setGuardianSlots(next);
    }
  };

  const handleResetTeamSlots = (team: "EXPLORERS" | "GUARDIANS") => {
    sound.playClick();
    if (team === "EXPLORERS") {
      setExplorerSlots([null, null, null, null]);
    } else {
      setGuardianSlots([null, null, null, null]);
    }
  };

  const checkBothFoodChains = () => {
    const expValid = isChainValid(explorerSlots);
    const grdValid = isChainValid(guardianSlots);

    const expScore = expValid ? (firstChainFilled === "EXPLORERS" ? 175 : 150) : 0;
    const grdScore = grdValid ? (firstChainFilled === "GUARDIANS" ? 175 : 150) : 0;

    if (expValid) addScore(expScore, "EXPLORERS");
    if (grdValid) addScore(grdScore, "GUARDIANS");

    if (expValid || grdValid) {
      sound.playCorrect();
      setAnimatingEnergy(true);
      addHealth(10);
    } else {
      sound.playIncorrect();
    }

    setDualOutcomes({
      explorers: {
        teamName: "Team Explorers",
        isCorrect: expValid,
        scoreGained: expScore,
        answerChosen: explorerSlots.map((s) => s?.name || "Empty").join(" → "),
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdValid,
        scoreGained: grdScore,
        answerChosen: guardianSlots.map((s) => s?.name || "Empty").join(" → "),
        badge: "🐯",
      },
    });

    setModalExplanation(
      "Solar energy is captured by Grass (Producer), transferred to the Herbivore via eating, passed to the Carnivore, and reaches the Apex Eagle. Only ~10% of energy transfers between each trophic tier!"
    );
    setModalOpen(true);
  };

  const handleRevealDualWhatIf = () => {
    const currentScenario = WHAT_IF_SCENARIOS[scenarioIndex];
    const expOption = currentScenario.options.find((o) => o.id === explorerScenarioPick);
    const grdOption = currentScenario.options.find((o) => o.id === guardianScenarioPick);

    const expCorrect = expOption?.isCorrect ?? false;
    const grdCorrect = grdOption?.isCorrect ?? false;

    const expScore = expCorrect ? (firstScenarioLocked === "EXPLORERS" ? 125 : 100) : 0;
    const grdScore = grdCorrect ? (firstScenarioLocked === "GUARDIANS" ? 125 : 100) : 0;

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
        answerChosen: expOption?.text || "None",
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: grdOption?.text || "None",
        badge: "🐯",
      },
    });

    const explanation =
      currentScenario.options.find((o) => o.isCorrect)?.explanation ||
      "Trophic cascades occur when removing a keystone or consumer causes unchecked shifts in populations across all lower tiers.";
    setModalExplanation(explanation);
    setModalOpen(true);
  };

  const handleModalNext = () => {
    setModalOpen(false);
    setDualOutcomes(null);
    if (phase === "BUILDER") {
      setPhase("WHAT_IF");
    } else {
      if (scenarioIndex < WHAT_IF_SCENARIOS.length - 1) {
        setScenarioIndex((prev) => prev + 1);
        setExplorerScenarioPick(null);
        setGuardianScenarioPick(null);
        setFirstScenarioLocked(null);
      } else {
        completeMission(2);
        setScreen("MISSION_3_DECAY");
      }
    }
  };

  const currentScenario = WHAT_IF_SCENARIOS[scenarioIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="clay-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1">
            <span className="clay-pill bg-emerald-100 text-emerald-800 text-[11px]">MISSION 2 • FOOD CHAINS & TROPHIC ENERGY</span>
            <span className="clay-pill bg-amber-100 text-amber-800 text-[11px]">+150 ⚡ ECO ENERGY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
            {phase === "BUILDER" ? "Interactive Food Chain Builder" : "What-If Ecological Cascade Challenges"}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            {phase === "BUILDER"
              ? "Drag and arrange organisms into the correct trophic sequence to restore solar energy flow."
              : `Interconnected Crisis Scenario ${scenarioIndex + 1} of ${WHAT_IF_SCENARIOS.length}`}
          </p>
        </div>

        {phase === "WHAT_IF" && (
          <button
            onClick={() => setPhase("BUILDER")}
            className="clay-btn clay-btn-white text-xs font-black text-teal-700 px-3 py-1.5"
          >
            ← Review Food Chain
          </button>
        )}
      </div>

      {/* Captain Eco Directive */}
      {phase === "BUILDER" ? (
        <EcoHeroGuide
          emotion="connect"
          missionName="Mission 2 • Phase 1 Directive"
          title="Trophic Energy Flow & Food Chain Construction"
          objective="Sunlight powers life! Arrange organisms into the exact order in which solar biological energy travels: Sun → Primary Producer → Primary Consumer → Secondary Consumer → Apex Predator/Decomposer."
          steps={[
            "Switch between Team Explorers and Team Guardians to populate each team's rack.",
            "Click organisms from the organism bank to assign them to their correct trophic positions.",
            "Remember: Arrows point in the direction of energy flow (from who is eaten to who eats them!).",
            "Fill all 4 slots and verify to trigger the energy animation and score points!"
          ]}
          proTip="Photosynthetic plants and phytoplankton are always at the start because they make food directly from sunlight!"
        />
      ) : (
        <EcoHeroGuide
          emotion="warning"
          missionName="Mission 2 • Phase 2 Directive"
          title="Ecosystem Disruption & What-If Simulations"
          objective="When one species in a chain is eliminated, the balance collapses! Predict population explosions, starvation cascades, and habitat impacts."
          steps={[
            "Examine the affected organism and review the chain links.",
            "Both teams deliberate quietly and select your ecological outcome prediction.",
            "Lock in secretly on your team's console before the final reveal!",
            "First team to lock in correctly earns a +25⚡ Speed Bonus!"
          ]}
          proTip="If primary consumers vanish, producers overgrow while predators starve. If predators vanish, herbivores overpopulate and strip the landscape bare!"
        />
      )}

      {phase === "BUILDER" ? (
        /* PHASE 1: Simultaneous Dual Team Food Chain Builder */
        <div className="flex flex-col gap-6">
          {/* Active Rack Selector & Notice */}
          <div className="clay-card p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-700" />
              <span className="text-xs font-black uppercase text-slate-700">Select Active Team To Slot Organisms:</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveBuilderTeam("EXPLORERS");
                  showTurnAnnouncement("EXPLORERS");
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  activeBuilderTeam === "EXPLORERS"
                    ? "clay-btn-sky text-white ring-2 ring-sky-400"
                    : "clay-card text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🐺 Explorers Rack (Team A)</span>
                <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full font-black">
                  {explorerSlots.filter(Boolean).length}/4
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveBuilderTeam("GUARDIANS");
                  showTurnAnnouncement("GUARDIANS");
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  activeBuilderTeam === "GUARDIANS"
                    ? "clay-btn-amber text-white ring-2 ring-amber-400"
                    : "clay-card text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🐯 Guardians Rack (Team B)</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-black">
                  {guardianSlots.filter(Boolean).length}/4
                </span>
              </button>
            </div>
          </div>

          {/* Side-by-Side Dual Team Racks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Explorers Rack */}
            <div className={`clay-card p-5 sm:p-6 transition-all border-2 ${
              activeBuilderTeam === "EXPLORERS" ? "border-sky-400 ring-2 ring-sky-300/50" : "border-sky-100"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐺</span>
                  <span className="text-xs font-black uppercase text-sky-900">Team Explorers Chain</span>
                </div>
                <button
                  onClick={() => handleResetTeamSlots("EXPLORERS")}
                  className="clay-pill bg-rose-100 text-rose-700 hover:bg-rose-200 text-[10px] font-black flex items-center gap-1 px-2.5 py-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-center">
                {["1. Producer", "2. Herbivore", "3. Carnivore", "4. Apex"].map((label, idx) => {
                  const org = explorerSlots[idx];
                  return (
                    <div
                      key={`exp-slot-${idx}`}
                      onClick={() => org && handleClearSlot("EXPLORERS", idx)}
                      className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-center transition-all ${
                        org
                          ? "clay-card bg-sky-50/80 cursor-pointer hover:bg-rose-50 border border-sky-300 active:scale-95"
                          : "clay-inset bg-sky-50/30 border border-dashed border-sky-200"
                      }`}
                    >
                      {org ? (
                        <>
                          <span className="text-3xl mb-0.5">{org.icon}</span>
                          <span className="text-[11px] font-black text-slate-800 text-center leading-tight">{org.name}</span>
                          <span className="text-[9px] text-sky-700 font-bold uppercase">{org.type}</span>
                        </>
                      ) : (
                        <div className="text-center text-slate-400">
                          <span className="text-lg block mb-0.5">➕</span>
                          <span className="text-[10px] font-bold">{label}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Guardians Rack */}
            <div className={`clay-card p-5 sm:p-6 transition-all border-2 ${
              activeBuilderTeam === "GUARDIANS" ? "border-amber-400 ring-2 ring-amber-300/50" : "border-amber-100"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐯</span>
                  <span className="text-xs font-black uppercase text-amber-900">Team Guardians Chain</span>
                </div>
                <button
                  onClick={() => handleResetTeamSlots("GUARDIANS")}
                  className="clay-pill bg-rose-100 text-rose-700 hover:bg-rose-200 text-[10px] font-black flex items-center gap-1 px-2.5 py-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-center">
                {["1. Producer", "2. Herbivore", "3. Carnivore", "4. Apex"].map((label, idx) => {
                  const org = guardianSlots[idx];
                  return (
                    <div
                      key={`grd-slot-${idx}`}
                      onClick={() => org && handleClearSlot("GUARDIANS", idx)}
                      className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-center transition-all ${
                        org
                          ? "clay-card bg-amber-50/80 cursor-pointer hover:bg-rose-50 border border-amber-300 active:scale-95"
                          : "clay-inset bg-amber-50/30 border border-dashed border-amber-200"
                      }`}
                    >
                      {org ? (
                        <>
                          <span className="text-3xl mb-0.5">{org.icon}</span>
                          <span className="text-[11px] font-black text-slate-800 text-center leading-tight">{org.name}</span>
                          <span className="text-[9px] text-amber-700 font-bold uppercase">{org.type}</span>
                        </>
                      ) : (
                        <div className="text-center text-slate-400">
                          <span className="text-lg block mb-0.5">➕</span>
                          <span className="text-[10px] font-bold">{label}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Energy Flow Animation Bar */}
          {animatingEnergy && (
            <div className="clay-inset p-3.5 rounded-2xl bg-gradient-to-r from-amber-100 via-emerald-100 to-teal-100 flex items-center justify-center gap-2 text-xs font-black text-emerald-800 animate-pulse">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 animate-spin" />
              <span>SOLAR ENERGY FLOW ACTIVE: 10,000 kcal → 1,000 kcal → 100 kcal → 10 kcal</span>
            </div>
          )}

          {/* Organism Deck (Available Cards to pick) */}
          <div className="clay-card p-5 sm:p-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Available Ecosystem Organisms (Click to Slot into {activeBuilderTeam === "EXPLORERS" ? "🐺 Explorers" : "🐯 Guardians"})</span>
              <span className="text-emerald-700 font-black">+150 ⚡ Each Correct Chain</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 mb-5">
              {FOOD_CHAIN_ORGANISMS.map((org) => {
                const currentSlots = activeBuilderTeam === "EXPLORERS" ? explorerSlots : guardianSlots;
                const isSlotted = currentSlots.some((s) => s?.id === org.id);
                return (
                  <button
                    key={org.id}
                    disabled={isSlotted}
                    onClick={() => handleSelectOrganism(org)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      isSlotted
                        ? "clay-inset opacity-40 cursor-not-allowed bg-slate-100"
                        : "clay-card hover:bg-slate-50 active:scale-95 shadow"
                    }`}
                  >
                    <span className="text-3xl mb-1">{org.icon}</span>
                    <span className="text-xs font-black text-slate-800">{org.name}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{org.type}</span>
                  </button>
                );
              })}
            </div>

            {/* Verification Button */}
            <button
              onClick={checkBothFoodChains}
              disabled={explorerSlots.includes(null) && guardianSlots.includes(null)}
              className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                !explorerSlots.includes(null) || !guardianSlots.includes(null)
                  ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-5 h-5" />
              <span>Verify Both Teams&apos; Food Chains</span>
            </button>
          </div>
        </div>
      ) : (
        /* PHASE 2: Simultaneous Dual Team What-If Scenarios */
        <div className="clay-card p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-rose-600 text-xs font-black uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Ecological Disruption Event</span>
            </div>
            <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              ⚡ +25 Speed Bonus For 1st Pick
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
            &ldquo;{currentScenario.scenario}&rdquo;
          </h2>

          <p className="text-base font-extrabold text-teal-800 mb-6">
            {currentScenario.question}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Team Explorers Console */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 shadow-inner">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐺</span>
                  <span className="text-xs font-black uppercase text-sky-900">Team Explorers</span>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  explorerScenarioPick ? "bg-sky-500 text-white animate-pulse" : "bg-sky-200 text-sky-800"
                }`}>
                  {explorerScenarioPick ? (firstScenarioLocked === "EXPLORERS" ? "⚡ LOCKED 1st!" : "🔒 LOCKED") : "AWAITING..."}
                </span>
              </div>
              <div className="space-y-2">
                {currentScenario.options.map((opt) => (
                  <button
                    key={`exp-whatif-${opt.id}`}
                    onClick={() => {
                      sound.playClick();
                      setExplorerScenarioPick(opt.id);
                      if (!firstScenarioLocked) setFirstScenarioLocked("EXPLORERS");
                    }}
                    className={`w-full p-3 rounded-xl text-left font-bold text-xs transition-all flex items-start gap-2.5 ${
                      explorerScenarioPick === opt.id
                        ? "clay-btn-sky text-white ring-2 ring-sky-400"
                        : "bg-white/80 hover:bg-white text-slate-700 border border-sky-100 shadow-sm"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                      {opt.id.slice(-1).toUpperCase()}
                    </span>
                    <span>{opt.text}</span>
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
                  guardianScenarioPick ? "bg-amber-500 text-white animate-pulse" : "bg-amber-200 text-amber-800"
                }`}>
                  {guardianScenarioPick ? (firstScenarioLocked === "GUARDIANS" ? "⚡ LOCKED 1st!" : "🔒 LOCKED") : "AWAITING..."}
                </span>
              </div>
              <div className="space-y-2">
                {currentScenario.options.map((opt) => (
                  <button
                    key={`grd-whatif-${opt.id}`}
                    onClick={() => {
                      sound.playClick();
                      setGuardianScenarioPick(opt.id);
                      if (!firstScenarioLocked) setFirstScenarioLocked("GUARDIANS");
                    }}
                    className={`w-full p-3 rounded-xl text-left font-bold text-xs transition-all flex items-start gap-2.5 ${
                      guardianScenarioPick === opt.id
                        ? "clay-btn-amber text-white ring-2 ring-amber-400"
                        : "bg-white/80 hover:bg-white text-slate-700 border border-amber-100 shadow-sm"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                      {opt.id.slice(-1).toUpperCase()}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reveal Button */}
          <button
            onClick={handleRevealDualWhatIf}
            disabled={!explorerScenarioPick && !guardianScenarioPick}
            className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              explorerScenarioPick || guardianScenarioPick
                ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Reveal Ecological Cascade & Award Points</span>
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={(dualOutcomes?.explorers.isCorrect || dualOutcomes?.guardians.isCorrect) ?? false}
        pointsAwarded={phase === "BUILDER" ? 150 : 100}
        explanation={modalExplanation}
        teamOutcomes={dualOutcomes || undefined}
        onNext={handleModalNext}
        nextButtonText={
          phase === "BUILDER"
            ? "Enter What-If Scenarios →"
            : scenarioIndex < WHAT_IF_SCENARIOS.length - 1
            ? "Next Scenario →"
            : "Proceed to Decay Detectives →"
        }
      />
    </div>
  );
};
