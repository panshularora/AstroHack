import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { LoginPage } from "@/pages/auth/LoginPage"
import { SignUpPage } from "@/pages/auth/SignUpPage"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage"

import { Landing } from "@/pages/Landing"
import { Ledger } from "@/pages/Ledger"
import { Consult } from "@/pages/Consult"
import { You } from "@/pages/You"
import { AstroVerified } from "@/pages/AstroVerified"
import { AstrologerProfile } from "@/pages/AstrologerProfile"
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
      { index: true, element: <Navigate to="/app/ledger" replace /> },
      { path: "ledger", element: <Ledger /> },
      { path: "consult", element: <Consult /> },
      { path: "astrologers", element: <AstroVerified /> },
      { path: "you", element: <You /> },
      { path: "room/:id", element: <LiveConsultationRoom /> },
      { path: "astrologer/:id", element: <AstrologerProfile /> },
      { path: "subscription", element: <Subscription /> },
      { path: "settings", element: <Settings /> },

      // Legacy redirects
      { path: "dashboard", element: <Navigate to="/app/ledger" replace /> },
      { path: "predictions", element: <Navigate to="/app/ledger" replace /> },
      { path: "match", element: <Navigate to="/app/consult" replace /> },
      { path: "verified", element: <Navigate to="/app/astrologers" replace /> },
      { path: "brief", element: <Navigate to="/app/ledger" replace /> },
      { path: "companion", element: <Navigate to="/app/ledger" replace /> },
      { path: "memory", element: <Navigate to="/app/ledger" replace /> },
      { path: "logger", element: <Navigate to="/app/consult" replace /> },
      { path: "reports", element: <Navigate to="/app/you" replace /> },
      { path: "journey", element: <Navigate to="/app/ledger" replace /> },
      { path: "sos", element: <Navigate to="/app/ledger" replace /> },
      { path: "relationship", element: <Navigate to="/app/ledger" replace /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
])
