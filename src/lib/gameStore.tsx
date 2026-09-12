"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ScreenType, TeamId, TeamProfile } from "./types";
import { sound } from "./audio";

export interface GameContextType {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  goBack: () => void;
  canGoBack: boolean;
  activeTeam: TeamId;
  setActiveTeam: (team: TeamId) => void;
  switchTeam: () => void;
  teams: Record<TeamId, TeamProfile>;
  addScore: (amount: number, teamOverride?: TeamId) => void;
  ecosystemHealth: number;
  addHealth: (amount: number) => void;
  completedMissions: number[];
  completeMission: (missionNumber: number) => void;
  isMissionUnlocked: (missionNumber: number) => boolean;
  scorePop: { team: TeamId; amount: number; key: number } | null;
  turnAnnouncement: { team: TeamId; key: number } | null;
  showTurnAnnouncement: (team: TeamId) => void;
  isPaused: boolean;
  togglePause: () => void;
  jumpToMission: (screen: ScreenType) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  resetGame: () => void;
}

const initialTeams: Record<TeamId, TeamProfile> = {
  EXPLORERS: {
    id: "EXPLORERS",
    name: "Team Explorers",
    subtitle: "Discover • Investigate • Restore",
    badge: "wolf",
    color: "#2563eb",
    bgGradient: "from-blue-600 to-cyan-600",
    borderColor: "border-blue-500",
    score: 0,
  },
  GUARDIANS: {
    id: "GUARDIANS",
    name: "Team Guardians",
    subtitle: "Protect • Solve • Rebuild",
    badge: "tiger",
    color: "#ea580c",
    bgGradient: "from-orange-600 to-amber-600",
    borderColor: "border-orange-500",
    score: 0,
  },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("START");
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>([]);
  const [activeTeam, setActiveTeam] = useState<TeamId>("EXPLORERS");
  const [teams, setTeams] = useState<Record<TeamId, TeamProfile>>(initialTeams);
  const [ecosystemHealth, setEcosystemHealth] = useState<number>(20);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [scorePop, setScorePop] = useState<{ team: TeamId; amount: number; key: number } | null>(null);
  const [turnAnnouncement, setTurnAnnouncement] = useState<{ team: TeamId; key: number } | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const togglePause = () => {
    sound.playClick();
    setIsPaused((prev) => !prev);
  };

  const jumpToMission = (screen: ScreenType) => {
    sound.playClick();
    setIsPaused(false);
    setScreen(screen);
  };

  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const defaultFlow: ScreenType[] = [
    "START",
    "MISSION_INTRO",
    "TEAM_SELECT",
    "HOW_TO_PLAY",
    "MAP",
    "MISSION_1_INVESTIGATION",
    "MISSION_2_FOOD_CHAIN",
    "MISSION_3_DECAY",
    "MISSION_4_FOOD_WEB",
    "MISSION_5_FOOD_LAB",
    "ECO_CHALLENGE",
    "RISK_ROUND",
    "FINAL_CRISIS",
    "FINAL_RESULTS",
    "LEARNING_SUMMARY",
  ];

  const setScreen = (screen: ScreenType) => {
    sound.playClick();
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    sound.playClick();
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(prevScreen);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const currentIndex = defaultFlow.indexOf(currentScreen);
      if (currentIndex > 0) {
        setCurrentScreen(defaultFlow[currentIndex - 1]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const canGoBack = currentScreen !== "START" && (screenHistory.length > 0 || defaultFlow.indexOf(currentScreen) > 0);

  const showTurnAnnouncement = (team: TeamId) => {
    setActiveTeam(team);
    sound.playEnergyTick();
    setTurnAnnouncement({ team, key: Date.now() });
    setTimeout(() => {
      setTurnAnnouncement((current) => (current?.team === team ? null : current));
    }, 1800);
  };

  const switchTeam = () => {
    const nextTeam: TeamId = activeTeam === "EXPLORERS" ? "GUARDIANS" : "EXPLORERS";
    showTurnAnnouncement(nextTeam);
  };

  const addScore = (amount: number, teamOverride?: TeamId) => {
    const targetTeam = teamOverride || activeTeam;
    setTeams((prev) => ({
      ...prev,
      [targetTeam]: {
        ...prev[targetTeam],
        score: Math.max(0, prev[targetTeam].score + amount),
      },
    }));

    if (amount > 0) {
      sound.playEnergyTick();
    }
    setScorePop({ team: targetTeam, amount, key: Date.now() });

    setTimeout(() => {
      setScorePop(null);
    }, 1800);
  };

  const addHealth = (amount: number) => {
    setEcosystemHealth((prev) => {
      const next = Math.min(100, Math.max(0, prev + amount));
      if (next > prev) {
        sound.playRestoration();
      }
      return next;
    });
  };

  const completeMission = (missionNumber: number) => {
    setCompletedMissions((prev) => {
      if (prev.includes(missionNumber)) return prev;
      return [...prev, missionNumber];
    });
  };

  const isMissionUnlocked = (missionNumber: number) => {
    if (missionNumber === 1) return true;
    return completedMissions.includes(missionNumber - 1);
  };

  const resetGame = () => {
    setTeams(initialTeams);
    setEcosystemHealth(20);
    setCompletedMissions([]);
    setCurrentScreen("START");
    setScreenHistory([]);
    setActiveTeam("EXPLORERS");
    setIsPaused(false);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setScreen,
        goBack,
        canGoBack,
        activeTeam,
        setActiveTeam,
        switchTeam,
        teams,
        addScore,
        ecosystemHealth,
        addHealth,
        completedMissions,
        completeMission,
        isMissionUnlocked,
        scorePop,
        turnAnnouncement,
        showTurnAnnouncement,
        isPaused,
        togglePause,
        jumpToMission,
        soundEnabled,
        toggleSound,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
