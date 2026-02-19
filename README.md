# 🧑‍💻 Antony Kurniawan — Portfolio

Personal portfolio website built with **Next.js**, **Once UI**, and **MDX** — showcasing my projects, blog posts, and skills as a Software Engineer based in Surabaya, Indonesia.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Once UI](https://img.shields.io/badge/Once%20UI-latest-purple?style=flat)](https://once-ui.com)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

---

## ✨ Features

- **Blog** — MDX-based blog posts showcasing projects and learnings from GitHub repos
- **Work** — Project showcase with descriptions and media
- **About / CV** — Work experience, education, and technical skills
- **Gallery** — Photo gallery section
- **SEO** — Automatic open-graph & metadata generation
- **Responsive** — Optimized for all screen sizes

## 🛠️ Tech Stack

| Technology | Description |
|---|---|
| **Next.js 16** | React framework |
| **TypeScript** | Type-safe JavaScript |
| **Once UI** | Component library & design system |
| **MDX** | Markdown + JSX for blog/work content |
| **Sass** | Styling |

## 📁 Project Structure

```
src/
├── app/
│   ├── blog/posts/        # Blog posts (.mdx files)
│   ├── work/projects/     # Work/project pages (.mdx files)
│   ├── about/             # About page
│   └── gallery/           # Gallery page
├── components/            # Reusable components
├── resources/
│   ├── content.tsx        # All site content & personal info
│   └── once-ui.config.ts  # Theme & UI configuration
└── types/                 # TypeScript types
```

## 🚀 Getting Started

### Requirements

- Node.js >= v18.17

### 1. Clone the repository

```bash
git clone https://github.com/VoinzzZ/Portofolio.git
cd Portofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Customization

### Edit personal info & content

```
src/resources/content.tsx
```

This is the main file where all personal data is configured — name, bio, social links, work experience, skills, and gallery images.

### Edit theme & UI

```
src/resources/once-ui.config.ts
```

### Add a blog post

Create a new `.mdx` file in `src/app/blog/posts/`:

```mdx
---
title: "Your Post Title"
publishedAt: "2026-02-19"
summary: "A short description of the post."
tag: "Go"
---

Post content here...
```

### Add a project

Create a new `.mdx` file in `src/app/work/projects/`.

## 📦 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🔗 Links

- **Live**: [coming soon]
- **GitHub**: [github.com/VoinzzZ](https://github.com/VoinzzZ)
- **LinkedIn**: [Antony Kurniawan Nugroho](https://www.linkedin.com/in/antony-kurniawan-nugroho-079b5626b/)

## 📄 License

Built on top of [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio), distributed under the [CC BY-NC 4.0 License](LICENSE).