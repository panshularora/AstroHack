import { Link } from "react-router-dom"
import { LAST_UPDATED } from "@/lib/site"

export function Terms() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100 px-5 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="font-display italic text-zinc-400 hover:text-zinc-100">
          AstroLive
        </Link>
        <h1 className="mt-8 font-display text-5xl">Terms of use</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated {LAST_UPDATED}</p>
        <div className="mt-10 space-y-6 text-[15px] text-zinc-300 leading-relaxed">
          <p>
            AstroLive is a demo product for connecting you with astrologers and saving what they said. Minute rates shown
            in the app are illustrative unless a live payment gateway is connected.
          </p>
          <p>
            You must be 18 or older. You are responsible for the birth details you enter. Guidance is not medical, legal,
            or financial advice.
          </p>
          <p>
            Accounts on this build live in your browser. Resetting the demo or clearing site data deletes them. We may
            change or withdraw the service without notice.
          </p>
          <p>
            Talk now sessions in this build are simulated. Do not share bank OTPs or government ID numbers in chat.
          </p>
          <p>
            Questions: use Talk in the app or return to the{" "}
            <Link to="/" className="underline">
              home page
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  )
}
