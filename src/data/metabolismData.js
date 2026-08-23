// Krebs Cycle 8-Step Data
export const KREBS_STEPS = [
  {
    step: 1,
    name: "Citrate Synthesis",
    substrate: "Acetyl-CoA (2C) + Oxaloacetate (4C)",
    product: "Citrate (6C)",
    enzyme: "Citrate Synthase",
    emoji: "🍋",
    byproducts: ["CoA-SH (Recycled)"],
    description: "The 2-carbon Acetyl-CoA (from fat or pyruvate) combines with 4-carbon Oxaloacetate to form 6-carbon Citrate. This is the official entry gate to the Krebs Cycle!",
    zone2Highlight: "In Zone 2, Acetyl-CoA from Beta-Oxidation continuously enters here without backing up."
  },
  {
    step: 2,
    name: "Isomerization to Isocitrate",
    substrate: "Citrate (6C)",
    product: "Isocitrate (6C)",
    enzyme: "Aconitase",
    emoji: "🔄",
    byproducts: ["H₂O Rearrangement"],
    description: "Citrate is rearranged into its isomer Isocitrate by moving a hydroxyl group, preparing the molecule for energy extraction.",
    zone2Highlight: "Quick rearrangement step keeping the cycle fluid."
  },
  {
    step: 3,
    name: "First Oxidation & CO₂ Release",
    substrate: "Isocitrate (6C)",
    product: "α-Ketoglutarate (5C)",
    enzyme: "Isocitrate Dehydrogenase",
    emoji: "🔋",
    byproducts: ["1x NADH", "1x CO₂ 💨"],
    description: "Isocitrate is oxidized to 5-carbon α-Ketoglutarate. High-energy electrons are stripped onto NAD+ to form 1 NADH, and the first CO₂ gas molecule is released as exhaust!",
    zone2Highlight: "Key rate-limiting step! High ADP in Zone 2 stimulates this enzyme to keep turning."
  },
  {
    step: 4,
    name: "Second Oxidation & CO₂ Release",
    substrate: "α-Ketoglutarate (5C)",
    product: "Succinyl-CoA (4C)",
    enzyme: "α-Ketoglutarate Dehydrogenase",
    emoji: "💨",
    byproducts: ["1x NADH", "1x CO₂ 💨"],
    description: "Another carbon is stripped as CO₂ gas, generating a second NADH battery. Coenzyme A attaches to form 4-carbon Succinyl-CoA.",
    zone2Highlight: "All 2 carbons from the original Acetyl-CoA have now been fully released as CO₂ exhaust!"
  },
  {
    step: 5,
    name: "Substrate-Level ATP Generation",
    substrate: "Succinyl-CoA (4C)",
    product: "Succinate (4C)",
    enzyme: "Succinyl-CoA Synthetase",
    emoji: "⚡",
    byproducts: ["1x GTP → 1x ATP ⚡"],
    description: "The high-energy thioester bond of Succinyl-CoA is cleaved, directly producing 1 ATP (via GTP intermediate).",
    zone2Highlight: "Direct ATP production inside the matrix without needing the Electron Transport Chain!"
  },
  {
    step: 6,
    name: "Succinate Oxidation to Fumarate",
    substrate: "Succinate (4C)",
    product: "Fumarate (4C)",
    enzyme: "Succinate Dehydrogenase (Complex II)",
    emoji: "⚡",
    byproducts: ["1x FADH₂ 🔋"],
    description: "Succinate is oxidized to Fumarate. Electrons are transferred to FAD, creating FADH₂. Note: This enzyme IS Complex II of the Electron Transport Chain!",
    zone2Highlight: "Direct physical bridge between the Krebs Cycle and the Electron Transport Chain!"
  },
  {
    step: 7,
    name: "Hydration to Malate",
    substrate: "Fumarate (4C)",
    product: "Malate (4C)",
    enzyme: "Fumarase",
    emoji: "💧",
    byproducts: ["1x H₂O Consumed 💧"],
    description: "Water (H₂O) is added across the double bond of Fumarate to form Malate.",
    zone2Highlight: "Consumes a water molecule to prepare for the final electron extraction."
  },
  {
    step: 8,
    name: "Regeneration of Oxaloacetate",
    substrate: "Malate (4C)",
    product: "Oxaloacetate (4C)",
    enzyme: "Malate Dehydrogenase",
    emoji: "🔑",
    byproducts: ["1x NADH 🔋"],
    description: "Malate is oxidized back into 4-carbon Oxaloacetate, generating a 3rd NADH battery. Oxaloacetate is now ready to receive the next Acetyl-CoA ticket!",
    zone2Highlight: "Completes the circle! Total yield per turn: 3 NADH + 1 FADH₂ + 1 ATP + 2 CO₂."
  }
];

