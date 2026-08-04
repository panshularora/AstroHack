import React, { createContext, useContext, useState, useEffect } from "react"

export interface UserProfileData {
  id: string
  name: string
  email: string
  dob: string // YYYY-MM-DD
  timeOfBirth: string // HH:MM
  placeOfBirth: string
  sunSign: string
  ascendant: string
  activeDasha: string
  transitPlanet: string
  transitHouse: string
  avatar: string
  memberSince: string
  predictions: Array<{
    id: string
    title: string
    category: string
    confidence: number
    status: string
    astrologerName: string
  }>
  consultations: Array<{
    id: string
    astrologerName: string
    topic: string
    date: string
    durationMinutes: number
    cost: number
  }>
}

export function calculateZodiac(dob: string): { sunSign: string; ascendant: string; activeDasha: string; transitPlanet: string; transitHouse: string } {
  if (!dob) {
    return {
      sunSign: "Leo",
      ascendant: "Scorpio",
      activeDasha: "Rahu-Jupiter Dasha",
      transitPlanet: "Jupiter",
      transitHouse: "10th House"
    }
  }

  const [yearStr, monthStr, dayStr] = dob.split("-")
  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)
  const year = parseInt(yearStr, 10)

  let sunSign = "Leo"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSign = "Aquarius"
  else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sunSign = "Pisces"
  else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSign = "Aries"
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSign = "Taurus"
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSign = "Gemini"
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSign = "Cancer"
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSign = "Leo"
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSign = "Virgo"
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSign = "Libra"
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSign = "Scorpio"
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSign = "Sagittarius"
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSign = "Capricorn"

  // Ascendants matrix based on birth hour/day
  const ascendants = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
  const ascendant = ascendants[(day + month) % 12]

  // Dasha calculation based on year
  const dashas = ["Jupiter-Venus Mahadasha", "Rahu-Jupiter Mahadasha", "Saturn-Mercury Mahadasha", "Sun-Mars Mahadasha", "Moon-Rahu Mahadasha"]
  const activeDasha = dashas[year % dashas.length]

  const planets = ["Jupiter", "Venus", "Mars", "Saturn", "Mercury"]
  const houses = ["10th House", "1st House", "9th House", "11th House", "5th House"]

  const transitPlanet = planets[(year + month) % planets.length]
  const transitHouse = houses[(day + year) % houses.length]

  return { sunSign, ascendant, activeDasha, transitPlanet, transitHouse }
}

const DEFAULT_DEMO_USER: UserProfileData = {
  id: "u1",
  name: "Arjun Sharma",
  email: "arjun@astrolive.io",
  dob: "1994-08-14",
  timeOfBirth: "08:30",
  placeOfBirth: "New Delhi, India",
  sunSign: "Leo",
  ascendant: "Scorpio",
  activeDasha: "Rahu-Jupiter Mahadasha",
  transitPlanet: "Jupiter",
  transitHouse: "10th House",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  memberSince: "May 2024",
  predictions: [
    { id: "p1", title: "Executive Tech Promotion Aperture", category: "CAREER", confidence: 88, status: "Active Window", astrologerName: "Guruji Vikram Sharma" },
    { id: "p2", title: "Equity Bonus Allocation Breakthrough", category: "FINANCE", confidence: 94, status: "Verified", astrologerName: "Elena Rostova" },
    { id: "p3", title: "International Relocation Visa Stamp", category: "IMMIGRATION", confidence: 82, status: "Active Window", astrologerName: "Acharya Ananya" }
  ],
  consultations: [
    { id: "c1", astrologerName: "Guruji Vikram Sharma", topic: "Rahu-Jupiter Transit Alignment", date: "Jul 15, 2026", durationMinutes: 45, cost: 800 },
    { id: "c2", astrologerName: "Elena Rostova", topic: "Saturn Wealth Stabilization", date: "May 02, 2026", durationMinutes: 30, cost: 500 }
  ]
}

interface UserContextType {
  user: UserProfileData
  updateProfile: (updates: Partial<UserProfileData>) => void
  resetToDemo: () => void
  createNewUser: (name: string, email: string, dob: string, time: string, place: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileData>(() => {
    const saved = localStorage.getItem("astrolive_active_user")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return DEFAULT_DEMO_USER
      }
    }
    return DEFAULT_DEMO_USER
  })

  useEffect(() => {
    localStorage.setItem("astrolive_active_user", JSON.stringify(user))
  }, [user])

  const updateProfile = (updates: Partial<UserProfileData>) => {
    setUser(prev => {
      const nextDob = updates.dob || prev.dob
      const calc = calculateZodiac(nextDob)
      return {
        ...prev,
        ...updates,
        ...calc
      }
    })
  }

  const resetToDemo = () => {
    setUser(DEFAULT_DEMO_USER)
    localStorage.removeItem("astrolive_active_user")
  }

  const createNewUser = (name: string, email: string, dob: string, time: string, place: string) => {
    const calc = calculateZodiac(dob)
    const newUser: UserProfileData = {
      id: `user-${Date.now()}`,
      name,
      email,
      dob,
      timeOfBirth: time || "12:00",
      placeOfBirth: place || "New York, USA",
      ...calc,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      memberSince: "Just Now",
      predictions: [
        {
          id: `p-${Date.now()}-1`,
          title: `${calc.transitPlanet} ${calc.transitHouse} Breakthrough`,
          category: "CAREER",
          confidence: 85,
          status: "Active Window",
          astrologerName: "Guruji Vikram Sharma"
        },
        {
          id: `p-${Date.now()}-2`,
          title: `${calc.sunSign} Sun Alignment Outcome`,
          category: "FINANCE",
          confidence: 90,
          status: "Active Window",
          astrologerName: "Elena Rostova"
        }
      ],
      consultations: [
        {
          id: `c-${Date.now()}-1`,
          astrologerName: "Guruji Vikram Sharma",
          topic: `Initial ${calc.sunSign} Kundli Reading`,
          date: "Today",
          durationMinutes: 30,
          cost: 500
        }
      ]
    }
    setUser(newUser)
  }

  return (
    <UserContext.Provider value={{ user, updateProfile, resetToDemo, createNewUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
