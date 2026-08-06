export type NavTab = 'past' | 'present' | 'future';

export type TimeFormat = '12h' | '24h';

export interface ReflectionEntry {
  id: string;
  timeLabel: string;
  timestamp: number;
  tab: NavTab;
  title: string;
  content: string;
  category: 'reflection' | 'intention' | 'memory' | 'milestone';
  createdAt: number;
}

export interface TimeCapsule {
  id: string;
  createdTimestamp: number;
  unlockTimestamp: number;
  title: string;
  message: string;
  isUnlocked: boolean;
}

export interface FutureGoal {
  id: string;
  timeLabel: string;
  timestamp: number;
  title: string;
  completed: boolean;
}

export type ThemeId = 'obsidian' | 'midnight' | 'crimson' | 'sepia' | 'emerald';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  glow: string;
  border: string;
}

export type AmbientSoundType = 'none' | 'tick' | 'rain' | 'space' | 'brown';
