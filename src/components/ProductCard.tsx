import { Link } from 'wouter';
import type { CatalogCategory, CatalogItem } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from './AddToCart';
import { Availability } from './Availability';
import { Placeholder } from './Placeholder';
import { Price } from './Price';
import { StoreImage } from './StoreImage';

interface ProductCardProps {
  item: CatalogItem;
  category?: CatalogCategory;
  /** Rendered width for image selection. */
  sizes?: string;
  layout?: 'stack' | 'feature' | 'row';
  headingLevel?: 'h2' | 'h3';
}

/**
 * A product or service in a leaf-shaped frame. The name links to the detail
 * page; the add button is a separate control (never nested in the link).
 */
export function ProductCard({ item, category, sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw', layout = 'stack', headingLevel = 'h3' }: ProductCardProps) {
  const { t } = useI18n();
  const Heading = headingLevel;
  const feature = layout === 'feature';

  if (layout === 'row') {
    return (
      <article className="group relative flex gap-4 rounded-[1.25rem_0.375rem_1.25rem_0.375rem] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-[color:var(--focus)] sm:gap-5">
        <div className="leaf-sm relative aspect-square w-28 shrink-0 bg-surface-quiet sm:w-36">
          <StoreImage src={item.imageUrl} alt="" sizes="9rem" maxWidth={400} fallback={<Placeholder />} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1">
          {category && <p className="text-sm font-medium text-ink-soft">{category.name}</p>}
          <Heading className="text-xl leading-tight text-heading">
            <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
              {item.name}
            </Link>
          </Heading>
          <Price item={item} />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Availability item={item} />
          </div>
          <div className="relative z-10 mt-auto pt-1">
            <AddToCart item={item} variant="compact" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-[2.25rem_0.5rem_2.25rem_0.5rem] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-[color:var(--focus)]">
      <div className={`leaf relative bg-surface-quiet ${feature ? 'aspect-[4/5]' : 'aspect-[4/5]'}`}>
        <StoreImage src={item.imageUrl} alt="" sizes={sizes} maxWidth={feature ? 1280 : 960} fallback={<Placeholder />} />
        {item.kind === 'service' && (
          <span className="absolute left-3 top-3 rounded-full bg-surface-deep px-2.5 py-1 text-xs font-semibold text-ink-on-deep backdrop-blur-sm">
            {t('product.service')}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 pt-3">
        {category && <p className="text-sm font-medium text-ink-soft">{category.name}</p>}
        <Heading className={`${feature ? 'text-2xl lg:text-3xl' : 'text-lg'} text-heading`}>
          <Link href={`/products/${item.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:underline">
            {item.name}
          </Link>
        </Heading>
        {feature && item.description && <p className="line-clamp-3 text-ink-soft">{item.description}</p>}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <Price item={item} />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Availability item={item} />
          </div>
        </div>
        <div className="relative z-10 pt-1">
          <AddToCart item={item} variant="compact" />
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton({ feature = false }: { feature?: boolean }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      <div className={`leaf skeleton ${feature ? 'aspect-[4/5] lg:aspect-[5/6]' : 'aspect-[4/5]'}`} />
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-7 w-24 rounded-full" />
    </div>
  );
}
