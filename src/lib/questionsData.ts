import { MicrobeSample, Organism, FoodLabItem, ScenarioQuestion, TimedQuestion, RiskDilemma } from "./types";

export const MICROBE_SAMPLES: MicrobeSample[] = [
  {
    id: "sample_soil",
    name: "Rich Forest Soil",
    location: "Under fallen oak leaves",
    microorganism: "Bacteria",
    description: "Rod-shaped single-celled organism clustered around mineral particles.",
    visualColor: "#4ade80",
    shape: "bacillus",
    clues: [
      "Single-celled without a membrane-bound nucleus.",
      "Found in soil, water, air, and inside living things.",
      "Helps decompose dead organic matter and fixes nitrogen for plants.",
      "Microscopic in size, measured in micrometers."
    ],
    explanation: "Bacteria are microscopic single-celled organisms. Soil bacteria break down complex organic materials and recycle nitrogen into forms plants can absorb!"
  },
  {
    id: "sample_pond",
    name: "Murky Pond Water",
    location: "Wetland reed bank",
    microorganism: "Protozoa",
    description: "Active, motile single-celled organism with pulsating cilia.",
    visualColor: "#38bdf8",
    shape: "amoeboid",
    clues: [
      "Microscopic single-celled organism.",
      "Moves around actively using tiny hair-like cilia or pseudopodia.",
      "Hunts smaller bacteria and organic debris in water.",
      "Serves as crucial food for small aquatic insects."
    ],
    explanation: "Protozoa are microscopic animal-like single-celled organisms that graze on bacteria and keep bacterial populations in balance in aquatic ecosystems!"
  },
  {
    id: "sample_leaves",
    name: "Decomposing Leaf Litter",
    location: "Damp forest floor",
    microorganism: "Fungi",
    description: "Branching filament network (hyphae) releasing digestive enzymes.",
    visualColor: "#fbbf24",
    shape: "hyphae",
    clues: [
      "Forms vast underground networks of microscopic thread-like filaments called hyphae.",
      "Secretes digestive enzymes outside its cells to break down tough wood and cellulose.",
      "Does not perform photosynthesis.",
      "Can produce fruiting bodies like mushrooms."
    ],
    explanation: "Fungi are master decomposers! Their microscopic hyphae secrete potent enzymes that can break down tough lignin and cellulose that bacteria cannot digest alone."
  },
  {
    id: "sample_sunlit_pool",
    name: "Sunlit Water Surface",
    location: "Quiet creek pool",
    microorganism: "Algae",
    description: "Bright green microscopic cellular colonies containing chloroplasts.",
    visualColor: "#22c55e",
    shape: "flagellate",
    clues: [
      "Contains chlorophyll and performs photosynthesis.",
      "Produces a massive portion of the Earth's oxygen.",
      "Can be microscopic single cells or colonial filaments.",
      "Forms the base of aquatic food chains."
    ],
    explanation: "Microscopic algae are photosynthetic powerhouses! They capture sunlight to produce glucose and oxygen, sustaining aquatic food chains."
  }
];

export const FOOD_CHAIN_ORGANISMS: Organism[] = [
  { id: "grass", name: "Grass", type: "producer", icon: "🌱", description: "Captures solar energy via photosynthesis." },
  { id: "caterpillar", name: "Caterpillar", type: "herbivore", icon: "🐛", description: "Primary consumer eating leaves." },
  { id: "bird", name: "Songbird", type: "carnivore", icon: "🐦", description: "Secondary consumer hunting insects." },
  { id: "eagle", name: "Eagle", type: "apex", icon: "🦅", description: "Apex predator at top of the chain." },
  { id: "rabbit", name: "Rabbit", type: "herbivore", icon: "🐇", description: "Herbivore feeding on grass and shrubs." },
  { id: "snake", name: "Snake", type: "carnivore", icon: "🐍", description: "Predator feeding on small mammals & birds." },
  { id: "fungi", name: "Fungi", type: "decomposer", icon: "🍄", description: "Decomposes dead organic matter." },
  { id: "bacteria", name: "Bacteria", type: "decomposer", icon: "🦠", description: "Breaks nutrients down into the soil." }
];

