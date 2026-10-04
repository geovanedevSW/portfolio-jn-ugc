import { motion } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"

type Direction = "up" | "left" | "right" | "scale" | "fade"

const directionClasses: Record<Direction, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade: "reveal-fade",
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
  eager = false,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  once?: boolean
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (eager) {
      const frame = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [eager, once])

  return (
    <motion.div
      ref={ref}
      data-reveal={isVisible ? "visible" : "hidden"}
      className={`reveal ${directionClasses[direction]} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerLines({
  lines,
  className,
  italicWord,
  italicWordColor,
}: {
  lines: string[]
  className?: string
  italicWord?: string
  italicWordColor?: string
}) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: "100%" },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="block">
            {italicWord && line.includes(italicWord)
              ? line.split(italicWord).map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <em
                        className="font-normal italic"
                        style={italicWordColor ? { color: italicWordColor } : undefined}
                      >
                        {italicWord}
                      </em>
                    )}
                  </span>
                ))
              : line}
          </span>
        </motion.span>
      ))}
    </motion.h1>
  )
}