// Zone definitions and physiological parameters
export const ZONES = [
  {
    id: 1,
    name: "Zone 1",
    label: "Active Recovery",
    hrRange: "50-60% HRmax",
    color: "emerald",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    glowColor: "rgba(16, 185, 129, 0.4)",
    fatOxidation: 85, // % fuel from fat
    carbOxidation: 15,
    fatOxidationRate: 0.35, // g/min
    lactate: 1.1, // mmol/L
    atpSpeed: 0.4,
    o2Demand: "Low & Easy (~0.8 L/min O2)",
    conversationalText: "🗣️ Can sing a song or chat effortlessly without losing breath.",
    metabolicState: "Low energy demand. Muscle cells easily rely almost entirely on fatty acids.",
    pyruvateFate: "100% enters mitochondria cleanly.",
    lactateStatus: "Baseline (No accumulation)."
  },
  {
    id: 2,
    name: "Zone 2",
    label: "Aerobic Base (FATmax)",
    hrRange: "60-70% HRmax",
    color: "teal",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    glowColor: "rgba(20, 184, 166, 0.5)",
    fatOxidation: 75,
    carbOxidation: 25,
    fatOxidationRate: 0.65, // Maximum absolute fat burning (FATmax!)
    lactate: 1.6, // Steady around ~1.5 - 2.0 mmol/L (below Aerobic Threshold / LT1)
    atpSpeed: 0.75,
    o2Demand: "Optimal Steady State (~1.8 - 2.4 L/min O2)",
    conversationalText: "🗣️ Comfortable conversational pace. You can talk in full sentences continuously.",
    metabolicState: "🔥 Peak Fat Oxidation (FATmax)! Mitochondria are fully engaged in Beta-Oxidation & Krebs Cycle.",
    pyruvateFate: "Pyruvate is fully shuttled into mitochondria via PDH. Zero excess lactate spillover.",
    lactateStatus: "Optimal clearance. Type I (slow-twitch) fibers consume any stray lactate as fuel!"
  },
  {
    id: 3,
    name: "Zone 3",
    label: "Tempo / Aerobic Transition",
    hrRange: "70-80% HRmax",
    color: "amber",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    glowColor: "rgba(245, 158, 11, 0.5)",
    fatOxidation: 45,
    carbOxidation: 55,
    fatOxidationRate: 0.45,
    lactate: 2.8, // Slightly rising above baseline
    atpSpeed: 1.1,
    o2Demand: "Elevated (~2.8 L/min O2)",
    conversationalText: "💬 Can talk in short phrases. Breathing is noticeably deeper.",
    metabolicState: "Glycolysis speeds up. Carbs become the primary fuel source as energy demands rise.",
    pyruvateFate: "Pyruvate production starts approaching mitochondrial PDH capacity limit.",
    lactateStatus: "Lactate begins to rise slightly, but clearance mechanisms are still keeping pace."
  },
  {
    id: 4,
    name: "Zone 4",
    label: "Threshold / Anaerobic Threshold",
    hrRange: "80-90% HRmax",
    color: "orange",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    glowColor: "rgba(249, 115, 22, 0.5)",
    fatOxidation: 15,
    carbOxidation: 85,
    fatOxidationRate: 0.15,
    lactate: 4.5, // Above LT2 (Anaerobic Threshold)
    atpSpeed: 1.6,
    o2Demand: "Near Maximum (~3.5 L/min O2)",
    conversationalText: "😤 Can only speak single words. Deep, heavy rapid breathing.",
    metabolicState: "Rapid Glycolysis dominates! Oxygen delivery cannot match total energy rate via fat alone.",
    pyruvateFate: "Pyruvate production overwhelms PDH capacity -> Pyruvate converts to Lactate + H+ ions.",
    lactateStatus: "Lactate accumulation exceeds clearance rate! Acidosis (muscle burn) begins."
  },
  {
    id: 5,
    name: "Zone 5",
    label: "VO2 Max / Anaerobic Peak",
    hrRange: "90-100% HRmax",
    color: "rose",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    glowColor: "rgba(244, 63, 94, 0.6)",
    fatOxidation: 2,
    carbOxidation: 98,
    fatOxidationRate: 0.02,
    lactate: 9.5, // High lactate accumulation (>8-12 mmol/L)
    atpSpeed: 2.2,
    o2Demand: "100% VO2 Max (Maximum Intake)",
    conversationalText: "🤬 Impossible to talk! Gasping for air, maximum exertion limit.",
    metabolicState: "Full Anaerobic Glycolysis! Mitochondria are running at 100% capacity plus fast cytosolic ATP.",
    pyruvateFate: "Massive surplus of Pyruvate converted to Lactate to recycle NAD+ for fast glycolysis.",
    lactateStatus: "Lactate flood! High H+ ion accumulation leads to muscle burn and rapid fatigue."
  }
];

