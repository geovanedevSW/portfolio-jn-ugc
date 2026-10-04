import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

export type ReelClip = {
  src: string
  poster?: string
  kind?: "video" | "image"
  title?: string
  objectPosition?: string
}

type ReelsViewerProps = {
  clips: ReelClip[]
  activeIndex: number | null
  onActiveIndexChange: (index: number | null) => void
  endLinkTo?: "/case" | "/case-rafalou"
  brandName?: string
  brandLogo?: string | null
}

function isVideo(clip: ReelClip) {
  return clip.kind === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(clip.src)
}

export function ReelsViewer({
  clips,
  activeIndex,
  onActiveIndexChange,
  endLinkTo,
  brandName = "Use Pedroso",
  brandLogo,
}: ReelsViewerProps) {
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isEndScreen, setIsEndScreen] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const pausedByTouch = useRef(false)
  const activeClip = activeIndex === null ? null : clips[activeIndex]

  const showNextClip = () => {
    if (activeIndex === null || activeIndex >= clips.length - 1) return
    onActiveIndexChange(activeIndex + 1)
    setProgress(0)
    setIsPlaying(true)
    setIsEndScreen(false)
  }

  const showPreviousClip = () => {
    if (activeIndex === null || activeIndex <= 0) return
    onActiveIndexChange(activeIndex - 1)
    setProgress(0)
    setIsPlaying(true)
    setIsEndScreen(false)
  }

  useEffect(() => {
    if (activeIndex === null) return
    setProgress(0)
    setIsPlaying(true)
    setIsEndScreen(false)
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null || !activeClip || isVideo(activeClip)) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const nextProgress = Math.min(((Date.now() - startedAt) / 5000) * 100, 100)
      setProgress(nextProgress)
      if (nextProgress >= 100) {
        window.clearInterval(timer)
        if (activeIndex < clips.length - 1) onActiveIndexChange(activeIndex + 1)
        else if (endLinkTo) setIsEndScreen(true)
      }
    }, 50)

    return () => window.clearInterval(timer)
  }, [activeIndex, activeClip, clips.length, endLinkTo,
  brandName = "Use Pedroso",
  brandLogo, onActiveIndexChange])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) videoRef.current.muted = nextMuted
  }

  const updateVolume = (nextVolume: number) => {
    setVolume(nextVolume)
    const nextMuted = nextVolume === 0
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.volume = nextVolume
      videoRef.current.muted = nextMuted
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      showNextClip()
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      showPreviousClip()
    }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) {
      resumeAfterTouch()
      return
    }
    const deltaX = event.changedTouches[0].clientX - touchStart.current.x
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null

    if (deltaY > 70 && Math.abs(deltaY) > Math.abs(deltaX)) {
      pausedByTouch.current = false
      onActiveIndexChange(null)
      return
    }

    resumeAfterTouch()
  }

  const pauseForTouch = (target: EventTarget | null) => {
    if (
      target instanceof HTMLElement &&
      !target.closest("button, input, a") &&
      activeClip &&
      isVideo(activeClip) &&
      videoRef.current &&
      !videoRef.current.paused
    ) {
      videoRef.current.pause()
      pausedByTouch.current = true
    }
  }

  const resumeAfterTouch = () => {
    if (!pausedByTouch.current) return
    pausedByTouch.current = false
    videoRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {})
  }

  return (
    <Dialog
      open={activeIndex !== null}
      onOpenChange={(open) => {
        if (!open) onActiveIndexChange(null)
      }}
    >
      <DialogContent
        onKeyDown={handleKeyDown}
        onContextMenu={(event) => event.preventDefault()}
        onTouchStart={(event) => {
          touchStart.current = {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY,
          }
          pauseForTouch(event.target)
        }}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={resumeAfterTouch}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") pauseForTouch(event.target)
        }}
        onPointerUp={resumeAfterTouch}
        onPointerCancel={resumeAfterTouch}
        className="fixed inset-0 left-0 top-0 z-[60] flex h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-0 bg-black p-0 text-white shadow-none select-none [&_*]:select-none [-webkit-touch-callout:none] data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 md:left-1/2 md:top-1/2 md:h-[min(88dvh,860px)] md:w-[min(92vw,980px)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-none md:border-0 md:bg-transparent md:shadow-none [&>button]:hidden"
      >
        <DialogTitle className="sr-only">Conteúdos Use Pedroso</DialogTitle>
        <DialogDescription className="sr-only">
          Navegue pelos vídeos e fotos em tela cheia.
        </DialogDescription>

        {activeClip && activeIndex !== null && (
          <div className="flex h-full min-h-0 items-center justify-center bg-black text-white md:bg-transparent">
            <div className="relative flex h-full min-h-0 w-full items-center justify-center px-0 pb-0 pt-0 md:px-16 md:pb-6 md:pt-6">
              <div className="relative flex h-full w-full max-w-full items-center justify-center overflow-hidden rounded-none bg-black md:h-[min(76dvh,54rem)] md:w-auto md:aspect-[9/16] md:rounded-xl">
                {isVideo(activeClip) ? (
                  <video
                    key={activeClip.src}
                    ref={videoRef}
                    src={activeClip.src}
                    poster={activeClip.poster}
                    autoPlay={isPlaying}
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(event) => {
                      event.currentTarget.volume = volume
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(event) => {
                      const video = event.currentTarget
                      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0)
                    }}
                    onEnded={() => {
                      const hasMoreVideos = clips.slice(activeIndex + 1).some(isVideo)
                      if (endLinkTo && !hasMoreVideos) {
                        setIsPlaying(false)
                        setProgress(100)
                        setIsEndScreen(true)
                      } else if (activeIndex < clips.length - 1) {
                        showNextClip()
                      } else {
                        setIsPlaying(false)
                      }
                    }}
                    className={`h-full w-full object-cover transition-[filter,transform] duration-500 md:object-contain ${
                      isEndScreen ? "scale-105 blur-sm" : ""
                    }`}
                  />
                ) : (
                  <img
                    key={activeClip.src}
                    src={activeClip.src}
                    alt={activeClip.title ?? "Conteúdo Use Pedroso"}
                    style={{ objectPosition: activeClip.objectPosition ?? "center" }}
                    className={`h-full w-full object-cover transition-[filter,transform] duration-500 md:object-contain ${
                      isEndScreen ? "scale-105 blur-sm" : ""
                    }`}
                    draggable={false}
                  />
                )}

                {isVideo(activeClip) && !isEndScreen && (
                  <button
                    type="button"
                    aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                    onClick={togglePlayback}
                    className="absolute inset-0 z-10 hidden place-items-center focus-visible:outline-2 focus-visible:outline-white [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:grid"
                  >
                    {!isPlaying && (
                      <span className="grid size-14 place-items-center rounded-full bg-[var(--accent)] text-white shadow-lg">
                        <Play className="ml-0.5 size-5 fill-current" />
                      </span>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  aria-label="Conteúdo anterior"
                  onClick={showPreviousClip}
                  disabled={activeIndex === 0}
                  className="absolute inset-y-0 left-0 z-[15] w-1/3 border-0 bg-transparent outline-none focus:outline-none focus-visible:outline-none md:hidden"
                />
                <button
                  type="button"
                  aria-label="Próximo conteúdo"
                  onClick={showNextClip}
                  disabled={activeIndex === clips.length - 1}
                  className="absolute inset-y-0 right-0 z-[15] w-1/3 border-0 bg-transparent outline-none focus:outline-none focus-visible:outline-none md:hidden"
                />

                {endLinkTo && isEndScreen && (
                  <div className="absolute inset-0 z-30 grid place-items-center bg-black/15">
                    <Link
                      to={endLinkTo}
                      onClick={() => onActiveIndexChange(null)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-xs font-medium text-white shadow-lg transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Ver mais conteúdos
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                )}

                <header className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/70 to-transparent px-3 pb-5 pt-[max(env(safe-area-inset-top),0.75rem)] md:pt-3">
                  <div className="flex gap-1" aria-hidden="true">
                    {clips.map((clip, index) => (
                      <span
                        key={clip.src}
                        className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35"
                      >
                        <span
                          className="block h-full bg-white transition-[width] duration-100"
                          style={{
                            width:
                              index < activeIndex
                                ? "100%"
                                : index === activeIndex
                                  ? `${progress}%`
                                  : "0%",
                          }}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1">
                        {brandLogo ? <img src={brandLogo} alt="" className="h-full w-full object-contain" /> : <span className="text-xs font-bold text-black">{brandName.charAt(0)}</span>}
                      </span>
                      <span className="truncate text-xs font-medium text-white drop-shadow-sm">{brandName}</span>
                    </div>
                    <DialogClose
                      aria-label="Fechar conteúdos"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <X className="size-4" />
                      <span className="sr-only">Fechar</span>
                    </DialogClose>
                  </div>
                </header>

                <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-10">
                  <span />
                  {isVideo(activeClip) && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                        onClick={togglePlayback}
                        className="hidden size-10 place-items-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:grid"
                      >
                        {isPlaying ? (
                          <Pause className="size-4" />
                        ) : (
                          <Play className="ml-0.5 size-4 fill-current" />
                        )}
                      </button>
                      <div className="group/volume flex items-center rounded-full bg-black/45 px-1 py-1 text-white">
                        <button
                          type="button"
                          aria-label={isMuted || volume === 0 ? "Ativar áudio" : "Silenciar vídeo"}
                          title={isMuted || volume === 0 ? "Ativar áudio" : "Silenciar vídeo"}
                          onClick={toggleMute}
                          className="grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="size-4" />
                          ) : (
                            <Volume2 className="size-4" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          aria-label="Volume do vídeo"
                          onChange={(event) => updateVolume(Number(event.currentTarget.value))}
                          className="h-1 w-0 cursor-pointer opacity-0 transition-[width,opacity] duration-200 accent-[var(--accent)] group-hover/volume:mr-2 group-hover/volume:w-20 group-hover/volume:opacity-100 group-focus-within/volume:mr-2 group-focus-within/volume:w-20 group-focus-within/volume:opacity-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-label="Conteúdo anterior"
                title="Anterior"
                onClick={showPreviousClip}
                disabled={activeIndex === 0}
                className="hidden size-11 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40 md:absolute md:bottom-auto md:left-5 md:top-1/2 md:z-30 md:-translate-y-1/2 md:grid"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Próximo conteúdo"
                title="Próximo"
                onClick={showNextClip}
                disabled={activeIndex === clips.length - 1}
                className="hidden size-11 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40 md:absolute md:bottom-auto md:right-5 md:top-1/2 md:z-30 md:-translate-y-1/2 md:grid"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


