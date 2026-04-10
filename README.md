# Apurba Bhaumik — Portfolio Website

A personal portfolio website built with Next.js and TypeScript, designed to be fast, accessible, and easy to maintain.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contact](#contact)

---

## Overview

This is my personal portfolio — a fully responsive web application that serves as a central hub for my work, skills, and background. It is built with a focus on performance, clean code, and a minimal aesthetic.

**Live site:** [portfolio-website-apurbabhaumik.vercel.app]([https://portfolio-website-opal-kappa.vercel.app/])

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Font | Geist via `next/font` |
| Linting | ESLint |
| Deployment | Vercel |

---

## Features

- **Responsive** — Adapts seamlessly across mobile, tablet, and desktop
- **Performant** — Leverages Next.js static generation and server-side rendering
- **Type-safe** — Written entirely in TypeScript
- **Optimized fonts** — Zero layout shift font loading with `next/font`
- **SEO-ready** — Metadata configured for search visibility
- **Minimal design** — Clean, distraction-free UI built with Tailwind CSS

---

## Project Structure

```
portfolio-website/
├── public/                  # Static assets (favicon, images)
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout, metadata, and global font
│       ├── page.tsx         # Main entry point
│       └── globals.css      # Global styles
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js `v18.17` or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Apurbabhaumik/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com/).

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

For other platforms, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Customization

| What to change | File |
|---|---|
| Personal info and content | `src/app/page.tsx` |
| Page title and metadata | `src/app/layout.tsx` |
| Global styles and colors | `src/app/globals.css` |
| Favicon and static assets | `public/` |

---

## Contact

**Apurba Bhaumik**  
GitHub: [@Apurbabhaumik](https://github.com/Apurbabhaumik)

---

*Built with Next.js and deployed on Vercel.*
