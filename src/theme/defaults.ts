import type { ThemeDefaults } from '@/core';

/** The template's own accent and surfaces; the store's branding overrides the accent. */
export const themeDefaults: ThemeDefaults = {
  brand: '#E8B83A',
  brand2: '#2E5033',
  surface: '#F3F5EE',
  // Raised cards are the least favorable reading surface in dark mode.
  darkSurface: '#213427',
  displayFont: '"Fraunces", "Noto Serif", Georgia, serif',
  bundledFonts: ['Fraunces', 'Figtree'],
  displayFallback: 'Georgia, serif',
};