// Chemical By-Products Data
export const CHEMICAL_BYPRODUCTS = [
  {
    id: "o2",
    name: "Oxygen (O₂)",
    formula: "O₂",
    emoji: "🫁",
    role: "The Ultimate Electron Acceptor",
    origin: "Inhaled from lungs → Transported by Hemoglobin in red blood cells to capillaries.",
    fate: "Combines with electrons (e⁻) and hydrogen protons (H⁺) at Complex IV of the Electron Transport Chain to produce clean Water (H₂O).",
    zone2Importance: "Oxygen supply is abundance in Zone 2! Every molecule of fat burned requires O₂ to release its energy without producing anaerobic acidosis.",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    cardBg: "from-cyan-500/20 to-blue-700/20"
  },
  {
    id: "co2",
    name: "Carbon Dioxide (CO₂)",
    formula: "CO₂",
    emoji: "💨",
    role: "Metabolic Exhaust / By-Product",
    origin: "Generated during Pyruvate conversion (PDH complex) and the 8 steps of the Krebs Cycle.",
    fate: "Diffuses out of mitochondria into blood → Transported as Bicarbonate (HCO₃⁻) → Exhaled by lungs.",
    zone2Importance: "In Zone 2, CO₂ output is proportional to fat and carb oxidation. Respiratory Exchange Ratio (RER = CO₂ / O₂) is ~0.75-0.80.",
    color: "text-slate-300 border-slate-700 bg-slate-800/40",
    cardBg: "from-slate-700/20 to-slate-900/20"
  },
  {
    id: "h2o",
    name: "Metabolic Water (H₂O)",
    formula: "H₂O",
    emoji: "💧",
    role: "Clean Cellular Hydration",
    origin: "Formed at Complex IV of the Electron Transport Chain when Oxygen (O₂) accepts low-energy electrons and bonds with H⁺ protons.",
    fate: "Used inside the cell for biochemical reactions or excreted through sweat and breath.",
    zone2Importance: "Fat oxidation produces ~110 g of metabolic water for every 100 g of fat burned! Zone 2 creates substantial internal hydration.",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    cardBg: "from-blue-500/20 to-cyan-700/20"
  },
  {
    id: "atp",
    name: "Adenosine Triphosphate (ATP)",
    formula: "ATP ⇄ ADP + Pᵢ",
    emoji: "⚡",
    role: "Universal Cellular Energy Currency",
    origin: "Generated by ATP Synthase rotor in inner mitochondrial membrane using proton gradient.",
    fate: "Hydrolyzed by actin-myosin muscle filaments to cause muscle contraction, releasing energy.",
    zone2Importance: "Fat oxidation yields ~106-120 ATP per lipid molecule! Zone 2 provides massive steady-state ATP production.",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    cardBg: "from-yellow-500/20 to-amber-700/20"
  },
  {
    id: "nadh_fadh2",
    name: "NADH & FADH₂",
    formula: "NADH / FADH₂",
    emoji: "🔋",
    role: "High-Energy Electron Shuttle Batteries",
    origin: "Produced during Glycolysis, Beta-Oxidation, and the Krebs Cycle by stripping electrons from fuel molecules.",
    fate: "Delivers high-energy electrons (e⁻) to ETC Complexes I & II, resetting back to NAD⁺ and FAD.",
    zone2Importance: "In Zone 2, electron delivery matches electron transport capacity perfectly—keeping NAD⁺ pools recycled.",
    color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    cardBg: "from-teal-500/20 to-emerald-700/20"
  },
  {
    id: "protons_h",
    name: "Hydrogen Ions (H⁺)",
    formula: "H⁺",
    emoji: "🧪",
    role: "Proton Gradient & Acidosis Cause",
    origin: "Pumped into intermembrane space by ETC complexes. Also formed during rapid ATP hydrolysis.",
    fate: "Flows through ATP Synthase rotor to generate ATP. In Zone 4-5, excess cytosolic H⁺ causes muscle burn (acidosis).",
    zone2Importance: "In Zone 2, mitochondrial proton pumping is balanced. Cytosolic H⁺ is neutralized so no muscle burning occurs!",
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    cardBg: "from-rose-500/20 to-pink-700/20"
  },
  {
    id: "lactate",
    name: "Lactate Anion",
    formula: "C₃H₅O₃⁻",
    emoji: "🛡️",
    role: "Recyclable Fuel & Acid Buffer",
    origin: "Formed when Pyruvate accepts 2 electrons from NADH via Lactate Dehydrogenase (LDH).",
    fate: "Shuttled into Type I slow-twitch muscle fibers via MCT-1 transporters to be converted back into Pyruvate and burned!",
    zone2Importance: "Lactate is NOT a toxic waste product! In Zone 2, your slow-twitch muscle fibers clear lactate as fast as it is produced.",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    cardBg: "from-emerald-500/20 to-teal-700/20"
  }
];