export const WHAT_IF_SCENARIOS: ScenarioQuestion[] = [
  {
    id: "whatif_1",
    scenario: "Caterpillars suddenly disappear due to chemical pollution.",
    question: "What is the most immediate cascade effect on the ecosystem?",
    options: [
      {
        id: "opt_a",
        text: "Songbird populations decline due to lack of food, while plant leaves suffer less grazing.",
        isCorrect: true,
        explanation: "Correct! Songbirds lose their primary food source, causing starvation and nestling mortality, while plants temporarily grow unchecked."
      },
      {
        id: "opt_b",
        text: "Eagles immediately start eating grass to survive.",
        isCorrect: false,
        explanation: "Eagles are obligate carnivores with digestive tracts suited only for meat; they cannot digest cellulose or grass."
      },
      {
        id: "opt_c",
        text: "Bacteria stop reproducing completely.",
        isCorrect: false,
        explanation: "Bacteria have many food sources across the entire ecosystem and do not rely solely on caterpillars."
      }
    ]
  },
  {
    id: "whatif_2",
    scenario: "Severe drought causes all primary producers (plants and grass) to wither.",
    question: "How does the loss of producers affect the food chain?",
    options: [
      {
        id: "opt_a",
        text: "Only herbivores are affected; carnivores can survive on water alone.",
        isCorrect: false,
        explanation: "All organisms require chemical energy from food. When herbivores starve, carnivores soon have no prey."
      },
      {
        id: "opt_b",
        text: "The entire food chain collapses because producers are the only entry point for solar energy into biomass.",
        isCorrect: true,
        explanation: "Spot on! Producers convert sunlight into organic molecules. Without them, there is zero incoming energy for herbivores, carnivores, or apex predators."
      },
      {
        id: "opt_c",
        text: "Apex predators take over photosynthesis.",
        isCorrect: false,
        explanation: "Animals lack chloroplasts and chlorophyll and cannot perform photosynthesis."
      }
    ]
  },
  {
    id: "whatif_3",
    scenario: "Apex predators (like Eagles) are hunted to extinction in the valley.",
    question: "What ecological consequence is most likely to occur next?",
    options: [
      {
        id: "opt_a",
        text: "Herbivore and mesopredator populations boom unchecked, leading to overgrazing and habitat degradation.",
        isCorrect: true,
        explanation: "Exactly! This is a classic 'trophic cascade.' Without apex predators, herbivores overpopulate, destroy vegetative cover, and cause severe soil erosion."
      },
      {
        id: "opt_b",
        text: "All plants become toxic to protect themselves.",
        isCorrect: false,
        explanation: "Plant evolution occurs over many thousands of years; plants cannot spontaneously become toxic overnight."
      },
      {
        id: "opt_c",
        text: "Decomposition stops completely.",
        isCorrect: false,
        explanation: "Decomposition is driven by bacteria and fungi, which continue to break down dead matter."
      }
    ]
  }
];

export const DECAY_TIMELINE = [
  {
    day: 1,
    title: "Fresh Fallen Fruit",
    description: "Cellular structure intact, skin protective, sugars and water sealed inside.",
    visualEmoji: "🍎",
    decayState: "Fresh",
    microbeActivity: "Minimal external colonization"
  },
  {
    day: 3,
    title: "Initial Softening",
    description: "Microscopic punctures allow airborne wild yeasts and bacteria to enter.",
    visualEmoji: "🍎✨",
    decayState: "Early softening",
    microbeActivity: "Yeasts start fermenting surface fructose"
  },
  {
    day: 7,
    title: "Fungal Hyphae Penetration",
    description: "White and greenish mycelium spreads across the skin, releasing pectinase.",
    visualEmoji: "🍏🦠",
    decayState: "Mold outbreak",
    microbeActivity: "Fungi secretes enzymes to liquefy cell walls"
  },
  {
    day: 14,
    title: "Bacterial Liquefaction",
    description: "The apple shrivels and collapses into dark, soft organic mush.",
    visualEmoji: "🟤💧",
    decayState: "Advanced decay",
    microbeActivity: "Anaerobic and aerobic bacteria digest simple compounds"
  },
  {
    day: 30,
    title: "Rich Humus Formation",
    description: "The fruit has completely broken down into dark, crumbly nutrient-rich compost.",
    visualEmoji: "🌱🪨",
    decayState: "Nutrient integration",
    microbeActivity: "Nitrogen, phosphorus, and potassium returned to topsoil"
  }
];

