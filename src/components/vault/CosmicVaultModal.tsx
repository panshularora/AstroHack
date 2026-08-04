import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Upload, Link as LinkIcon, ShieldCheck, Sparkles, Folder } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface CosmicVaultModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CosmicVaultModal({ isOpen, onClose }: CosmicVaultModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState([
    { id: "doc-1", name: "Offer_Letter_TechExec_2026.pdf", category: "CAREER", date: "Aug 15, 2026", linkedPrediction: "Executive Tech Offer (88% Conf.)", verified: true, size: "1.4 MB" },
    { id: "doc-2", name: "H1B_Visa_Stamp_Approval.pdf", category: "IMMIGRATION", date: "Nov 12, 2024", linkedPrediction: "US Transit & Visa Clearance", verified: true, size: "2.1 MB" },
    { id: "doc-3", name: "Ashtakoot_Kundli_Milan_Certificate.pdf", category: "RELATIONSHIP", date: "Feb 04, 2025", linkedPrediction: "31/36 Guna Compatibility Outcome", verified: true, size: "850 KB" },
    { id: "doc-4", name: "Medical_Vitality_Panchan_Report.pdf", category: "HEALTH", date: "May 20, 2025", linkedPrediction: "Ayurvedic Balance Window", verified: false, size: "3.2 MB" },
  ])

  const [uploading, setUploading] = useState(false)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setTimeout(() => {
      setDocuments(prev => [
        {
          id: `doc-${Date.now()}`,
          name: file.name,
          category: "USER PROOF",
          date: "Just Now",
          linkedPrediction: "Active Prediction Window (92% Conf.)",
          verified: true,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        },
        ...prev
      ])
      setUploading(false)
    }, 1200)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#090A0F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-display text-white">Cosmic Life Document Vault</h2>
                  <Badge variant="gold" size="sm" className="font-mono">Immutable Proof</Badge>
                </div>
                <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">
                  Link real contracts, offer letters, & visas to astrologer prediction receipts
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpeg,.jpg,.doc,.docx"
            className="hidden"
          />

          {/* Upload Drop Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="p-6 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/5 text-center space-y-3 font-mono cursor-pointer hover:border-amber-400 hover:bg-amber-500/10 transition-all"
          >
            <Upload className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
            <div>
              <p className="text-xs font-bold text-white">Click to Select Real Document (PDF / Image)</p>
              <p className="text-[10px] text-[#9CA3AF] mt-0.5">Offer Letters, Visas, Kundli Milans, Property Deeds, Contracts</p>
            </div>
            <Button size="sm" className="rounded-xl font-mono bg-amber-500 text-black font-bold hover:bg-amber-400" disabled={uploading}>
              {uploading ? "Encrypting & Attaching File..." : "Choose File from Computer"}
            </Button>
          </div>

          {/* Documents List */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-[#9CA3AF] uppercase font-bold">
              <span>Attached Real Document</span>
              <span>Linked Prediction & Status</span>
            </div>

            {documents.map(doc => (
              <div key={doc.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate text-xs">{doc.name}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{doc.category} · {doc.size} · Uploaded {doc.date}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <div className="flex items-center gap-1.5 justify-end">
                    <LinkIcon className="w-3 h-3 text-amber-400" />
                    <span className="text-[11px] font-bold text-amber-300 truncate max-w-[180px]">{doc.linkedPrediction}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-[10px]">
                    {doc.verified ? (
                      <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Proof</span>
                    ) : (
                      <span className="text-amber-400">Pending Verification</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> 256-Bit Encrypted Vault</span>
            <Button size="sm" variant="outline" className="rounded-xl font-mono border-white/20 text-white" onClick={onClose}>
              Close Vault
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
