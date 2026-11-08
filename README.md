# Eduarven Lucky — Lotto Activo Premium

Ruleta recreativa responsive de 38 animalitos, creada con React, Vite y Tailwind CSS 4. Incluye giro con desaceleración, puntero fijo, sonido sintetizado con Web Audio API (sin archivos externos), control de sonido e historial de los últimos cinco resultados.

## Requisitos
- Node.js 20.19+ o 22.12+ recomendado
- npm

## Desarrollo
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
Importa el repositorio de GitHub y usa: Framework **Vite**, Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.

El sonido se genera localmente con Web Audio API y se activa al presionar Girar (los navegadores requieren una interacción del usuario).

La ruleta es recreativa: no predice ni reproduce sorteos oficiales.
