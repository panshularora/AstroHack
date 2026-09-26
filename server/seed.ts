import { db, nowIso } from "./db.js"
import { hashPassword } from "./auth.js"
import { PRACTITIONERS } from "../src/data/practitioners.js"

export function seed() {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO practitioners (
      id, name, title, specialty, tag, accuracy, image_url, bio,
      experience_years, rate_per_min, rating, total_sessions, is_online,
      featured_quote, techniques
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const tx = db.transaction(() => {
    for (const p of PRACTITIONERS) {
      insert.run(
        p.id,
        p.name,
        p.title,
        p.specialty,
        p.tag,
        p.accuracy,
        p.imageUrl,
        p.bio,
        p.experienceYears,
        p.ratePerMin,
        p.rating,
        p.totalSessions,
        p.isOnline ? 1 : 0,
        p.featuredQuote || null,
        JSON.stringify(p.techniques || [])
      )
    }
  })
  tx()

  try {
    db.prepare(
      "UPDATE users SET welcome_granted = 1, first_session_used = 1, wallet_balance = 100000 WHERE email = ?"
    ).run("arjun.sharma@example.com")
  } catch {
    /* columns may not exist on first boot before ensureColumn */
  }

  const demo = db.prepare("SELECT id FROM users WHERE email = ?").get("arjun.sharma@example.com")
  if (!demo) {
    const created = nowIso()
    db.prepare(`
      INSERT INTO users (
        id, email, password_hash, name, dob, time_of_birth, place_of_birth,
        avatar, plan, wallet_balance, onboarding_complete, starter_dismissed,
        intentions, member_since, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'free', 100000, 1, 0, ?, ?, ?, ?)
    `).run(
      "u1",
      "arjun.sharma@example.com",
      hashPassword("cosmic2026"),
      "Arjun Sharma",
      "1994-08-14",
      "08:30",
      "New Delhi, India",
      "",
      JSON.stringify(["Career", "Money"]),
      "May 2024",
      created,
      created
    )

    db.prepare("INSERT INTO usage_months (user_id, month_key, ai_questions, muhurta_queries) VALUES (?, ?, 0, 0)").run(
      "u1",
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
    )

    db.prepare(`
      INSERT INTO consultations (id, user_id, practitioner_id, astrologer_name, topic, mode, started_at, ended_at, duration_minutes, cost, status)
      VALUES (?, 'u1', 'acharya-indu-prakash', 'Acharya Indu Prakash', 'Rahu-Jupiter Transit Alignment', 'video', ?, ?, 45, 800, 'ended')
    `).run("c1", "2026-07-15T10:00:00.000Z", "2026-07-15T10:45:00.000Z")

    const pred = db.prepare(`
      INSERT INTO predictions (
        id, user_id, consultation_id, title, category, astrologer_name,
        consultation_date, target_date, confidence, status, outcome, notes, closed_at
      ) VALUES (?, 'u1', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    pred.run(
      "dp1",
      "c1",
      "A job offer will land in the tech sector",
      "career",
      "Acharya Indu Prakash",
      "2026-07-15T10:00:00.000Z",
      "2026-07-28T10:00:00.000Z",
      88,
      "pending",
      null,
      null,
      null
    )
    pred.run(
      "dp2",
      "c1",
      "A bonus from an investment will arrive",
      "finance",
      "Dr. Sundeep Kochar",
      "2026-05-02T10:00:00.000Z",
      "2026-05-15T10:00:00.000Z",
      94,
      "completed",
      "yes",
      "You received the investment bonus on 15 May.",
      "2026-05-16T08:00:00.000Z"
    )
    pred.run(
      "dp3",
      null,
      "The relationship will feel easier and more aligned",
      "relationship",
      "Pt. Ajai Bhambi",
      "2026-06-10T10:00:00.000Z",
      "2026-09-15T10:00:00.000Z",
      82,
      "in_progress",
      null,
      "You noted that the relationship milestones are tracking.",
      null
    )
  }

  const retitle = db.prepare("UPDATE predictions SET title = ? WHERE id = ? AND title = ?")
  retitle.run("A job offer will land in the tech sector", "dp1", "Job Offer in Tech Sector")
  retitle.run("A bonus from an investment will arrive", "dp2", "Financial Investment Bonus")
  retitle.run("The relationship will feel easier and more aligned", "dp3", "Harmonious Synastry Alignment")

  const renote = db.prepare("UPDATE predictions SET notes = ? WHERE id = ? AND notes = ?")
  renote.run("You noted that the relationship milestones are tracking.", "dp3", "Relationship milestones tracking.")
  renote.run("You received the investment bonus on 15 May.", "dp2", "Verified: received investment bonus on May 15.")
  renote.run("You received the investment bonus on 15 May.", "dp2", "Verified: Received investment returns bonus on May 15!")

  const demoUser = db.prepare("SELECT id, name FROM users WHERE email = ?").get("arjun.sharma@example.com") as
    | { id: string; name: string }
    | undefined
  if (demoUser) {
    try {
      db.prepare(
        "UPDATE users SET welcome_granted = 1, first_session_used = 1, starter_dismissed = 1 WHERE id = ?"
      ).run(demoUser.id)
    } catch {
      /* ignore */
    }
    const hasCode = db.prepare("SELECT invite_code FROM users WHERE id = ?").get(demoUser.id) as { invite_code: string | null }
    if (!hasCode?.invite_code) {
      try {
        db.prepare("UPDATE users SET invite_code = ? WHERE id = ?").run("ARJUN", demoUser.id)
      } catch {
        db.prepare("UPDATE users SET invite_code = ? WHERE id = ?").run("ARJUN1", demoUser.id)
      }
    }
    const extra = db.prepare(`
      INSERT OR IGNORE INTO predictions (
        id, user_id, consultation_id, title, category, astrologer_name,
        consultation_date, target_date, confidence, status, outcome, notes, closed_at
      ) VALUES (?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    extra.run(
      "dp4",
      demoUser.id,
      "A transfer letter will come before monsoon ends",
      "career",
      "Acharya Indu Prakash",
      "2026-04-02T10:00:00.000Z",
      "2026-06-20T10:00:00.000Z",
      81,
      "completed",
      "yes",
      "The transfer order arrived on 12 June.",
      "2026-06-13T08:00:00.000Z"
    )
    extra.run(
      "dp5",
      demoUser.id,
      "A family property talk will settle in May",
      "finance",
      "Acharya Indu Prakash",
      "2026-03-10T10:00:00.000Z",
      "2026-05-31T10:00:00.000Z",
      70,
      "failed",
      "no",
      "May closed without a settlement.",
      "2026-06-01T08:00:00.000Z"
    )
    extra.run(
      "dp7",
      demoUser.id,
      "A job offer will land in the tech sector",
      "career",
      "Dr. Sundeep Kochar",
      "2026-07-20T10:00:00.000Z",
      "2026-08-10T10:00:00.000Z",
      79,
      "in_progress",
      null,
      "Second opinion. Same line, later window.",
      null
    )
    extra.run(
      "dp6",
      demoUser.id,
      "An exam result will land above the cutoff",
      "education",
      "Pt. Ajai Bhambi",
      "2026-02-01T10:00:00.000Z",
      "2026-04-18T10:00:00.000Z",
      86,
      "completed",
      "yes",
      "The result posted on 16 April, above cutoff.",
      "2026-04-17T08:00:00.000Z"
    )

    const putProof = db.prepare(`
      INSERT OR IGNORE INTO proofs (
        id, user_id, prediction_id, title, category, astrologer_name, user_name,
        outcome, note, evidence_name, confidence, predicted_on, window_end, verified_on
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?)
    `)
    putProof.run(
      "proof-dp4", demoUser.id, "dp4", "A transfer letter will come before monsoon ends", "career",
      "Acharya Indu Prakash", "Arjun Sharma", "yes", "The transfer order arrived on 12 June.",
      81, "2026-04-02T10:00:00.000Z", "2026-06-20T10:00:00.000Z", "2026-06-13T08:00:00.000Z"
    )
    putProof.run(
      "proof-dp5", demoUser.id, "dp5", "A family property talk will settle in May", "finance",
      "Acharya Indu Prakash", "Arjun Sharma", "no", "May closed without a settlement.",
      70, "2026-03-10T10:00:00.000Z", "2026-05-31T10:00:00.000Z", "2026-06-01T08:00:00.000Z"
    )
    putProof.run(
      "proof-dp6", demoUser.id, "dp6", "An exam result will land above the cutoff", "education",
      "Pt. Ajai Bhambi", "Arjun Sharma", "yes", "The result posted on 16 April, above cutoff.",
      86, "2026-02-01T10:00:00.000Z", "2026-04-18T10:00:00.000Z", "2026-04-17T08:00:00.000Z"
    )

    const proof = db.prepare("SELECT id FROM proofs WHERE id = ?").get("proof-dp2")
    if (!proof) {
      db.prepare(`
        INSERT INTO proofs (
          id, user_id, prediction_id, title, category, astrologer_name, user_name,
          outcome, note, evidence_name, confidence, predicted_on, window_end, verified_on
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        "proof-dp2",
        demoUser.id,
        "dp2",
        "A bonus from an investment will arrive",
        "finance",
        "Dr. Sundeep Kochar",
        "Arjun Sharma",
        "yes",
        "You received the investment bonus on 15 May.",
        null,
        94,
        "2026-05-02T10:00:00.000Z",
        "2026-05-15T10:00:00.000Z",
        "2026-05-16T08:00:00.000Z"
      )
    }
  }

  const rename = db.prepare("UPDATE predictions SET astrologer_name = ? WHERE astrologer_name = ?")
  rename.run("Acharya Indu Prakash", "Acharya Ananya Sharma")
  rename.run("Dr. Sundeep Kochar", "Dr. Priya Patel")
  rename.run("Pt. Ajai Bhambi", "Pandit Rajesh Kumar")
  rename.run("Dr. Prem Kumar Sharma", "Guruji Vikram Sharma")
  rename.run("Acharya Indu Prakash", "Dr. Sarah Chen")
  rename.run("Dr. Sundeep Kochar", "Elena Rostova")
  rename.run("Pt. Ajai Bhambi", "Marcus Thorne")
  rename.run("Acharya Indu Prakash", "Acharya Vikram Shastri")

  const renameProof = db.prepare("UPDATE proofs SET astrologer_name = ? WHERE astrologer_name = ?")
  renameProof.run("Acharya Indu Prakash", "Acharya Ananya Sharma")
  renameProof.run("Dr. Sundeep Kochar", "Dr. Priya Patel")
  renameProof.run("Pt. Ajai Bhambi", "Pandit Rajesh Kumar")
  renameProof.run("Acharya Indu Prakash", "Dr. Sarah Chen")
  renameProof.run("Dr. Sundeep Kochar", "Elena Rostova")

  const renameConsult = db.prepare("UPDATE consultations SET astrologer_name = ? WHERE astrologer_name = ?")
  renameConsult.run("Acharya Indu Prakash", "Acharya Vikram Shastri")
  renameConsult.run("Acharya Indu Prakash", "Guruji Vikram Sharma")
  renameConsult.run("Dr. Sundeep Kochar", "Elena Rostova")
}
