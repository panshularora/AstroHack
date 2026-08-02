export interface UserProfile {
  id: string
  name: string
  zodiacSign: string
  memberSince: string
  isPremium: boolean
  email: string
  avatar: string
}

export interface Astrologer {
  id: string
  name: string
  specialties: string[]
  rating: number
  trustScore: number
  avatar: string
  languages: string[]
  verifiedAccuracy: number
  consultationCount: number
  yearsExperience: number
  responseTime: string
  availability: "online" | "offline" | "busy"
  pricePerMinute: number
  recommendationReason?: string
}

export interface CosmicBrief {
  date: string
  summary: string
  luckyColor: string
  intensity: "low" | "medium" | "high"
}

export interface Prediction {
  id: string
  astrologerId: string
  astrologerName: string
  dateGiven: string
  targetDate: string
  content: string
  status: "pending" | "accurate" | "inaccurate"
  confidenceLevel: number
}

export interface Reminder {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  timestamp: string
  iconType: "remedy" | "prediction" | "consultation" | "transit"
}

export interface Consultation {
  id: string
  astrologerId: string
  astrologerName: string
  astrologerAvatar: string
  topic: string
  durationMinutes: number
  date: string
  cost: number
  rating?: number
}

// ── Single Source User ───────────────────────────────────────────────────
export const mockUser: UserProfile = {
  id: "u1",
  name: "Arjun",
  email: "arjun.sharma@example.com",
  zodiacSign: "Leo",
  memberSince: "January 2024",
  isPremium: true,
  avatar: "A"
}

// ── Daily Cosmic Brief ──────────────────────────────────────────────────
export const mockBrief: CosmicBrief = {
  date: new Date().toISOString(),
  summary: "Jupiter transits your 10th house today, forming a powerful trine with your natal Sun. This is one of the strongest career windows of the year — bold moves made today carry long-term momentum. Mercury is direct, clearing communication blocks that frustrated you last month. Your active Venus remedy is working: social energy is elevated.",
  luckyColor: "#F59E0B",
  intensity: "high",
}

// ── Single Source Astrologer Roster (Sourced from AstroLive Production Data) ──────
export const mockAstrologers: Astrologer[] = [
  {
    id: "a1",
    name: "Acharya Ananya Sharma",
    specialties: ["Vedic Astrology", "Career", "Kundli Prashna"],
    rating: 4.95,
    trustScore: 98,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    languages: ["Hindi", "English", "Marathi"],
    verifiedAccuracy: 96,
    consultationCount: 4250,
    yearsExperience: 16,
    responseTime: "< 2 mins",
    availability: "online",
    pricePerMinute: 15,
    recommendationReason: "Acharya Ananya has a 96% verified accuracy rate specifically for Vedic Career & Dasha predictions."
  },
  {
    id: "a2",
    name: "Pandit Rajesh Kumar",
    specialties: ["KP Astrology", "Kundli Match", "Vastu Shastra"],
    rating: 4.88,
    trustScore: 94,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    languages: ["Hindi", "English", "Punjabi"],
    verifiedAccuracy: 92,
    consultationCount: 3840,
    yearsExperience: 14,
    responseTime: "5 mins",
    availability: "online",
    pricePerMinute: 10,
    recommendationReason: "Pandit Rajesh is top-rated on AstroLive for Kundli Synastry and Rahu-Ketu Shanti Remedies."
  },
  {
    id: "a3",
    name: "Dr. Priya Patel",
    specialties: ["Numerology", "Finance & Wealth", "Tarot Reading"],
    rating: 4.98,
    trustScore: 99,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    languages: ["English", "Gujarati", "Hindi"],
    verifiedAccuracy: 97,
    consultationCount: 5100,
    yearsExperience: 20,
    responseTime: "Instant",
    availability: "online",
    pricePerMinute: 20,
    recommendationReason: "Dr. Priya's 20 years in Vedic Numerology and Financial Life Path analysis is AstroLive's #1 recommended expert."
  },
  {
    id: "a4",
    name: "Acharya Vikram Singh",
    specialties: ["Nadi Astrology", "Lal Kitab Remedies", "Mahadasha"],
    rating: 4.92,
    trustScore: 96,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
    languages: ["Hindi", "English", "Kannada"],
    verifiedAccuracy: 95,
    consultationCount: 2950,
    yearsExperience: 18,
    responseTime: "< 3 mins",
    availability: "busy",
    pricePerMinute: 15,
    recommendationReason: "Acharya Vikram specializes in Lal Kitab remedies for active Rahu Mahadasha transitions."
  }
]

