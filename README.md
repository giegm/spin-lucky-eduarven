# Lotto Activo — Gaming Casino Premium

Aplicación recreativa construida con React, Vite y Tailwind CSS 4. Incluye ruleta SVG de 38 sectores, puntero fijo, animación con desaceleración, resultado sincronizado, historial de cinco giros y efectos de sonido opcionales mediante Web Audio.

## Requisitos
- Node.js 18.18+ (recomendado Node 20+)
- npm

## Ejecutar en desarrollo
```bash
npm install
npm run dev
```

## Compilar para producción
```bash
npm run build
npm run preview
```

## Estructura
- `src/App.jsx`: datos de animalitos, geometría SVG, lógica de giro e interfaz.
- `src/style.css`: estilos responsive, animaciones y directivas Tailwind.
- `public/logo-clover.png`: trébol suministrado, con el patrón de cuadros gris retirado.
- `public/concept-preview.png`: referencia visual del concepto Gaming Casino Premium.

## Nota sobre los datos
Los 38 animalitos están definidos en el arreglo `ANIMALS` al inicio de `src/App.jsx`, para que puedas editar nombres o emojis fácilmente. Verifica la nomenclatura con la tabla oficial vigente antes de publicar. Esta ruleta selecciona resultados aleatorios para entretenimiento; no predice ni reproduce sorteos oficiales.
