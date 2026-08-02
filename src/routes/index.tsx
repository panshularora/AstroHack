import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { LoginPage } from "@/pages/auth/LoginPage"
import { SignUpPage } from "@/pages/auth/SignUpPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"

import { Landing } from "@/pages/Landing"
import { Dashboard } from "@/pages/Dashboard"
import { SmartMatch } from "@/pages/SmartMatch"
import { ConsultLogger } from "@/pages/ConsultLogger"
import { CosmicMemory } from "@/pages/CosmicMemory"
import { PredictionCenter } from "@/pages/PredictionCenter"
import { AstroVerified } from "@/pages/AstroVerified"
import { AstrologerProfile } from "@/pages/AstrologerProfile"
import { AICompanion } from "@/pages/AICompanion"
import { DailyBrief } from "@/pages/DailyBrief"
import { Subscription } from "@/pages/Subscription"
import { Settings } from "@/pages/Settings"
import { Onboarding } from "@/pages/Onboarding"
import { ReportsCenter } from "@/pages/ReportsCenter"
import { LifeJourney } from "@/pages/LifeJourney"
import { EmergencyGuidance } from "@/pages/EmergencyGuidance"
import { RelationshipMode } from "@/pages/RelationshipMode"
import { LiveConsultationRoom } from "@/pages/LiveConsultationRoom"

export const router = createBrowserRouter([
  // ── Marketing landing page ──────────────────────────────────────────────
  {
    path: "/",
    element: <Landing />,
  },

  // ── Authentication flow ──────────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },

  // ── Onboarding flow ──────────────────────────────────────────────────────
  {
    path: "/onboarding",
    element: <Onboarding />,
  },

  // ── Authenticated application (with sidebar / topbar) ───────────────────
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "match", element: <SmartMatch /> },
      { path: "logger", element: <ConsultLogger /> },
      { path: "memory", element: <CosmicMemory /> },
      { path: "predictions", element: <PredictionCenter /> },
      { path: "verified", element: <AstroVerified /> },
      { path: "companion", element: <AICompanion /> },
      { path: "reports", element: <ReportsCenter /> },
      { path: "journey", element: <LifeJourney /> },
      { path: "sos", element: <EmergencyGuidance /> },
      { path: "astrologer/:id", element: <AstrologerProfile /> },
      { path: "room/:id", element: <LiveConsultationRoom /> },
      { path: "subscription", element: <Subscription /> },
      { path: "brief", element: <DailyBrief /> },
      { path: "relationship", element: <RelationshipMode /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // ── Fallback: redirect any unknown URL to the landing page ───────────────
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
