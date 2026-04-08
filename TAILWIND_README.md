# Tailwind CSS Setup voor Havee Beeldbank

## Overzicht

Dit project gebruikt nu Tailwind CSS voor styling. Er zijn twee opties beschikbaar:

### Optie 1: CDN (Huidige setup)

Momenteel wordt Tailwind CSS geladen via CDN in de `_header.html` template. Dit is handig voor snelle ontwikkeling maar niet optimaal voor productie.

### Optie 2: NPM Build Process (Aanbevolen voor productie)

Voor productie is het beter om Tailwind lokaal te installeren en te compileren.

## Installatie NPM versie

1. Installeer de dependencies:

```bash
npm install
```

2. Start de Tailwind compiler in watch mode:

```bash
npm run build-css
```

3. Voor productie build:

```bash
npm run build-css-prod
```

4. Update `_header.html` om de gecompileerde CSS te gebruiken:

```html
<!-- Vervang de CDN link met: -->
<link
  href="{theme_user_folder_url}site/default/asset/style/tailwind-compiled.css"
  title="tailwind-styles"
  rel="stylesheet"
/>
```

## Aangepaste CSS Classes

Het project bevat enkele custom Tailwind components:

- `.btn-primary` - Primaire knoppen in Havee huisstijl
- `.btn-secondary` - Secundaire grijze knoppen
- `.form-input` - Gestandaardiseerde form inputs
- `.card` - Card component met shadow en border
- `.text-primary` - Tekst in Havee blauw

## Configuratie

De Tailwind configuratie staat in `tailwind.config.js` en bevat:

- Content paths voor alle templates
- Custom kleuren voor Havee branding
- Plugins voor forms en typography

## Template Updates

De volgende templates zijn al geüpdatet met Tailwind classes:

- `login.group/index.html` - Login pagina met moderne styling

## Development Tips

1. Gebruik de custom components waar mogelijk voor consistentie
2. De content paths in `tailwind.config.js` zorgen ervoor dat alleen gebruikte CSS wordt gecompileerd
3. Voor nieuwe components, voeg ze toe aan `tailwind.css` in de `@layer components` sectie

## Browser Support

Tailwind CSS ondersteunt alle moderne browsers. Voor legacy browser support kunnen extra configuraties nodig zijn.
