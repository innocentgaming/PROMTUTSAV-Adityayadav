export interface TimelineEvent {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  keyContributions: string[];
  schematicType: 'birth' | 'education' | 'irrigation' | 'flood' | 'krs' | 'industry' | 'legacy';
  coordinates: string;
}

export interface EngineeringDomain {
  id: string;
  name: string;
  code: string;
  iconName: string;
  description: string;
  problem: string;
  engineeringSolution: string;
  output: string;
  technologies: string[];
  impact: string;
  coordinates: { x: number; y: number }; // For visual diagram placement
}

export interface AiApplication {
  id: string;
  title: string;
  domain: string;
  problem: string;
  inputData: string;
  engineeringSystem: string;
  aiModel: string;
  decision: string;
  impact: string;
  iconName: string;
}

export interface ChallengeChoice {
  id: string;
  title: string;
  category: string;
  description: string;
  costPoints: number;
  scores: {
    systemsThinking: number;
    problemSolving: number;
    riskAwareness: number;
    resourceOptimization: number;
    innovation: number;
  };
}

export interface EngineerProfile {
  title: string;
  tagline: string;
  description: string;
  code: string;
  keyStrengths: string[];
}

export interface InnovationStage {
  id: string;
  stageNumber: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  action: string;
  deliverable: string;
}

export interface StudentProject {
  id: string;
  title: string;
  domain: string;
  problem: string;
  solution: string;
  technology: string[];
  impact: string;
  team: string;
  status: 'PROTOTYPE' | 'DEPLOYED' | 'TESTING' | 'RESEARCH';
  metric: string;
}

export interface FutureScenario {
  id: string;
  year: string;
  title: string;
  iconName: string;
  shortDesc: string;
  challenge: string;
  technology: string;
  engineerRole: string;
  possibleImpact: string;
  metricLabel: string;
  metricValue: string;
}

export interface EventSpeaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  topic: string;
  domainBadge: string;
  avatarSeed: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  category: 'KEYNOTE' | 'PANEL' | 'CHALLENGE' | 'SHOWCASE' | 'CEREMONY';
  location: string;
  description: string;
  speaker?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'EVENT' | 'ENGINEERING' | 'INNOVATION' | 'STUDENTS' | 'PROJECTS';
  description: string;
  year: string;
  tags: string[];
  dimensions: string;
}

export interface EngineerIdData {
  name: string;
  branch: string;
  favoriteTech: string;
  skill: string;
  engineerCode: string;
  issueDate: string;
  systemClearance: string;
}
