import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { catalogHref, paragraphs, usePageMeta, useProductView } from '@/core';
import { useI18n } from '@/i18n';
import { AddToCart } from '@/components/AddToCart';
import { Availability } from '@/components/Availability';
import { Placeholder } from '@/components/Placeholder';
import { Price } from '@/components/Price';
import { ProductCard } from '@/components/ProductCard';
import { QuantityStepper } from '@/components/QuantityStepper';
import { StoreImage } from '@/components/StoreImage';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const { item, catalog, category, related, max, quantity, setQuantity } = useProductView(id);
  usePageMeta(item?.name, item?.description);

  if (catalog.isLoading) {
    return (
      <div aria-hidden="true" className="page grid gap-10 py-12 md:grid-cols-12">
        <div className="leaf skeleton aspect-[4/5] md:col-span-5" />
        <div className="flex flex-col gap-4 md:col-span-6 md:col-start-7">
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-12 w-3/4" />
          <div className="skeleton h-8 w-28 rounded-full" />
          <div className="skeleton h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page flex flex-col items-start gap-4 py-20">
        <h1 className="text-4xl text-heading">{t('product.notFound.title')}</h1>
        <p className="max-w-xl text-lg text-ink-soft">{t('product.notFound.body')}</p>
        <Link href="/products" className="btn btn-moss">
          {t('product.back')}
        </Link>
      </div>
    );
  }

  const text = paragraphs(item.description);

  return (
    <>
      <div className="page py-8 md:py-12">
        <Link href={category ? catalogHref({ category: category.key }) : '/products'} className="inline-flex min-h-tap items-center gap-2 font-semibold text-heading hover:underline">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {category ? category.name : t('product.back')}
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-12">
          <div className="leaf relative aspect-[4/5] bg-surface-quiet md:col-span-5">
            <StoreImage src={item.imageUrl} alt={item.name} priority sizes="(min-width: 768px) 40vw, 100vw" maxWidth={1280} fallback={<Placeholder label={t('product.imageMissing')} />} />
          </div>

          <div className="flex flex-col gap-5 md:col-span-6 md:col-start-7 md:pt-4">
            {item.kind === 'service' && <p className="inline-flex w-fit rounded-full bg-surface-quiet px-3 py-1 text-sm font-semibold text-heading">{t('product.service')}</p>}
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] text-heading">{item.name}</h1>
            <Price item={item} size="lg" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Availability item={item} />
              {item.difficulty && <span className="text-sm text-ink-soft">{t('product.level', { level: item.difficulty })}</span>}
            </div>
            {text.length > 0 && (
              <div className="flex max-w-[60ch] flex-col gap-3 text-lg text-ink-soft">
                {text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {item.availability.state !== 'sold_out' && <QuantityStepper value={quantity} max={max} onChange={setQuantity} label={item.name} />}
              <AddToCart item={item} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="bg-surface-quiet py-14">
          <div className="page">
            <h2 id="related" className="mb-8 text-3xl text-heading">
              {t('product.related')}
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard item={r} category={catalog.categories.find((c) => c.id === r.categoryId)} sizes="(min-width: 768px) 22vw, 50vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
