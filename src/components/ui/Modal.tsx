"use client";

import React from "react";
import { CheckCircle2, XCircle, ArrowRight, Zap, Lightbulb } from "lucide-react";

export interface TeamOutcome {
  teamName: string;
  isCorrect: boolean;
  scoreGained: number;
  answerChosen?: string;
  badge?: string;
}

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect?: boolean;
  title?: string;
  pointsAwarded?: number;
  explanation: string;
  onNext: () => void;
  nextButtonText?: string;
  teamOutcomes?: {
    explorers: TeamOutcome;
    guardians: TeamOutcome;
  };
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect = true,
  title,
  pointsAwarded = 100,
  explanation,
  onNext,
  nextButtonText = "Continue Investigation",
  teamOutcomes,
}) => {
  if (!isOpen) return null;

  const anyCorrect = teamOutcomes
    ? teamOutcomes.explorers.isCorrect || teamOutcomes.guardians.isCorrect
    : isCorrect;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl p-7 shadow-2xl transition-all transform scale-100 clay-card ${
          isCorrect
            ? "border-3 border-emerald-400 bg-gradient-to-b from-emerald-50/95 via-white to-teal-50/80 shadow-[12px_18px_40px_rgba(16,185,129,0.25)]"
            : "border-3 border-rose-300 bg-gradient-to-b from-rose-50/95 via-white to-orange-50/80 shadow-[12px_18px_40px_rgba(244,63,94,0.2)]"
        }`}
      >
        {/* Header Icon & Title */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
              isCorrect
                ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                : "bg-rose-100 text-rose-600 border border-rose-200"
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-600 animate-pulse" />
            )}
          </div>
          <div>
            <h3
              className={`text-2xl font-black ${
                anyCorrect ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {title || (anyCorrect ? "Discovery Assessment!" : "Ecosystem Analysis!")}
            </h3>
            {!teamOutcomes && anyCorrect && pointsAwarded > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 uppercase tracking-wider mt-0.5">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>+{pointsAwarded} ECO ENERGY AWARDED</span>
              </div>
            )}
          </div>
        </div>

        {/* Dual Team Score Breakdown */}
        {teamOutcomes && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* Team Explorers */}
            <div
              className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between ${
                teamOutcomes.explorers.isCorrect
                  ? "bg-blue-50/90 border-blue-400 text-blue-900 shadow-sm"
                  : "bg-slate-100 border-slate-300 text-slate-600"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-black mb-1">
                <span>🐺 Explorers</span>
                <span className={teamOutcomes.explorers.isCorrect ? "text-emerald-700" : "text-rose-600"}>
                  {teamOutcomes.explorers.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 truncate">
                Pick: {teamOutcomes.explorers.answerChosen || "None"}
              </div>
              <div className="text-sm font-black text-amber-600 mt-1">
                +{teamOutcomes.explorers.scoreGained} ⚡
              </div>
            </div>

            {/* Team Guardians */}
            <div
              className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between ${
                teamOutcomes.guardians.isCorrect
                  ? "bg-orange-50/90 border-orange-400 text-orange-900 shadow-sm"
                  : "bg-slate-100 border-slate-300 text-slate-600"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-black mb-1">
                <span>🐯 Guardians</span>
                <span className={teamOutcomes.guardians.isCorrect ? "text-emerald-700" : "text-rose-600"}>
                  {teamOutcomes.guardians.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 truncate">
                Pick: {teamOutcomes.guardians.answerChosen || "None"}
              </div>
              <div className="text-sm font-black text-amber-600 mt-1">
                +{teamOutcomes.guardians.scoreGained} ⚡
              </div>
            </div>
          </div>
        )}

        {/* Educational Explanation */}
        <div className="clay-inset p-5 mb-6">
          <div className="flex items-center gap-2 text-xs font-black text-teal-800 uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Field Science Briefing</span>
          </div>
          <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all clay-btn ${
              isCorrect
                ? "clay-btn-emerald"
                : "clay-btn-white text-slate-800"
            }`}
          >
            <span>{nextButtonText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
