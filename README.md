# devtony.net

Personal portfolio of Anthony Molina, Computer Engineer and frontend developer in Bogotá.
Where everything works... probably.

**Live:** [devtony.net](https://devtony.net)

## Highlights

- **One clean column:** about, experience, skills and projects, readable on any screen.
- **Live bento strip:** local time in Bogotá with a working-hours bar, an "Open to work" status, my setup, and a playlist with 30-second Apple Music previews.
- **Light and dark themes** that follow the system, with no flash on load.
- **Accessible by default:** semantic HTML, AA contrast, visible focus, and reduced motion respected.
- **Almost no JavaScript:** static Astro pages; React only hydrates the playlist when it scrolls into view.

## Stack

- [Astro 5](https://astro.build) with TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `@theme`
- React for the playlist island
- Content Collections for experience and projects
- Self-hosted fonts: Newsreader and Geist
- [Phosphor](https://phosphoricons.com) icons
- [Bun](https://bun.sh) and [Vercel](https://vercel.com)

## Getting started

```bash
bun install
bun dev          # local server at http://localhost:4321
bun run build    # type check + production build into dist/
bun run preview  # serve the production build
```

## Project structure

```
src/
  components/   Sections and bento cards (.astro), plus the Playlist.tsx island
  content/      One Markdown file per experience entry and project
  data/         Site info, playlist tracks and the working-hours schedule
  layouts/      Base HTML layout with the no-flash theme script
  lib/          iTunes lookup for the playlist (runs at build time)
  styles/       global.css: tokens and component classes
scripts/        Project screenshots and favicon generation
public/         Favicons and static files
```

### Editing content

- **Experience and projects:** add or edit Markdown files in `src/content/experience/` and `src/content/projects/`. The frontmatter schema is in `src/content.config.ts`.
- **Playlist:** put Apple Music track IDs (the number after `?i=` in a song link) in `src/data/playlist.ts`. Covers, titles and previews come from the iTunes API at build time, with local covers as a fallback.
- **Contact and profile links:** `src/data/site.ts`.

### Scripts

- `bun run screenshots` captures the project screenshots with Playwright (needs Chrome installed).
- `bun run favicon build dt` regenerates `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` from the Newsreader glyphs.

## Inspired by

- [Ana Howard](https://ana.sh) for the live bento cards
- [orlandomm.net](https://www.orlandomm.net) for the one-column structure
