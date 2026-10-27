# Bribri in Tsuru Ù

Tsuru Ù is Tsuru's demo store, written in Bribri (bzd), a Chibchan language of
Talamanca. The platform's name comes from it: the UCR dictionary lists
*tsuru’* as a spelling variant of *tsiru’*, cacao — the store's first category.

**Rule: no invented Bribri.** Every Bribri word on the site is attested in the
dictionary below. Interface labels are single attested words; a label with no
attested word stays in Spanish (instructions, errors and the checkout are
Spanish on purpose). Multi-word strings are flagged as phrases: each word is
attested, but the grammar needs a native speaker's review.

## Source

Haakon S. Krohn, *Diccionario bribri–español / español–bribri*. Universidad de
Costa Rica, Instituto de Investigaciones Lingüísticas, 2019–2025.
<https://www.haakonkrohn.com/bribri/> (data files `diccionario.xml` and
`diccionario-esp-bri.xml`, consulted October 2026). Each entry cites its own
sources: Margery (1996), Jara (2018), Jara y García (2013), Constenla et al.
(1998), Chevrier (2017) and others, quoted in the tables below.

## Orthography (as the dictionary writes it)

| Mark | Example | Meaning |
|---|---|---|
| grave ` | kàpi | high or rising tone |
| acute ´ | ajkö́ | falling tone |
| circumflex ˆ | — | rising tone (Amubre dialect) |
| macron below ̱ (U+0331) | ka̱nè̱ | nasal vowel |
| ë, ö | wö̀ | vowels of their own |
| ’ (U+2019) | tsiru’ | glottal stop (the last letter of the alphabet) |

The previous version of this file had the tone marks reversed and wrote the
glottal stop with a straight apostrophe; both are corrected here.

## How it is checked

`scripts/templates/check-bribri.py` (monorepo) downloads both dictionary
files at run time (they are not committed), normalizes to NFC and checks every
word of `src/i18n/bzd.ts` and of every `bri('…')` in the template seed data
(`be/management-be/src/seeds/templates/data/tsuru-demo.ts`):

```bash
python3 scripts/templates/check-bribri.py templates/tsuru-demo/src/i18n/bzd.ts \
  be/management-be/src/seeds/templates/data/tsuru-demo.ts
