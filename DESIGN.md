# DESIGN.md — devtony.net

Fuente única de verdad visual del rediseño. Todo valor de color, tipo, espacio, radio y movimiento sale de los tokens de este archivo. Si algo no está aquí, se propone aquí antes de usarlo en código.

- Guía principal: `minimalist-ui` (monocromo cálido, tipografía editorial, bento plano).
- Filtro: `design-taste-frontend` (quita los tics de sitio generado).
- Contenido del sitio: en inglés. Este documento: en español.

---

## 1. Dirección

**Una columna editorial, cálida y silenciosa, con una sola franja "viva".**
La página se lee como un documento bien compuesto (estructura de orlandomm.net); la única zona con personalidad de producto es la franja bento (al estilo ana.sh), contenida en el ancho de la columna, no a sangre.

La idea propia del sujeto, lo que no tendría otro portafolio:
> En esta página, **la vida de Anthony en Bogotá ahora mismo** (la hora local, si está despierto, qué suena en su playlist, con qué equipo trabaja) se convierte en **la franja bento**: la única parte que cambia según cuándo la visites.

Lo "vivo" es una cosa, no un parque de juegos: la tarjeta de hora en Bogotá (hora real + estado *working / off hours / asleep*), acompañada por la playlist. Todo lo demás es estático y sin JS.

### Cómo se resolvieron los choques entre skills
Las dos skills se contradicen en varios puntos. Manda `minimalist-ui` en la estructura; `design-taste-frontend` gana cuando el elemento es un tic genérico.

| Tema | minimalist-ui | design-taste-frontend | Decisión |
| --- | --- | --- | --- |
| Borde de tarjetas | `1px solid #EAEAEA` | Sin cajas con borde de 1px | **Separación por tono de superficie**, sin borde. El token `--border` existe solo para inputs, `<kbd>` y el foco. |
| Monoespaciada | Para metadatos | Solo en código real | **Sin mono.** Fechas y hora en la sans con `tabular-nums`. |
| Badges | Mayúsculas con tracking amplio | Prohibido | **Chips en minúsculas tipo oración**, tamaño legible. |
| Sombras | Casi nulas, hover sutil | Ninguna en reposo | **Ninguna en reposo**; el hover de tarjeta cambia el tono, no la sombra. `--shadow-float` solo para menús o popovers. |
| Fondos de sección | Gradientes radiales sutiles | Sin gradientes | **Fondos planos.** La profundidad viene de la escala y de imágenes reales (portadas, capturas de proyectos, foto). |
| Pastel de acento | Cuatro pasteles | Un acento | **Un acento (rojo)** + **un pastel semántico (verde)** solo para "Open to work". |
| Palabra destacada en el titular | — | Prohibido | El nombre ya **no** va en rojo. Una sola tinta en titulares. |

---

## 2. Color

Monocromo cálido. El color es escaso: el acento rojo aparece en el foco, los enlaces activos y el estado "sonando" de la playlist. El verde solo significa "disponible" (Open to work); los estados de la hora local (Working, Off hours, Sleeping) usan un punto neutro. Todos los pares de texto pasan AA (ratios verificados).

### Tema claro (por defecto si el sistema no pide oscuro)

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-canvas` | `#FAFAF8` | Fondo de página |
| `--color-surface` | `#F2F1EE` | Tarjetas bento, tarjetas de proyecto, chips |
| `--color-surface-hover` | `#ECEBE7` | Hover de tarjetas interactivas |
| `--color-ink` | `#1A1A18` | Texto principal, botón primario (16.7:1) |
| `--color-ink-muted` | `#6B6A65` | Texto secundario, fechas, lugar (5.2:1 sobre canvas, 4.8:1 sobre surface) |
| `--color-on-ink` | `#FAFAF8` | Texto sobre botón primario |
| `--color-accent` | `#C42733` | Foco, enlace en hover, estado "playing" (5.5:1) |
| `--color-on-accent` | `#FFFFFF` | Texto sobre acento, si se usa como fondo (5.7:1) |
| `--color-status-bg` | `#E8F0E6` | Fondo del estado "Open to work" |
| `--color-status-ink` | `#2F6B35` | Texto y punto del estado (5.5:1) |
| `--color-border` | `#E4E3DF` | Solo inputs, `<kbd>`, separador del header al hacer scroll |

### Tema oscuro (desciende del `#171617` / `#202120` actual)

