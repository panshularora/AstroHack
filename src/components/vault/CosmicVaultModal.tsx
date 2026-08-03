import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Upload, Link as LinkIcon, ShieldCheck, Sparkles, Folder } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface CosmicVaultModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CosmicVaultModal({ isOpen, onClose }: CosmicVaultModalProps) {
  const [documents, setDocuments] = useState([
    { id: "doc-1", name: "Offer_Letter_TechExec_2026.pdf", category: "CAREER", date: "Aug 15, 2026", linkedPrediction: "Executive Tech Offer (88% Conf.)", verified: true, size: "1.4 MB" },
    { id: "doc-2", name: "H1B_Visa_Stamp_Approval.pdf", category: "IMMIGRATION", date: "Nov 12, 2024", linkedPrediction: "US Transit & Visa Clearance", verified: true, size: "2.1 MB" },
    { id: "doc-3", name: "Ashtakoot_Kundli_Milan_Certificate.pdf", category: "RELATIONSHIP", date: "Feb 04, 2025", linkedPrediction: "31/36 Guna Compatibility Outcome", verified: true, size: "850 KB" },
    { id: "doc-4", name: "Medical_Vitality_Panchan_Report.pdf", category: "HEALTH", date: "May 20, 2025", linkedPrediction: "Ayurvedic Balance Window", verified: false, size: "3.2 MB" },
  ])

  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => {
      setDocuments(prev => [
        {
          id: `doc-${Date.now()}`,
          name: "Promotional_Contract_2026.pdf",
          category: "CAREER",
          date: "Just Now",
          linkedPrediction: "Tech Offer Verification",
          verified: true,
          size: "1.8 MB"
        },
        ...prev
      ])
      setUploading(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-line rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-display text-ink">Cosmic Life Document Vault</h2>
                  <Badge variant="gold" size="sm" className="font-mono">Immutable Proof</Badge>
                </div>
                <p className="text-xs font-mono text-ink-tertiary mt-0.5">
                  Link real-life contracts, offer letters, & certificates to astrologer predictions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Upload Drop Zone */}
          <div className="p-6 rounded-lg border-2 border-dashed border-brand/40 bg-surface-2/40 text-center space-y-3 font-mono">
            <Upload className="w-8 h-8 text-brand mx-auto animate-bounce" />
            <div>
              <p className="text-xs font-bold text-ink">Upload Life Verification Document (PDF/PNG)</p>
              <p className="text-[10px] text-ink-tertiary mt-0.5">Resumes, Offer Letters, Visa Stamps, Kundli Milans, Contracts</p>
            </div>
            <Button size="sm" className="rounded-md font-mono" onClick={handleUpload} disabled={uploading}>
              {uploading ? "Encrypting & Attaching..." : "Select File to Attach"}
            </Button>
          </div>

          {/* Documents List */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-line/40 pb-2 text-[10px] text-ink-tertiary uppercase font-bold">
              <span>Attached Document</span>
              <span>Linked Prediction & Status</span>
            </div>

            {documents.map(doc => (
              <div key={doc.id} className="p-4 rounded-md bg-surface-2/60 border border-line flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-surface border border-line flex items-center justify-center shrink-0 text-brand">
                    <FileText className="w-4 h-4 text-brand" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-ink truncate text-xs">{doc.name}</p>
                    <p className="text-[10px] text-ink-tertiary">{doc.category} · {doc.size} · Uploaded {doc.date}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <div className="flex items-center gap-1.5 justify-end">
                    <LinkIcon className="w-3 h-3 text-gold-bright" />
                    <span className="text-[11px] font-bold text-gold-bright truncate max-w-[180px]">{doc.linkedPrediction}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-[10px]">
                    {doc.verified ? (
                      <span className="text-success flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-success" /> Verified Proof</span>
                    ) : (
                      <span className="text-warning">Pending Verification</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between font-mono text-xs text-ink-tertiary">
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-brand" /> 256-Bit Encrypted Memory</span>
            <Button size="sm" variant="outline" className="rounded-md font-mono" onClick={onClose}>
              Close Vault
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