// Friendly Character Profiles
export const CHARACTERS = [
  {
    id: "fatty-acid",
    name: "Phil Fatty Acid",
    title: "The Endurance Champion",
    emoji: "🥑",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    avatarBg: "from-emerald-500 to-teal-700",
    role: "Primary Fuel in Zone 2",
    atpYield: "~106 - 120 ATP per molecule",
    speed: "Slow & Steady",
    description: "I'm the ultimate high-efficiency fuel stored in your fat cells! In Zone 2, I glide into the mitochondria via the CPT-1 transporter and get sliced into Acetyl-CoA through Beta-Oxidation. I provide massive energy without producing lactate burn!",
    zone2Behavior: "🌟 Shining star! Provides up to 70-85% of total ATP in Zone 2."
  },
  {
    id: "pyruvate",
    name: "Pete Pyruvate",
    title: "The Flexible Fast-Fuel",
    emoji: "🍇",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    avatarBg: "from-amber-500 to-orange-600",
    role: "Product of Glycolysis",
    atpYield: "~30-32 ATP (via Mitochondria)",
    speed: "Fast & Adaptable",
    description: "I'm created when your cell breaks down Glucose. In Zone 2, I calmly enter the mitochondrion via Pyruvate Dehydrogenase (PDH). But if you sprint into Zone 5, PDH gets backed up and I turn into Larry Lactate!",
    zone2Behavior: "✅ Smooth Operator! 100% of me enters the mitochondrion cleanly in Zone 2."
  },
  {
    id: "acetyl-coa",
    name: "Ace Acetyl-CoA",
    title: "The VIP Keycard",
    emoji: "🔑",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    avatarBg: "from-yellow-400 to-amber-600",
    role: "Universal Fuel Gateway",
    atpYield: "Feeds Krebs Cycle directly",
    speed: "Instant Gateway",
    description: "Whether you burn fats (Beta-Oxidation) or carbs (Glycolysis), both pathways convert into ME! I'm the 2-carbon ticket that unlocks the spinning Krebs Cycle carousel.",
    zone2Behavior: "🎡 Turning the Krebs Cycle constantly to produce NADH & FADH2 electron carriers!"
  },
  {
    id: "mitochondria",
    name: "Molly Mitochondria",
    title: "The Cellular Powerhouse",
    emoji: "🧬",
    color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    avatarBg: "from-teal-500 to-cyan-700",
    role: "Oxygen & ATP Factory",
    atpYield: ">90% of your daily ATP",
    speed: "Continuous Generator",
    description: "I am the organelle where aerobic respiration happens! In Zone 2 training, the signal PGC-1α tells your cells to build MORE of me (Mitochondrial Biogenesis) and make me bigger!",
    zone2Behavior: "🌱 Zone 2 stimulates my growth, density, and oxidative efficiency more than any other intensity!"
  },
  {
    id: "lactate",
    name: "Larry Lactate",
    title: "The Misunderstood Recycling Fuel",
    emoji: "🧪",
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    avatarBg: "from-rose-500 to-pink-700",
    role: "Energy Shuttle & Buffer",
    atpYield: "Recycled back to Pyruvate",
    speed: "Emergency Spillover",
    description: "People used to blame me for muscle soreness, but I'm actually a valuable fuel! When pyruvate overflows in Zone 4-5, I step in to preserve NAD+. In Zone 2, your slow-twitch muscle fibers clear and consume me instantly!",
    zone2Behavior: "🧹 Kept at low, steady levels (~1.5 mmol/L). Shuttled into slow-twitch fibers for clean burning."
  }
];