Ajustado en la fase 2: con `#161615` / `#21211F` (1.12:1) fondo y superficie casi no se distinguían. Ahora la superficie se separa con claridad (1.23:1, ~12 puntos L*).

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-canvas` | `#131312` | Fondo de página |
| `--color-surface` | `#262624` | Tarjetas, chips |
| `--color-surface-hover` | `#30302D` | Hover de tarjetas |
| `--color-ink` | `#ECEBE7` | Texto principal (12.7:1 sobre surface) |
| `--color-ink-muted` | `#A19F99` | Texto secundario (7.0:1 canvas, 5.7:1 surface) |
| `--color-on-ink` | `#131312` | Texto sobre botón primario |
| `--color-accent` | `#F2636B` | Foco, enlace en hover, "playing" (4.9:1 sobre surface) |
| `--color-on-accent` | `#131312` | Texto sobre acento |
| `--color-status-bg` | `#1E2E20` | Fondo estado |
| `--color-status-ink` | `#8DCB93` | Texto y punto del estado (7.6:1) |
| `--color-border` | `#33332F` | Solo inputs, `<kbd>`, header |

### Tonos derivados (ambos temas)

Mezclas de `--color-ink` sobre `--color-surface` con `color-mix(in oklab, …)`; siguen al tema solas. Solo para la barra de 24 h de la hora local.

| Token | Mezcla | Uso |
| --- | --- | --- |
| `--color-track-working` | ink 60 % | Tramo "working" |
| `--color-track-off` | ink 28 % | Tramo "off hours" y fondo de la barra |
| `--color-track-sleep` | ink 12 % | Tramo "sleeping" |

Reglas:
- El texto corrido siempre en `--color-ink`; el gris es para notas secundarias.
- Nunca negro puro ni blanco puro como fondo.
- Sin gradientes, sin glow, sin vidrio. La única excepción permitida: un velo neutro plano detrás de texto sobre foto (no previsto por ahora).
- Selección de texto: fondo `--color-accent`, texto `--color-on-accent`.

---

## 3. Tipografía

Dos familias, nunca más.

| Token | Familia | Uso |
| --- | --- | --- |
| `--font-display` | **Newsreader** (variable, Google Fonts / Fontsource), fallback `Georgia, serif` | Titular del hero y títulos de sección |
| `--font-sans` | **Geist Sans** (Fontsource / Vercel), fallback `system-ui, -apple-system, "Segoe UI", sans-serif` | Todo lo demás: cuerpo, UI, botones, chips, fechas |

Prohibidas: Inter, Roboto, Open Sans, Work Sans (la actual), cualquier monoespaciada fuera de `<pre>/<code>`.

### Escala (fluida, cinco tamaños como máximo)

| Token | Valor | Familia / peso | Línea | Tracking | Uso |
| --- | --- | --- | --- | --- | --- |
| `--text-display` | `clamp(2.75rem, 1.6rem + 5vw, 5rem)` | display 400 | 1.0 | -0.035em | Nombre en el hero |
| `--text-title` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | display 400 | 1.1 | -0.02em | Títulos de sección, frase del contacto |
| `--text-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem)` | sans 400 | 1.5 | -0.005em | Línea de rol del hero, intro del about, nombre de proyecto |
| `--text-body` | `1.0625rem` (17px) | sans 400 / 500 | 1.6 | 0 | Texto corrido, roles |
| `--text-small` | `0.875rem` (14px) | sans 400 / 500 | 1.45 | 0 | Fechas, lugar, chips, títulos de tarjeta bento, footer |

- Pesos de sans: 400 y 500. Nada de 700 en display: el contraste viene del tamaño y de la serif.
- Medida del texto corrido: `--measure: 62ch`.
- Números alineables (fechas, hora): `font-variant-numeric: tabular-nums`.
- Todo alineado a la izquierda. Ningún titular pasa de dos líneas en ningún ancho.
- Nada de etiquetas pequeñas en mayúsculas encima de los títulos (eyebrows).

---

## 4. Espaciado

Base de 4px, en `rem`. Solo estos pasos.

| Token | Valor |
| --- | --- |
| `--space-1` | `0.25rem` (4) |
| `--space-2` | `0.5rem` (8) |
| `--space-3` | `0.75rem` (12) |
| `--space-4` | `1rem` (16) |
| `--space-5` | `1.5rem` (24) |
| `--space-6` | `2rem` (32) |
| `--space-7` | `3rem` (48) |
| `--space-8` | `4rem` (64) |
| `--space-9` | `6rem` (96) |

Tokens de layout:

