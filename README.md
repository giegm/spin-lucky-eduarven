# Eduarven Lucky — Ruleta clásica de animalitos

Aplicación recreativa construida con React, Vite y Tailwind CSS.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
npm run preview
```

## Publicar en Vercel

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Características

- Ruleta circular inspirada en las ruletas clásicas de madera y latón.
- 38 casillas: 0, 00 y del 1 al 36, con animalitos.
- Giro animado y puntero fijo; el número seleccionado se alinea con el puntero.
- Audio procedural generado con Web Audio API: clics mecánicos filtrados, ruido de giro y cadencia que se ralentiza.
- Control para activar o desactivar el sonido.
- Historial de los últimos cinco resultados.
- Diseño adaptable a móviles, tablets y escritorio.

El audio se sintetiza en el navegador y comienza al presionar el botón, por lo que no necesita archivos de sonido externos. El carácter realista es una recreación sonora procedural, no una grabación de una ruleta física.

Los resultados son aleatorios y recreativos; no predicen ni reproducen sorteos oficiales.
