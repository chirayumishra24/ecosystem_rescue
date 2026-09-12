"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/lib/gameStore";
import { ECO_CHALLENGE_QUESTIONS } from "@/lib/questionsData";
import { sound } from "@/lib/audio";
import { Zap, Timer, ArrowRight, CheckCircle2, XCircle, Award, Users } from "lucide-react";

export const EcoChallenge: React.FC = () => {
  const { setScreen, addScore, addHealth, teams } = useGame();

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [sessionQuestions, setSessionQuestions] = useState(ECO_CHALLENGE_QUESTIONS);

  // Simultaneous dual-team answer states per question
  const [explorerOption, setExplorerOption] = useState<number | null>(null);
  const [guardianOption, setGuardianOption] = useState<number | null>(null);
  const [firstLocked, setFirstLocked] = useState<"EXPLORERS" | "GUARDIANS" | null>(null);
  const [roundRevealed, setRoundRevealed] = useState<boolean>(false);

  // Blitz accumulated tallies
  const [explorerScoreGained, setExplorerScoreGained] = useState<number>(0);
  const [guardianScoreGained, setGuardianScoreGained] = useState<number>(0);
  const [explorerCorrectCount, setExplorerCorrectCount] = useState<number>(0);
  const [guardianCorrectCount, setGuardianCorrectCount] = useState<number>(0);

  const [challengeFinished, setChallengeFinished] = useState<boolean>(false);

  // Shuffle questions once on start
  useEffect(() => {
    const shuffled = [...ECO_CHALLENGE_QUESTIONS].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled);
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsRunning(false);
            setChallengeFinished(true);
            sound.playFanfare();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    sound.playClick();
    setIsRunning(true);
  };

  const currentQ = sessionQuestions[questionIndex % sessionQuestions.length];

  // Evaluate both answers and advance question
  const evaluateAndAdvance = (
    expPick: number | null,
    grdPick: number | null,
    firstLockTeam: "EXPLORERS" | "GUARDIANS" | null
  ) => {
    setRoundRevealed(true);

    const expCorrect = expPick === currentQ.correctIndex;
    const grdCorrect = grdPick === currentQ.correctIndex;

    const expBonus = expCorrect && firstLockTeam === "EXPLORERS" ? 15 : 0;
    const grdBonus = grdCorrect && firstLockTeam === "GUARDIANS" ? 15 : 0;

    const expPoints = expCorrect ? 50 + expBonus : 0;
    const grdPoints = grdCorrect ? 50 + grdBonus : 0;

    if (expPoints > 0) {
      addScore(expPoints, "EXPLORERS");
      setExplorerScoreGained((prev) => prev + expPoints);
      setExplorerCorrectCount((prev) => prev + 1);
    }

    if (grdPoints > 0) {
      addScore(grdPoints, "GUARDIANS");
      setGuardianScoreGained((prev) => prev + grdPoints);
      setGuardianCorrectCount((prev) => prev + 1);
    }

    if (expCorrect || grdCorrect) {
      sound.playCorrect();
      addHealth(2);
    } else {
      sound.playIncorrect();
    }

    setTimeout(() => {
      setExplorerOption(null);
      setGuardianOption(null);
      setFirstLocked(null);
      setRoundRevealed(false);
      setQuestionIndex((prev) => prev + 1);
    }, 700);
  };

  const handleExplorerPick = (idx: number) => {
    if (!isRunning || challengeFinished || roundRevealed || explorerOption !== null) return;
    sound.playClick();
    setExplorerOption(idx);
    const lock = firstLocked || "EXPLORERS";
    if (!firstLocked) setFirstLocked("EXPLORERS");

    // If guardian already picked, evaluate now
    if (guardianOption !== null) {
      evaluateAndAdvance(idx, guardianOption, lock);
    }
  };

  const handleGuardianPick = (idx: number) => {
    if (!isRunning || challengeFinished || roundRevealed || guardianOption !== null) return;
    sound.playClick();
    setGuardianOption(idx);
    const lock = firstLocked || "GUARDIANS";
    if (!firstLocked) setFirstLocked("GUARDIANS");

    // If explorer already picked, evaluate now
    if (explorerOption !== null) {
      evaluateAndAdvance(explorerOption, idx, lock);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Blitz Header */}
      <div className="clay-card p-5 sm:p-7 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="clay-pill bg-amber-100 text-amber-900 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1.5">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>Simultaneous Head-to-Head Blitz</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
              60-Second Simultaneous Eco Blitz
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
              Both teams race on the same questions simultaneously! +50 ⚡ per answer, +15 ⚡ for fastest lock.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex flex-col items-center">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all ${
                timeLeft <= 10
                  ? "clay-card bg-rose-100 text-rose-700 animate-pulse border-2 border-rose-400"
                  : "clay-card bg-amber-50 text-amber-800 border-2 border-amber-300"
              }`}
            >
              <Timer className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
              <span className="text-2xl sm:text-3xl font-black tracking-tight">{timeLeft}s</span>
            </div>
          </div>
        </div>
      </div>

      {!isRunning && !challengeFinished ? (
        /* Pre-game Ready Card */
        <div className="clay-card p-8 text-center max-w-xl mx-auto">
          <span className="text-5xl block mb-4 animate-bounce">⚡</span>
          <h3 className="text-2xl font-black text-slate-800 mb-2">
            Simultaneous Classroom Battle!
          </h3>
          <p className="text-sm font-bold text-slate-600 mb-6">
            Both <strong>Team Explorers 🐺</strong> and <strong>Team Guardians 🐯</strong> play at the same time on every question. No team waits, and no answers can be copied!
          </p>

          <button
            onClick={handleStartTimer}
            className="clay-btn clay-btn-orange px-10 py-4 text-white font-black text-lg shadow-lg active:scale-95"
          >
            START SIMULTANEOUS BLITZ NOW!
          </button>
        </div>
      ) : challengeFinished ? (
        /* Challenge Results Card */
        <div className="clay-card p-8 text-center max-w-2xl mx-auto animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl clay-card bg-amber-100 flex items-center justify-center text-3xl mx-auto mb-4">
            🏆
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">Blitz Complete!</h3>
          <p className="text-sm text-slate-600 font-extrabold mb-6">
            {explorerScoreGained > guardianScoreGained
              ? "🐺 Team Explorers won the Eco Challenge Blitz!"
              : guardianScoreGained > explorerScoreGained
              ? "🐯 Team Guardians won the Eco Challenge Blitz!"
              : "🤝 It's a dead heat tie in the Blitz round!"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Explorers Results */}
            <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 clay-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🐺</span>
                <span className="font-black text-sky-900 text-sm">Team Explorers</span>
              </div>
              <div className="text-3xl font-black text-sky-700 mb-1">+{explorerScoreGained} ⚡</div>
              <div className="text-xs font-bold text-sky-800">{explorerCorrectCount} Correct Answers</div>
              <div className="text-[11px] font-bold text-slate-500 mt-1">Total Score: {teams.EXPLORERS.score} ⚡</div>
            </div>

            {/* Guardians Results */}
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 clay-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🐯</span>
                <span className="font-black text-amber-900 text-sm">Team Guardians</span>
              </div>
              <div className="text-3xl font-black text-amber-700 mb-1">+{guardianScoreGained} ⚡</div>
              <div className="text-xs font-bold text-amber-800">{guardianCorrectCount} Correct Answers</div>
              <div className="text-[11px] font-bold text-slate-500 mt-1">Total Score: {teams.GUARDIANS.score} ⚡</div>
            </div>
          </div>

          <button
            onClick={() => setScreen("RISK_ROUND")}
            className="clay-btn clay-btn-purple px-10 py-4 text-white font-black text-base shadow-md active:scale-95"
          >
            Continue to Strategic Risk Round →
          </button>
        </div>
      ) : (
        /* Active Simultaneous Question Card */
        <div className="space-y-6">
          {/* Question Display */}
          <div className="clay-card p-5 sm:p-7">
            <div className="flex items-center justify-between mb-3">
              <span className="clay-pill bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
                Topic: {currentQ.topic}
              </span>
              <span className="text-xs font-black text-slate-500">
                Question #{((questionIndex) % sessionQuestions.length) + 1}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-4 leading-snug">
              {currentQ.question}
            </h2>

            {/* Answer Choices Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-bold border ${
                    roundRevealed && idx === currentQ.correctIndex
                      ? "bg-emerald-100 border-emerald-400 text-emerald-950 font-black"
                      : "clay-inset bg-white/70 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Buzzer / Answering Consoles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Team Explorers Console */}
            <div className="clay-card p-4 sm:p-5 bg-gradient-to-br from-sky-50 to-blue-50/80 border-2 border-sky-300">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐺</span>
                  <span className="text-xs font-black uppercase text-sky-900">Team Explorers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-sky-800">+{explorerScoreGained} ⚡</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                    explorerOption !== null ? "bg-sky-500 text-white" : "bg-sky-200 text-sky-800"
                  }`}>
                    {explorerOption !== null ? (firstLocked === "EXPLORERS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "AWAITING..."}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((idx) => {
                  const isSelected = explorerOption === idx;
                  const isCorrectAnswer = idx === currentQ.correctIndex;
                  return (
                    <button
                      key={`exp-btn-${idx}`}
                      disabled={explorerOption !== null || roundRevealed}
                      onClick={() => handleExplorerPick(idx)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all active:scale-90 ${
                        roundRevealed && isSelected
                          ? isCorrectAnswer
                            ? "clay-btn-emerald text-white"
                            : "bg-rose-500 text-white"
                          : isSelected
                          ? "clay-btn-sky text-white ring-2 ring-sky-400"
                          : "bg-white hover:bg-sky-100 text-sky-900 shadow border border-sky-200"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team Guardians Console */}
            <div className="clay-card p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-amber-300">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐯</span>
                  <span className="text-xs font-black uppercase text-amber-900">Team Guardians</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-amber-800">+{guardianScoreGained} ⚡</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                    guardianOption !== null ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-800"
                  }`}>
                    {guardianOption !== null ? (firstLocked === "GUARDIANS" ? "⚡ 1st LOCKED" : "🔒 LOCKED") : "AWAITING..."}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((idx) => {
                  const isSelected = guardianOption === idx;
                  const isCorrectAnswer = idx === currentQ.correctIndex;
                  return (
                    <button
                      key={`grd-btn-${idx}`}
                      disabled={guardianOption !== null || roundRevealed}
                      onClick={() => handleGuardianPick(idx)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all active:scale-90 ${
                        roundRevealed && isSelected
                          ? isCorrectAnswer
                            ? "clay-btn-emerald text-white"
                            : "bg-rose-500 text-white"
                          : isSelected
                          ? "clay-btn-amber text-white ring-2 ring-amber-400"
                          : "bg-white hover:bg-amber-100 text-amber-900 shadow border border-amber-200"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
