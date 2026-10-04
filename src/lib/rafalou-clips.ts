import { cloudinaryBase, type Clip } from "./clip"

export type { Clip }

export const rafalouClips: Clip[] = [
  {
    src: `${cloudinaryBase}/video/upload/v1791069935/IMG_2407.mp4`,
    poster: `${cloudinaryBase}/video/upload/so_1/v1791069935/IMG_2407.webp`,
    kind: "video",
    title: "Conteúdo 1",
  },
  {
    src: `${cloudinaryBase}/image/upload/v1791069958/IMG_2371.HEIC.webp`,
    kind: "image",
    title: "Conteúdo 2",
  },
  {
    src: `${cloudinaryBase}/video/upload/v1791069938/IMG_2408.mp4`,
    poster: `${cloudinaryBase}/video/upload/so_1/v1791069938/IMG_2408.webp`,
    kind: "video",
    title: "Conteúdo 3",
  },
  {
    src: `${cloudinaryBase}/video/upload/v1791069935/IMG_2373.mp4`,
    poster: `${cloudinaryBase}/video/upload/so_1/v1791069935/IMG_2373.webp`,
    kind: "video",
    title: "Conteúdo 4",
  },
]
