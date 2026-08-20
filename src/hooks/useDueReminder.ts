import { useEffect } from "react"
import type { DetailedPrediction } from "@/lib/mock-data"

const KEY = "astrolive_due_ping"
const PREF = "astrolive_due_notify"

export function dueReminderAllowed() {
  try {
    return localStorage.getItem(PREF) === "on"
  } catch {
    return false
  }
}

export function setDueReminder(on: boolean) {
  try {
    localStorage.setItem(PREF, on ? "on" : "off")
  } catch {
    /* ignore */
  }
}

export function useDueReminder(predictions: DetailedPrediction[]) {
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return
    if (!dueReminderAllowed() || Notification.permission !== "granted") return
    const due = predictions.filter(
      (p) => (p.status === "pending" || p.status === "in_progress") && new Date(p.targetDate) <= new Date()
    )
    if (!due.length) return
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
    try {
      if (localStorage.getItem(KEY) === today) return
      localStorage.setItem(KEY, today)
    } catch {
      return
    }
    const first = due[0]
    new Notification("A date you saved has come.", {
      body: `“${first.title}” — mark if it happened.`,
      tag: "astrolive-due",
    })
  }, [predictions])
}

export async function enableDueReminder() {
  if (!("Notification" in window)) return false
  const perm = await Notification.requestPermission()
  const ok = perm === "granted"
  setDueReminder(ok)
  return ok
}
