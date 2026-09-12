"use client";

import React from "react";
import { useGame } from "@/lib/gameStore";
import { Navbar } from "@/components/ui/Navbar";
import { StartScreen } from "@/components/screens/StartScreen";
import { IntroScreen } from "@/components/screens/IntroScreen";
import { TeamSelectScreen } from "@/components/screens/TeamSelectScreen";
import { HowToPlayScreen } from "@/components/screens/HowToPlayScreen";
import { MapScreen } from "@/components/screens/MapScreen";
import { Mission1Microbe } from "@/components/missions/Mission1Microbe";
import { Mission2FoodChain } from "@/components/missions/Mission2FoodChain";
import { Mission3Decay } from "@/components/missions/Mission3Decay";
import { Mission4FoodWeb } from "@/components/missions/Mission4FoodWeb";
import { Mission5FoodLab } from "@/components/missions/Mission5FoodLab";
import { EcoChallenge } from "@/components/missions/EcoChallenge";
import { RiskRound } from "@/components/missions/RiskRound";
import { FinalCrisis } from "@/components/missions/FinalCrisis";
import { FinalResultsScreen } from "@/components/screens/FinalResultsScreen";
import { LearningSummaryScreen } from "@/components/screens/LearningSummaryScreen";
import { BackgroundDecorations } from "@/components/ui/BackgroundDecorations";

export default function Home() {
  const { currentScreen } = useGame();

  const renderScreen = () => {
    switch (currentScreen) {
      case "START":
        return <StartScreen />;
      case "MISSION_INTRO":
        return <IntroScreen />;
      case "TEAM_SELECT":
        return <TeamSelectScreen />;
      case "HOW_TO_PLAY":
        return <HowToPlayScreen />;
      case "MAP":
        return <MapScreen />;
      case "MISSION_1_INVESTIGATION":
      case "MISSION_1_CLUES":
        return <Mission1Microbe />;
      case "MISSION_2_FOOD_CHAIN":
      case "MISSION_2_WHAT_IF":
        return <Mission2FoodChain />;
      case "MISSION_3_DECAY":
      case "MISSION_3_NUTRIENT_CYCLE":
        return <Mission3Decay />;
      case "MISSION_4_FOOD_WEB":
      case "MISSION_4_CRISIS":
        return <Mission4FoodWeb />;
      case "MISSION_5_FOOD_LAB":
        return <Mission5FoodLab />;
      case "ECO_CHALLENGE":
        return <EcoChallenge />;
      case "RISK_ROUND":
        return <RiskRound />;
      case "FINAL_CRISIS":
        return <FinalCrisis />;
      case "FINAL_RESULTS":
        return <FinalResultsScreen />;
      case "LEARNING_SUMMARY":
        return <LearningSummaryScreen />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative text-slate-800">
      <BackgroundDecorations />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 w-full">{renderScreen()}</div>
      </div>
    </main>
  );
}
