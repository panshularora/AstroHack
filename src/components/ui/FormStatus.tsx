import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function FormError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-2 text-sm text-red-400"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}

export function FormSuccess({ title, detail }: { title: string; detail?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-10"
    >
      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
      <h2 className="mt-4 font-display text-2xl text-zinc-50">{title}</h2>
      {detail && <p className="mt-2 text-sm text-zinc-400">{detail}</p>}
    </motion.div>
  )
}