// Pathway Components detail data
export const PATHWAY_STAGES = [
  {
    id: "capillary",
    name: "1. Bloodstream Delivery",
    subtitle: "Fatty Acids & Glucose Arrival",
    icon: "HeartHandshake",
    badge: "Cell Exterior",
    description: "Capillaries deliver Oxygen (O2), Free Fatty Acids (bound to Albumin), and Glucose into the muscle cell interstitial space.",
    zone2Fact: "Zone 2 increases capillary density over time (angiogenesis), bringing more O2 and lipids directly to muscle fibers."
  },
  {
    id: "cpt1",
    name: "2. CPT-1 Gatekeeper",
    subtitle: "Carnitine Palmitoyltransferase-1",
    icon: "DoorOpen",
    badge: "Mitochondrial Outer Membrane",
    description: "Fatty acids are large molecules. CPT-1 attaches Carnitine to fatty acyl-CoA, unlocking the gate to transport fat across the mitochondrial membrane.",
    zone2Fact: "In Zone 2, CPT-1 functions at peak efficiency. High insulin (from sugary snacks during exercise) inhibits CPT-1, reducing fat oxidation!"
  },
  {
    id: "beta_ox",
    name: "3. Beta-Oxidation Factory",
    subtitle: "Fatty Acid Slicing Pathway",
    icon: "Scissors",
    badge: "Mitochondrial Matrix",
    description: "Long fatty acid chains (e.g. 16-carbon Palmitate) are repeatedly chopped into 2-carbon Acetyl-CoA units, producing high amounts of NADH and FADH2.",
    zone2Fact: "Beta-Oxidation produces ~106 ATP per palmitate molecule—making fat the most energy-dense aerobic fuel!"
  },
  {
    id: "glycolysis",
    name: "4. Glycolysis Parkway",
    subtitle: "Glucose Breakdown",
    icon: "Zap",
    badge: "Cytoplasm",
    description: "Glucose (6 carbons) is broken down in 10 enzymatic steps into 2 Pyruvate molecules (3 carbons each), producing a quick net 2 ATP + 2 NADH.",
    zone2Fact: "In Zone 2, Glycolysis runs at a moderate rate so all Pyruvate can easily enter the mitochondrion without forming excess lactate."
  },
  {
    id: "pdh",
    name: "5. Pyruvate Gate (PDH)",
    subtitle: "Pyruvate Dehydrogenase Complex",
    icon: "Key",
    badge: "Mitochondria Matrix Entrance",
    description: "PDH converts 3-carbon Pyruvate into 2-carbon Acetyl-CoA + CO2, connecting glycolysis to the Krebs cycle.",
    zone2Fact: "Zone 2 keeps PDH within its speed limit, preventing excess pyruvate from spilling into lactate."
  },
  {
    id: "krebs",
    name: "6. Krebs Cycle (TCA Carousel)",
    subtitle: "Citric Acid Cycle",
    icon: "RotateCw",
    badge: "Mitochondrial Matrix",
    description: "Acetyl-CoA joins Oxaloacetate to form Citrate, spinning through a 8-step cycle that strips high-energy electrons onto NAD+ and FAD to form NADH and FADH2, releasing CO2.",
    zone2Fact: "Produces the electron carriers (NADH & FADH2) that power the Electron Transport Chain turbine!"
  },
  {
    id: "etc",
    name: "7. Electron Transport Chain & ATP Synthase",
    subtitle: "Oxidative Phosphorylation",
    icon: "Sparkles",
    badge: "Inner Mitochondrial Membrane",
    description: "Electrons flow through Complexes I-IV, pumping protons (H+) into the intermembrane space. Protons rush back through the ATP Synthase rotor, spinning it to produce ATP from ADP + Pi using Oxygen!",
    zone2Fact: "Oxygen is the final electron acceptor, forming clean water (H2O). Zone 2 maximizes this aerobic ATP generation!"
  },
  {
    id: "lactate_shuttle",
    name: "8. Lactate Shuttle & Clearance",
    subtitle: "MCT-1 Transporters & Type I Fibers",
    icon: "RefreshCw",
    badge: "Cytoplasm & Mitochondria",
    description: "Type I (slow-twitch oxidative) muscle fibers contain abundant MCT-1 transporters that import lactate from the bloodstream and convert it back to pyruvate for mitochondrial oxidation.",
    zone2Fact: "Zone 2 training specifically upgrades your slow-twitch muscle fibers' ability to clear lactate produced by other fast-twitch fibers!"
  }
];

// Interactive Quiz Questions
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary fuel source used during Zone 2 aerobic exercise?",
    options: [
      { text: "Pure Glycogen & Fast Sugars", correct: false, explanation: "Carbs dominate in higher intensity zones like Zone 4 & 5!" },
      { text: "Fatty Acids (via Beta-Oxidation)", correct: true, explanation: "Bingo! Zone 2 is FATmax—where absolute fat oxidation peaks!" },
      { text: "Lactate & Protein only", correct: false, explanation: "Protein is a minimal energy source during steady aerobic exercise." },
      { text: "Anaerobic Phosphocreatine", correct: false, explanation: "Phosphocreatine is used for 5-10 second all-out bursts!" }
    ]
  },
  {
    id: 2,
    question: "Why does Lactate NOT accumulate in Zone 2 training?",
    options: [
      { text: "Because your body stops producing pyruvate completely", correct: false, explanation: "Pyruvate is still produced from baseline glucose metabolism!" },
      { text: "Because Pyruvate production matches mitochondrial PDH capacity and slow-twitch fibers clear it", correct: true, explanation: "Correct! Mitochondria absorb all pyruvate formed, and slow-twitch fibers clear any stray lactate." },
      { text: "Because oxygen is unavailable in Zone 2", correct: false, explanation: "Zone 2 is fully aerobic with high oxygen availability!" },
      { text: "Lactate only exists in high-level elite athletes", correct: false, explanation: "Everyone produces lactate; clearance rate determines accumulation!" }
    ]
  },
  {
    id: 3,
    question: "What key cellular adaptation is triggered by consistent Zone 2 training?",
    options: [
      { text: "Mitochondrial Biogenesis (building more & larger mitochondria)", correct: true, explanation: "Spot on! PGC-1α pathways stimulate your cells to create more mitochondria and capillary networks." },
      { text: "Shrinking of muscle capillaries", correct: false, explanation: "Zone 2 actually increases capillary density!" },
      { text: "Inhibition of fatty acid transporters", correct: false, explanation: "Zone 2 upregulates CPT-1 fat transporters!" },
      { text: "Reduction in lung capacity", correct: false, explanation: "Zone 2 improves aerobic capacity and ventilation efficiency." }
    ]
  },
  {
    id: 4,
    question: "How can you tell you are in Zone 2 during a workout without complex lab equipment?",
    options: [
      { text: "You feel intense muscle burning and can't speak", correct: false, explanation: "That's Zone 4 or Zone 5!" },
      { text: "You can comfortably maintain a conversation in full sentences", correct: true, explanation: "Yes! Zone 2 is often called the 'Conversational Pace'." },
      { text: "Your heart rate is at 95% of maximum", correct: false, explanation: "Zone 2 is usually around 60-70% of maximum heart rate." },
      { text: "You must stop every 2 minutes to catch your breath", correct: false, explanation: "Zone 2 can be sustained comfortably for hours!" }
    ]
  }
];

