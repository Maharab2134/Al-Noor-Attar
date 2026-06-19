# Al Noor Attar - Design System

The visual design language of **Al Noor Attar (النور للعطور)** is crafted to evoke an elite sense of history, authenticity, and Middle Eastern luxury. This document outlines the core tokens, typography, colors, and layout rhythm that form the brand's identity system.

## 1. Visual Theme: "Obsidian & Champagne Gold"
The primary mood is dark, mysterious, and rich—reminiscent of night-cooling desert sand dunes and burning frankincense blocks.

*   **Dark Mode (Default)**: Deep Charcoal and Obsidian obsidian backgrounds (`#121212`, `#1C1A18`) coupled with brilliant Champagne Gold outlines (`#E5C158`, `#D4AF37`) and soft warm linen text (`#FAF9F6`).
*   **Light Mode**: Imperial Alabaster Smooth White (`#FAF9F6`) coupled with warm soft linen cream layouts (`#F4F2EB`) and deep obsidian typography (`#1F1F1E`) with gold focal marks.

## 2. Color Palette Tokens

```css
body.light-mode {
  --bg-primary: #FAF9F6;      /* Smooth White */
  --bg-secondary: #F4F2EB;    /* Warm Soft Linen Cream */
  --bg-card: #FFFFFF;         /* Pure Crystal Card Frame */
  --border-color: rgba(212, 175, 55, 0.18); /* Soft Gold Border */
  --text-primary: #1F1F1E;    /* Obsidian Soft Charcoal */
  --text-secondary: #5C5A56;  /* Drifting Amber Ground */
  --gold-primary: #D4AF37;    /* Metallic Champagne Gold */
}

body.dark-mode {
  --bg-primary: #121212;      /* Midnight Obsidian Black */
  --bg-secondary: #1C1A18;    /* Charcoal Sandstone */
  --bg-card: #1A1816;         /* Solid Shadow Core Card */
  --border-color: rgba(212, 175, 55, 0.25); /* Incandescent Gold Outline */
  --text-primary: #FAF9F6;    /* Warm Linen Pure White */
  --text-secondary: #CDC9C1;  /* Dusty Sand Misted Grey */
  --gold-primary: #E5C158;    /* Lighter Sparkling Gold */
}
```

## 3. Typography Pairings
Typography establishes rhythm and cultural prestige across headings.

*   **Display / Large Headings**: **Cinzel** (Serif) is paired with **Amiri** (traditional Arabic calligraphic style) to present titles with a high-class imperial stamp.
*   **Body Texts**: **Inter** (modern geometric Sans-Serif) ensures high legibility, clean spacing, and modern readability across descriptions and lists.

## 4. UI Elements & Micro-Animations
Sophistication is achieved through micro-animations that reward user actions.

*   **Interactive Progress Indicator**: A horizontal hairline (`3px` height, `#D4AF37`) tracks current screen coordinates relative to page height dynamically.
*   **Intersection Scroll reveals**: Elements fade and translate upward smoothly by `40px` when intercepted in viewports.
*   **Gold Hover Rings**: Buttons, select selectors, and image containers scale by `1.02` with golden shadows of `0 8px 25px rgba(212, 175, 55, 0.2)` on mouseovers.