export const NUTRIENT_CYCLE_STEPS = [
  { id: "step_1", label: "DEAD MATERIAL", icon: "🍂", desc: "Fallen leaves, dead animals & plant matter" },
  { id: "step_2", label: "MICROORGANISMS", icon: "🦠", desc: "Bacteria and fungi secrete enzymes" },
  { id: "step_3", label: "NUTRIENTS", icon: "🧪", desc: "Nitrates, phosphates & minerals released" },
  { id: "step_4", label: "HEALTHY SOIL", icon: "🪨", desc: "Rich humus holds moisture and minerals" },
  { id: "step_5", label: "GROWING PLANTS", icon: "🌳", desc: "Roots absorb nutrients for new growth" }
];

export const FOOD_LAB_ITEMS: FoodLabItem[] = [
  {
    id: "milk",
    food: "Yogurt & Kefir",
    icon: "🥛",
    correctMicrobe: "Lactic Acid Bacteria",
    correctProcess: "Lactic Fermentation",
    fact: "Lactobacillus bacteria ferment milk sugars (lactose) into lactic acid, which curds milk into creamy yogurt and prevents spoilage bacteria from growing!"
  },
  {
    id: "bread",
    food: "Fresh Baked Bread",
    icon: "🍞",
    correctMicrobe: "Yeast (Saccharomyces)",
    correctProcess: "Rising (CO₂ Production)",
    fact: "Yeast is a microscopic single-celled fungus! It consumes dough starches and exhales carbon dioxide gas bubbles that make the dough rise light and fluffy."
  },
  {
    id: "cheese",
    food: "Aged Blue Cheese",
    icon: "🧀",
    correctMicrobe: "Penicillium Mold",
    correctProcess: "Enzymatic Ripening",
    fact: "Helpful fungi like Penicillium roqueforti create distinctive blue veins and complex flavors through lipid-digesting enzymes."
  },
  {
    id: "pickles",
    food: "Crisp Fermented Pickles",
    icon: "🥒",
    correctMicrobe: "Lactic Acid Bacteria",
    correctProcess: "Anaerobic Pickling",
    fact: "In a salt brine, beneficial bacteria ferment cucumber sugars into lactic acid without any vinegar needed, preserving nutrients for months!"
  }
];

export const ECO_CHALLENGE_QUESTIONS: TimedQuestion[] = [
  {
    id: "q1",
    topic: "Decomposition",
    question: "What would happen if all decomposers (bacteria and fungi) suddenly died out?",
    options: [
      "Dead bodies and waste would pile up forever and plants would run out of nutrients",
      "Plants would grow much faster because bacteria aren't bothering them",
      "The ecosystem would have no change whatsoever",
      "Herbivores would become predators"
    ],
    correctIndex: 0,
    explanation: "Decomposers are Earth's recyclers. Without them, vital nutrients like nitrogen and phosphorus would stay trapped forever in dead matter!"
  },
  {
    id: "q2",
    topic: "Food Chains",
    question: "In an ecosystem food chain, what do arrows always represent?",
    options: [
      "Who is physically larger",
      "The direction of energy and nutrient transfer",
      "Which animal runs faster",
      "The migration path of herds"
    ],
    correctIndex: 1,
    explanation: "An arrow from Grass → Rabbit means chemical energy flows FROM the grass INTO the rabbit."
  },
  {
    id: "q3",
    topic: "Microbiology",
    question: "Which of the following organisms is a microscopic single-celled fungus?",
    options: [
      "Baker's Yeast",
      "Earthworm",
      "Green Moss",
      "Honeybee"
    ],
    correctIndex: 0,
    explanation: "Yeast is a microscopic fungus used for bread baking and brewing."
  },
  {
    id: "q4",
    topic: "Nutrient Recycling",
    question: "Which gas is released when yeast cells respire during bread dough rising?",
    options: [
      "Carbon Dioxide (CO₂)",
      "Helium",
      "Chlorine",
      "Methane"
    ],
    correctIndex: 0,
    explanation: "Yeast produces carbon dioxide gas bubbles, which expand in the gluten network to create soft, airy bread."
  },
  {
    id: "q5",
    topic: "Ecosystems",
    question: "Why are food webs considered more realistic models than single food chains?",
    options: [
      "Animals usually eat more than one kind of food and are eaten by multiple predators",
      "Food webs look nicer in textbooks",
      "Food webs only include animals that live underground",
      "Food webs do not have any plants"
    ],
    correctIndex: 0,
    explanation: "In nature, species are interconnected in complex webs with multiple feeding pathways, providing ecosystem resilience."
  },
  {
    id: "q6",
    topic: "Microorganisms",
    question: "Are all bacteria harmful and cause sickness to humans and nature?",
    options: [
      "No! The vast majority are harmless or essential for digestion, soil fertility, and food production",
      "Yes, all bacteria are deadly pathogens",
      "Only water bacteria are good, all soil bacteria are dangerous",
      "Bacteria have no impact on the living world"
    ],
    correctIndex: 0,
    explanation: "Over 99% of bacterial species are beneficial or harmless, performing critical jobs like soil enrichment, vitamin synthesis, and nutrient cycles!"
  }
];

