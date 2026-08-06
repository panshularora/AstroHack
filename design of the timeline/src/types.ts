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
  date: string; // ISO date string e.g. "2023-01-12"
  timestampDisplay: string; // e.g. "JAN 12, 2023 - 14:30:00"
  description: string;
  category: MilestoneCategory;
  icon: string; // Lucide icon identifier name
  x: number; // percentage X position in map (0-100)
  y: number; // percentage Y position in map (0-100)
  year: number; // year for timeline filtering
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
