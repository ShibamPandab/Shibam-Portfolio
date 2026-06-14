# Shibam Pandab | Frontend Developer Portfolio 

A premium, dark-themed developer portfolio built with **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, and **Motion (Framer Motion)**. This project showcases real, deployed frontend projects, a modern black-and-gold "Midnight Luxury" UI/UX system, and a fully responsive, animation-driven web experience — designed for clients, recruiters, startup founders, and developers looking for a skilled **frontend developer**, **React developer**, and **TypeScript developer** for portfolio websites, business landing pages, and AI-assisted web applications.

---

## 🔗 Live Demo

**Website:** https://shibam-portfolio-omega.vercel.app/

**Repository:** https://github.com/ShibamPandab/shibam-portfolio

---

## 📖 Project Overview

This repository contains the source code for Shibam Pandab's personal portfolio — a frontend showcase built to demonstrate practical skills in **modern web design**, **responsive websites**, and **premium UI/UX** development. The site is built as a single-page React application using Vite for fast builds and Tailwind CSS v4 for utility-first styling, with Motion powering scroll-based animations, micro-interactions, and page transitions.

The portfolio is structured around a "Midnight Luxury" visual identity — a black (`#050505`) and gold (`#D4AF37`) color system, glassmorphism cards, custom typography (Space Grotesk, Inter, and JetBrains Mono), and cinematic motion design. Beyond the visual layer, the project demonstrates real engineering practices: strict TypeScript typing, component-based architecture, IntersectionObserver-based navigation, canvas-based particle rendering, and a responsive layout system tailored separately for desktop, tablet, and mobile breakpoints.

The portfolio also links out to a curated collection of **real, deployed web applications** — including an AI SaaS product, a wedding cinematography site, an ecommerce storefront, a healthcare platform, and more — giving visitors a complete picture of hands-on frontend development capability.

---

## ✨ Key Features

- Cinematic animated preloader with a live progress indicator and status messages
- Custom liquid cursor with smooth lerp-based motion and interactive hover scaling (desktop only)
- Hero section with a canvas-rendered floating gold particle network and connector lines
- Interactive 3D tilt card effect on the hero profile card, driven by mouse position
- Floating glassmorphic navigation bar with scroll progress indicator and active-section highlighting via IntersectionObserver
- Categorized, animated skill progress bars (Frontend Architecture, Backend & Tools, AI & Productivity, Design & UI)
- Alternating-layout "Selected Masterpieces" showcase for featured projects with live demo and GitHub links
- "The Vault" — a floating, parallax-driven gallery of 8 real deployed projects with dedicated desktop, tablet, and mobile layouts
- Evolution timeline tracing frontend skill progression from 2021 to present
- Services grid covering website design, landing pages, portfolio sites, business websites, frontend development, and UI/UX design
- Animated achievements/stats grid (projects completed, coding hours, GitHub commits, tools mastered)
- Auto-rotating testimonials carousel with manual navigation controls
- Validated contact form (Formspree integration) plus direct email and WhatsApp quick-contact options
- Fully responsive design with a dedicated mobile navigation drawer and touch-device detection

---

## 🛠️ Technology Stack

**Core**
- React 19
- TypeScript 5.8
- Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`)

**Animation & UI**
- Motion (Framer Motion successor) for scroll-based and gesture-based animations
- Lucide React for iconography
- Custom canvas-based particle system (Hero background)

**Forms & Integrations**
- Formspree for contact form submissions
- WhatsApp deep-link integration for instant messaging

**Tooling**
- ESLint-free strict TypeScript checking (`tsc --noEmit`)
- Vite build/preview pipeline
- Deployed on Vercel

**Fonts**
- Space Grotesk (display headings)
- Inter (body text)
- JetBrains Mono (technical/metadata labels)

---

## 🧩 Project Sections

The single-page application is composed of the following sections, rendered in order:

1. **Preloader** — Cinematic loading screen with animated progress bar and status logs
2. **Hero (Home)** — Introduction, role tagline, CTA buttons, particle canvas, and 3D portrait card
3. **About** — Personal narrative, vision and focus highlights, and key stats
4. **Skills** — Categorized, animated proficiency bars across frontend, backend, AI tooling, and design
5. **Projects** — Detailed showcase of featured projects with stats, tech tags, and live/GitHub links
6. **Project Vault** — Floating, parallax gallery of 8 real-world deployed projects across multiple industries
7. **Experience Timeline** — Chronological progression of frontend skills and freelance milestones
8. **Services** — Six core service offerings for clients and businesses
9. **Achievements** — Animated stats grid summarizing experience and output
10. **Testimonials** — Rotating carousel of collaborator feedback
11. **Contact** — Validated contact form, direct email/WhatsApp cards, and response-time indicator
12. **Footer** — Branding, social links, and availability status

A floating WhatsApp action button is also persistently available across the entire site.

---

## 🎨 Design Highlights

- **"Midnight Luxury" aesthetic** — a consistent black-and-gold color system (`#050505` background, `#D4AF37` gold accents) applied across every section
- **Glassmorphism components** — frosted glass cards with subtle borders, backdrop blur, and gold glow on hover
- **Gold gradient typography** — used for emphasis on headings and key phrases throughout the site
- **Custom cursor experience** — a liquid, lag-smoothed cursor that scales and changes color over interactive elements
- **Canvas particle effects** — animated gold particle network with dynamic connector lines in the hero section
- **Ambient mesh gradients and glow orbs** — soft radial gradients used to add depth without harming performance
- **Micro-interactions** — hover scaling, border glows, spotlight effects, and animated underline indicators on navigation
- **Cinematic transitions** — section reveals, staggered animations, and smooth scroll-based motion powered by Motion
- **Typography system** — Space Grotesk for bold display headings, Inter for readable body copy, and JetBrains Mono for technical/metadata accents

