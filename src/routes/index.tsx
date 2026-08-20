import { createBrowserRouter, Navigate, useLocation, useParams } from "react-router-dom"
import { RootChrome } from "@/layouts/RootChrome"
import { AppLayout } from "@/layouts/AppLayout"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { AuthLayout } from "@/layouts/AuthLayout"
import { LoginPage } from "@/pages/auth/LoginPage"
import { SignUpPage } from "@/pages/auth/SignUpPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"

import { Landing } from "@/pages/Landing"
import { Dashboard } from "@/pages/Dashboard"
import { AICompanion } from "@/pages/AICompanion"
import { CosmicMemory } from "@/pages/CosmicMemory"
import { DailyBrief } from "@/pages/DailyBrief"
import { AstrologerProfile } from "@/pages/AstrologerProfile"
import { ReportsCenter } from "@/pages/ReportsCenter"
import { Ledger } from "@/pages/Ledger"
import { Consult } from "@/pages/Consult"
import { You } from "@/pages/You"
import { Subscription } from "@/pages/Subscription"
import { Wallet } from "@/pages/Wallet"
import { Settings } from "@/pages/Settings"
import { Onboarding } from "@/pages/Onboarding"
import { LiveConsultationRoom } from "@/pages/LiveConsultationRoom"
import { DailyToday } from "@/pages/DailyToday"
import { ShareKundli } from "@/pages/ShareKundli"
import { NavagrahaLive } from "@/pages/NavagrahaLive"
import { MuhurtaFinder } from "@/pages/MuhurtaFinder"
import { TransitTimeline } from "@/pages/TransitTimeline"
import { YogaReport } from "@/pages/YogaReport"
import { Kundli } from "@/pages/Kundli"
import { SadeSati } from "@/pages/SadeSati"
import { MangalDosha } from "@/pages/MangalDosha"
import { Gemstones } from "@/pages/Gemstones"
import { Varshphal } from "@/pages/Varshphal"
import { Ashtakavarga } from "@/pages/Ashtakavarga"
import { Prashna } from "@/pages/Prashna"
import { Numerology } from "@/pages/Numerology"
import { Proof } from "@/pages/Proof"
import { ProofBoard } from "@/pages/ProofBoard"
import { Report } from "@/pages/Report"
import { Tape } from "@/pages/Tape"
import { Horoscope } from "@/pages/Horoscope"
import { Match } from "@/pages/Match"
import { Panchang } from "@/pages/Panchang"
import { PublicKundli } from "@/pages/PublicKundli"
import { Reels } from "@/pages/Reels"
import { Offerings } from "@/pages/Offerings"
import { Puja } from "@/pages/Puja"
import { PujaSession } from "@/pages/PujaSession"
import { Terms } from "@/pages/Terms"
import { Privacy } from "@/pages/Privacy"

function ProofRedirect() {
  const { id = "" } = useParams()
  const location = useLocation()
  return <Navigate to={`/p/${id}${location.search}`} replace />
}

export const router = createBrowserRouter([
  {
    element: <RootChrome />,
    children: [
  { path: "/", element: <Landing /> },
  { path: "/story", element: <Landing /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/p/:id", element: <Proof /> },
  { path: "/board", element: <ProofBoard /> },
  { path: "/report", element: <Report /> },
  { path: "/tape", element: <Tape /> },
  { path: "/horoscope", element: <Horoscope /> },
  { path: "/match", element: <Match /> },
  { path: "/panchang", element: <Panchang /> },
  { path: "/kundli", element: <PublicKundli /> },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },

  { path: "/onboarding", element: <Onboarding /> },

  {
    path: "/app",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reels", element: <Reels /> },
      { path: "offerings", element: <Offerings /> },
      { path: "puja", element: <Puja /> },
      { path: "puja/session/:id", element: <PujaSession /> },
      { path: "strand", element: <Navigate to="/app/dashboard" replace /> },
      { path: "companion", element: <AICompanion /> },
      { path: "match", element: <Navigate to="/app/consult" replace /> },
      { path: "predictions", element: <Navigate to="/app/ledger" replace /> },
      { path: "memory", element: <CosmicMemory /> },
      { path: "brief", element: <DailyBrief /> },
      { path: "verified", element: <Navigate to="/app/consult" replace /> },
      { path: "logger", element: <Navigate to="/app/consult" replace /> },
      { path: "journey", element: <Navigate to="/app/dashboard" replace /> },
      { path: "relationship", element: <Navigate to="/match" replace /> },
      { path: "sos", element: <Navigate to="/app/today" replace /> },
      { path: "reports", element: <ReportsCenter /> },
      { path: "ledger", element: <Ledger /> },
      { path: "consult", element: <Consult /> },
      { path: "astrologers", element: <Navigate to="/app/consult" replace /> },
      { path: "you", element: <You /> },
      { path: "room/:id", element: <LiveConsultationRoom /> },
      { path: "astrologer/:id", element: <AstrologerProfile /> },
      { path: "subscription", element: <Subscription /> },
      { path: "wallet", element: <Wallet /> },
      { path: "settings", element: <Settings /> },
      { path: "today", element: <DailyToday /> },
      { path: "share", element: <ShareKundli /> },
      { path: "grahas", element: <NavagrahaLive /> },
      { path: "muhurta", element: <MuhurtaFinder /> },
      { path: "transits", element: <TransitTimeline /> },
      { path: "yogas", element: <YogaReport /> },
      { path: "kundli", element: <Kundli /> },
      { path: "sade-sati", element: <SadeSati /> },
      { path: "mangal", element: <MangalDosha /> },
      { path: "gems", element: <Gemstones /> },
      { path: "varshphal", element: <Varshphal /> },
      { path: "ashtakavarga", element: <Ashtakavarga /> },
      { path: "prashna", element: <Prashna /> },
      { path: "numerology", element: <Numerology /> },
      { path: "proof/:id", element: <ProofRedirect /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])