export const MITOCHONDRIA_REPRODUCTION_DATA = {
  evolutionaryTimeline: [
    {
      era: "1.8 - 2.0 Billion Years Ago",
      title: "The Great Endosymbiotic Event",
      icon: "🦠",
      description: "An ancestral single-celled eukaryote engulfed an aerobic α-proteobacterium. Instead of being digested, the bacterium survived, giving birth to modern complex life!",
      evidence: "Mitochondria still retain their own double-membrane system—the inner membrane is identical to bacterial plasma membranes."
    },
    {
      era: "Bacterial Genomic Legacy",
      title: "Circular mtDNA (Mitochondrial DNA)",
      icon: "🧬",
      description: "Unlike cell nuclear DNA (which is linear and wrapped in histones), mitochondrial DNA is circular and naked, exactly like bacterial plasmids! It contains 16,569 base pairs coding for 13 essential respiratory chain proteins.",
      evidence: "Human mtDNA is passed down strictly maternally and undergoes independent replication during cell life."
    },
    {
      era: "Bacterial Translation & Ribosomes",
      title: "70S Bacterial Ribosomes",
      icon: "⚙️",
      description: "Inside the mitochondrial matrix, proteins are translated by 70S ribosomes—the exact same ribosomal size found in bacteria today (host human cells use 80S ribosomes).",
      evidence: "Certain antibiotics (like tetracyclines) targeting bacterial 70S ribosomes can temporarily slow down mitochondrial translation."
    },
    {
      era: "Exclusive Binary Fission",
      title: "Reproduction by Division (Binary Fission)",
      icon: "✂️",
      description: "Cells CANNOT create mitochondria from scratch in the nucleus. Mitochondria reproduce exclusively by binary fission—growing and splitting in two, identical to bacterial binary fission!",
      evidence: "Dynamin-related protein 1 (Drp1) forms ring structures that constrict and split the bacterial organelle."
    }
  ],
  signalingCascade: [
    {
      step: 1,
      name: "Zone 2 Mechanical & Energy Signal",
      trigger: "Muscle Contraction + High ATP Turnover",
      molecules: ["AMP / ATP Ratio ↑", "Cytosolic Ca²⁺ ↑"],
      desc: "During steady Zone 2 exercise, repeated muscle contraction causes Calcium ions to flood the cytosol and ATP consumption elevates AMP levels."
    },
    {
      step: 2,
      name: "Master Kinase & Switch Activation",
      trigger: "AMPK & p38 MAPK Phosphorylation",
      molecules: ["AMPK Activator", "PGC-1α Unlocked"],
      desc: "AMPK and p38 MAPK sense energy depletion and activate PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha)—the absolute master regulator of mitochondrial biogenesis."
    },
    {
      step: 3,
      name: "Nuclear Transcription Factor Cascade",
      trigger: "PGC-1α Translocation to Nucleus",
      molecules: ["NRF-1 / NRF-2", "TFAM (Mitochondrial Transcription Factor A)"],
      desc: "PGC-1α triggers nuclear genes NRF-1 & NRF-2. They transcribe nuclear-encoded mitochondrial proteins and TFAM, which enters mitochondria to replicate circular mtDNA."
    },
    {
      step: 4,
      name: "Protein Import, Lipid Assembly & Fission",
      trigger: "Multi-Day Cellular Assembly",
      molecules: ["TOM / TIM Translocase", "Drp1 Ring Fission", "Mfn1/2 Fusion"],
      desc: "Over 1,000 proteins made in cytoplasm are shuttled into mitochondria via TOM/TIM tunnels. Cardiolipin lipids build membranes, and Drp1 rings split mitochondria into brand new daughter units!"
    }
  ],
  fissionFusionProteins: [
    { name: "Drp1 (Dynamin-Related Protein 1)", role: "Fission Engine", color: "emerald", desc: "Forms an oligomeric ring around the mitochondrion, constricting and severing inner & outer bacterial membranes to create two distinct daughters." },
    { name: "Mitofusins (Mfn1 & Mfn2)", role: "Outer Membrane Fusion", color: "teal", desc: "Tethers adjacent mitochondria together and fuses outer membranes to share enzymes, mtDNA, and electrical potential." },
    { name: "OPA1 (Optic Atrophy 1)", role: "Inner Membrane & Cristae Architect", color: "cyan", desc: "Fuses inner mitochondrial membranes and maintains cristae structure where electron transport complexes sit." },
    { name: "TFAM (Mitochondrial Transcription Factor A)", role: "mtDNA Replication & Packaging", color: "amber", desc: "Binds circular mtDNA, wrapping it into nucleoids and initiating bacterial gene replication." }
  ]
};

