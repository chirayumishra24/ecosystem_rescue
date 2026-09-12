"use client";

import React, { useState } from "react";
import { useGame } from "@/lib/gameStore";
import { FeedbackModal } from "../ui/Modal";
import { sound } from "@/lib/audio";
import { RefreshCw, Check, Zap, AlertTriangle, ShieldAlert } from "lucide-react";
import { EcoHeroGuide } from "@/components/ui/EcoHeroGuide";

interface NodeItem {
  id: string;
  name: string;
  icon: string;
  x: number; // percentage in canvas
  y: number;
  tier: "producer" | "primary" | "secondary" | "apex" | "decomposer";
}

const WEB_NODES: NodeItem[] = [
  { id: "plants", name: "Plants", icon: "🌱", x: 18, y: 78, tier: "producer" },
  { id: "insects", name: "Insects", icon: "🦗", x: 38, y: 60, tier: "primary" },
  { id: "rabbit", name: "Rabbit", icon: "🐇", x: 20, y: 45, tier: "primary" },
  { id: "mouse", name: "Mouse", icon: "🐭", x: 42, y: 40, tier: "primary" },
  { id: "frog", name: "Frog", icon: "🐸", x: 55, y: 68, tier: "secondary" },
  { id: "bird", name: "Songbird", icon: "🐦", x: 60, y: 35, tier: "secondary" },
  { id: "snake", name: "Snake", icon: "🐍", x: 75, y: 55, tier: "secondary" },
  { id: "eagle", name: "Eagle", icon: "🦅", x: 82, y: 22, tier: "apex" },
  { id: "fungi", name: "Fungi", icon: "🍄", x: 40, y: 88, tier: "decomposer" },
  { id: "bacteria", name: "Bacteria", icon: "🦠", x: 65, y: 88, tier: "decomposer" },
];

const VALID_CONNECTIONS: [string, string][] = [
  ["plants", "insects"],
  ["plants", "rabbit"],
  ["plants", "mouse"],
  ["insects", "frog"],
  ["insects", "bird"],
  ["mouse", "snake"],
  ["frog", "snake"],
  ["rabbit", "eagle"],
  ["bird", "eagle"],
  ["snake", "eagle"],
  ["plants", "fungi"],
  ["insects", "bacteria"],
  ["eagle", "bacteria"],
];

