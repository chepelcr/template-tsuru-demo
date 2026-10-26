# Tsuru Ù — storefront template

Tsuru's own demo store, written in Bribri: understory greens, leaf masks and
light filtering through the canopy. Serves cooperatives, cacao and coffee
producers, community markets and rural businesses that sell over WhatsApp.

- Design plan, palette, type and the signature effect: [`DESIGN.md`](DESIGN.md)
- Bribri vocabulary, sources and review status: [`BRIBRI.md`](BRIBRI.md)

## How it works

A React 18 + Vite + Tailwind app. Everything the store shows is data:

| What | Where it comes from |
|---|---|
| store name, logo, colours, display font | the organization's branding (template defaults in `src/theme/`) |
| hero, story, benefits, contact copy | the shared CMS contract (`home`, `about`, `products`, `contact` pages) |
| products, services, categories | the template's demo catalog, or the organization's own catalog |
| hours, WhatsApp, email, address, social | the organization's contact settings |

`/config.json` decides which: `{ "mode": "demo", "templateId": … }` reads the
template's rows (this repository's example site); a provisioned store gets
`{ "mode": "live", "orgId": … }` and reads its organization.

The shared logic lives in `src/core/`, **vendored** from the monorepo's
`templates/_core` — do not edit it here (see its README). Template code is the
design: `src/components`, `src/pages`, `src/theme`, `src/scenes`, `src/i18n`.

## Pages

`/` home · `/products` catalog (products and services; `?type=`, `?category=`,
`?sale=1`, `?q=`, `?sort=`) · `/products/:id` detail · `/about` · `/contact` ·
404. Old URLs (`/deals`, `/services`, `/programs`, `/category/:slug`…) redirect
to their place in the catalog. The basket is a sheet; checkout is a dialog
(live stores create the order in the POS and open WhatsApp; the demo store
shows the message it would send).

## Languages

Bribri first (`src/i18n/bzd.ts`, attested words only), then Spanish, then
English (`?lang=es`, `?lang=en`). Bribri labels carry their Spanish meaning.

## Effects

The canopy's light is a ~3 KB WebGL shader (`src/scenes/light.ts`), loaded
only in view on capable devices with motion allowed; otherwise a static
gradient shows. `?motion=reduce` and `?webgl=0` force the still version.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # tsc + vite build → dist/
```

Against a local management-be (no shared database):
`TSURU_DEV_API=http://localhost:5000 VITE_PUBLIC_API_URL=http://localhost:5173 pnpm dev`.

## Deployment

`.github/workflows/deploy.yml`: `develop` → GitHub Pages
(`tsuru-demo.examples.tsuru.jcampos.dev`, staging); `main` → production
example hosting. Each deploy notifies the provisioner so organization stores
using this template are refreshed.
