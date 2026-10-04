export type ClipKind = "video" | "image"

export type Clip = {
  src: string
  poster?: string
  kind: ClipKind
  title: string
  objectPosition?: string
}

const VIDEO_SRC = /\.(mp4|webm|mov)(\?|$)/i

export function isVideoClip(clip: Pick<Clip, "src" | "kind">) {
  return clip.kind === "video" || VIDEO_SRC.test(clip.src)
}

export const cloudinaryBase = "https://res.cloudinary.com/dhb9yrfdh"