export const Mission4FoodWeb: React.FC = () => {
  const { setScreen, addScore, addHealth, completeMission } = useGame();

  // Active connections drawn by student [sourceId, targetId]
  const [connections, setConnections] = useState<[string, string][]>([
    ["plants", "insects"],
    ["insects", "frog"],
    ["plants", "rabbit"],
  ]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [webVerified, setWebVerified] = useState<boolean>(false);

  // Crisis simulation modes: null | "no_insects" | "no_decomposers" | "no_producers"
  const [crisisMode, setCrisisMode] = useState<string | null>(null);

  // Modal feedback
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIsCorrect, setModalIsCorrect] = useState<boolean>(false);
  const [modalExplanation, setModalExplanation] = useState<string>("");

  const handleNodeClick = (nodeId: string) => {
    sound.playClick();
    if (!selectedNode) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      // Create link from selectedNode -> nodeId
      const exists = connections.some(
        ([a, b]) =>
          (a === selectedNode && b === nodeId) ||
          (a === nodeId && b === selectedNode)
      );

      if (!exists) {
        setConnections((prev) => [...prev, [selectedNode, nodeId]]);
      }
      setSelectedNode(null);
    }
  };

  const handleResetConnections = () => {
    sound.playClick();
    setConnections([
      ["plants", "insects"],
      ["insects", "frog"],
    ]);
    setWebVerified(false);
  };

  const handleVerifyWeb = () => {
    // Check if at least 7 valid links have been restored
    const validCount = connections.filter(([a, b]) =>
      VALID_CONNECTIONS.some(
        ([va, vb]) => (va === a && vb === b) || (va === b && vb === a)
      )
    ).length;

    if (validCount >= 7) {
      sound.playCorrect();
      setWebVerified(true);
      addScore(200);
      addHealth(12);
      setModalIsCorrect(true);
      setModalExplanation(
        "Magnificent food web wiring! Because organisms consume multiple food sources, food webs offer ecological resilience. If one species fluctuates, predators can switch prey, maintaining system balance!"
      );
      setModalOpen(true);
    } else {
      sound.playIncorrect();
      setModalIsCorrect(false);
      setModalExplanation(
        "Your food web needs a few more connections. Click a source organism (like Plants or Insects) and then click an organism that consumes it (like Mouse, Bird, Frog, Snake, or Eagle)!"
      );
      setModalOpen(true);
    }
  };

  const handleSimulateCrisis = (type: string) => {
    sound.playClick();
    setCrisisMode(type);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="clay-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1">
            <span className="clay-pill bg-emerald-100 text-emerald-800 text-[11px]">MISSION 4 • COMPLEX FOOD WEBS & BIODIVERSITY</span>
            <span className="clay-pill bg-amber-100 text-amber-800 text-[11px]">+200 ⚡ ECO ENERGY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
            Food Web Rescue & Interconnection Canvas
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            Click any organism, then click another organism to draw the trophic feeding relationship!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetConnections}
            className="clay-pill bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-black flex items-center gap-1.5 px-3.5 py-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Links</span>
          </button>
          <button
            onClick={handleVerifyWeb}
            className="clay-btn clay-btn-emerald flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-black uppercase tracking-wider"
          >
            <Check className="w-4 h-4" />
            <span>Verify Web</span>
          </button>
        </div>
      </div>

      {/* Captain Eco Directive */}
      <EcoHeroGuide
        emotion="web"
        missionName="Mission 4 Directive"
        title="Biodiversity Food Web Construction & Keystone Stability"
        objective="Unlike linear food chains, ecosystems rely on complex, interconnected food webs. If one prey species declines, predators adapt by eating alternative prey—unless keystone species collapse!"
        steps={[
          "Click an organism (prey/food source), then click another organism (predator) to draw a glowing feeding arrow.",
          "Ensure primary producers (Plants) connect to herbivores (Insects, Rabbits, Mice).",
          "Connect secondary consumers (Birds, Frogs, Snakes) up to the apex predator (Eagle).",
          "Don't forget decomposers (Fungi and Bacteria) who recycle organic remains from all levels!"
        ]}
        proTip="The greater the number of interconnected feeding links, the more resilient the ecosystem is against disease and environmental disturbances!"
      />

      {/* Main Interactive Canvas Area */}
      <div className="relative w-full aspect-[16/10] max-h-[520px] clay-inset rounded-3xl overflow-hidden p-4 sm:p-6 mb-6 bg-gradient-to-b from-sky-50/80 via-emerald-50/50 to-amber-50/60 border-2 border-emerald-200/60">
        {/* SVG Connections Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {connections.map(([fromId, toId], idx) => {
            const fromNode = WEB_NODES.find((n) => n.id === fromId);
            const toNode = WEB_NODES.find((n) => n.id === toId);
            if (!fromNode || !toNode) return null;

            const isFailing =
              (crisisMode === "no_insects" && (fromId === "insects" || toId === "insects")) ||
              (crisisMode === "no_decomposers" && (fromNode.tier === "decomposer" || toNode.tier === "decomposer")) ||
              (crisisMode === "no_producers" && (fromId === "plants" || toId === "plants"));

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isFailing ? "#e11d48" : "url(#webGradient)"}
                strokeWidth={isFailing ? "3.5" : "3"}
                strokeDasharray={isFailing ? "6 6" : "none"}
                className={isFailing ? "animate-pulse" : ""}
                opacity={isFailing ? 0.9 : 0.85}
              />
            );
          })}
        </svg>

        {/* Nodes layer */}
        {WEB_NODES.map((node) => {
          const isSelected = selectedNode === node.id;
          const isDistressed =
            (crisisMode === "no_insects" && (node.id === "insects" || node.id === "frog" || node.id === "bird")) ||
            (crisisMode === "no_decomposers" && node.tier === "decomposer") ||
            (crisisMode === "no_producers" && node.id === "plants");

          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group flex flex-col items-center select-none transition-all duration-300 ${
                isSelected ? "scale-125 z-30" : "hover:scale-110 active:scale-95"
              }`}
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center text-2xl sm:text-3xl transition-all shadow-md ${
                  isDistressed
                    ? "bg-rose-100 border-2 border-rose-500 shadow-rose-300/60 animate-bounce"
                    : isSelected
                    ? "clay-btn-blue text-white ring-4 ring-blue-300"
                    : node.tier === "producer"
                    ? "clay-card bg-emerald-50 border-2 border-emerald-300"
                    : node.tier === "decomposer"
                    ? "clay-card bg-amber-50 border-2 border-amber-300"
                    : node.tier === "apex"
                    ? "clay-card bg-purple-50 border-2 border-purple-300"
                    : "clay-card bg-white border-2 border-slate-200"
                }`}
              >
                <span>{node.icon}</span>
              </div>
              <span
                className={`text-[11px] sm:text-xs font-black mt-1 px-2.5 py-0.5 rounded-full shadow-sm ${
                  isDistressed
                    ? "text-rose-800 bg-rose-100 border border-rose-300"
                    : "text-slate-800 clay-card text-[11px]"
                }`}
              >
                {node.name}
              </span>
            </div>
          );
        })}

        {/* Selected helper indicator */}
        {selectedNode && (
          <div className="absolute top-4 left-4 clay-card bg-blue-50 text-blue-900 border-2 border-blue-400 px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-md animate-pulse">
            Linking from: {WEB_NODES.find((n) => n.id === selectedNode)?.name} → Click recipient organism
          </div>
        )}
      </div>

      {/* Crisis Stress-Test Control Bar */}
      <div className="clay-card p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Food Web Crisis Simulation Tests</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSimulateCrisis("no_insects")}
            className={`p-3.5 rounded-2xl text-left text-xs transition active:scale-95 ${
              crisisMode === "no_insects"
                ? "bg-rose-100 border-2 border-rose-500 text-rose-900 font-bold shadow-md"
                : "clay-card hover:bg-slate-50 text-slate-700"
            }`}
          >
            <span className="font-black block text-sm mb-0.5 text-slate-900">🦗 Pesticide Outbreak</span>
            Insects collapse: Watch frogs and songbirds lose their primary food!
          </button>

          <button
            onClick={() => handleSimulateCrisis("no_decomposers")}
            className={`p-3.5 rounded-2xl text-left text-xs transition active:scale-95 ${
              crisisMode === "no_decomposers"
                ? "bg-rose-100 border-2 border-rose-500 text-rose-900 font-bold shadow-md"
                : "clay-card hover:bg-slate-50 text-slate-700"
            }`}
          >
            <span className="font-black block text-sm mb-0.5 text-slate-900">🦠 Microbial Extinction</span>
            Decomposers die: Nutrients remain locked, stalling plant renewal!
          </button>

          <button
            onClick={() => setCrisisMode(null)}
            className="p-3.5 rounded-2xl clay-card bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-left text-xs transition active:scale-95 border-2 border-emerald-300"
          >
            <span className="font-black block text-sm mb-0.5 text-emerald-950">✨ Clear Disruption</span>
            Restore all trophic links and observe interconnected equilibrium.
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={modalOpen}
        isCorrect={modalIsCorrect}
        pointsAwarded={200}
        explanation={modalExplanation}
        onNext={() => {
          setModalOpen(false);
          completeMission(4);
          setScreen("MISSION_5_FOOD_LAB");
        }}
        nextButtonText="Enter Microbe Food Lab →"
      />
    </div>
  );
};
