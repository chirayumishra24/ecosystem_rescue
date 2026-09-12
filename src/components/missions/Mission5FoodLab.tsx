"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FOOD_LAB_ITEMS } from "@/lib/questionsData";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { Check, RefreshCw, Zap, Sparkles, Utensils, Users } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const Mission5FoodLab: React.FC = () => {
  const { setScreen, addScore, addHealth, completeMission } = useGame();

  const [selectedFoodId, setSelectedFoodId] = useState<string>("milk");

  // Dual Team Selections
  const [activePickerTeam, setActivePickerTeam] = useState<"EXPLORERS" | "GUARDIANS">("EXPLORERS");
  const [expMicrobe, setExpMicrobe] = useState<string | null>(null);
  const [expProcess, setExpProcess] = useState<string | null>(null);
  const [grdMicrobe, setGrdMicrobe] = useState<string | null>(null);
  const [grdProcess, setGrdProcess] = useState<string | null>(null);
  const [firstLocked, setFirstLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);

  // Solved foods map
  const [solvedFoods, setSolvedFoods] = useState<Record<string, boolean>>({});

  // Modal feedback
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalExplanation, setModalExplanation] = useState<string>("");
  const [dualOutcomes, setDualOutcomes] = useState<{
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  } | null>(null);

  const currentFood = FOOD_LAB_ITEMS.find((f) => f.id === selectedFoodId) || FOOD_LAB_ITEMS[0];

  const microbeOptions = [
    "Lactic Acid Bacteria",
    "Yeast (Saccharomyces)",
    "Penicillium Mold",
    "Toxic Pathogens",
  ];

  const processOptions = [
    "Lactic Fermentation",
    "Rising (CO₂ Production)",
    "Enzymatic Ripening",
    "Anaerobic Pickling",
  ];

  const handleSelectMicrobe = (microbe: string) => {
    sound.playClick();
    if (activePickerTeam === "EXPLORERS") {
      setExpMicrobe(microbe);
      if (expProcess && !firstLocked) setFirstLocked("EXPLORERS");
    } else {
      setGrdMicrobe(microbe);
      if (grdProcess && !firstLocked) setFirstLocked("GUARDIANS");
    }
  };

  const handleSelectProcess = (proc: string) => {
    sound.playClick();
    if (activePickerTeam === "EXPLORERS") {
      setExpProcess(proc);
      if (expMicrobe && !firstLocked) setFirstLocked("EXPLORERS");
    } else {
      setGrdProcess(proc);
      if (grdMicrobe && !firstLocked) setFirstLocked("GUARDIANS");
    }
  };

  const handleRevealDualMatches = () => {
    const expCorrect =
      expMicrobe === currentFood.correctMicrobe && expProcess === currentFood.correctProcess;
    const grdCorrect =
      grdMicrobe === currentFood.correctMicrobe && grdProcess === currentFood.correctProcess;

    const expScore = expCorrect ? (firstLocked === "EXPLORERS" ? 125 : 100) : 0;
    const grdScore = grdCorrect ? (firstLocked === "GUARDIANS" ? 125 : 100) : 0;

    if (expCorrect) addScore(expScore, "EXPLORERS");
    if (grdCorrect) addScore(grdScore, "GUARDIANS");

    if (expCorrect || grdCorrect) {
      sound.playCorrect();
      setSolvedFoods((prev) => ({ ...prev, [currentFood.id]: true }));
      addHealth(8);
    } else {
      sound.playIncorrect();
    }

    setDualOutcomes({
      explorers: {
        teamName: "Team Explorers",
        isCorrect: expCorrect,
        scoreGained: expScore,
        answerChosen: `${expMicrobe || "None"} + ${expProcess || "None"}`,
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: `${grdMicrobe || "None"} + ${grdProcess || "None"}`,
        badge: "🐯",
      },
    });

    setModalExplanation(currentFood.fact);
    setModalOpen(true);
  };

  const handleModalNext = () => {
    setModalOpen(false);
    setExpMicrobe(null);
    setExpProcess(null);
    setGrdMicrobe(null);
    setGrdProcess(null);
    setFirstLocked(null);
    setDualOutcomes(null);

    // Check if all solved
    const nextSolved = { ...solvedFoods, [currentFood.id]: true };
    const allSolved = FOOD_LAB_ITEMS.every((item) => nextSolved[item.id]);

    if (allSolved) {
      completeMission(5);
      setScreen("ECO_CHALLENGE");
    } else {
      const nextUnsolved = FOOD_LAB_ITEMS.find((item) => !nextSolved[item.id]);
      if (nextUnsolved) {
        setSelectedFoodId(nextUnsolved.id);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="clay-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1">
            <span className="clay-pill bg-emerald-100 text-emerald-800 text-[11px]">MISSION 5 • BENEFICIAL MICROBES IN FOOD PRODUCTION</span>
            <span className="clay-pill bg-amber-100 text-amber-800 text-[11px]">+200 ⚡ ECO ENERGY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
            Microbe Food Biotechnology Lab
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Both teams solve food biotechnology simultaneously! +100 ⚡ per correct match, +25 ⚡ speed bonus.
          </p>
        </div>

        <div className="clay-pill bg-amber-100 text-amber-900 text-xs font-black flex items-center gap-1.5 px-3.5 py-1.5 shadow-sm">
          <Utensils className="w-4 h-4 text-amber-600" />
          <span>Solved: {Object.keys(solvedFoods).length} / {FOOD_LAB_ITEMS.length}</span>
        </div>
      </div>

      {/* Captain Eco Directive */}
      <EcoHeroGuide
        emotion="scientist"
        missionName="Mission 5 Directive"
        title="Microbial Fermentation & Food Biotechnology"
        objective="Not all microorganisms cause decay or illness—many are beneficial heroes in our everyday nutrition! Match each food product with its microscopic fermenter and biological process."
        steps={[
          "Select the active food target: Yogurt, Bread, Cheese, or Vinegar.",
          "Identify the exact microorganism responsible: Lactic Acid Bacteria, Yeast (Saccharomyces), or Penicillium mold.",
          "Select the biochemical process: Lactic Acid Fermentation, Carbon Dioxide Gas Expansion, or Proteolytic Aging.",
          "Both teams lock in secretly! Fastest correct team snags the +25⚡ Speed Bonus!"
        ]}
        proTip="Lactobacillus turns milk sugars into tangy yogurt; yeast breathes out CO2 bubbles to make bread fluffy; Penicillium molds give aged blue cheeses their distinctive flavor!"
      />

      {/* Main Matching Lab */}
      <div className="clay-card p-6 sm:p-8 mb-6">
        {/* Active Food Target Banner */}
        <div className="clay-card bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{currentFood.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">Target Food Specimen</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentFood.food}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-600">Active Team Assigning:</span>
            <button
              onClick={() => setActivePickerTeam("EXPLORERS")}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activePickerTeam === "EXPLORERS"
                  ? "clay-btn-sky text-white ring-2 ring-sky-400"
                  : "clay-card text-slate-700 hover:bg-slate-100"
              }`}
            >
              🐺 Explorers
            </button>
            <button
              onClick={() => setActivePickerTeam("GUARDIANS")}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                activePickerTeam === "GUARDIANS"
                  ? "clay-btn-amber text-white ring-2 ring-amber-400"
                  : "clay-card text-slate-700 hover:bg-slate-100"
              }`}
            >
              🐯 Guardians
            </button>
          </div>
        </div>

        {/* Dual Team Lock-in Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Explorers Choice Preview */}
          <div className={`p-4 rounded-2xl border-2 transition-all ${
            activePickerTeam === "EXPLORERS" ? "border-sky-400 bg-sky-50/70 ring-2 ring-sky-200" : "border-sky-200 bg-sky-50/30"
          }`}>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-sky-200">
              <span className="text-xs font-black text-sky-900 flex items-center gap-1.5">
                <span>🐺 Team Explorers Hypothesis</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                expMicrobe && expProcess ? "bg-sky-500 text-white" : "bg-sky-200 text-sky-800"
              }`}>
                {expMicrobe && expProcess ? (firstLocked === "EXPLORERS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "SELECTING..."}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-700 space-y-1">
              <div>🦠 Microbe: <span className="font-black text-sky-800">{expMicrobe || "(Select below)"}</span></div>
              <div>⚡ Process: <span className="font-black text-sky-800">{expProcess || "(Select below)"}</span></div>
            </div>
          </div>

          {/* Guardians Choice Preview */}
          <div className={`p-4 rounded-2xl border-2 transition-all ${
            activePickerTeam === "GUARDIANS" ? "border-amber-400 bg-amber-50/70 ring-2 ring-amber-200" : "border-amber-200 bg-amber-50/30"
          }`}>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-200">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <span>🐯 Team Guardians Hypothesis</span>
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                grdMicrobe && grdProcess ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-800"
              }`}>
                {grdMicrobe && grdProcess ? (firstLocked === "GUARDIANS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "SELECTING..."}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-700 space-y-1">
              <div>🦠 Microbe: <span className="font-black text-amber-800">{grdMicrobe || "(Select below)"}</span></div>
              <div>⚡ Process: <span className="font-black text-amber-800">{grdProcess || "(Select below)"}</span></div>
            </div>
          </div>
        </div>

        {/* Selection Columns: Microorganisms & Biochemical Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Microorganisms Pool */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-teal-800 mb-2">
              Select Microorganism for {activePickerTeam === "EXPLORERS" ? "🐺 Explorers" : "🐯 Guardians"}:
            </h3>
            {microbeOptions.map((microbe) => {
              const currentPick = activePickerTeam === "EXPLORERS" ? expMicrobe : grdMicrobe;
              const isSelected = currentPick === microbe;
              return (
                <button
                  key={microbe}
                  onClick={() => handleSelectMicrobe(microbe)}
                  className={`w-full p-3.5 rounded-2xl text-left font-black text-xs sm:text-sm transition-all flex items-center justify-between active:scale-98 ${
                    isSelected
                      ? activePickerTeam === "EXPLORERS"
                        ? "clay-btn-sky text-white ring-2 ring-sky-400"
                        : "clay-btn-amber text-white ring-2 ring-amber-400"
                      : "clay-card hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span>{microbe}</span>
                  <span className="text-xl">
                    {microbe.includes("Bacteria") && "🦠"}
                    {microbe.includes("Yeast") && "🍞"}
                    {microbe.includes("Mold") && "🧀"}
                    {microbe.includes("Pathogens") && "⚠️"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Biochemical Process Pool */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-800 mb-2">
              Select Biochemical Process for {activePickerTeam === "EXPLORERS" ? "🐺 Explorers" : "🐯 Guardians"}:
            </h3>
            {processOptions.map((proc) => {
              const currentPick = activePickerTeam === "EXPLORERS" ? expProcess : grdProcess;
              const isSelected = currentPick === proc;
              return (
                <button
                  key={proc}
                  onClick={() => handleSelectProcess(proc)}
                  className={`w-full p-3.5 rounded-2xl text-left font-black text-xs sm:text-sm transition-all flex items-center justify-between active:scale-98 ${
                    isSelected
                      ? activePickerTeam === "EXPLORERS"
                        ? "clay-btn-sky text-white ring-2 ring-sky-400"
                        : "clay-btn-amber text-white ring-2 ring-amber-400"
                      : "clay-card hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span>{proc}</span>
                  <span className="text-base">⚡</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reveal Matches Button */}
        <button
          onClick={handleRevealDualMatches}
          disabled={(!expMicrobe || !expProcess) && (!grdMicrobe || !grdProcess)}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            (expMicrobe && expProcess) || (grdMicrobe && grdProcess)
              ? "clay-btn-emerald text-white cursor-pointer active:scale-98 shadow-md"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Reveal Biotechnology Matches & Score Both Teams</span>
        </button>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={(dualOutcomes?.explorers.isCorrect || dualOutcomes?.guardians.isCorrect) ?? false}
        pointsAwarded={100}
        explanation={modalExplanation}
        teamOutcomes={dualOutcomes || undefined}
        onNext={handleModalNext}
        nextButtonText={
          Object.keys(solvedFoods).length >= FOOD_LAB_ITEMS.length - 1
            ? "Enter 60s Simultaneous Eco Blitz →"
            : "Next Food Specimen →"
        }
      />
    </div>
  );
};
