import type { ChallengeChoice, EngineerProfile } from '../types';

export const FLOOD_CHALLENGE_CHOICES: ChallengeChoice[] = [
  {
    id: "smart_drainage",
    title: "Automated Sluice & Smart Drainage System",
    category: "PHYSICAL INFRASTRUCTURE",
    description: "Install automated mechanical weir gates (inspired by Visvesvaraya) and retrofitted stormwater bypass tunnels that divert runoff directly away from low-lying residential basins.",
    costPoints: 40,
    scores: {
      systemsThinking: 24,
      problemSolving: 28,
      riskAwareness: 18,
      resourceOptimization: 15,
      innovation: 15,
    },
  },
  {
    id: "flood_ai",
    title: "AI Predictive Runoff & Inundation Model",
    category: "INTELLIGENT FORECASTING",
    description: "Deploy a neural fluid-dynamics surrogate model that ingests satellite rainfall scans and upstream gauge telemetry to predict street-level flooding 6 hours in advance.",
    costPoints: 25,
    scores: {
      systemsThinking: 20,
      problemSolving: 24,
      riskAwareness: 30,
      resourceOptimization: 25,
      innovation: 35,
    },
  },
  {
    id: "sensor_network",
    title: "IoT Ultrasonic Water Level Sensor Array",
    category: "DATA TELEMETRY",
    description: "Deploy 500 low-power solar-powered IoT ultrasonic sensors and rain gauges across storm drains, canals, and riverbanks for real-time telemetry streaming.",
    costPoints: 20,
    scores: {
      systemsThinking: 28,
      problemSolving: 20,
      riskAwareness: 24,
      resourceOptimization: 30,
      innovation: 25,
    },
  },
  {
    id: "emergency_routes",
    title: "Dynamic Citizen Routing & Evacuation App",
    category: "HUMAN MOBILITY & RESCUE",
    description: "Develop a fault-tolerant mesh-networked mobile navigation system that automatically redirects ambulance, rescue, and civilian transit around submerged arterial roads.",
    costPoints: 15,
    scores: {
      systemsThinking: 18,
      problemSolving: 26,
      riskAwareness: 32,
      resourceOptimization: 28,
      innovation: 22,
    },
  },
];

export const ENGINEER_PROFILES: Record<string, EngineerProfile> = {
  systems: {
    title: "Systems Engineer",
    tagline: "Master of Holistic Architectural Synergy",
    description: "You think beyond isolated components and intuitively understand how civil infrastructure, software telemetry, and human behaviors interact as a unified organism. Like Sir M. Visvesvaraya, your strength lies in macro-scale resiliency.",
    code: "ARCH-SYS-01",
    keyStrengths: ["System Dynamics", "Cross-Disciplinary Integration", "Macro Scalability", "Failure Mode Analysis"],
  },
  innovator: {
    title: "Innovation Architect",
    tagline: "Pioneer of Frontier Methodologies",
    description: "You refuse to be constrained by conventional toolkits. You leverage breakthrough technologies like artificial intelligence and neural surrogates to leapfrog legacy limitations and create unprecedented efficiencies.",
    code: "ARCH-INN-02",
    keyStrengths: ["Emerging Tech Synthesis", "Creative Problem Solving", "Algorithmic Leverage", "High-Impact Thinking"],
  },
  risk: {
    title: "Resilience & Risk Engineer",
    tagline: "Guardian of Critical System Safety",
    description: "Your prime directive is safeguarding human lives and preventing catastrophic systemic collapse. You anticipate worst-case contingencies before they manifest and design unbreakable defensive fallbacks.",
    code: "ARCH-RSK-03",
    keyStrengths: ["Contingency Planning", "Predictive Foresight", "Safety Redundancy", "Crisis Management"],
  },
  optimization: {
    title: "Optimization Engineer",
    tagline: "Maximizer of Efficiency & Resource Yield",
    description: "You possess an exceptional ability to extract maximum performance from constrained resources, budgets, and energy reserves. You eliminate waste and deliver elegant solutions with mathematical precision.",
    code: "ARCH-OPT-04",
    keyStrengths: ["Resource Allocation", "Capital Efficiency", "Lean Architecture", "Low-Power Systems"],
  },
  design: {
    title: "Design & Field Engineer",
    tagline: "Builder of Tangible Real-World Solutions",
    description: "You excel at converting theoretical mathematical concepts into battle-tested physical mechanisms. You bridge the gap between digital code and tangible real-world steel, concrete, and silicon.",
    code: "ARCH-DSG-05",
    keyStrengths: ["Pragmatic Execution", "Rapid Prototyping", "Field Reliability", "Hardware-Software Interfacing"],
  },
};

export function calculateChallengeResults(selectedIds: string[]) {
  if (selectedIds.length === 0) {
    return {
      overallScore: 0,
      systemsThinking: 0,
      problemSolving: 0,
      riskAwareness: 0,
      resourceOptimization: 0,
      innovation: 0,
      profile: ENGINEER_PROFILES.design,
    };
  }

  const selectedChoices = FLOOD_CHALLENGE_CHOICES.filter((c) => selectedIds.includes(c.id));
  
  let totalSystems = 0;
  let totalProblem = 0;
  let totalRisk = 0;
  let totalResource = 0;
  let totalInnovation = 0;

  selectedChoices.forEach((c) => {
    totalSystems += c.scores.systemsThinking;
    totalProblem += c.scores.problemSolving;
    totalRisk += c.scores.riskAwareness;
    totalResource += c.scores.resourceOptimization;
    totalInnovation += c.scores.innovation;
  });

  // Synergy bonus for multi-layered defense (combining physical + digital)
  const hasPhysical = selectedIds.includes('smart_drainage');
  const hasDigital = selectedIds.includes('flood_ai') || selectedIds.includes('sensor_network');
  const hasHuman = selectedIds.includes('emergency_routes');
  const synergyBonus = (hasPhysical && hasDigital ? 6 : 0) + (hasDigital && hasHuman ? 5 : 0);

  const normalize = (val: number, maxBase: number) => {
    const raw = Math.round((val / maxBase) * 100);
    return Math.min(99, Math.max(45, raw + synergyBonus));
  };

  const systemsThinking = normalize(totalSystems, 90);
  const problemSolving = normalize(totalProblem, 98);
  const riskAwareness = normalize(totalRisk, 104);
  const resourceOptimization = normalize(totalResource, 98);
  const innovation = normalize(totalInnovation, 97);

  const overallScore = Math.min(
    99,
    Math.round(
      (systemsThinking * 0.25) +
      (problemSolving * 0.25) +
      (riskAwareness * 0.2) +
      (resourceOptimization * 0.15) +
      (innovation * 0.15)
    )
  );

  // Profile determination
  let dominantCategory = 'systems';
  const scores = [
    { cat: 'systems', val: systemsThinking },
    { cat: 'innovator', val: innovation },
    { cat: 'risk', val: riskAwareness },
    { cat: 'optimization', val: resourceOptimization },
    { cat: 'design', val: problemSolving },
  ];

  scores.sort((a, b) => b.val - a.val);
  dominantCategory = scores[0].cat;

  return {
    overallScore,
    systemsThinking,
    problemSolving,
    riskAwareness,
    resourceOptimization,
    innovation,
    profile: ENGINEER_PROFILES[dominantCategory] || ENGINEER_PROFILES.systems,
  };
}
