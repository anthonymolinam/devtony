# devtony.net — contexto del proyecto

Portafolio personal de Anthony Molina (DevTony), Computer Engineer y frontend developer. Sitio en producción: https://devtony.net

## Reglas generales
- Todo el contenido del sitio va **en inglés**. Conmigo puedes hablar en español.
- Trabaja siempre en la rama `redesign` hasta que diga que se fusiona con `main`.
- Las decisiones visuales viven en `DESIGN.md`. Léelo antes de tocar UI y no inventes colores, tipografías ni espaciados fuera de sus tokens. Si algo no está definido, pregunta o propón agregarlo a `DESIGN.md`.
- Nada de medidas fijas en píxeles para alto/ancho de tarjetas: el layout debe ser fluido y responsive (mobile first).
- Accesibilidad por defecto: HTML semántico, contraste AA, foco visible, `prefers-reduced-motion` respetado.

## Stack
- Astro 5 + Tailwind CSS v4 + TypeScript (estricto).
- React solo se usa en la playlist (reproductor de previews), hidratada con `client:visible`. La hora local, el cambio de tema y el botón de copiar email son `<script>` vanilla dentro de componentes `.astro`. Todo lo demás, componentes `.astro` sin JS.
- Contenido (proyectos, experiencia) en Content Collections (`src/content/`), un archivo por entrada.
- Gestor de paquetes: Bun.
- Deploy: Vercel (Framework Preset: Astro).

## Referencias
- https://www.orlandomm.net — estructura: una columna limpia, experiencia con descripciones, skills como chips, proyectos en tarjetas con stack y links.
- https://ana.sh — personalidad: franja bento con tarjetas "vivas".
- Objetivo: estructura de Orlando + una franja bento contenida al estilo Ana. Simple, elegante, nada genérico.

## Estructura objetivo
hero corto → about → franja bento (playlist de Apple Music, setup, hora local en Bogotá, estado "Open to work") → experiencia → skills → proyectos → contacto (email, GitHub, LinkedIn).
Tema claro/oscuro. Animaciones sutiles.

## Skills por fase
Usa una sola skill como guía estética principal para no mezclar criterios.
1. Dirección visual → `minimalist-ui` (principal) + `design-taste-frontend` (filtro anti-genérico). `/prototype` para comparar variantes. Resultado: `DESIGN.md`.
2. Migración y sistema de diseño → `impeccable` para llevar los tokens a código.
3. Contenido → sin skill específica.
4. Pulido y movimiento → `find-animation-opportunities` (propone) + `emil-design-eng` (ejecuta).
5. Pruebas → `break-ui`, `mobile-native`, auditoría final con `impeccable`.
6. Cierre → `code-review`.

## Comandos
- `bun dev` — servidor local
- `bun run build` — build de producción (debe pasar sin errores antes de cada commit)
