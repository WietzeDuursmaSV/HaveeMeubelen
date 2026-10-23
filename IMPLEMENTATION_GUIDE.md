# Implementatie Gids - Expandable Section Component

## 📋 Wat is er gedaan?

Je HTML is volledig gerefactoriseerd naar een modern, herbruikbaar component systeem met:

✅ **SVG Iconen** - Plus (+), Minus (-), en Check (✓)
✅ **Smooth Animaties** - Slide-open effect met 300ms transition
✅ **Meerdere Open Containers** - Alle secties kunnen tegelijk open zijn
✅ **Tailwind + SCSS** - Modern styling met accessibility
✅ **Herbruikbare Templates** - Kan voor alle elementen gebruikt worden
✅ **Keyboard Support** - ARIA labels voor screen readers

---

## 📁 Nieuwe/Gemodificeerde Bestanden

### HTML Templates

```
system/user/templates/Havee_Meubelen/_partials/
├── _model-dimensions.html         ← GEMODIFICEERD (je originele bestand)
├── _expandable-section.html       ← NIEUW (generieke template)
├── _options-list.html             ← NIEUW (opties met checkmarks)
├── _options-example.html          ← NIEUW (voorbeeld implementatie)
├── _complete-example.html         ← NIEUW (volledige werkend voorbeeld)
└── EXPANDABLE_COMPONENT_README.md ← NIEUW (documentatie)
```

### JavaScript

```
themes/user/site/default/asset/js/
└── expandable-sections.js ← NIEUW (core component logica)
```

### SCSS

```
themes/user/site/default/asset/css/
└── input.scss ← GEMODIFICEERD (styling toegevoegd)
```

### HTML Wrapper

```
system/user/templates/Havee_Meubelen/layouts.group/
└── _html-wrapper.html ← GEMODIFICEERD (script import)
```

---

## 🚀 Implementatie Stappen

### Stap 1: Controleer de Bestanden

- Alle 5 bestanden zijn aangemaakt/gemodificeerd
- JavaScript wordt automatisch geladen via `_html-wrapper.html`
- SCSS styling is toegevoegd

### Stap 2: Compileer Tailwind CSS (indien nodig)

```bash
cd /Users/wietduur/Documents/DEV/haveemeubelen
npm run build  # of: npx tailwindcss -i input.css -o output.css
```

### Stap 3: Test in Browser

1. Open je model-detail pagina
2. Klik op de + icoon → sectie schuift open
3. Klik op de - icoon → sectie schuift dicht
4. Meerdere secties kunnen tegelijk open zijn

---

## 💡 Hoe te Gebruiken

### Voor je Bestaande Maatvoering Sectie

Je originele bestand (`_model-dimensions.html`) is al geconverteerd! ✅

### Voor Andere Secties

Kopieer deze template structuur:

```html
<div class="expandable-section" data-section-id="my-section">
  <button
    class="expandable-header"
    aria-expanded="false"
    aria-controls="my-section-content"
  >
    <div class="expandable-title">
      <h2>Mijn Sectie Titel</h2>
    </div>
    <div class="expandable-icon">
      <!-- Plus/Minus SVGs hier -->
    </div>
  </button>

  <div id="my-section-content" class="expandable-content">
    <div class="expandable-body">
      <!-- Je content hier -->
    </div>
  </div>
</div>
```

### Met Opties en Checkmarks

Zie `_options-example.html` voor een voorbeeld.

---

## 🎨 SVG Iconen

### Plus Icon (+)

```html
<svg
  class="icon-plus"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="12" y1="5" x2="12" y2="19"></line>
  <line x1="5" y1="12" x2="19" y2="12"></line>
</svg>
```

### Minus Icon (-)

```html
<svg
  class="icon-minus"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="5" y1="12" x2="19" y2="12"></line>
</svg>
```

### Check Icon (✓)

```html
<svg
  class="icon-check"
  viewBox="0 0 24 24"
  width="20"
  height="20"
  fill="currentColor"
>
  <path
    d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
  />
</svg>
```

---

## ⚙️ JavaScript Methodes

Na het laden is er een `window.expandableSections` object beschikbaar:

```javascript
// Open specifieke sectie
window.expandableSections.open("maattabel");

// Sluit specifieke sectie
window.expandableSections.close("maattabel");

// Toggle sectie (open/sluit)
window.expandableSections.toggle("maattabel");

// Open ALLE secties
window.expandableSections.openAll();

// Sluit ALLE secties
window.expandableSections.closeAll();
```

---

## 🎯 CSS Classes & Tailwind Utilities

```scss
// Container
.expandable-section           // Main container
.is-open                      // Class als open

// Header
.expandable-header            // Toggle button
.expandable-title             // Title area
.expandable-icon              // Icon area

// Content
.expandable-content           // Container met animatie
.expandable-body              // Inner content

// Options
.options-list                 // Container
.options-item                 // Individueel item
.options-label                // Naam van optie
.options-icon                 // Check icoon
```

---

## 📊 Animatie Details

- **Type**: CSS max-height transition
- **Duration**: 300ms
- **Timing**: ease-in-out
- **Effect**: Smooth slide-open/close

---

## 🔒 Backward Compatibility

Oude styles zijn behouden:

- `#maattabel.wrapper`
- `.display`
- `.content-wrapper`

Kan geleidelijk geconverteerd worden.

---

## ✨ Features

| Feature          | Status |
| ---------------- | ------ |
| SVG Iconen       | ✅     |
| Smooth Animaties | ✅     |
| Meerdere Open    | ✅     |
| Tailwind Styling | ✅     |
| SCSS Support     | ✅     |
| Herbruikbaar     | ✅     |
| Responsive       | ✅     |
| Accessibility    | ✅     |
| Keyboard Support | ✅     |

---

## 🐛 Troubleshooting

### Animatie werkt niet?

→ Zorg dat Tailwind CSS gecompileerd is

### Script laadt niet?

→ Check DevTools Console voor errors
→ Zorg dat `expandable-sections.js` in `asset/js/` staat

### Icons zien er raar uit?

→ Check viewBox en width/height attributes
→ Zorg dat `stroke-width` aanstaat

### Classes werken niet?

→ Rebuild Tailwind met: `npm run build`

---

## 📚 Documentatie

Zie ook: `EXPANDABLE_COMPONENT_README.md` in dezelfde map

---

## 🎉 Klaar!

Het component is volledig functioneel en gereed voor gebruik. Start met het testen van `_model-dimensions.html` en pas dan andere secties aan.

Veel succes! 🚀