---

## 📱 Performance & Responsiveness

- Built on **Vite 6** for fast development builds and optimized production bundles
- Images are lazy-loaded and optimized for smooth scrolling
- Section visibility and active navigation states are tracked using the native **IntersectionObserver API** for efficient scroll performance
- The "Project Vault" gallery includes **separate desktop, tablet, and mobile card components**, ensuring the floating/parallax layout degrades gracefully into a clean stacked layout on smaller screens
- The custom cursor automatically disables itself on touch devices via pointer-type detection
- Layouts use responsive Tailwind CSS grid and flexbox utilities throughout, ensuring the interface scales cleanly from mobile phones to large desktop displays
- A mobile-first navigation drawer replaces the desktop navbar on smaller viewports, preserving full access to all sections and contact options

---

## 🚀 Featured Projects Showcase

### In-Portfolio Featured Projects

| Project | Description | Tech Stack |
|---|---|---|
| **Best of Boston** | Luxury, fashion-inspired ecommerce experience with immersive product browsing, premium animations, and responsive grid layouts | React, Tailwind V4, Motion, Vite |
| **Umberto's North End** | Restaurant website inspired by an iconic Boston pizzeria, focused on menu presentation, location info, and responsive UX | HTML5, Vanilla CSS, JavaScript, Responsive Grid |
| **Personal Portfolio** | This portfolio itself — a premium developer showcase with optimized assets, custom cursors, and strict TypeScript safety | React, TypeScript, Tailwind V4, Vite |

### The Vault — Additional Deployed Projects

| Project | Category | Live URL |
|---|---|---|
| **FlowPilot.AI** | AI SaaS / Workflow Automation | https://flow-pilot-ai-two.vercel.app/ |
| **Eternity Films** | Wedding Cinematography Portfolio | https://eternity-films.vercel.app/ |
| **Noir Etolie** | Luxury Fashion Ecommerce | https://noir-etolie.vercel.app/ |
| **Ember & Basil** | Restaurant & Dining | https://ember-basil.vercel.app/ |
| **NovaCare Clinics** | Healthcare Platform | https://nova-care-clinics.vercel.app/ |
| **Monolith Architecture** | Architecture Studio Portfolio | https://monolith-architecture.vercel.app/ |
| **LushAura Saloon** | Beauty & Wellness | https://lush-aura-saloon.vercel.app/ |

Each Vault project includes a linked GitHub repository, demonstrating a consistent workflow of design, development, and deployment across multiple industries and use cases — from AI-driven SaaS tools to ecommerce, healthcare, hospitality, and creative services.

---

## 💡 Why This Portfolio Is Different

- **Real deployed work, not mockups** — every project linked from this portfolio is a live, functioning website with its own GitHub repository
- **A coherent design system, not a template** — the Midnight Luxury black-and-gold theme, custom cursor, particle canvas, and glassmorphism cards were built and tuned specifically for this project
- **Type-safe React architecture** — built with React 19 and strict TypeScript, organized into clearly separated, reusable components (`Hero`, `ProjectVault`, `Skills`, `Timeline`, `Services`, etc.)
- **Performance-conscious animation** — motion effects, parallax, and particle rendering are implemented with attention to frame rate and mobile responsiveness rather than relying on heavy third-party animation libraries alone
- **AI-assisted, human-refined workflow** — modern AI tools were used to accelerate iteration, while design decisions, layout logic, and code structure were reviewed and refined for production quality
- **Breadth across industries** — the project gallery spans AI SaaS, ecommerce, healthcare, hospitality, architecture, and personal branding, demonstrating versatility as a frontend developer and web developer for varied client needs

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Steps

1. Clone the repository:
```bash
git clone https://github.com/ShibamPandab/shibam-portfolio.git
cd shibam-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

4. Build for production:
```bash
npm run build
```

5. Preview the production build locally:
```bash
npm run preview
```

6. Type-check the project:
```bash
npm run lint
```

---

## 🔮 Future Improvements

- Light/dark theme toggle for broader accessibility and visual preference
- AI-powered interactive assistant for guided portfolio exploration
- Blog or case-study section detailing the build process behind each Vault project
- CMS-driven or API-based project data to simplify content updates
- Expanded accessibility audit (ARIA roles, keyboard navigation, reduced-motion support)
- Automated testing for core interactive components
- Multi-language support for international clients and recruiters

---

## 📬 Contact Information

- **Email:** shibampandab@gmail.com
- **WhatsApp:** https://wa.me/917908861804
- **GitHub:** https://github.com/ShibamPandab
- **LinkedIn:** https://linkedin.com/in/shibam-pandab
- **Portfolio:** https://shibam-portfolio-omega.vercel.app/

Open to freelance projects, collaborations, and full-time opportunities involving frontend development, React/TypeScript applications, responsive website design, and premium UI/UX builds.

---

*Built with React, TypeScript, Tailwind CSS, and a lot of attention to detail — from Kolkata, India.*
---

---

> **Not just projects. Proof of progress.**
>
> Every build in this portfolio represents a step forward in design, development, and problem-solving.
