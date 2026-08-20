import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLocation } from "react-router-dom"

export function Cursor() {
  const loc = useLocation()
  const publicPage =
    loc.pathname === "/" ||
    loc.pathname.startsWith("/p/") ||
    loc.pathname === "/tape" ||
    loc.pathname === "/board"
  const hide =
    !publicPage ||
    loc.pathname.includes("/room/") ||
    (typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches)
  const x = useMotionValue(-40)
  const y = useMotionValue(-40)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 })
  const [hot, setHot] = useState(false)

  useEffect(() => {
    if (hide) {
      document.documentElement.classList.remove("astro-cursor")
      return
    }
    document.documentElement.classList.add("astro-cursor")
    return () => document.documentElement.classList.remove("astro-cursor")
  }, [hide, loc.pathname])

  useEffect(() => {
    if (hide) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      setHot(Boolean(el?.closest("a, button, [role='button'], input, textarea")))
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [hide, x, y])

  if (hide) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference hidden md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.span
        className="block rounded-full bg-white"
        animate={{ width: hot ? 28 : 10, height: hot ? 28 : 10, opacity: hot ? 0.9 : 0.7 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      />
    </motion.div>
  )
}