| Token | Valor | Uso |
| --- | --- | --- |
| `--gutter` | `clamp(1rem, 0.5rem + 2.5vw, 2rem)` | Margen lateral (16px en móvil) |
| `--container` | `46rem` (~736px) | Ancho máximo de la columna, incluida la franja bento |
| `--section-gap` | `clamp(5rem, 3rem + 8vw, 9rem)` | Separación entre secciones (siempre mayor que cualquier hueco interno) |
| `--stack-gap` | `var(--space-5)` | Entre título de sección y contenido |
| `--bento-gap` | `var(--space-3)` | Entre tarjetas bento |
| `--card-pad` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | Padding interno de tarjetas |
| `--tap` | `2.5rem` (40) | Área táctil mínima de controles (toggle de tema, botones) |
| `--scroll-offset` | `--tap` + 2 × `--space-3` + `--space-4` (5rem) | `scroll-margin-top` de los destinos de enlaces internos: alto del header fijo más aire sobre el título |

Sin alturas ni anchos fijos en px para tarjetas: la altura sale del contenido, la cuadrícula y `aspect-ratio` en medios.

---

## 5. Radios, superficies, elevación

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-card` | `12px` | Tarjetas bento y de proyecto |
| `--radius-media` | `8px` | Portadas, capturas, foto |
| `--radius-control` | `6px` | Botones, toggle de tema |
| `--radius-kbd` | `4px` | `<kbd>` |
| `--radius-chip` | `999px` | Chips de skills y estado (pequeños, nunca contenedores) |
| `--shadow-float` | `0 8px 24px rgb(0 0 0 / 0.08)` | Solo elementos que flotan (menú, popover). Nunca en reposo. |

### Estilo de tarjeta (`.card`)
- Fondo `--color-surface`, sin borde, sin sombra, radio `--radius-card`, padding `--card-pad`.
- Título de tarjeta: `--text-small`, peso 500, `--color-ink-muted`, tipo oración (`Now playing`, `Local time`, `Setup`). Va dentro del flujo, no posicionado en absoluto.
- Contenido principal: `--text-lead` o `--text-body` en `--color-ink`.
- Si la tarjeta entera es un enlace: hover → `--color-surface-hover` en 200ms; `:active` → `scale(0.99)`; foco visible con anillo.
- Medios dentro de la tarjeta: esquinas `--radius-media`, sin borde blanco, sin rotaciones decorativas.

### Botón primario
- Fondo `--color-ink`, texto `--color-on-ink`, `--text-small` peso 500, radio `--radius-control`, padding `--space-3` / `--space-5`.
- Hover: opacidad 0.88. `:active`: `scale(0.98)`. Sin sombra.
- Solo hay uno en toda la página: "Get in touch" (abre `mailto:`).

### Botón secundario
- Fondo `--color-surface`, texto `--color-ink`, `--text-small` peso 500, radio `--radius-control`, alto mínimo `--tap`.
- Hover: `--color-surface-hover`. `:active`: `scale(0.98)`. Solo para acciones de apoyo (copiar email).

### Enlaces de texto
- Color `--color-ink`, subrayado `1px` con `text-underline-offset: 0.2em` en `--color-ink-muted`; en hover el subrayado pasa a `--color-accent`.

### Foco
- `outline: 2px solid var(--color-accent); outline-offset: 3px;` en todo elemento interactivo vía `:focus-visible`.

---

## 6. Iconos e imágenes

- Iconos: **Phosphor Icons, peso Regular a 20px** (o Bold a 16px), un solo peso en todo el sitio. Se elimina `lucide-react`.
- Sin emojis en ningún lugar (incluido el footer y el `👋` del hero).
- Imágenes reales que ya existen: foto de perfil (`profile.webp`), tres portadas de playlist, captura de CoeCaribe. Se usan sin máscaras ni gradientes, con `--radius-media`, en `aspect-ratio` fijos (portadas 1:1, proyectos 16:10, foto 4:5).
- Cada proyecto nuevo necesita su propia captura real; no hay placeholders genéricos.

---

## 7. Movimiento

Invisible pero presente. Solo `transform` y `opacity`.

| Token | Valor |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--dur-fast` | `150ms` (press) |
| `--dur-base` | `200ms` (hover, cambio de tema) |
| `--dur-enter` | `600ms` (entrada al hacer scroll) |
| `--stagger` | `70ms` |
| `--rise` | `16px` |

