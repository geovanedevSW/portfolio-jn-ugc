# 🎨 Jhenifer Nogueira Studio

A high-end digital portfolio and briefing system designed for a creative studio. This project focuses on a premium, minimalist aesthetic, leveraging modern web technologies to provide a seamless and sophisticated user experience.

## ✨ Features

- **Premium Portfolio**: A showcase of creative work with a focus on high-quality visuals.
- **Interactive Briefing System**: A sophisticated lead capture form with:
  - Custom Select components with staggered animations.
  - Dynamic package selection via a dedicated modal.
  - Silent email submission integrated with EmailJS.
- **Studio Aesthetic**: Deep dark theme, glassmorphism effects, and refined typography.
- **Smooth Motion**: Fluid transitions and micro-interactions powered by Framer Motion.
- **Fully Responsive**: Optimized for a flawless experience across mobile, tablet, and desktop.

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Email**: [EmailJS](https://www.emailjs.com/)

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd jhenifer-nogueira-studio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and provide the EmailJS values:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

   `VITE_*` values are included in the browser bundle; the EmailJS Public Key is not a secret. The form also uses EmailJS's browser-side rate limit (one attempt per minute per browser) and a honeypot field. For enforceable abuse protection, restrict allowed origins and quotas in EmailJS and add server/provider-side rate limiting; client-side limits can be bypassed.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📖 Project Guidelines

This project follows a strict "Studio Design" philosophy:
- **Typography**: High contrast between labels (uppercase, tracking) and content.
- **Depth**: Use of `backdrop-blur` and subtle borders (`white/10`) to create layers.
- **Motion**: Animations should feel intentional and organic, not abrupt.

---
Developed with ⚡ and 🎨 for Jhenifer Nogueira Studio.
