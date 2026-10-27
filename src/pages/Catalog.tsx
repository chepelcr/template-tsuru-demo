import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useId, useState } from 'react';
import {
  productsContent,
  showsKindFilter,
  showsOfferFilter,
  useCatalogView,
  useCmsPage,
  usePageMeta,
  type CatalogCategory,
  type CatalogFacets,
  type CatalogItem,
  type CatalogParams,
  type ItemKind,
  type SetCatalogParams,
  type SortKey,
} from '@/core';
import { useI18n } from '@/i18n';
import { Label } from '@/components/Label';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { Sheet } from '@/components/Sheet';
import { SectionError } from '@/components/StoreStates';

const SORTS: SortKey[] = ['featured', 'newest', 'price-asc', 'price-desc', 'name'];

function FilterControls({
  params,
  setParams,
  facets,
  categories,
  query,
  onQuery,
  idPrefix,
}: {
  params: CatalogParams;
  setParams: SetCatalogParams;
  facets: CatalogFacets;
  categories: CatalogCategory[];
  query: string;
  onQuery: (q: string) => void;
  idPrefix: string;
}) {
  const { t } = useI18n();
  const kinds: Array<{ value: ItemKind | null; key: string }> = [
    { value: null, key: 'catalog.kind.all' },
    { value: 'product', key: 'catalog.kind.product' },
    { value: 'service', key: 'catalog.kind.service' },
  ];
  const pill =
    'inline-flex min-h-tap items-center justify-between gap-3 rounded-full px-4 text-left font-medium transition-colors aria-pressed:bg-[color:var(--sb-moss)] aria-pressed:text-[color:var(--sb-clearing)] hover:bg-surface-quiet aria-pressed:hover:bg-[color:var(--sb-moss)]';

  return (
    <div className="flex flex-col gap-7">
      <div>
        <label htmlFor={`${idPrefix}-search`} className="mb-2 block text-sm font-semibold text-heading">
          <Label k="catalog.search" gloss />
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id={`${idPrefix}-search`}
            type="search"
            className="field pl-10"
            placeholder={t('catalog.search.placeholder')}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
      </div>

      {showsKindFilter(facets) && (
        <div role="group" aria-labelledby={`${idPrefix}-kind`}>
          <p id={`${idPrefix}-kind`} className="mb-2 text-sm font-semibold text-heading">
            {t('catalog.kind')}
          </p>
          <div className="flex flex-wrap gap-2">
            {kinds.map(({ value, key }) => (
              <button key={key} type="button" aria-pressed={params.kind === value} className={`${pill} shadow-[inset_0_0_0_1.5px_var(--rule)]`} onClick={() => setParams({ kind: value })}>
                <Label k={key} />
              </button>
            ))}
          </div>
        </div>
      )}

      {categories.length > 1 && (
        <div role="group" aria-labelledby={`${idPrefix}-category`}>
          <p id={`${idPrefix}-category`} className="mb-2 text-sm font-semibold text-heading">
            {t('catalog.category')}
          </p>
          <ul className="flex flex-col gap-1">
            <li>
              <button type="button" aria-pressed={!params.category} className={`${pill} w-full`} onClick={() => setParams({ category: null })}>
                <span>{t('catalog.category.all')}</span>
                <span className="text-sm tabular-nums opacity-75">{facets.total}</span>
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button type="button" aria-pressed={params.category === c.key} className={`${pill} w-full`} onClick={() => setParams({ category: c.key })}>
                  <span>{c.name}</span>
                  <span className="text-sm tabular-nums opacity-75">{facets.categories.get(c.id) ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showsOfferFilter(facets) && (
        <label className="flex min-h-tap cursor-pointer items-center gap-3 font-medium">
          <input type="checkbox" className="h-5 w-5 accent-[color:var(--sb-moss)]" checked={params.sale} onChange={(e) => setParams({ sale: e.target.checked })} />
          {t('catalog.offers')}
        </label>
      )}

      <div>
        <label htmlFor={`${idPrefix}-sort`} className="mb-2 block text-sm font-semibold text-heading">
          {t('catalog.sort')}
        </label>
        <select id={`${idPrefix}-sort`} className="field" value={params.sort} onChange={(e) => setParams({ sort: e.target.value as SortKey })}>
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {t(`catalog.sort.${s}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Grid({ items, categoryOf }: { items: CatalogItem[]; categoryOf: (id: string | null) => CatalogCategory | undefined }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-6">
      {items.map((item) => (
        <li key={item.id}>
          <ProductCard item={item} category={categoryOf(item.categoryId)} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 50vw" headingLevel="h3" />
        </li>
      ))}
    </ul>
  );
}

export default function Catalog() {
  const { t, plural } = useI18n();
  const cms = useCmsPage('products');
  const content = productsContent(cms.page);
  usePageMeta(cms.page?.title ?? t('catalog.title'), cms.page?.metaDescription);

  const { catalog, params, setParams, query, setQuery, facets, categories, results, active, grouped, selected, uncategorized, categoryOf, clearAll } =
    useCatalogView();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsId = useId();

  const controls = (prefix: string) => (
    <FilterControls params={params} setParams={setParams} facets={facets} categories={categories} query={query} onQuery={setQuery} idPrefix={prefix} />
  );

  return (
    <>
      <section className="on-deep bg-[color:var(--sb-moss)] text-ink-on-deep">
        <div className="page py-12 md:py-16">
          {cms.isLoading ? (
            <div aria-hidden="true" className="flex flex-col gap-3">
              <div className="skeleton-deep h-12 w-72" />
              <div className="skeleton-deep h-5 w-96 max-w-full" />
            </div>
          ) : (
            <>
              <h1 className="text-[clamp(2.4rem,6vw,3.75rem)]">{content.hero.title ?? t('catalog.title')}</h1>
              {content.hero.subtitle && <p className="mt-3 max-w-2xl text-lg text-ink-on-deep-soft">{content.hero.subtitle}</p>}
            </>
          )}
        </div>
      </section>

      <div className="page grid gap-10 py-10 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-6">{controls('rail')}</div>
        </aside>

        <div className="lg:col-span-9">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p id={resultsId} aria-live="polite" className="font-semibold text-heading">
              {catalog.isLoading ? t('state.loading') : plural('catalog.results', results.length)}
              {selected && <span className="font-normal text-ink-soft"> · {selected.name}</span>}
            </p>
            <div className="flex gap-2">
              {active && (
                <button type="button" className="btn btn-quiet px-4 text-sm" onClick={clearAll}>
                  <X aria-hidden="true" className="h-4 w-4" />
                  {t('catalog.filters.clear')}
                </button>
              )}
              <button type="button" className="btn btn-moss px-4 text-sm lg:hidden" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                {t('catalog.filters')}
              </button>
            </div>
          </div>

          {catalog.isLoading ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : catalog.isError ? (
            <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
          ) : catalog.items.length === 0 ? (
            <p className="text-lg text-ink-soft">{t('catalog.empty.store')}</p>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-surface-quiet p-8">
              <p className="font-display text-2xl text-heading">{t('catalog.empty.title')}</p>
              <p className="text-ink-soft">{t('catalog.empty.body')}</p>
              <button type="button" className="btn btn-moss mt-2" onClick={clearAll}>
                {t('catalog.filters.clear')}
              </button>
            </div>
          ) : grouped ? (
            <div className="flex flex-col gap-16">
              {categories.map((category) => {
                const items = results.filter((i) => i.categoryId === category.id);
                if (!items.length) return null;
                return (
                  <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                    <div className="mb-6 flex items-end gap-4 border-b border-rule pb-3">
                      <h2 id={`cat-${category.id}`} className="text-3xl text-heading">
                        {category.name}
                      </h2>
                      {category.description && <p className="hidden pb-1 text-ink-soft sm:block">{category.description}</p>}
                    </div>
                    <Grid items={items} categoryOf={() => undefined} />
                  </section>
                );
              })}
              {uncategorized.length > 0 && <Grid items={uncategorized} categoryOf={() => undefined} />}
            </div>
          ) : (
            <Grid items={results} categoryOf={categoryOf} />
          )}
        </div>
      </div>

      <Sheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        title={t('catalog.filters')}
        footer={
          <button type="button" className="btn btn-accent w-full" onClick={() => setFiltersOpen(false)}>
            {plural('catalog.filters.show', results.length)}
          </button>
        }
      >
        {controls('sheet')}
      </Sheet>
    </>
  );
}
