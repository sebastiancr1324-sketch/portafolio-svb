# SVB — Portafolio

Portafolio personal de **Sebastian Valecillos Blanco** (SVB). Sitios de una
página, estáticos, sin backend.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`, tokens en `src/index.css`)
- **Motion** (`motion/react`) para animaciones y scroll
- **WebGL** puro para el fondo Aurora — sin dependencias de shader
- **Fuentes** alojadas en el propio sitio vía `@fontsource` (Anton, Inter,
  JetBrains Mono, solo subset latino), importadas en `src/main.jsx`

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve dist/
npm run lint      # oxlint
```

## Estructura

```
src/
  components/     secciones y primitivas de animación
  data/           copy del sitio y de los proyectos
  lib/hooks.js    utilidades reactivas
  assets/projects/  capturas reales de los sitios entregados
```

`vite.config.js` usa `base: './'`, así que el build funciona desde cualquier
sub-ruta (GitHub Pages). Al publicar en un subdirectorio, las rutas de
importación de imágenes se resuelven solas.

## Añadir un proyecto al portafolio

1. Depositá la captura en `src/assets/projects/`.
2. Agregá la entrada en `src/data/projects.js`.

`url` va en `null` si el sitio todavía no está publicado: la tarjeta muestra
un estado neutro en vez de enlazar a un 404.

## Vista previa al compartir

`public/og-image.jpg` (1200×630) es la tarjeta que muestran WhatsApp,
Instagram y otras redes al pegar el link. Si cambia el titular o la marca,
conviene regenerarla; la URL está en las etiquetas `og:image` de `index.html`.

## Contacto

WhatsApp e Instagram están centralizados en `src/data/site.js` y se reusan en
todos los llamados a la acción.