export const LACTATE_MASTERCLASS_DATA = {
  mythsVsFacts: [
    {
      myth: "Lactate is a toxic metabolic waste product that causes muscle soreness.",
      fact: "Lactate is a high-energy fuel produced during glucose breakdown. Delayed Onset Muscle Soreness (DOMS) is caused by micro-tears in muscle fibers, not lactate!",
      icon: "❌"
    },
    {
      myth: "Lactic acid burns your muscles during intense sprints.",
      fact: "Lactic acid does not exist in human blood—it dissociates immediately into Lactate (C₃H₅O₃⁻) and H⁺. The H⁺ acidity causes the burn, while Lactate acts as an energy buffer!",
      icon: "🔥"
    },
    {
      myth: "Your body only produces lactate when working anaerobically without oxygen.",
      fact: "Your body produces lactate 24/7, even at rest! Glycolysis constantly forms lactate, which is immediately oxidized by neighboring mitochondria in Zone 2.",
      icon: "⚡"
    },
    {
      myth: "Lactate is only used by muscle cells.",
      fact: "The heart and brain PREFER lactate over glucose during exercise! The heart uses lactate for up to 60% of its energy during steady aerobic effort.",
      icon: "🫀"
    }
  ],
  shuttleTransporters: [
    {
      name: "MCT-1 (Monocarboxylate Transporter 1)",
      location: "Slow-Twitch (Type I) Muscle & Cardiac Mitochondria",
      role: "Lactate Importer",
      desc: "Shuttles circulating lactate directly into slow-twitch muscle fibers and cardiac mitochondria to be converted back into pyruvate and burned for ATP energy.",
      adaptation: "Upregulated massively by Zone 2 training!"
    },
    {
      name: "MCT-4 (Monocarboxylate Transporter 4)",
      location: "Fast-Twitch (Type II) Muscle Fibers",
      role: "Lactate Exporter",
      desc: "Exports lactate produced during high glycolytic flux out of fast-twitch fibers into the bloodstream so oxidative fibers can consume it.",
      adaptation: "Upregulated by high-intensity interval training (HIIT)."
    },
    {
      name: "m-LDH (Mitochondrial Lactate Dehydrogenase)",
      location: "Mitochondrial Matrix & Outer Membrane",
      role: "Lactate Oxidizer",
      desc: "Converts imported Lactate back into Pyruvate right at the mitochondrial membrane, generating 1 NADH battery in the process!",
      adaptation: "Density scales directly with Zone 2 volume."
    }
  ],
  organDestinations: [
    { organ: "Slow-Twitch Muscles", emoji: "🏃‍♂️", fuelUse: "Primary Energy Fuel", desc: "Absorbs lactate via MCT-1, converts it to pyruvate, and burns it in the Krebs cycle without releasing H+." },
    { organ: "The Heart", emoji: "🫀", fuelUse: "60%+ Energy Preference", desc: "During steady exercise, the cardiac muscle consumes lactate as its favored energy substrate over glucose or fat." },
    { organ: "The Brain", emoji: "🧠", fuelUse: "Neuroprotective Superfuel", desc: "Astrocytes convert glucose to lactate and shuttle it to neurons (ANLS). Lactate also triggers BDNF for neuroplasticity." },
    { organ: "The Liver (Cori Cycle)", emoji: "🧪", fuelUse: "Gluconeogenesis", desc: "Recycles circulating lactate back into new glucose (Cori Cycle), maintaining blood sugar levels during long runs." }
  ],
  coriCycleSteps: [
    { step: 1, title: "Glycolysis in Fast-Twitch Muscle", detail: "Fast-twitch fibers break down glucose into Pyruvate, producing 2 ATP and converting Pyruvate to Lactate." },
    { step: 2, title: "Lactate Export via MCT-4", detail: "Lactate enters the bloodstream and travels via systemic circulation to the liver." },
    { step: 3, title: "Hepatic Gluconeogenesis", detail: "The liver consumes 6 ATP to convert 2 Lactate molecules back into 1 pure Glucose molecule." },
    { step: 4, title: "Glucose Returned to Bloodstream", detail: "Fresh glucose is released back into the blood, refilling glycogen stores and feeding working muscles." }
  ]
};

