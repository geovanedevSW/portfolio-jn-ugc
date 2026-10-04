/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_CLARITY_ID?: string
  readonly VITE_GSC_VERIFICATION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
