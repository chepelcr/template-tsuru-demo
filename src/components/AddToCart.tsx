import { ShoppingBasket } from 'lucide-react';
import { announce, isPurchasable, useCart, type CatalogItem } from '@/core';
import { useI18n } from '@/i18n';

export const BASKET_EVENT = 'tsuru:basket-added';

/** Adds the item and tells the header to settle the basket; sold-out items cannot be added. */
export function AddToCart({ item, quantity = 1, variant = 'full', className = '' }: { item: CatalogItem; quantity?: number; variant?: 'full' | 'compact'; className?: string }) {
  const { t, langOf } = useI18n();
  const add = useCart((s) => s.add);
  const available = isPurchasable(item);

  const onAdd = () => {
    add(item, quantity);
    announce(t('product.added', { name: item.name }));
    window.dispatchEvent(new CustomEvent(BASKET_EVENT));
  };

  if (!available) {
    return (
      <button type="button" disabled className={`btn btn-quiet ${className}`}>
        {t('product.soldOut')}
      </button>
    );
  }

  return (
    <button type="button" onClick={onAdd} className={`btn btn-accent ${variant === 'compact' ? 'px-4 text-sm' : ''} ${className}`}>
      <ShoppingBasket aria-hidden="true" className="h-4 w-4" />
      <span lang={langOf('product.add')}>{t('product.add')}</span>
    </button>
  );
}
