import { Leaf } from 'lucide-react';
import { Link } from 'wouter';
import { categoriesWithItems, featuredItems, homeContent, paragraphs, useCatalog, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { Canopy } from '@/components/Canopy';
import { CategoryTrail } from '@/components/CategoryTrail';
import { CmsIcon } from '@/components/CmsIcon';
import { Label } from '@/components/Label';
import { LeafEdge } from '@/components/LeafEdge';
import { Placeholder } from '@/components/Placeholder';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';

function HeroSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4">
      <div className="skeleton-deep h-6 w-28" />
      <div className="skeleton-deep h-14 w-full max-w-md" />
      <div className="skeleton-deep h-5 w-full max-w-sm" />
      <div className="skeleton-deep h-5 w-2/3 max-w-xs" />
      <div className="mt-2 flex gap-3">
        <div className="skeleton-deep h-11 w-40 rounded-full" />
        <div className="skeleton-deep h-11 w-40 rounded-full" />
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useI18n();
  const cms = useCmsPage('home');
  const home = homeContent(cms.page);
  const catalog = useCatalog();
  usePageMeta(cms.page?.title, cms.page?.metaDescription);

  const featured = featuredItems(catalog.items, 5);
  const trail = categoriesWithItems(catalog.categories, catalog.items);
  const categoryOf = (id: string | null) => catalog.categories.find((c) => c.id === id);
  const storyParagraphs = paragraphs(home.story.content);

  return (
    <>
      <section className="on-deep relative isolate overflow-hidden bg-surface-deep text-ink-on-deep">
        <Canopy />
        <div className="page relative grid items-center gap-10 pb-16 pt-10 md:grid-cols-12 md:pb-24 md:pt-16 lg:pt-20">
          <div className="md:col-span-6 lg:col-span-5">
            {cms.isLoading ? (
              <HeroSkeleton />
            ) : cms.isError ? (
              <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
            ) : (
              <>
                {home.hero.badge && (
                  <p className="mb-4 inline-flex items-center gap-2 text-base font-semibold text-[color:var(--accent)]">
                    <Leaf aria-hidden="true" className="h-4 w-4" />
                    {home.hero.badge}
                  </p>
                )}
                {home.hero.title && <h1 className="text-[clamp(2.6rem,7vw,4.5rem)] text-ink-on-deep">{home.hero.title}</h1>}
                {home.hero.subtitle && <p className="mt-5 max-w-[34rem] text-lg text-ink-on-deep-soft">{home.hero.subtitle}</p>}
                {(home.hero.ctaPrimary || home.hero.ctaSecondary) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {home.hero.ctaPrimary && (
                      <Link href="/products" className="btn btn-accent">
                        {home.hero.ctaPrimary}
                      </Link>
                    )}
                    {home.hero.ctaSecondary && (
                      <Link href="/contact" className="btn btn-on-deep">
                        {home.hero.ctaSecondary}
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="md:col-span-6 lg:col-span-7">
            <div className="leaf relative aspect-[5/4] bg-surface-deep-raised shadow-lift md:aspect-[4/3]">
              {cms.isLoading ? (
                <div aria-hidden="true" className="skeleton-deep h-full w-full rounded-none" />
              ) : (
                <StoreImage src={home.hero.image} alt="" priority sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" fallback={<Placeholder tone="deep" />} />
              )}
            </div>
          </div>
        </div>
      </section>
      <LeafEdge className="-mt-px text-[color:var(--surface-deep)]" />

      <section aria-labelledby={home.categories.title ? 'home-categories' : undefined} className="page pb-6 pt-10 md:pt-14">
        {(home.categories.title || home.categories.subtitle) && (
          <div className="mb-8 max-w-2xl">
            {home.categories.title && (
              <h2 id="home-categories" className="text-4xl text-heading">
                {home.categories.title}
              </h2>
            )}
            {home.categories.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.categories.subtitle}</p>}
          </div>
        )}
        {catalog.isLoading ? (
          <div aria-hidden="true" className="flex gap-5 overflow-hidden md:grid md:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex w-[9.5rem] shrink-0 flex-col items-center gap-3 md:w-auto">
                <div className="skeleton aspect-square w-full rounded-full" />
                <div className="skeleton h-5 w-2/3" />
              </div>
            ))}
          </div>
        ) : catalog.isError ? (
          <SectionError title={t('catalog.error.title')} onRetry={catalog.refetch} />
        ) : (
          trail.length > 0 && <CategoryTrail categories={trail} items={catalog.items} />
        )}
      </section>

      <section aria-labelledby={home.featured.title ? 'home-featured' : undefined} className="mt-10 bg-surface-quiet py-16">
        <div className="page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              {home.featured.badge && <p className="mb-2 inline-flex rounded-full bg-surface px-3 py-1 text-sm font-semibold text-heading">{home.featured.badge}</p>}
              {home.featured.title && (
                <h2 id="home-featured" className="text-4xl text-heading">
                  {home.featured.title}
                </h2>
              )}
              {home.featured.subtitle && <p className="mt-2 text-lg text-ink-soft">{home.featured.subtitle}</p>}
            </div>
            {catalog.items.length > 0 && (
              <Link href="/products" className="btn btn-quiet">
                {t('catalog.viewAll')}
              </Link>
            )}
          </div>

          {catalog.isLoading ? (
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ProductCardSkeleton feature />
              </div>
              <div className="flex flex-col gap-6 lg:col-span-7">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} aria-hidden="true" className="flex gap-5">
                    <div className="leaf-sm skeleton aspect-square w-36" />
                    <div className="flex flex-1 flex-col gap-2 py-1">
                      <div className="skeleton h-4 w-24" />
                      <div className="skeleton h-6 w-2/3" />
                      <div className="skeleton h-7 w-24 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : catalog.isError ? null : featured.length === 0 ? (
            <p className="text-lg text-ink-soft">{t('catalog.empty.store')}</p>
          ) : (
            <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ProductCard item={featured[0]} category={categoryOf(featured[0].categoryId)} layout="feature" sizes="(min-width: 1024px) 34vw, 100vw" headingLevel="h3" />
              </div>
              <ul className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6 lg:pl-6">
                {featured.slice(1).map((item) => (
                  <li key={item.id} className="border-b border-rule pb-6 last:border-0 last:pb-0">
                    <ProductCard item={item} category={categoryOf(item.categoryId)} layout="row" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {home.benefits.length > 0 && (
        <section className="page py-16">
          <ul className="grid gap-10 md:grid-cols-3">
            {home.benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span className="leaf-sm grid h-12 w-12 shrink-0 place-items-center bg-surface-quiet text-heading">
                  <CmsIcon icon={benefit.icon} className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-xl text-heading">{benefit.title}</h3>
                  {benefit.description && <p className="mt-1 text-ink-soft">{benefit.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(home.story.title || storyParagraphs.length > 0) && (
        <section className="page grid items-center gap-10 py-10 md:grid-cols-12">
          {home.story.image && (
            <div className="leaf aspect-[4/5] bg-surface-quiet md:col-span-5">
              <StoreImage src={home.story.image} alt="" sizes="(min-width: 768px) 40vw, 100vw" maxWidth={1280} fallback={<Placeholder />} />
            </div>
          )}
          <div className={home.story.image ? 'md:col-span-6 md:col-start-7' : 'md:col-span-8'}>
            {home.story.title && <h2 className="text-4xl text-heading">{home.story.title}</h2>}
            <div className="mt-4 flex max-w-[62ch] flex-col gap-4 text-lg text-ink-soft">
              {storyParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href="/about" className="btn btn-quiet mt-6">
              <Label k="nav.about" />
            </Link>
          </div>
        </section>
      )}

      {(home.cta.title || home.cta.description) && (
        <section className="page pt-12">
          <div className="leaf on-deep relative overflow-hidden bg-[color:var(--sb-moss)] px-6 py-12 text-ink-on-deep sm:px-12">
            <div className="max-w-2xl">
              {home.cta.title && <h2 className="text-4xl">{home.cta.title}</h2>}
              {home.cta.description && <p className="mt-3 text-lg text-ink-on-deep-soft">{home.cta.description}</p>}
              {home.cta.buttonText && (
                <Link href="/contact" className="btn btn-accent mt-6">
                  {home.cta.buttonText}
                </Link>
              )}
            </div>
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -bottom-10 -right-6 h-56 w-56 text-[color:var(--sb-canopy)] opacity-40">
              <path d="M10 190C40 110 110 40 190 10C170 90 120 160 10 190Z" fill="currentColor" />
              <path d="M24 178C70 130 120 80 176 24" stroke="var(--sb-fern)" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </section>
      )}
    </>
  );
}
