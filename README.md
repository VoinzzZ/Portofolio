# Antony Kurniawan — Portfolio

A personal portfolio website built with Next.js, Once UI, and MDX. This repository serves as a showcase of my projects, technical articles, and professional experience as a Software Engineer based in Surabaya, Indonesia.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Once UI](https://img.shields.io/badge/Once%20UI-latest-purple?style=flat)](https://once-ui.com)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)

---

## Features

- **MDX-Powered Blog & Work Showcase**: Write rich content with markdown and embedded React components for articles and project case studies.
- **Dynamic Content Management**: Centralized configuration for all personal information, social links, and site metadata.
- **SEO Optimized**: Automated Open Graph tags and metadata generation for better search visibility.
- **Responsive Design**: Fluid layouts optimized for diverse device screen sizes leveraging Once UI components.

## Tech Stack Architecture

| Technology | Purpose |
|---|---|
| **Next.js 16** | Core framework leveraging App Router for optimized rendering and routing. |
| **TypeScript** | Ensures type safety and improves maintainability across the codebase. |
| **Once UI** | Primary design system and component library providing a cohesive visual language. |
| **MDX** | Content authoring format combining Markdown syntax with JSX. |
| **Sass** | Advanced styling capabilities for custom component behavior. |

## Repository Structure

```text
src/
├── app/
│   ├── blog/posts/        # MDX source files for blog articles
│   ├── work/projects/     # MDX source files for project showcases
│   ├── about/             # Resume and professional experience view
│   └── gallery/           # Curated visual media view
├── components/            # Reusable React components
├── resources/
│   ├── content.tsx        # Centralized data model (personal info, links, skills)
│   └── once-ui.config.ts  # Theme schema and UI configuration
└── types/                 # Global TypeScript interfaces and types
```

## Getting Started

### Prerequisites

Identify your environment dependencies before proceeding:
- Node.js >= v18.17
- npm (Node Package Manager)

### Installation Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/VoinzzZ/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the development server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Configuration & Content Authoring

### Modifying Personal Data
The application relies on a centralized content configuration file. Update your name, biography, professional history, and social links here:
```text
src/resources/content.tsx
```

### Theme Customization
Adjust color palettes, typography, and layout settings using the Once UI configuration file:
```text
src/resources/once-ui.config.ts
```

### Creating New Content (Blog & Projects)
New entries are created as MDX files with frontmatter metadata.

**Blog Post Example (`src/app/blog/posts/`):**
```mdx
---
title: "Understanding Next.js App Router"
publishedAt: "2026-02-19"
summary: "An in-depth look at routing paradigms in modern Next.js applications."
tag: "Next.js"
---

Your post content begins here...
```

**Project Showcase (`src/app/work/projects/`):**
Follow a similar structure to blog posts, tailoring the frontmatter to project-specific metadata as required by the application schema.

## Available Scripts

Utilize these npm scripts for development and deployment workflows:

- `npm run dev`: Starts the local development server with Hot Module Replacement.
- `npm run build`: Compiles the application into a highly optimized production build.
- `npm run start`: Serves the production build previously compiled.
- `npm run lint`: Executes ESLint to verify code quality and conformity.

## Connect

- **Live Application**: [Coming Soon]
- **GitHub**: [VoinzzZ](https://github.com/VoinzzZ)
- **LinkedIn**: [Antony Kurniawan Nugroho](https://www.linkedin.com/in/antony-kurniawan-nugroho-079b5626b/)

## License

This project is built upon the [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template. It is distributed under the [CC BY-NC 4.0 License](LICENSE).