// ── Predictions List ─────────────────────────────────────────────────────
export const mockPredictions: Prediction[] = [
  {
    id: "p1",
    astrologerId: "a1",
    astrologerName: "Dr. Sarah Chen",
    dateGiven: "2026-07-15",
    targetDate: "2026-08-25",
    content: "Job offer in tech sector with leadership responsibilities.",
    status: "pending",
    confidenceLevel: 88
  },
  {
    id: "p2",
    astrologerId: "a2",
    astrologerName: "Marcus Thorne",
    dateGiven: "2026-06-10",
    targetDate: "2026-09-15",
    content: "Harmonious relationship milestone & commitment clarity.",
    status: "pending",
    confidenceLevel: 82
  },
  {
    id: "p3",
    astrologerId: "a3",
    astrologerName: "Elena Rostova",
    dateGiven: "2026-05-02",
    targetDate: "2026-05-15",
    content: "Financial breakthrough via investment or tax return bonus.",
    status: "accurate",
    confidenceLevel: 94
  },
  {
    id: "p4",
    astrologerId: "a1",
    astrologerName: "Dr. Sarah Chen",
    dateGiven: "2025-10-01",
    targetDate: "2025-10-14",
    content: "Career advancement to VP role at tech corporation.",
    status: "accurate",
    confidenceLevel: 91
  }
]

// ── Smart Reminders ──────────────────────────────────────────────────────
export const mockReminders: Reminder[] = [
  {
    id: "r1",
    title: "Venus Remedy: Day 11 of 21",
    description: "Chant the Venus Beej mantra 108 times. Dr. Sarah reported a 74% improvement in social harmony for users who complete this cycle.",
    priority: "high",
    timestamp: "Today, 7:00 AM",
    iconType: "remedy"
  },
  {
    id: "r2",
    title: "Career Prediction Window Opens",
    description: "Your job offer prediction (88% confidence) by Dr. Sarah Chen enters its active window in 3 days. Prepare your talking points.",
    priority: "high",
    timestamp: "In 3 days",
    iconType: "prediction"
  },
  {
    id: "r3",
    title: "Mercury Retrograde Ends",
    description: "Mercury goes direct on Aug 4th. This is your ideal window to sign contracts and finalize career negotiations.",
    priority: "medium",
    timestamp: "Aug 4",
    iconType: "transit"
  },
  {
    id: "r4",
    title: "Monthly Check-in with Dr. Sarah",
    description: "It's been 28 days since your last consultation. Book your monthly career transit review.",
    priority: "medium",
    timestamp: "Overdue",
    iconType: "consultation"
  }
]

// ── Past Consultations ──────────────────────────────────────────────────
export const mockConsultations: Consultation[] = [
  {
    id: "c1",
    astrologerId: "a1",
    astrologerName: "Dr. Sarah Chen",
    astrologerAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    topic: "Career Growth & Jupiter Transit",
    durationMinutes: 45,
    date: "2026-07-15",
    cost: 1575,
    rating: 5
  },
  {
    id: "c2",
    astrologerId: "a2",
    astrologerName: "Marcus Thorne",
    astrologerAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    topic: "Solar Return & Synastry Forecast",
    durationMinutes: 60,
    date: "2026-06-10",
    cost: 1500,
    rating: 4.8
  },
  {
    id: "c3",
    astrologerId: "a3",
    astrologerName: "Elena Rostova",
    astrologerAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    topic: "Financial Life Path & Saturn Analysis",
    durationMinutes: 30,
    date: "2026-05-02",
    cost: 1350,
    rating: 5
  }
]