// Laboratory Lactate Test (Graded Exercise Test Protocol & Curve Data)
export const LAB_LACTATE_TEST_DATA = {
  overview: {
    title: "Laboratory Blood Lactate Testing (Graded Exercise Test - GXT)",
    subtitle: "The Gold Standard for pinpointing your exact Zone 2 ceiling (LT1) and Threshold (LT2)",
    description: "In sports science laboratories, athletes undergo a treadmill or bicycle ergometer test with incremental speed/wattage increases every 3 to 4 minutes. At the end of each stage, a technician pricks the athlete's earlobe or fingertip to measure blood lactate concentration in millimoles per liter (mmol/L).",
    equipment: ["Portable/Benchtop Lactate Analyzer (e.g., Lactate Scout / Biosen)", "Capillary Micro-Lancet (Finger-Prick)", "Calibrated Treadmill or Ergometer", "Heart Rate Chest Strap / VO2 Gas Analyzer Mask"]
  },
  milestones: [
    {
      code: "Baseline",
      title: "Resting / Warmup Baseline",
      range: "0.8 - 1.2 mmol/L",
      color: "stone",
      desc: "Baseline resting blood lactate. Slow-twitch muscle fibers clear all resting lactate cleanly."
    },
    {
      code: "LT1",
      title: "Lactate Threshold 1 (Aerobic Threshold)",
      range: "1.5 - 2.0 mmol/L",
      color: "emerald",
      badge: "🎯 ZONE 2 UPPER CEILING",
      desc: "The exact point where blood lactate first rises +0.4-1.0 mmol/L above baseline. Marks FATmax oxidation peak and upper boundary of Zone 2!"
    },
    {
      code: "LT2",
      title: "Lactate Threshold 2 (Anaerobic / MLSS)",
      range: "4.0 - 6.0 mmol/L",
      color: "rose",
      badge: "⚠️ MAXIMAL LACTATE STEADY STATE",
      desc: "The inflection point where lactate production exponentially outpaces mitochondrial clearance. Acidity (H+) floods muscle cells."
    }
  ],
  stages: [
    { stage: 1, speedKmh: 6.0, paceMinKm: "10:00", hrBpm: 102, lactateMmol: 1.1, zone: 1, status: "Resting Baseline", note: "Light walking. Aerobic metabolism operating easily." },
    { stage: 2, speedKmh: 7.5, paceMinKm: "8:00", hrBpm: 116, lactateMmol: 1.3, zone: 1, status: "Easy Active Warmup", note: "Lactate remains near baseline. Fat oxidation starting to ramp up." },
    { stage: 3, speedKmh: 9.0, paceMinKm: "6:40", hrBpm: 132, lactateMmol: 1.7, zone: 2, isLT1: true, status: "🎯 LT1 Threshold (Zone 2 Sweet Spot)", note: "FIRST RISE! Blood lactate increases +0.5 mmol/L to 1.7 mmol/L. Exact Zone 2 FATmax ceiling for Ishai!" },
    { stage: 4, speedKmh: 10.5, paceMinKm: "5:42", hrBpm: 148, lactateMmol: 2.6, zone: 3, status: "Zone 3 Aerobic Tempo", note: "Glycolysis increasing. MCT-1 transporters operating near peak capacity." },
    { stage: 5, speedKmh: 12.0, paceMinKm: "5:00", hrBpm: 164, lactateMmol: 4.3, zone: 4, isLT2: true, status: "⚠️ LT2 Threshold (MLSS / Zone 4)", note: "EXPONENTIAL RISE! Lactate exceeds 4.0 mmol/L. Pyruvate outpaces mitochondrial intake." },
    { stage: 6, speedKmh: 13.5, paceMinKm: "4:26", hrBpm: 182, lactateMmol: 9.2, zone: 5, status: "Zone 5 VO2max Sprint", note: "Severe metabolic acidosis (pH < 7.1). Test terminated due to muscular exhaustion." }
  ],
  labProtocolSteps: [
    { step: 1, title: "Sterilize & Calibrate", desc: "Clean fingertip with alcohol swab. Calibrate blood lactate analyzer with standard test strip." },
    { step: 2, title: "3-Minute Constant Stages", desc: "Athlete runs at constant speed for 3 minutes to allow blood lactate to reach steady state." },
    { step: 3, title: "Finger-Prick Blood Sample", desc: "At min 2:45 of each stage, prick finger with sterile lancet, wipe first micro-drop, collect 0.2µL blood." },
    { step: 4, title: "Instant Result & Curve Plotting", desc: "Analyzer displays blood lactate in 10 seconds. Plot speed vs. lactate curve to pinpoint LT1 & LT2!" }
  ]
};



