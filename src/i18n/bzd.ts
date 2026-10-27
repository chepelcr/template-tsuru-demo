/**
 * Bribri interface labels. Every word is attested in the UCR Bribri
 * dictionary (Krohn, 2019–2025); entries and sources are in BRIBRI.md and
 * `scripts/templates/check-bribri.py` (monorepo) verifies this block.
 * A label with no attested word is absent here and falls back to Spanish:
 * instructions, errors and the checkout stay in Spanish on purpose.
 * Glottal stop: ’ (U+2019). Nasal vowels: macron below (U+0331).
 */
import type { Dictionary } from '@/core';

export const bzd: Dictionary = {
  'nav.home': 'Ù',
  'nav.catalog': 'Íyi',
  'nav.about': 'Sa’ pàke',
  'nav.contact': 'Ichákök',
  'nav.cart': 'Ajkö́',
  'cart.title': 'Ajkö́',
  'catalog.title': 'Íyi',
  'catalog.search': 'Yulö́k',
  'catalog.kind.all': 'Ulìta̱ne̱',
  'product.add': 'Tá̱u̱k',
  'product.price': 'Tu̱wè̱',
  'checkout.success.title': 'Wë̀stë',
  'contact.title': 'Ichákök',
};

/** Labels that are phrases: their grammar awaits a native speaker's review. */
export const bzdPhrases: readonly string[] = ['nav.about'];
