"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { CRISIS_TASKS } from "@/lib/questionsData";
import { BiosphereCanvas } from "../3d/BiosphereCanvas";
import { sound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { AlertCircle, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Zap } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

export const FinalCrisis: React.FC = () => {
  const { setScreen, ecosystemHealth, addHealth, addScore, completeMission } = useGame();

  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);
  const [isFullyRestored, setIsFullyRestored] = useState<boolean>(ecosystemHealth >= 100);

  const currentTask = CRISIS_TASKS[activeTaskIndex];

  const handleResolveTask = () => {
    sound.playCorrect();
    sound.playRestoration();

    const nextCompleted = [...completedTaskIds, currentTask.id];
    setCompletedTaskIds(nextCompleted);
    addHealth(currentTask.healthGain);
    addScore(100, "EXPLORERS");
    addScore(100, "GUARDIANS");

    if (nextCompleted.length === CRISIS_TASKS.length || ecosystemHealth + currentTask.healthGain >= 100) {
      setIsFullyRestored(true);
      completeMission(6);
      sound.playFanfare();

      // Fire victory confetti fireworks
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 150,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 150,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
    } else {
      setActiveTaskIndex((prev) => Math.min(CRISIS_TASKS.length - 1, prev + 1));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Emergency Header */}
      <div className="clay-card p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="clay-pill bg-emerald-100 text-emerald-900 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Final Ecological Restoration Phase</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800">
              {isFullyRestored ? "🌎 ECOSYSTEM RESTORED!" : "🚨 FINAL ECOSYSTEM CRISIS"}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
              Complete the 5 restorative interventions to bring the biosphere back to 100% vital equilibrium!
            </p>
          </div>

          {/* Health Gauge */}
          <div className="clay-inset p-4 rounded-2xl bg-amber-50/70 flex flex-col items-center min-w-[120px]">
            <span className="text-xs font-bold text-slate-500 uppercase">Biosphere Health</span>
            <span
              className={`text-3xl font-black ${
                ecosystemHealth >= 100 ? "text-emerald-700 animate-pulse" : "text-amber-700"
              }`}
            >
              {ecosystemHealth}%
            </span>
          </div>
        </div>
      </div>

      {/* Captain Eco Directive */}
      <EcoHeroGuide
        emotion="crisis"
        missionName="Emergency Protocol Directive"
        title="Final Planetary Rescue & Biosphere Restoration"
        objective="This is the decisive moment! Deploy targeted ecological restorations across all 4 key biomes: detoxify waterways, reintroduce apex predators, reseed soil bacteria, and balance consumer populations."
        steps={[
          "Both teams unite your accumulated scientific knowledge for collaborative planet rescue.",
          "Click each Restorative Intervention to implement evidence-based ecological solutions.",
          "Every successful restoration awards +100⚡ Eco Energy to both teams simultaneously!",
          "Achieve 100% Biosphere Health to trigger the planetary victory celebration!"
        ]}
        proTip="Watch the 3D living biosphere in real time: as health reaches 100%, dead grey soil transforms into lush greenery and sparkling rivers!"
      />

      {/* Main Grid: 3D Biosphere Canvas + 5 Restorative Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
        {/* Left: 3D Interactive Restoring Biosphere (7 Cols) */}
        <div className="lg:col-span-7 clay-card p-5 sm:p-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 text-xs font-black text-slate-600">
            <span>Dynamic Biosphere Simulation</span>
            <span className="text-emerald-700 font-black">
              {ecosystemHealth >= 100 ? "Vibrant & Self-Sustaining ✓" : "Healing In Progress..."}
            </span>
          </div>

          <div className="clay-card p-2 rounded-3xl bg-white/80 shadow-inner w-full flex justify-center border-2 border-white">
            <BiosphereCanvas health={ecosystemHealth} />
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-xs font-bold">
            <div className="clay-inset p-2 rounded-xl bg-white/70 text-slate-700">
              🌱 Grass: {ecosystemHealth > 40 ? "Lush" : "Sparse"}
            </div>
            <div className="clay-inset p-2 rounded-xl bg-white/70 text-slate-700">
              💧 Water: {ecosystemHealth > 60 ? "Crystal" : "Turbid"}
            </div>
            <div className="clay-inset p-2 rounded-xl bg-white/70 text-slate-700">
              🦌 Fauna: {ecosystemHealth > 80 ? "Abundant" : "Scattered"}
            </div>
            <div className="clay-inset p-2 rounded-xl bg-white/70 text-slate-700">
              🦠 Microbes: {ecosystemHealth >= 100 ? "Flourishing" : "Recovering"}
            </div>
          </div>
        </div>

        {/* Right: 5 Crisis Tasks Checklist (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="clay-card p-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-teal-800 mb-3">
              Restoration Action Items ({completedTaskIds.length}/5 Completed)
            </h3>

            <div className="space-y-2.5">
              {CRISIS_TASKS.map((task, idx) => {
                const isCompleted = completedTaskIds.includes(task.id);
                const isCurrent = idx === activeTaskIndex && !isCompleted;

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl transition-all ${
                      isCompleted
                        ? "clay-card bg-emerald-50/80 border-2 border-emerald-300 text-emerald-900"
                        : isCurrent
                        ? "clay-card bg-white border-2 border-teal-400 ring-2 ring-teal-200"
                        : "clay-inset bg-slate-100 text-slate-400 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{task.icon}</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-800">{task.title}</h4>
                          <span className="text-[10px] font-bold text-teal-700">{task.desc}</span>
                        </div>
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : isCurrent ? (
                        <span className="text-[10px] font-black uppercase bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full border border-teal-300 animate-pulse">
                          Active
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Card */}
          {!isFullyRestored ? (
            <div className="clay-card p-5">
              <div className="text-xs font-black uppercase text-amber-700 mb-1">
                Active Intervention Task #{currentTask.id}
              </div>
              <h4 className="text-base font-black text-slate-800 mb-1">{currentTask.title}</h4>
              <p className="text-xs font-bold text-slate-600 mb-4">{currentTask.detail}</p>

              <button
                onClick={handleResolveTask}
                className="clay-btn clay-btn-emerald w-full py-3.5 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Execute: {currentTask.solution} (+16% Health)</span>
              </button>
            </div>
          ) : (
            <div className="clay-card p-6 text-center animate-fadeIn bg-emerald-50/70 border-2 border-emerald-300">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-black text-emerald-900 mb-1">
                Ecosystem 100% Restored!
              </h3>
              <p className="text-xs font-bold text-slate-600 mb-5">
                All trophic tiers, decomposing fungi, nitrogen-fixing bacteria, and watersheds are fully rehabilitated.
              </p>

              <button
                onClick={() => setScreen("FINAL_RESULTS")}
                className="clay-btn clay-btn-emerald w-full py-4 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>CROWN THE WINNER & VIEW SCORES</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