- Entrada por sección: título → texto → medios, escalonados con `--stagger`, una sola vez (IntersectionObserver). El contenido es visible si el script no corre.
- Tarjetas bento: entran en cascada.
- Hora local: el separador de minutos no parpadea; el cambio de minuto es un fundido corto.
- Playlist: estado "playing" con barras de ecualizador pequeñas en `--color-accent`.
- `prefers-reduced-motion: reduce`: sin desplazamientos ni cascadas; todo aparece en reposo. Hover y press se mantienen.
- La fase 4 (`find-animation-opportunities` + `emil-design-eng`) define el resto dentro de estos tokens.

---

## 8. Layout global

- Una columna centrada de `--container`, con `--gutter` a los lados. Mobile first.
- **Header**: barra plana, sin blur ni píldora flotante. Izquierda: wordmark `Anthony Molina` en `--text-small` peso 500. Derecha: `Work`, `Projects`, `Contact` + toggle de tema (icono sol/luna, 40×40 de área táctil). Sticky; al hacer scroll aparece `--color-border` abajo y fondo `--color-canvas`.
- **Footer**: `© 2026 Anthony Molina · Bogotá, Colombia` y enlace "Back to top", en `--text-small` `--color-ink-muted`.
- Tema: respeta `prefers-color-scheme`; el toggle guarda la preferencia (`localStorage`, con try/catch) y se aplica con `data-theme` en `<html>` antes del primer pintado (script inline para evitar parpadeo).

---

## 9. Secciones

Ninguna sección repite la composición de su vecina.

### 9.1 Hero (corto)
- Sin tarjeta, sin fondo propio. Ocupa su contenido, no la pantalla completa.
- Línea 1: `Anthony Molina` en `--text-display`.
- Línea 2: `Computer Engineer and frontend developer in Bogotá.` en `--text-lead`, `--color-ink-muted`.
- Fila de acciones: botón primario `Get in touch` + estado `Open to work` (chip verde con punto). En móvil se apilan.
- Se elimina: el saludo "Hi, I'm", el nombre en rojo, el emoji, el email suelto arriba, el botón violeta.

### 9.2 About
- Dos columnas desde `md`: foto 4:5 (`--radius-media`, ~1/3) + 2 párrafos cortos en `--text-body` (~1/3 de ancho de lectura restante). En móvil: foto pequeña arriba, texto debajo.
- El primer párrafo puede ir en `--text-lead`. Sin título grande: el título de sección es `About` en `--text-title`.

### 9.3 Franja bento
Cuatro tarjetas, cuadrícula asimétrica, sin alturas fijas (`grid-auto-rows: minmax(min-content, auto)`).

- Móvil (< 640px): 1 columna, orden: hora → playlist → estado → setup.
- `sm` (≥ 640px): 2 columnas; playlist ocupa las 2.
- `md` (≥ 768px): 6 columnas.
  ```
  [ On repeat (4 col)                 ][ Local time (2) ]
  [ Setup (3 col)       ][ Availability (3 col)      ]
  ```

| Tarjeta | Contenido | Isla |
| --- | --- | --- |
| **Playlist** (`On repeat`) | Las 3 portadas reales en fila, del mismo tamaño (1:1, un tercio cada una), nombre de la playlist en `--text-lead`, enlace `Listen on Apple Music`. Ícono de play/pausa (Phosphor Regular) centrado sobre cada portada: siempre visible en pantallas táctiles (`hover: none`); con puntero aparece al hacer hover o focus y se queda mientras suena. Al tocar se reproduce el preview (30 s), una canción a la vez, y aparece el ecualizador en acento. Títulos, artistas y previews salen de la API de lookup de iTunes en el build; si falla, quedan las portadas locales sin play. | React, `client:visible` |
| **Local time** | Estado en chip neutro (*Working* / *Off hours* / *Sleeping*, rangos en `src/data/schedule.ts`), hora de Bogotá en `--text-title` con `tabular-nums` y diferencia con la hora del visitante. Debajo, barra de 24 h decorativa (`aria-hidden`) con los tramos del día en `--color-track-*`, marcas 00/06/12/18/24, leyenda y una marca en `--color-ink` en la hora actual que avanza cada minuto. Sin JS: zona horaria, horario habitual y la barra de un día laborable, sin marca. | Script vanilla |
| **Open to work** | Chip de estado verde + una frase de qué rol busca (p. ej. "Frontend roles, remote or Bogotá") + enlace al email. | Estático |
| **Setup** | Lista de 4 líneas: CPU, GPU, teclado, ratón, cada una con icono Phosphor alineado a la primera línea del texto (`.icon-first-line`). Sin bordes entre filas. | Estático |