export interface ExtractedPrediction {
  id: string
  title: string
  category: "career" | "relationship" | "finance" | "health" | "education"
  timeframe: string
  confidence: number
  status: "active" | "pending"
}

export interface ExtractedRemedy {
  id: string
  title: string
  description: string
  completed: boolean
  recurring: boolean
  frequency: "daily" | "weekly" | "monthly" | "none"
  notes: string
}

export const mockLatestSession = {
  astrologer: {
    name: "Dr. Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  duration: 45,
  topic: "Career Transition & Upcoming Rahu Mahadasha",
  date: "2026-07-15T10:00:00Z",
  amountPaid: 202,
  summary: {
    points: [
      "Saturn's transit is creating temporary friction in your current role.",
      "The upcoming Rahu period starting next month heavily favors tech and innovation.",
      "A significant networking opportunity will arise in late August."
    ],
    advice: "Do not quit your current job until the new offer is fully secured in writing. Use the next 3 weeks to quietly upskill.",
    actions: ["Update resume by Friday", "Connect with former mentor", "Begin daily Venus & Sun grounding practice"]
  },
  predictions: [
    {
      id: "ep1",
      title: "Job Offer in Tech Sector",
      category: "career",
      timeframe: "Late August - Early September",
      confidence: 88,
      status: "pending"
    },
    {
      id: "ep2",
      title: "Financial Gain via Investment",
      category: "finance",
      timeframe: "October",
      confidence: 75,
      status: "pending"
    }
  ] as ExtractedPrediction[],
  remedies: [
    {
      id: "er1",
      title: "Morning Sun Meditation",
      description: "Spend 10 minutes meditating facing east at sunrise to strengthen Sun placement.",
      completed: true,
      recurring: true,
      frequency: "daily",
      notes: "Completed 4-day streak."
    },
    {
      id: "er2",
      title: "Donate to Education Fund",
      description: "Make a small donation on Thursdays to appease Jupiter.",
      completed: false,
      recurring: true,
      frequency: "weekly",
      notes: "Next due Thursday."
    }
  ] as ExtractedRemedy[]
}

export interface TimelineEvent {
  id: string
  type: "consultation" | "milestone"
  date: string
  astrologer?: { name: string; avatar: string }
  title: string
  duration?: number
  predictionsCount?: number
  remediesCount?: number
  notesCount?: number
  milestoneIcon?: string
}

export interface JournalEntry {
  id: string
  date: string
  consultationId: string
  type: "text" | "voice"
  content: string
  mood: string
  duration?: string
}

export const mockMemoryStats = {
  totalConsultations: 14,
  activePredictions: 3,
  completedPredictions: 15,
  verifiedAccurate: 12,
  activeRemedies: 3,
  favoriteAstrologer: "Dr. Sarah Chen",
  consultationStreak: 4,
  totalInvestment: 18450
}

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "te1",
    type: "consultation",
    date: "2026-07-15T10:00:00Z",
    astrologer: { name: "Dr. Sarah Chen", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    title: "Career Growth & Jupiter Transit",
    duration: 45,
    predictionsCount: 2,
    remediesCount: 2,
    notesCount: 1
  },
  {
    id: "te2",
    type: "milestone",
    date: "2026-05-15T10:00:00Z",
    title: "Prediction Verified: Financial Investment Bonus",
    milestoneIcon: "Target"
  },
  {
    id: "te3",
    type: "consultation",
    date: "2026-05-02T14:30:00Z",
    astrologer: { name: "Elena Rostova", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
    title: "Financial Life Path & Saturn Analysis",
    duration: 30,
    predictionsCount: 2,
    remediesCount: 1,
    notesCount: 2
  }
]

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    date: "2026-07-16T08:30:00Z",
    consultationId: "c1",
    type: "voice",
    content: "Audio reflection on Dr. Sarah's advice regarding Jupiter 10th house transit.",
    mood: "motivated",
    duration: "02:15"
  },
  {
    id: "j2",
    date: "2026-06-11T16:00:00Z",
    consultationId: "c2",
    type: "text",
    content: "Felt very understood during Marcus's synastry session. The explanation of Saturn alignment makes complete sense of recent pacing in my relationship.",
    mood: "hopeful"
  }
]

