import { Link } from "react-router-dom"
import { LAST_UPDATED } from "@/lib/site"

export function Privacy() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100 px-5 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="font-display italic text-zinc-400 hover:text-zinc-100">
          AstroLive
        </Link>
        <h1 className="mt-8 font-display text-5xl">Privacy</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated {LAST_UPDATED}</p>
        <div className="mt-10 space-y-6 text-[15px] text-zinc-300 leading-relaxed">
          <p>
            This demo stores your name, birth details, ledger, and theme preference in localStorage on this device. We do
            not run a production database from this repo.
          </p>
          <p>
            Campaign tags (utm_source and friends) stay in sessionStorage so invite links can carry them. We do not sell
            that data.
          </p>
          <p>
            If an operator sets XAI_API_KEY, Ask may send a chart snapshot and your question to xAI to write a reply.
            Without a key, answers stay on-device.
          </p>
          <p>
            Portraits in the directory are local files. Clearing the site or using Reset to demo removes your profile from
            this browser.
          </p>
          <p>
            See also{" "}
            <Link to="/terms" className="underline">
              Terms
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  )
}