### 9.4 Experience
- Lista vertical sin tarjetas ni línea de tiempo con puntos. Cada entrada separada por `--space-7`.
- Por entrada, en una fila que se apila en móvil: a la izquierda fechas (`--text-small`, muted, `tabular-nums`, ~10rem); a la derecha rol en `--text-body` 500, empresa y modalidad en muted, y 1–2 frases de descripción con resultados concretos.
- Orden: más reciente primero.

### 9.5 Skills
- Grupos (`Languages`, `Frameworks`, `Tools`), cada uno con su nombre en `--text-small` 500 muted y debajo chips en flex-wrap.
- Chip: fondo `--color-surface`, `--text-small`, radio `--radius-chip`, padding `--space-1` / `--space-3`, tipo oración, sin iconos.

### 9.6 Projects
- Lista de tarjetas `.card`; 1 columna en móvil, 2 columnas desde `md`. Si el número de proyectos es impar, el primero ocupa las 2 columnas.
- Por tarjeta: captura 16:10, nombre en `--text-lead`, debajo tipo y año en `--text-small` muted (p. ej. "Client project · 2024"; el tipo es obligatorio, el año se omite si no está confirmado), una frase de qué resuelve, chips del stack, enlaces `Live site` y `Source` (con icono de flecha). Toda la tarjeta no es un enlace; los dos enlaces sí.
- Sin máscara ni degradado sobre la imagen; el texto nunca va encima de la captura.

### 9.7 Contact
- Cierre diseñado, no un formulario.
- Frase en `--text-title`: `Have a project or a role in mind?`
- Email grande como enlace (`--text-lead`), con botón secundario de copiar al portapapeles (texto, sin icono solo).
- Fila de enlaces: GitHub, LinkedIn y Discord (iconos Phosphor + texto). Discord enlaza por ID numérico (`discord.com/users/<ID>`); el nombre de usuario no sirve en esa URL.

---

## 10. Qué conservar y qué descartar del sitio actual

Estado actual: Next.js 15 + Tailwind v4, tema oscuro único, Work Sans, cinco componentes en `src/app/components`. La migración a Astro es la fase 2.

### Conservar
| Elemento | De dónde | Cómo vuelve |
| --- | --- | --- |
| Concepto de bento con tarjetas | `page.tsx` | Franja bento contenida (§9.3), con layout fluido |
| Playlist de Apple Music + 3 portadas | `music.tsx`, `assets/playlist*.jpg` | Tarjeta "Now playing" con previews; sin rotaciones ni borde blanco |
| Lista del setup (Ryzen 5 5600G, GTX 1660 Super, AJAZZ AK820 Pro, Prime Mini Wireless) | `setup.tsx` | Tarjeta "Setup" con iconos Phosphor |
| Entradas de experiencia (Freelance Developer 2023–2024 remote; SEO Support Specialist 2025–present on site) | `experience.tsx` | Sección Experience completa, con empresa y descripción (fase 3) |
| Estado "Open to work" | `hero.tsx` | Chip semántico verde en hero y tarjeta propia |
| Proyecto CoeCaribe y su captura | `projects.tsx`, `assets/prueba.png` | Primera tarjeta de Projects (renombrar el archivo) |
| Foto de perfil | `assets/profile.webp` | Sección About |
| Tonos oscuros `#171617` / `#202120` | `globals.css`, tarjetas | Base del tema oscuro (`#131312` / `#262624`) |
| Rojo `#DF2935` | Nombre del hero | Acento, ajustado a `#C42733` / `#F2636B` para pasar AA y usado solo en foco y estados |
| Email y CTA "Get in touch" | `hero.tsx` | Botón primario con `mailto:` real (hoy apunta a `#`) |

