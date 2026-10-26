import { Link } from 'wouter';
import { catalogHref, facetsFor, onColor, type CatalogCategory, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';
import { StoreImage } from './StoreImage';

// Organic outlines so no two clearings look alike.
const BLOBS = [
  '58% 42% 55% 45% / 48% 58% 42% 52%',
  '45% 55% 40% 60% / 55% 45% 58% 42%',
  '62% 38% 50% 50% / 42% 56% 44% 58%',
  '50% 50% 62% 38% / 58% 40% 60% 42%',
  '40% 60% 48% 52% / 50% 62% 38% 50%',
  '55% 45% 42% 58% / 40% 52% 48% 60%',
];

/**
 * The store's categories as a path through the forest: each one a clearing
 * with its own photo (or its initial on its own colour), in the store's order.
 */
export function CategoryTrail({ categories, items }: { categories: CatalogCategory[]; items: CatalogItem[] }) {
  const { plural } = useI18n();
  const counts = facetsFor(items).categories;
  return (
    <div className="relative">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[28%] hidden h-24 w-full text-[color:var(--rule)] md:block" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0 60 C150 10 280 90 420 50 S700 10 840 55 S1080 90 1200 40" stroke="currentColor" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" fill="none" />
      </svg>
      <ol className="relative -mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category, index) => {
          const bg = category.backgroundColor ?? 'var(--surface-quiet)';
          const ink = category.backgroundColor ? onColor(category.backgroundColor) : 'var(--heading)';
          return (
            <li key={category.id} className="w-[9.5rem] shrink-0 snap-start md:w-auto">
              <Link href={catalogHref({ category: category.key })} className="group flex flex-col items-center gap-3 rounded-3xl p-1 text-center">
                <span className="relative block aspect-square w-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1" style={{ borderRadius: BLOBS[index % BLOBS.length], background: bg }}>
                  <StoreImage
                    src={category.imageUrl}
                    alt=""
                    sizes="(min-width: 768px) 18vw, 9.5rem"
                    maxWidth={640}
                    fallback={
                      <span className="grid h-full w-full place-items-center font-display text-5xl" style={{ color: ink }}>
                        {category.name.slice(0, 1)}
                      </span>
                    }
                  />
                </span>
                <span className="font-display text-xl leading-tight text-heading group-hover:underline">{category.name}</span>
                <span className="text-sm text-ink-soft">{plural('category.count', counts.get(category.id) ?? 0)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
