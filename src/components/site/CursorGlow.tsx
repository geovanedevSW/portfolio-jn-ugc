import type { ReactNode } from "react"

export function CursorGlow({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}