```

A word counts as attested when it is a lemma, a listed inflection, a spelling
variant, a synonym or a form in the Spanish–Bribri index. Unattested words fail
the check and are listed with dictionary entries that differ only in their
marks. Last run: 48 strings, 0 unattested words; 8 multi-word strings (five distinct: the four phrases below and the list "Tsiru’, kàpi, wö̀").

## Interface labels (`src/i18n/bzd.ts`)

Each label shows its Spanish meaning underneath (the "gloss"), so the store
stays usable for visitors who do not read Bribri.

| Key | Bribri | Used for | Dictionary entry | Status |
|---|---|---|---|---|
| nav.home | Ù | Inicio | *ù* sust. casa, edificio, hogar — Margery (1996), Jara y García (2013) | attested |
| nav.catalog, catalog.title | Íyi | Catálogo | *íyi* sust. cosa — Jara y García (2013), Margery (1996) | attested |
| nav.about | Sa’ pàke | Nosotros | *sa’* nosotros, nuestro (exclusivo) — Jara (2018); *pàke* historia, relato — Krohn y Morales (por publicarse) | phrase for review |
| nav.contact, contact.title | Ichákök | Contacto | *ichákök* v. tr. preguntar, averiguar; llamar; saludar — Jara (2018), Margery (1996), Jara y García (2013) | attested |
| nav.cart, cart.title | Ajkö́ | Canasta | *ajkö́* sust. canasta — Margery (1996) | attested |
| catalog.search | Yulö́k | Buscar | *yulö́k* v. tr. buscar — Margery (1996), Jara (1993), Jara y García (2013) | attested |
| catalog.kind.all | Ulìta̱ne̱ | Todo | *ulìta̱ne̱* todos; cualquiera — Jara y García (2013, 2008) | attested |
| product.add | Tá̱u̱k | Comprar | *tá̱u̱k* v. tr. comprar — Margery (1996), Constenla et al. (1998), Jara (2013) | attested |
| product.price | Tu̱wè̱ | Precio | *tu̱wè̱* sust. precio — Alí García Segura (com. pers.) | attested |
| checkout.success.title | Wë̀stë | Gracias | *wë̀stë* interj. gracias — Jara y García (2013) | attested |

*Ujtö́k* ("hablar") was the previous contact label. The dictionary also gives
it the sense "matar" (Jara y García 2013), so it was replaced by *ichákök*.

## Store content (template seed data)

These are the template's demo rows; an organization that adopts the template
receives the CMS copy and can edit it in the POS.

| Where | Bribri | Meaning | Dictionary entry | Status |
|---|---|---|---|---|
| store name | Tsuru Ù | Tsuru house | *ù* casa — see above | attested word (brand + ù) |
| home hero badge, about story title | Kàlyök | selva | *kàlyök* sust. selva — Margery (1996) | attested |
| home hero title | Tsiru’, kàpi, wö̀ | cacao, café, fruta | *tsiru’* cacao (árbol, bebida); *kàpi* café (planta, bebida); *wö̀* fruta, semilla — Jara y García (2013), Margery (1996) | list of attested nouns |
| home categories title, catalog meta | Íyi | cosas | *íyi* cosa | attested |
| home featured badge | Pà̱li̱k | nuevo | *pà̱li̱k* adj. nuevo — Margery (1996), Constenla et al. (1998), Chevrier (2017) | attested |
| home featured title | Íyi bua’ | cosas buenas | *íyi* cosa; *bua’* bueno, bien — Jara y García (2013), Margery (1996) | phrase for review |
| home story title, about | Sa’ pàke | nuestra historia | see nav.about | phrase for review |
| home CTA title | Wë̀stë | gracias | see above | attested |
| catalog hero title | Íyi ulìta̱ne̱ | todas las cosas | *íyi* + *ulìta̱ne̱* | phrase for review |
| contact title | Ichákök | preguntar | see above | attested |
| contact visit title | Sa’ ù | nuestra casa | *sa’* + *ù* | phrase for review |
| category | Tsiru’ | cacao | *tsiru’* | attested |
| category, product | Kàpi | café | *kàpi* | attested |
| category | Wö̀ | frutas | *wö̀* fruta, semilla | attested |
| category, product | Ajkö́ | canastas | *ajkö́* canasta | attested |
| category | Ka̱nè̱ | recorridos y talleres | *ka̱nè̱* sust. trabajo, labor, tarea — Jara y García (2013), Constenla et al. (1998) | attested |
| product | Tsirùwö | cacao en grano | *tsirùwö* fruto, semilla de cacao — Margery (1996) | attested |
| product | Tsirùchaka | masa de cacao | *tsirùchaka* masa de cacao — Margery (1996) | attested |
| product, service | Tsirùdiö | cacao para bebida | *tsirùdiö* bebida hecha de cacao — Margery (1996), Sánchez (s.f.) | attested |
| product | Kápiwö | café en grano | *kápiwö* fruto del café — Margery (1996) | attested |
| product | Abáwö | piña | *abáwö* piña — Margery (1996) | attested |
| product | Kàlwö | canasta de frutas | *kàlwö* fruto de árbol (genérico) — Margery (1996) | attested |
| product | Kapö̀ | hamaca | *kapö̀* hamaca — Jara y García (2013), Chevrier (2017) | attested |
| service | Recorrido de *tsiru’*, Taller de *tsirùdiö* | — | Spanish name with an attested Bribri noun | attested word |

## Phrases waiting for a native speaker

Each word is attested; the word order follows the possessive and
noun–adjective patterns seen in the dictionary's own examples, but nobody who
speaks Bribri has reviewed them yet:

| Phrase | Intended meaning | Literal |
|---|---|---|
| Sa’ pàke | nuestra historia | nosotros (excl.) + historia |
| Sa’ ù | nuestra casa | nosotros (excl.) + casa |
| Íyi bua’ | cosas buenas | cosa + bueno |
| Íyi ulìta̱ne̱ | todas las cosas | cosa + todos |

If a reviewer corrects one, update `bzd.ts` or the seed data, run the check and
update this table. Until then the phrases are marked in `bzd.ts`
(`bzdPhrases`) and here.

## Corrections from the previous version

Words that were misspelled or not in the dictionary and are now gone or fixed:
*Ìyi* → *íyi*, *ìyök* → *íyök*, *kanè* → *ka̱nè̱*, *kie* → *kiè*,
*ulìtane* → *ulìta̱ne̱*, *patkök* → *pàtkök*, *wë̀ste* → *wë̀stë*,
*mìk* → *mì̱k*, *Kapë̀* → *kàpi* (café), *Kö̀l* → *ajkö́* (canasta),
*ushtè* → *ichákök*; the unattested *bua'ë*, *yö̀ne*, *shkèna*, *kimè*,
*yulè* and *patkène* were removed. Sacred and mythological vocabulary is not
used for commerce copy.
