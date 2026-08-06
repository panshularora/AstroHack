export type MilestoneCategory =
  | 'birth'
  | 'education'
  | 'career'
  | 'travel'
  | 'relationship'
  | 'achievement'
  | 'decision'
  | 'personal';

export interface LifeMilestone {
  id: string;
  title: string;
  date: string;
  timestampDisplay: string;
  description: string;
  category: MilestoneCategory;
  icon: string;
  x: number;
  y: number;
  year: number;
  impact?: 'minor' | 'moderate' | 'major' | 'transformative';
  tags?: string[];
  location?: string;
}

export interface ConstellationLine {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
  style?: 'dotted' | 'solid' | 'dashed';
}

export interface CosmicReading {
  title: string;
  summary: string;
  theme: string;
  insights: string[];
  astrologicalAnalogy: string;
}

export interface ConstellationPreset {
  id: string;
  name: string;
  description: string;
  milestones: LifeMilestone[];
  lines: ConstellationLine[];
}