### Descartar
| Elemento | Motivo |
| --- | --- |
| Medidas fijas `h-[245px]`, `w-[265px]`, `w-[506px]`, `max-w-[800px]` | Regla del proyecto: layout fluido |
| Grid con posiciones por fila/columna fijas y `grid-rows-5` | Se reemplaza por la cuadrícula de §9.3 |
| Bordes gruesos `border-3 border-[#2d2c2d]` y `rounded-2xl` | Separación por tono, radio 12px |
| Tarjeta placeholder "2" | Vacía |
| Títulos de tarjeta en `position: absolute` | Rompen con textos largos; van en el flujo |
| `lucide-react` / `lucide` | Banda por `minimalist-ui`; se usa Phosphor |
| Emojis (`👋`, `💖`) y `▶` como icono | Sin emojis |
| Nombre en rojo dentro del titular | Palabra destacada en titular (tic genérico) |
| Botón violeta `#7D80DA` en píldora | Paleta de asistente; un solo botón en tinta |
| Rosa `#FF4E6B` de Apple Music | Un solo acento |
| Gradiente y máscara sobre la captura del proyecto | Sin gradientes; el texto no va sobre imágenes |
| Portadas rotadas con borde blanco | Decoración; la playlist se vuelve interactiva |
| Work Sans | Se pasa a Geist + Newsreader |
| Dependencias `swiper`, `react-github-calendar`, `@svgr/webpack` | No se usan en el diseño nuevo |
| Assets `brave.svg`, `discord.svg`, `spotify.svg`, `vscode.svg`, `send.svg`, y los SVG por defecto de `public/` | Sin uso (Spotify no aplica: la música es Apple Music) |
| Copy en tono de chiste ("bug exorcist", "work perfectly... probably!") | Se reescribe en fase 3: claro y específico, con personalidad en los detalles, no en bromas |
| Tema oscuro único | Claro y oscuro con toggle |

---

## 11. Pendiente de definir (fases siguientes)

- Fase 3: nombres de empresa y descripciones de experiencia, lista final de skills, proyectos además de CoeCaribe, URL de LinkedIn, rol buscado para "Open to work", IDs de las canciones de la playlist para los previews.
- Fase 4: lista final de animaciones, dentro de los tokens de §7.
- Si hace falta un tamaño, color o espacio nuevo, se agrega aquí primero.

---

## 12. Tokens en código

Los tokens viven en `src/styles/global.css` dentro de `@theme` (Tailwind v4). Los valores por defecto de Tailwind (colores, fuentes, tamaños, espaciado, radios, sombras, easing) están borrados: solo existen estos.

| DESIGN.md | Variable CSS | Utilidad Tailwind |
| --- | --- | --- |
| `--color-*` | `--color-canvas`, `--color-surface`, … | `bg-canvas`, `text-ink`, `text-ink-muted`, `bg-surface`, … |
| `--font-display` / `--font-sans` | igual | `font-display`, `font-sans` |
| `--text-display` … `--text-small` | igual (con línea y tracking) | `text-display`, `text-title`, `text-lead`, `text-body`, `text-small` |
| `--space-1` … `--space-9` | `--spacing-1` … `--spacing-9` (+ `--spacing-0: 0`) | `p-5`, `gap-3`, `mt-7`, `top-0`, … (escala de DESIGN.md, no la de Tailwind; sin `--spacing` base, cualquier paso fuera de la escala no genera nada) |
| `--gutter` | `--spacing-gutter` | `px-gutter` |
| `--section-gap` | `--spacing-section` | `py-section`, `gap-section` |
| `--stack-gap` | `--spacing-stack` | `gap-stack`, `mt-stack` |
| `--bento-gap` | `--spacing-bento` | `gap-bento` |
| `--card-pad` | `--spacing-card` | `p-card` |
| `--tap` | `--spacing-tap` | `size-tap`, `min-h-tap` |
| `--scroll-offset` | `--spacing-scroll-offset` | `scroll-mt-scroll-offset` (aplicado en CSS base a `[id][tabindex="-1"]`) |
| `--container` | `--container-page` | `max-w-page` |
| `--measure` | `--container-measure` | `max-w-measure` |
| `--radius-*` | igual | `rounded-card`, `rounded-media`, `rounded-control`, `rounded-chip` |
| `--shadow-float` | igual | `shadow-float` |
| `--ease-out` | igual | `ease-out` |
| `--dur-*`, `--stagger`, `--rise` | igual, en `:root` | `duration-(--dur-base)` |

- Claro/oscuro con `light-dark()`: cada color tiene sus dos valores en una sola declaración; el activo lo decide `color-scheme`, que se fija con `data-theme` en `<html>`.
- Script inline en `<head>` (antes del primer pintado): usa `localStorage.theme` si existe, si no `prefers-color-scheme`, y sigue los cambios del sistema mientras no haya preferencia guardada. Sin JS, el sitio sigue al sistema y el toggle se oculta.
- Clases de componente en `@layer components`: `.card`, `.card-title`, `.chip`, `.chip-status`, `.btn-primary`, `.btn-secondary`, `.link`, `.theme-toggle`. Utilidad extra: `tabular` (cifras tabulares).
