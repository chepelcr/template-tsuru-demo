/**
 * Tsuru Ù speaks Bribri first, then Spanish, then English. A Bribri label
 * carries its Spanish gloss (`gloss`), so the interface stays usable for
 * visitors who do not read Bribri.
 */
import { baseEn, baseEs, createI18n, translate } from '@/core';
import { bzd } from './bzd';
import { en } from './en';
import { es } from './es';

const config = {
  dictionaries: { bzd, es: { ...baseEs, ...es }, en: { ...baseEn, ...en } },
  defaultLang: 'bzd',
  fallback: ['es', 'en'],
  locales: { bzd: 'es-CR', es: 'es-CR', en: 'en-US' },
  // Most of the store's content (descriptions, CMS sentences) is Spanish.
  htmlLang: { bzd: 'es' },
};

export const { I18nProvider, useI18n } = createI18n(config);

/** The Spanish meaning of a Bribri label, or null when the label is not Bribri. */
export function glossFor(lang: string, key: string): string | null {
  if (lang !== 'bzd' || !(key in bzd)) return null;
  return translate(config, 'es', key);
}
