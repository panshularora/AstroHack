export type Specialization =
  | 'All'
  | 'Financial Transits'
  | 'Vedic Astrology'
  | 'Relationship Sync'
  | 'Cosmic Counseling'
  | 'Cosmic Astrology'
  | 'Career Projections';

export type SessionMode = 'audio' | 'video' | 'chat';

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  specialty: Specialization;
  tag: string;
  accuracy: string;
  imageUrl: string;
  bio: string;
  experienceYears: number;
  ratePerMin: number;
  rating: number;
  totalSessions: number;
  isOnline: boolean;
  featuredQuote?: string;
  techniques?: string[];
}

export interface UserBirthDetails {
  name: string;
  dob: string;
  timeOfBirth: string;
  location: string;
}

export interface SessionMessage {
  id: string;
  sender: 'user' | 'astrologer' | 'system';
  text: string;
  timestamp: string;
}
