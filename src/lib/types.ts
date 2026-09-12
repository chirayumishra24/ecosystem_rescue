export type ScreenType =
  | "START"
  | "MISSION_INTRO"
  | "TEAM_SELECT"
  | "HOW_TO_PLAY"
  | "MAP"
  | "MISSION_1_INVESTIGATION"
  | "MISSION_1_CLUES"
  | "MISSION_2_FOOD_CHAIN"
  | "MISSION_2_WHAT_IF"
  | "MISSION_3_DECAY"
  | "MISSION_3_NUTRIENT_CYCLE"
  | "MISSION_4_FOOD_WEB"
  | "MISSION_4_CRISIS"
  | "MISSION_5_FOOD_LAB"
  | "ECO_CHALLENGE"
  | "RISK_ROUND"
  | "FINAL_CRISIS"
  | "FINAL_RESULTS"
  | "LEARNING_SUMMARY";

export type TeamId = "EXPLORERS" | "GUARDIANS";

export interface TeamProfile {
  id: TeamId;
  name: string;
  subtitle: string;
  badge: "wolf" | "tiger";
  color: string;
  bgGradient: string;
  borderColor: string;
  score: number;
}

export interface Organism {
  id: string;
  name: string;
  type: "producer" | "herbivore" | "carnivore" | "apex" | "decomposer";
  icon: string;
  description: string;
}

export interface MicrobeSample {
  id: string;
  name: string;
  location: string;
  microorganism: "Bacteria" | "Fungi" | "Protozoa" | "Algae";
  description: string;
  visualColor: string;
  shape: "bacillus" | "hyphae" | "amoeboid" | "flagellate";
  clues: string[];
  explanation: string;
}

export interface FoodLabItem {
  id: string;
  food: string;
  icon: string;
  correctMicrobe: string;
  correctProcess: string;
  fact: string;
}

export interface ScenarioQuestion {
  id: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface TimedQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RiskDilemma {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    consequence: string;
  }[];
}