export const RISK_ROUND_DILEMMAS: RiskDilemma[] = [
  {
    id: "dilemma_1",
    title: "The River Dam Dilemma",
    context: "A proposed concrete dam will generate hydroelectric power but will block salmon from swimming upstream to spawn, starving mountain eagles and bears whose scraps feed forest floor microbes.",
    question: "What is the most ecologically sound restoration compromise?",
    options: [
      {
        text: "Install engineered fish ladders and bypass streams to preserve the aquatic-terrestrial nutrient bridge.",
        isCorrect: true,
        consequence: "Masterful strategy! Fish ladders allow salmon to migrate, preserving the marine nitrogen cycle that enriches forest microbes!"
      },
      {
        text: "Remove all bears and eagles from the valley so they don't starve.",
        isCorrect: false,
        consequence: "Catastrophic! Removing apex predators destabilizes the entire food web, destroying biodiversity."
      },
      {
        text: "Drain the entire river basin completely into concrete canals.",
        isCorrect: false,
        consequence: "Devastating! Total loss of aquatic and riparian ecosystem balance."
      }
    ]
  },
  {
    id: "dilemma_2",
    title: "The Soil Sterilization Crisis",
    context: "Farmers want to spray broad-spectrum chemical fumigants to kill a single crop pest, but this will also wipe out 99% of beneficial mycorrhizal fungi and nitrogen-fixing bacteria.",
    question: "What is the consequence of wiping out subterranean microorganisms?",
    options: [
      {
        text: "The soil becomes sterile dust, losing natural nutrient cycling, requiring artificial fertilizers and washing away in rain.",
        isCorrect: true,
        consequence: "Spot on! Healthy soil is a living biological sponge. Without microbes, organic humus collapses into lifeless dirt."
      },
      {
        text: "Crops will grow five times larger because there are zero microbes.",
        isCorrect: false,
        consequence: "Incorrect! Crops depend on symbiotic microbes to dissolve phosphates and capture nitrogen."
      },
      {
        text: "Fungi will turn into insects to survive.",
        isCorrect: false,
        consequence: "Biologically impossible! Fungi and insects belong to completely different biological kingdoms."
      }
    ]
  }
];

export const CRISIS_TASKS = [
  {
    id: 1,
    title: "Identify & Inoculate Microorganisms",
    desc: "Reintroduce soil bacteria and mycorrhizal fungi to the lifeless, compacted dirt.",
    healthGain: 16,
    icon: "🦠",
    solution: "Deploy Rhizobium & Mycorrhizae",
    detail: "Microbes reactivate mineral decomposition and mycorrhizal networks connect tree roots!"
  },
  {
    id: 2,
    title: "Repair the Primary Food Chain",
    desc: "Plant native wild grasses and reintroduce primary insect pollinators and caterpillars.",
    healthGain: 16,
    icon: "🌱",
    solution: "Re-establish Producers & Herbivores",
    detail: "Photosynthesis resumes! Solar energy now converts into biomass for primary consumers."
  },
  {
    id: 3,
    title: "Reactivate Forest Floor Decomposition",
    desc: "Distribute dead leaf mulch and woody debris to feed fungal decomposers.",
    healthGain: 16,
    icon: "🍂",
    solution: "Kickstart Nutrient Humus Cycling",
    detail: "Decomposers break down rotting matter, returning essential nitrates and phosphorus into the soil!"
  },
  {
    id: 4,
    title: "Rewire Food Web Interconnections",
    desc: "Reintroduce songbirds, frogs, and control predators to complete trophic links.",
    healthGain: 16,
    icon: "🕸",
    solution: "Rebalance Multi-Trophic Stability",
    detail: "Predator-prey balance prevents pest blooms and sustains biological diversity across all tiers."
  },
  {
    id: 5,
    title: "Enforce Keystone Species Protection",
    desc: "Protect the apex eagle and wetland water quality against industrial runoff.",
    healthGain: 16,
    icon: "🦅",
    solution: "Achieve 100% Biosphere Equilibrium",
    detail: "The watershed is pristine! Clean water flows, canopy greens, wildlife returns, and microbial networks thrive."
  }
];
