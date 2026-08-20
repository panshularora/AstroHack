PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  time_of_birth TEXT NOT NULL,
  place_of_birth TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '',
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'plus', 'family')),
  plan_since TEXT,
  wallet_balance INTEGER NOT NULL DEFAULT 0,
  onboarding_complete INTEGER NOT NULL DEFAULT 0,
  starter_dismissed INTEGER NOT NULL DEFAULT 0,
  intentions TEXT NOT NULL DEFAULT '[]',
  member_since TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usage_months (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month_key TEXT NOT NULL,
  ai_questions INTEGER NOT NULL DEFAULT 0,
  muhurta_queries INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, month_key)
);

CREATE TABLE IF NOT EXISTS family_members (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  dob TEXT NOT NULL,
  time_of_birth TEXT NOT NULL,
  place_of_birth TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS practitioners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  tag TEXT NOT NULL,
  accuracy TEXT NOT NULL,
  image_url TEXT NOT NULL,
  bio TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  rate_per_min INTEGER NOT NULL,
  rating REAL NOT NULL,
  total_sessions INTEGER NOT NULL,
  is_online INTEGER NOT NULL DEFAULT 1,
  featured_quote TEXT,
  techniques TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  practitioner_id TEXT REFERENCES practitioners(id) ON DELETE SET NULL,
  astrologer_name TEXT NOT NULL,
  topic TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'chat',
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  cost INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ended'
);

CREATE TABLE IF NOT EXISTS predictions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  consultation_id TEXT REFERENCES consultations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  astrologer_name TEXT NOT NULL,
  consultation_date TEXT NOT NULL,
  target_date TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  status TEXT NOT NULL,
  outcome TEXT,
  notes TEXT,
  evidence_note TEXT,
  evidence_name TEXT,
  closed_at TEXT
);

CREATE TABLE IF NOT EXISTS proofs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prediction_id TEXT NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  astrologer_name TEXT NOT NULL,
  user_name TEXT NOT NULL,
  outcome TEXT NOT NULL,
  note TEXT,
  evidence_name TEXT,
  confidence INTEGER NOT NULL,
  predicted_on TEXT NOT NULL,
  window_end TEXT NOT NULL,
  verified_on TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS wallet_ledger (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS utm_events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  term TEXT,
  content TEXT,
  ref TEXT,
  captured_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY,
  inviter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invitee_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user ON predictions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_consultations_user ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_proofs_user ON proofs(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_messages(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_wallet_user ON wallet_ledger(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_referrals_inviter ON referrals(inviter_id);
