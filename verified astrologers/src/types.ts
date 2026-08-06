export type SessionMode = 'audio' | 'video' | 'chat';

export type Specialization = 
  | 'All'
  | 'Vedic Astrology'
  | 'Financial Transits'
  | 'Relationship Sync'
  | 'Cosmic Counseling'
  | 'Career Projections';

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialty: Specialization | string;
  tag: string; // e.g. [VEDIC], [COSMIC], [SQBMEC], [VEBTC]
  accuracy: string; // e.g. "98.5%", "99.2%"
  imageUrl: string;
  bio: string;
  experienceYears: number;
  ratePerMin: number; // e.g. $2.50/min
  rating: number; // e.g. 4.98
  totalSessions: number;
  isOnline: boolean;
  featuredQuote: string;
  techniques: string[];
}

export interface UserBirthDetails {
  name: string;
  dob: string;
  timeOfBirth: string;
  location: string;
  zodiacSign?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'practitioner' | 'system';
  text: string;
  timestamp: string;
}

export interface PlanetaryPosition {
  planet: string;
  sign: string;
  house: string;
  degree: string;
}

export interface BirthChartData {
  chartSummary: string;
  planetaryPositions: PlanetaryPosition[];
  currentDasha: string;
  keyTakeaway: string;
}
