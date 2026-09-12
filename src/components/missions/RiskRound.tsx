"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { RISK_ROUND_DILEMMAS } from "@/lib/questionsData";
import { FeedbackModal, TeamOutcome } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { Target, Zap, AlertTriangle, ArrowRight, ShieldCheck, Users } from "lucide-react";

export const RiskRound: React.FC = () => {
  const { setScreen, addScore, addHealth, teams } = useGame();

  const [dilemmaIndex, setDilemmaIndex] = useState<number>(0);

  // Dual Team Wagers & Options
  const [expWager, setExpWager] = useState<number>(25);
  const [grdWager, setGrdWager] = useState<number>(25);
  const [expOptionIdx, setExpOptionIdx] = useState<number | null>(null);
  const [grdOptionIdx, setGrdOptionIdx] = useState<number | null>(null);
  const [firstLocked, setFirstLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);

  // Modal feedback
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalExplanation, setModalExplanation] = useState<string>("");
  const [dualOutcomes, setDualOutcomes] = useState<{
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  } | null>(null);

  const currentDilemma = RISK_ROUND_DILEMMAS[dilemmaIndex];

  const handleRevealRiskOutcomes = () => {
    const expOption = expOptionIdx !== null ? currentDilemma.options[expOptionIdx] : null;
    const grdOption = grdOptionIdx !== null ? currentDilemma.options[grdOptionIdx] : null;

    const expCorrect = expOption?.isCorrect ?? false;
    const grdCorrect = grdOption?.isCorrect ?? false;

    const expScore = expCorrect
      ? expWager * 2 + (firstLocked === "EXPLORERS" ? 25 : 0)
      : -expWager;
    const grdScore = grdCorrect
      ? grdWager * 2 + (firstLocked === "GUARDIANS" ? 25 : 0)
      : -grdWager;

    addScore(expScore, "EXPLORERS");
    addScore(grdScore, "GUARDIANS");

    if (expCorrect || grdCorrect) {
      sound.playCorrect();
      addHealth(10);
    } else {
      sound.playIncorrect();
    }

    setDualOutcomes({
      explorers: {
        teamName: "Team Explorers",
        isCorrect: expCorrect,
        scoreGained: expScore,
        answerChosen: `Wager ${expWager}⚡ • ${expOption?.text.slice(0, 45)}...`,
        badge: "🐺",
      },
      guardians: {
        teamName: "Team Guardians",
        isCorrect: grdCorrect,
        scoreGained: grdScore,
        answerChosen: `Wager ${grdWager}⚡ • ${grdOption?.text.slice(0, 45)}...`,
        badge: "🐯",
      },
    });

    const explanation =
      currentDilemma.options.find((o) => o.isCorrect)?.consequence ||
      "Strategic ecological risk decisions must carefully weigh microbial balance against rapid industrial interventions.";
    setModalExplanation(explanation);
    setModalOpen(true);
  };

  const handleNext = () => {
    setModalOpen(false);
    setExpOptionIdx(null);
    setGrdOptionIdx(null);
    setFirstLocked(null);
    setDualOutcomes(null);

    if (dilemmaIndex < RISK_ROUND_DILEMMAS.length - 1) {
      setDilemmaIndex((prev) => prev + 1);
    } else {
      setScreen("FINAL_CRISIS");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-7 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="clay-pill bg-purple-100 text-purple-900 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span>Simultaneous High-Stakes Wager Dilemma</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800">
              The Strategic Risk Dilemma
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
              Both teams choose wagers and lock in dilemma interventions simultaneously! Win double or lose your stake.
            </p>
          </div>

          {/* Current Team Scores */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-2xl clay-card text-xs font-black text-sky-900 bg-sky-50 border border-sky-200">
              <span>🐺 Explorers: </span>
              <span className="text-sky-600">{teams.EXPLORERS.score} ⚡</span>
            </div>
            <div className="px-3 py-2 rounded-2xl clay-card text-xs font-black text-amber-900 bg-amber-50 border border-amber-200">
              <span>🐯 Guardians: </span>
              <span className="text-amber-600">{teams.GUARDIANS.score} ⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dilemma Scenario Header */}
      <div className="clay-card p-5 sm:p-7 mb-6">
        <div className="flex items-center gap-2 text-amber-800 text-xs font-black uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Case File: {currentDilemma.title}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 clay-inset p-4 rounded-2xl bg-amber-50/50 font-medium">
          {currentDilemma.context}
        </p>

        <h3 className="text-base sm:text-lg font-black text-teal-900 mb-3">
          {currentDilemma.question}
        </h3>

        {/* Option Descriptions Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentDilemma.options.map((option, idx) => (
            <div
              key={idx}
              className="clay-inset p-3.5 rounded-2xl bg-white/80 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px] font-black mb-1.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Wager & Selection Consoles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Explorers Console */}
        <div className="clay-card p-5 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-300">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐺</span>
              <span className="text-xs font-black uppercase text-sky-900">Team Explorers</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              expOptionIdx !== null ? "bg-sky-500 text-white" : "bg-sky-200 text-sky-800"
            }`}>
              {expOptionIdx !== null ? (firstLocked === "EXPLORERS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "AWAITING..."}
            </span>
          </div>

          {/* Wager Selection */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-sky-800 block mb-1.5">Select Wager:</span>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50].map((amt) => (
                <button
                  key={`exp-wager-${amt}`}
                  onClick={() => {
                    sound.playClick();
                    setExpWager(amt);
                  }}
                  className={`py-1.5 rounded-xl font-black text-xs transition-all ${
                    expWager === amt
                      ? "clay-btn-sky text-white ring-2 ring-sky-400 shadow-sm"
                      : "bg-white text-slate-700 border border-sky-200 hover:bg-sky-100"
                  }`}
                >
                  {amt} ⚡
                </button>
              ))}
            </div>
          </div>

          {/* Dilemma Option Selection */}
          <div>
            <span className="text-[11px] font-bold text-sky-800 block mb-1.5">Intervention Choice:</span>
            <div className="grid grid-cols-3 gap-2">
              {currentDilemma.options.map((_, idx) => (
                <button
                  key={`exp-opt-${idx}`}
                  onClick={() => {
                    sound.playClick();
                    setExpOptionIdx(idx);
                    if (!firstLocked) setFirstLocked("EXPLORERS");
                  }}
                  className={`py-3 rounded-xl font-black text-sm transition-all ${
                    expOptionIdx === idx
                      ? "clay-btn-sky text-white ring-2 ring-sky-400 shadow-md"
                      : "bg-white text-slate-700 border border-sky-200 hover:bg-sky-100 shadow-sm"
                  }`}
                >
                  Option {String.fromCharCode(65 + idx)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guardians Console */}
        <div className="clay-card p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐯</span>
              <span className="text-xs font-black uppercase text-amber-900">Team Guardians</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              grdOptionIdx !== null ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-800"
            }`}>
              {grdOptionIdx !== null ? (firstLocked === "GUARDIANS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "AWAITING..."}
            </span>
          </div>

          {/* Wager Selection */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-amber-800 block mb-1.5">Select Wager:</span>
            <div className="grid grid-cols-3 gap-2">
              {[10, 25, 50].map((amt) => (
                <button
                  key={`grd-wager-${amt}`}
                  onClick={() => {
                    sound.playClick();
                    setGrdWager(amt);
                  }}
                  className={`py-1.5 rounded-xl font-black text-xs transition-all ${
                    grdWager === amt
                      ? "clay-btn-amber text-white ring-2 ring-amber-400 shadow-sm"
                      : "bg-white text-slate-700 border border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  {amt} ⚡
                </button>
              ))}
            </div>
          </div>

          {/* Dilemma Option Selection */}
          <div>
            <span className="text-[11px] font-bold text-amber-800 block mb-1.5">Intervention Choice:</span>
            <div className="grid grid-cols-3 gap-2">
              {currentDilemma.options.map((_, idx) => (
                <button
                  key={`grd-opt-${idx}`}
                  onClick={() => {
                    sound.playClick();
                    setGrdOptionIdx(idx);
                    if (!firstLocked) setFirstLocked("GUARDIANS");
                  }}
                  className={`py-3 rounded-xl font-black text-sm transition-all ${
                    grdOptionIdx === idx
                      ? "clay-btn-amber text-white ring-2 ring-amber-400 shadow-md"
                      : "bg-white text-slate-700 border border-amber-200 hover:bg-amber-100 shadow-sm"
                  }`}
                >
                  Option {String.fromCharCode(65 + idx)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reveal Button */}
      <button
        onClick={handleRevealRiskOutcomes}
        disabled={expOptionIdx === null && grdOptionIdx === null}
        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
          expOptionIdx !== null || grdOptionIdx !== null
            ? "clay-btn-purple text-white cursor-pointer active:scale-98 shadow-lg"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        <Zap className="w-4 h-4" />
        <span>Reveal High-Stakes Risk Outcomes & Update Scores</span>
      </button>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={(dualOutcomes?.explorers.isCorrect || dualOutcomes?.guardians.isCorrect) ?? false}
        pointsAwarded={50}
        explanation={modalExplanation}
        teamOutcomes={dualOutcomes || undefined}
        onNext={handleNext}
        nextButtonText={
          dilemmaIndex < RISK_ROUND_DILEMMAS.length - 1
            ? "Next Risk Dilemma →"
            : "Proceed to Final Ecosystem Crisis! 🚨"
        }
      />
    </div>
  );
};