export const mockChartData = {
  accuracy: [
    { name: "Dr. Sarah", value: 94 },
    { name: "Marcus T.", value: 89 },
    { name: "Elena R.", value: 96 },
    { name: "Dr. Alara", value: 96 }
  ],
  categories: [
    { name: "Career", value: 45 },
    { name: "Relationships", value: 25 },
    { name: "Finance", value: 20 },
    { name: "Health", value: 10 }
  ],
  moodEvolution: [
    { month: "Jan", score: 5 },
    { month: "Feb", score: 6 },
    { month: "Mar", score: 7 },
    { month: "Apr", score: 6 },
    { month: "May", score: 8 },
    { month: "Jun", score: 9 },
    { month: "Jul", score: 9 }
  ]
}

export interface DetailedPrediction {
  id: string
  title: string
  category: "career" | "relationship" | "finance" | "health" | "education"
  astrologer: { name: string; avatar: string }
  consultationDate: string
  targetDate: string
  confidence: number
  status: "pending" | "in_progress" | "completed" | "delayed" | "extended" | "failed"
  notes?: string
}

export const mockDetailedPredictions: DetailedPrediction[] = [
  {
    id: "dp1",
    title: "Job Offer in Tech Sector",
    category: "career",
    astrologer: { name: "Dr. Sarah Chen", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    consultationDate: "2026-07-15T10:00:00Z",
    targetDate: "2026-08-25T10:00:00Z",
    confidence: 88,
    status: "pending",
  },
  {
    id: "dp2",
    title: "Financial Investment Bonus",
    category: "finance",
    astrologer: { name: "Elena Rostova", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
    consultationDate: "2026-05-02T10:00:00Z",
    targetDate: "2026-05-15T10:00:00Z",
    confidence: 94,
    status: "completed",
    notes: "Verified: Received investment returns bonus on May 15!"
  },
  {
    id: "dp3",
    title: "Harmonious Synastry Alignment",
    category: "relationship",
    astrologer: { name: "Marcus Thorne", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
    consultationDate: "2026-06-10T10:00:00Z",
    targetDate: "2026-09-15T10:00:00Z",
    confidence: 82,
    status: "in_progress",
    notes: "Relationship milestones tracking smoothly."
  }
]

export const mockPredictionStats = {
  total: 24,
  completed: 15,
  pending: 6,
  accuracy: 80,
  upcomingWindows: 2
}

export interface VerifiedAstrologer {
  id: string
  name: string
  avatar: string
  specialization: string[]
  languages: string[]
  experienceYears: number
  consultationCount: number
  accuracy: number
  responseTime: string
  repeatCustomerRate: number
  status: "online" | "busy" | "offline"
  pricing: number
  trustScore: number
  badge: "Top Career Expert" | "Relationship Specialist" | "Rising Expert" | "Finance Mentor"
  about?: string
  certifications?: string[]
}

export const mockVerifiedAstrologers: VerifiedAstrologer[] = [
  {
    id: "a1",
    name: "Acharya Ananya Sharma",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    specialization: ["Career", "Finance", "Vedic Astrology"],
    languages: ["Hindi", "English", "Marathi"],
    experienceYears: 16,
    consultationCount: 4250,
    accuracy: 96,
    responseTime: "< 2 mins",
    repeatCustomerRate: 88,
    status: "online",
    pricing: 15,
    trustScore: 98,
    badge: "Top Career Expert",
    about: "Specializing in corporate career transitions and financial forecasting using advanced Vedic astrology & Prashna Kundli techniques.",
    certifications: ["PhD in Vedic Sciences", "Certified Astro-Vastu Expert"]
  },
  {
    id: "a2",
    name: "Pandit Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    specialization: ["Relationships", "Marriage", "KP Astrology"],
    languages: ["Hindi", "English", "Punjabi"],
    experienceYears: 14,
    consultationCount: 3840,
    accuracy: 92,
    responseTime: "5 mins",
    repeatCustomerRate: 78,
    status: "online",
    pricing: 10,
    trustScore: 94,
    badge: "Relationship Specialist"
  },
  {
    id: "a3",
    name: "Dr. Priya Patel",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    specialization: ["Health", "Spirituality", "Numerology"],
    languages: ["English", "Gujarati", "Hindi"],
    experienceYears: 20,
    consultationCount: 5100,
    accuracy: 97,
    responseTime: "Instant",
    repeatCustomerRate: 91,
    status: "online",
    pricing: 20,
    trustScore: 99,
    badge: "Rising Expert"
  },
  {
    id: "a4",
    name: "Acharya Vikram Singh",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
    specialization: ["Transits", "Nadi Astrology", "Lal Kitab"],
    languages: ["Hindi", "English", "Kannada"],
    experienceYears: 18,
    consultationCount: 2950,
    accuracy: 95,
    responseTime: "< 3 mins",
    repeatCustomerRate: 82,
    status: "busy",
    pricing: 15,
    trustScore: 96,
    badge: "Top Career Expert"
  }
]

export const mockTrustDashboardData = {
  accuracyTrend: [
    { month: "Jan", accuracy: 91 }, { month: "Feb", accuracy: 92 },
    { month: "Mar", accuracy: 94 }, { month: "Apr", accuracy: 93 },
    { month: "May", accuracy: 95 }, { month: "Jun", accuracy: 96 }
  ],
  categorySuccess: [
    { category: "Career", rate: 98 },
    { category: "Finance", rate: 92 },
    { category: "Relationships", rate: 85 },
    { category: "Health", rate: 88 },
  ],
  satisfaction: [
    { rating: "5 Star", count: 850 },
    { rating: "4 Star", count: 120 },
    { rating: "3 Star", count: 20 },
    { rating: "2 Star", count: 5 },
    { rating: "1 Star", count: 2 },
  ]
}

export const mockAnonymizedPredictions = [
  {
    id: "vp1",
    category: "Career",
    timeframe: "Aug 2026",
    outcome: "User received promotion in tech sector as predicted.",
    status: "verified",
    confidence: 90,
    completedDate: "2026-08-15"
  },
  {
    id: "vp2",
    category: "Finance",
    timeframe: "May 2026",
    outcome: "Significant return on long-term investment.",
    status: "verified",
    confidence: 94,
    completedDate: "2026-05-15"
  }
]

export const mockDeepReviews = [
  {
    id: "r1",
    userType: "Ananya Sharma · Mumbai",
    concern: "Felt stuck in mid-level management for 2 years.",
    experience: "Acharya Ananya Sharma was incredibly structured. She pinpointed the exact Jupiter transit window in July.",
    outcome: "Received executive tech offer during the predicted 3-day window.",
    followUp: "Consulted her again for negotiation strategy, which worked flawlessly.",
    badges: ["Verified Outcome", "Follow-Up Completed"],
    rating: 5,
    date: "2026-07-18"
  },
  {
    id: "r2",
    userType: "Rajesh Kumar · Delhi",
    concern: "Evaluating business partner synastry and startup investment risk.",
    experience: "Pandit Rajesh Kumar was straight to the point without any fluff. Analyzed the birth charts logically.",
    outcome: "Warned against immediate investment before Mercury went direct. Saved ₹4,50,000.",
    followUp: "Will definitely return for future business decisions.",
    badges: ["Verified Outcome"],
    rating: 5,
    date: "2026-06-22"
  }
]

export const mockExpertiseTimeline = [
  { year: "2014", title: "PhD in Vedic Sciences", description: "Graduated with honors focusing on predictive transit timing." },
  { year: "2018", title: "Published 'The Corporate Cosmos'", description: "Best-selling book on navigating career transitions." },
  { year: "2022", title: "Joined AstroLive", description: "Became a founding expert on the platform." },
  { year: "2026", title: "Top Career Expert", description: "Maintained 94%+ verified accuracy for 24 months straight." },
]

export interface ChatMessage {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: string
  isTyping?: boolean
  citations?: { type: "consultation" | "prediction" | "remedy", title: string, id: string }[]
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg1",
    role: "user",
    content: "What did Dr. Sarah say about my career transition?",
    timestamp: "10:23 AM"
  },
  {
    id: "msg2",
    role: "assistant",
    content: "Based on your consultation with **Dr. Sarah Chen** on July 15th, she advised you to maintain your current role while quietly upskilling. She highlighted that Jupiter's transit through your 10th house creates an exceptionally strong career window.\n\nShe specifically predicted a job offer in the tech sector with an 88% confidence rating, targeting the window between late August and early September.",
    timestamp: "10:23 AM",
    citations: [
      { type: "consultation", title: "Career Growth & Transits", id: "c1" },
      { type: "prediction", title: "Job Offer in Tech Sector", id: "ep1" }
    ]
  },
  {
    id: "msg3",
    role: "user",
    content: "That's right. Did she give me any active remedies?",
    timestamp: "10:24 AM"
  },
  {
    id: "msg4",
    role: "assistant",
    content: "Yes, she recommended two remedies to support this transit:\n\n1. **Venus Beej Mantra:** 108 repetitions daily (Day 11 of 21 completed).\n2. **Morning Sun Meditation:** 10 minutes facing east at sunrise (Daily streak: 4 days).\n\nYou're on a 4-day streak! Keep it up.",
    timestamp: "10:24 AM",
    citations: [
      { type: "remedy", title: "Morning Sun Meditation", id: "er1" }
    ]
  }
]

export const mockDailyCheckIn = {
  greeting: "Good morning, Arjun.",
  prompt: "You have a major career prediction window opening in 3 days. How are you feeling about your current interview preparation?",
  streak: 4,
  pendingRemedies: 1
}

export interface DailyBriefData {
  greeting: string
  energyScore: number
  summary: string
  opportunities: string[]
  cautions: string[]
  reflection: string
}

export const mockDailyBriefData: DailyBriefData = {
  greeting: "Good morning, Arjun",
  energyScore: 84,
  summary: "Today brings a strong concentration of productive energy, specifically aligned with the tech career transition Dr. Sarah Chen predicted for you.",
  opportunities: [
    "High visibility in professional communications with Sun trine Jupiter",
    "Favorable time for finalizing presentation details before Mercury direct station"
  ],
  cautions: [
    "Avoid making impulsive financial decisions before 2 PM"
  ],
  reflection: "Remember what Dr. Sarah said in July: 'Use this time to quietly upskill.' Your preparation is about to pay off."
}

export interface SmartPriority {
  id: string
  title: string
  reason: string
  actionText: string
  type: "remedy" | "prediction" | "consultation" | "journal"
}

export const mockSmartPriorities: SmartPriority[] = [
  {
    id: "sp1",
    title: "Complete Venus Beej Mantra",
    reason: "Day 11 of 21 · Maintains your social harmony & focus.",
    actionText: "Log Remedy",
    type: "remedy"
  },
  {
    id: "sp2",
    title: "Career Prediction Window Approaching",
    reason: "Your 'Tech Job Offer' window opens in 3 days (88% confidence).",
    actionText: "Review Prediction",
    type: "prediction"
  },
  {
    id: "sp3",
    title: "Log Your Mood",
    reason: "Track your energy level before tomorrow's transit.",
    actionText: "Quick Entry",
    type: "journal"
  }
]

export const mockBriefNotifications = [
  { id: "n1", category: "Predictions", text: "Your tech job offer prediction window opens in 3 days.", time: "1h ago", unread: true },
  { id: "n2", category: "AI Recommendations", text: "Based on your Jupiter transit, Dr. Sarah Chen is available for a follow-up.", time: "3h ago", unread: true },
  { id: "n3", category: "Remedies", text: "Venus Beej Mantra logged for Day 11. 10 days remaining.", time: "1d ago", unread: false }
]

export const mockHabitProgress = {
  remedyStreak: 4,
  journalStreak: 2,
  aiCheckIns: 14,
  predictionsTracked: 4
}

export const mockFAQs = [
  { question: "Who owns my Cosmic Memory data?", answer: "You do. AstroLive encrypts your data, and you can export or delete your entire Cosmic Memory at any time." },
  { question: "Can I share my account with my family?", answer: "Yes, the Family Plan allows you to add up to 4 members. Each gets their own private Cosmic Memory, Daily Brief, and AI Companion." },
  { question: "What happens if I cancel?", answer: "You keep access to all your past consultations. However, the AI Companion will stop tracking active predictions, and you will lose access to premium daily insights." },
  { question: "How does the AI Companion differ in Premium?", answer: "Free users get 5 AI queries per consultation. Premium users get unlimited daily access, memory integration across all past sessions, and proactive check-ins." }
]

export const mockSuccessStories = [
  { 
    id: "s1", 
    name: "Arjun S.", 
    role: "Tech Product Lead", 
    image: "A", 
    quote: "AstroLive+ tracked a prediction about a career pivot for 8 months. When the window opened, the AI Companion reminded me. I negotiated my VP offer with complete confidence.",
    milestone: "Successfully pivoted to Tech VP role"
  },
  { 
    id: "s2", 
    name: "Meera V.", 
    role: "Creative Director", 
    image: "M", 
    quote: "I used to forget remedies after 2 days. The Daily Brief and streak tracking kept me consistent for 21 days straight. The clarity I gained was incredible.",
    milestone: "Completed 21-day Venus remedy cycle"
  }
]

export const mockUserSettings = {
  profile: {
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    phone: "+1 (555) 382-9102",
    memberSince: "January 2024",
    plan: "AstroLive+ Premium",
    avatar: "A"
  },
  birthDetails: {
    date: "1994-08-15",
    time: "14:30",
    location: "New Delhi, India",
    system: "Vedic (Lahiri)",
    language: "English"
  },
  memoryUsage: {
    consultations: 14,
    predictions: 24,
    remedies: 4,
    journalEntries: 48,
    totalStorage: "1.8 MB"
  },
  activeSessions: [
    { id: "s1", device: "MacBook Pro M3", location: "San Francisco, CA", time: "Active now", current: true },
    { id: "s2", device: "iPhone 15 Pro", location: "San Francisco, CA", time: "2 hours ago", current: false }
  ],
  connectedServices: [
    { id: "c1", name: "Google Calendar", status: "Connected", sync: "Syncs consultation times" },
    { id: "c2", name: "Apple Health", status: "Connected", sync: "Syncs mood and sleep data for Daily Briefs" }
  ]
}

export const mockOnboardingGoals = [
  "Career Growth", "Relationships", "Marriage", "Family", 
  "Education", "Business", "Finance", "Health", 
  "Spiritual Growth", "Mental Wellbeing", "General Life Planning"
]

export const mockOnboardingAstrologers = [
  { id: "a1", name: "Dr. Sarah Chen", specialty: "Career & Transits", rating: 4.95, image: "S", matchReason: "Perfect match for your focus on Tech Career Growth. 94% verified accuracy." },
  { id: "a2", name: "Marcus Thorne", specialty: "Synastry & Relationships", rating: 4.85, image: "M", matchReason: "Matches your interest in relationship compatibility and interpersonal dynamics." },
  { id: "a3", name: "Elena Rostova", specialty: "Life Path & Finance", rating: 4.98, image: "E", matchReason: "Recommended for long-term Saturn cycle financial planning." }
]

export const mockReportData = {
  summary: "This month, you experienced a profound shift in clarity. Your adherence to the Venus remedy and Sun meditation significantly stabilized your energy, leading to the career breakthrough window opening on August 25th. You're entering a period of high emotional resilience.",
  emotionalTrends: [
    { name: 'Week 1', clarity: 65, stress: 75, energy: 60 },
    { name: 'Week 2', clarity: 75, stress: 55, energy: 70 },
    { name: 'Week 3', clarity: 85, stress: 40, energy: 85 },
    { name: 'Week 4', clarity: 92, stress: 25, energy: 94 }
  ],
  adherence: [
    { name: 'Daily Briefs', value: 88, color: '#8B5CF6' },
    { name: 'Remedies', value: 94, color: '#10B981' },
    { name: 'Journaling', value: 72, color: '#3B82F6' }
  ],
  milestones: [
    { date: "Jul 15", title: "Career Growth Session", desc: "Session with Dr. Sarah Chen on Jupiter 10th house transit." },
    { date: "Jul 20", title: "Highest Clarity Score", desc: "Logged 5 consecutive days of high mental clarity." },
    { date: "Jul 28", title: "Venus Remedy Progress", desc: "Passed Day 10 of the 21-day mantra cycle." }
  ],
  stats: {
    consultations: 14,
    predictionsVerified: 12,
    aiInteractions: 142
  }
}

export type JourneyCategory = 'Career' | 'Relationships' | 'Health' | 'Finance' | 'Personal Growth' | 'Education'
export type JourneyEventType = 'Consultation' | 'Prediction' | 'Verified Outcome' | 'Remedy' | 'Journal Entry' | 'AI Reflection'

export interface JourneyEvent {
  id: string
  type: JourneyEventType
  title: string
  date: string
  description?: string
  status?: 'completed' | 'active' | 'verified'
}

export interface Milestone {
  id: string
  title: string
  date: string
  category: JourneyCategory
  description: string
  events: JourneyEvent[]
}

export const mockJourneyMilestones: Milestone[] = [
  {
    id: "m1",
    title: "Major Career Transition & Tech Role",
    date: "July - August 2026",
    category: "Career",
    description: "Navigating Jupiter's transit through the 10th house and tech leadership opportunity.",
    events: [
      { id: "e1", type: "Consultation", title: "Session with Dr. Sarah Chen", date: "Jul 15" },
      { id: "e2", type: "Prediction", title: "Tech job offer predicted (88% confidence)", date: "Jul 15", status: "active" },
      { id: "e3", type: "Remedy", title: "Started Venus Beej Mantra 21-day cycle", date: "Jul 20", status: "completed" },
      { id: "e4", type: "Journal Entry", title: "Feeling confident about upcoming negotiation", date: "Jul 28" }
    ]
  },
  {
    id: "m2",
    title: "Financial Investment Breakthrough",
    date: "May 2026",
    category: "Finance",
    description: "Saturn return analysis and long-term financial structuring.",
    events: [
      { id: "e5", type: "Consultation", title: "Financial Life Path session with Elena Rostova", date: "May 2" },
      { id: "e6", type: "Verified Outcome", title: "Investment bonus verified as predicted", date: "May 15", status: "verified" },
      { id: "e7", type: "AI Reflection", title: "Analyzed risk mitigation patterns", date: "May 18" }
    ]
  },
  {
    id: "m3",
    title: "Relationship & Synastry Alignment",
    date: "June 2026",
    category: "Relationships",
    description: "Evaluating long-term synastry and communication harmony with Meera.",
    events: [
      { id: "e8", type: "Consultation", title: "Synastry Reading with Marcus Thorne", date: "Jun 10" },
      { id: "e9", type: "Prediction", title: "Communication harmony expected in late summer", date: "Jun 10", status: "active" }
    ]
  }
]
