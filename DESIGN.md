# Tsuru Ù — design plan

**Concept: Sotobosque (understory).** The visitor arrives under the canopy —
a dark green hero where leaf silhouettes overlap and light filters through —
and walks out into clearings: pale lichen surfaces where the market's goods
are laid out. It is Tsuru's own demo store, written in Bribri: navigation and
short labels in Bribri (words attested in the UCR dictionary, see
`BRIBRI.md`), sentences in Spanish.

Serves: cooperatives, cacao and coffee producers, community markets, rural
businesses that sell at ferias and over WhatsApp.

## Palette

| Token | Hex | Role |
|---|---|---|
| canopy | `#10261B` | hero, footer, the forest itself |
| moss | `#2E5033` | headings on light, secondary buttons, rules |
| fern | `#7FA068` | focus ring and highlights on dark |
| lichen | `#E2E8DA` | panels, filter rail, quiet bands |
| clearing | `#F3F5EE` | the reading surface |
| leaf gold | `#E8B83A` | the store's accent (org primary): CTAs, price tags |
| cacao | `#6B2A22` | offers, "antes" prices, small emphasis |
| ink | `#17241B` | body text on light surfaces |

Contrast (WCAG 2.x, computed): ink on clearing 14.6:1 · moss on clearing
8.3:1 · cacao on clearing 9.7:1 · ink on lichen 12.9:1 · gold on canopy
8.6:1 · fern on canopy 5.4:1 · lichen on canopy 12.8:1 · ink on gold 8.7:1 ·
gold on moss 4.9:1. Gold is never text on light surfaces; `--brand-text`
(the accent darkened to 4.5:1 by the theme bridge) is used there.

## Type

- **Fraunces** (display) with `SOFT 100`, `WONK 0`, weights 500–600: soft,
  low-contrast serif that reads like carved wood, not a newspaper.
- **Figtree** (text) 400/500/600.
- Bribri marks: U+0331 (macron below), ë/ö and tone accents are checked in
  both faces; Noto Sans/Serif, loaded with `text=` for those marks only,
  backs up any glyph a face lacks.
- Scale (rem): 0.875 · 1 · 1.125 · 1.375 · 1.75 · 2.25 · 3 · 4.25 (hero).
  Line length 60–72ch for Spanish paragraphs.

## Layout

```
HOME
┌───────────────────────────────── canopy ─────────────────────────────────┐
│ Tsuru Ù            Ù   Íyi   Sa’ pàke   Ujtö́k                [Ajkö́ ·2] │
│                                                                          │
│ Kàlyök                                         leaf layers (SVG, 3 deep) │
│ Tsiru’, kàpi, wö̀            ╭──── photo in a leaf-shaped mask ────╮      │
│ Spanish subtitle             │                                     │      │
│ [Ver el catálogo] [Cómo …]   ╰─────────────────────────────────────╯      │
│ ░░ light filtering through (WebGL; static gradient fallback) ░░░░░░░░░░ │
└──────────────────────────── leaf-edge divider ───────────────────────────┘
  clearing: Íyi — category trail: organic image masks joined by a path
  Pà̱li̱k / Íyi bua’ — 5/7: one large item + four small, offers first
  benefits as three short lines with leaf icons (no cards)
  story 5/7: photo + paragraph
  moss band: Wë̀stë + contact CTA
└ canopy footer: hours, contact, navigation, demo notice ┘

CATALOG                                  PRODUCT
┌ moss band: Íyi ulìta̱ne̱ ┐              ┌ 5 │ 7 ─────────────────────┐
│ rail │ grouped by category │           │ img │ category · name       │
│ search│ ── Tsiru’ ───────── │           │     │ price tag · availability│
│ kind  │ ▢ ▢ ▢               │           │     │ duration (services)    │
│ cats  │ ── Kàpi ─────────── │           │     │ qty · [Tá̱u̱k]           │
│ offers│ ▢ ▢                 │           └─────┴────────────────────────┘
└───────┴─────────────────────┘            related, same category first
Mobile: filters in a bottom sheet; groups become a single column.
```

Filters flatten the grouped catalog into one list, so a search shows matches,
not empty groups.

## Signature

**The canopy.** Three layers of leaf silhouettes over a light that drifts
slowly, as if the sun moved behind the trees. The light is a ~3 KB raw-WebGL
fragment shader (no library) loaded by `<LazyScene>` only in view, on capable
devices, with motion allowed; otherwise the leaves sit over a static radial
gradient. On a fine pointer the leaf layers shift a few pixels with the
pointer. Nothing else moves by itself.

Everything else is motion that answers an action: the basket count settles
after adding, the sheet slides from the side (bottom on phones), routes
cross-fade. Exit is faster than enter. Under reduced motion all of it is
instant.

## Voice

Bribri for single-word labels the dictionary attests (Ù home, Íyi things,
Ujtö́k speak, Ajkö́ basket, Tá̱u̱k buy, Tu̱wè̱ price, Wë̀stë thanks). Spanish
for anything that needs grammar: instructions, errors, the checkout. No
invented Bribri: a label without an attested word stays Spanish.

## Changed from the generic default

- No centered gradient hero, no stats strip, no testimonials.
- No card grid on the home: a trail of categories and one 5/7 composition.
- No eyebrow labels in caps, no arrows on links, no numbered markers.
- No section fade-ups: the canopy is the only autonomous motion.
- Leaf masks and the leaf-edge divider replace rounded-rectangle cards.
