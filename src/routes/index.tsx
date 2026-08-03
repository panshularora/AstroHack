import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { LoginPage } from "@/pages/auth/LoginPage"
import { SignUpPage } from "@/pages/auth/SignUpPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"

import { Landing } from "@/pages/Landing"
import { Dashboard } from "@/pages/Dashboard"
import { AICompanion } from "@/pages/AICompanion"
import { SmartMatch } from "@/pages/SmartMatch"
import { PredictionCenter } from "@/pages/PredictionCenter"
import { CosmicMemory } from "@/pages/CosmicMemory"
import { DailyBrief } from "@/pages/DailyBrief"
import { AstroVerified } from "@/pages/AstroVerified"
import { ConsultLogger } from "@/pages/ConsultLogger"
import { AstrologerProfile } from "@/pages/AstrologerProfile"
import { LifeJourney } from "@/pages/LifeJourney"
import { RelationshipMode } from "@/pages/RelationshipMode"
import { EmergencyGuidance } from "@/pages/EmergencyGuidance"
import { ReportsCenter } from "@/pages/ReportsCenter"
import { Ledger } from "@/pages/Ledger"
import { Consult } from "@/pages/Consult"
import { You } from "@/pages/You"
import { Subscription } from "@/pages/Subscription"
import { Settings } from "@/pages/Settings"
import { Onboarding } from "@/pages/Onboarding"
import { LiveConsultationRoom } from "@/pages/LiveConsultationRoom"

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },

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
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "companion", element: <AICompanion /> },
      { path: "match", element: <SmartMatch /> },
      { path: "predictions", element: <PredictionCenter /> },
      { path: "memory", element: <CosmicMemory /> },
      { path: "brief", element: <DailyBrief /> },
      { path: "verified", element: <AstroVerified /> },
      { path: "logger", element: <ConsultLogger /> },
      { path: "journey", element: <LifeJourney /> },
      { path: "relationship", element: <RelationshipMode /> },
      { path: "sos", element: <EmergencyGuidance /> },
      { path: "reports", element: <ReportsCenter /> },
      { path: "ledger", element: <Ledger /> },
      { path: "consult", element: <Consult /> },
      { path: "astrologers", element: <AstroVerified /> },
      { path: "you", element: <You /> },
      { path: "room/:id", element: <LiveConsultationRoom /> },
      { path: "astrologer/:id", element: <AstrologerProfile /> },
      { path: "subscription", element: <Subscription /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
])
