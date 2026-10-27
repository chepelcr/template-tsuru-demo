import * as Dialog from '@radix-ui/react-dialog';
import { Menu, ShoppingBasket, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartTotals, useStore } from '@/core';
import { useI18n } from '@/i18n';
import { BASKET_EVENT } from './AddToCart';
import { DemoNotice } from './DemoNotice';
import { Label } from './Label';

export const NAV = [
  { href: '/', key: 'nav.home' },
  { href: '/products', key: 'nav.catalog' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export function useIsActive() {
  const [location] = useLocation();
  return (href: string) => (href === '/' ? location === '/' : location === href || location.startsWith(`${href}/`));
}

function StoreMark() {
  const { organization, theme } = useStore();
  const logo = theme?.logoUrl ?? organization?.logoUrl ?? null;
  if (!organization) return <span aria-hidden="true" className="skeleton-deep block h-7 w-32" />;
  return (
    <span className="flex items-center gap-2.5">
      {logo ? (
        <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover" />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 64 64" className="h-9 w-9">
          <path d="M32 6c13 9 20 20 20 31 0 10-9 19-20 19s-20-9-20-19C12 26 19 15 32 6Z" style={{ fill: 'var(--sb-moss)' }} />
          <path d="M32 13v40M32 28l-8-7M32 37l9-8M32 46l-7-5" strokeWidth="3" strokeLinecap="round" fill="none" style={{ stroke: 'var(--accent)' }} />
        </svg>
      )}
      <span className="font-display text-xl tracking-tight sm:text-2xl">{organization.name}</span>
    </span>
  );
}

export function Header() {
  const { t, plural } = useI18n();
  const { count } = useCartTotals();
  const openCart = useCart((s) => s.open);
  const isActive = useIsActive();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settles, setSettles] = useState(0);

  useEffect(() => {
    const onAdded = () => setSettles((n) => n + 1);
    window.addEventListener(BASKET_EVENT, onAdded);
    return () => window.removeEventListener(BASKET_EVENT, onAdded);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className="on-deep relative z-30 bg-surface-deep text-ink-on-deep">
      <DemoNotice />
      <div className="page flex h-16 items-center gap-3 sm:h-20">
        <Link href="/" className="-ml-1 rounded-full px-1 py-1">
          <StoreMark />
        </Link>

        <nav aria-label={t('nav.primary')} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="flex min-h-tap flex-col justify-center rounded-full px-4 py-1 text-center text-base font-semibold leading-tight transition-colors hover:bg-surface-deep-raised aria-[current=page]:bg-surface-deep-raised aria-[current=page]:text-[color:var(--accent)]"
                >
                  <Label k={key} gloss />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="btn btn-on-deep ml-auto gap-2 px-3 sm:px-4 md:ml-2"
        >
          <ShoppingBasket key={settles} aria-hidden="true" className={`h-5 w-5 ${settles ? 'basket-settle' : ''}`} />
          <Label k="nav.cart" className="hidden sm:inline" />
          <span className="sr-only sm:hidden">{t('nav.cart')}</span>
          {count > 0 && (
            <span aria-hidden="true" className="grid h-6 min-w-6 place-items-center rounded-full bg-[color:var(--accent)] px-1.5 text-xs font-bold text-[color:var(--accent-ink)]">
              {count}
            </span>
          )}
          <span className="sr-only">{plural('cart.items', count)}</span>
        </button>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="icon-btn text-ink-on-deep hover:bg-surface-deep-raised md:hidden" aria-label={t('nav.menu')}>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-[rgb(16_38_27/0.6)]" />
            <Dialog.Content className="sheet on-deep fixed inset-x-0 bottom-0 z-50 rounded-t-[1.75rem] bg-surface-deep px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 text-ink-on-deep">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-2xl">{t('nav.menu')}</Dialog.Title>
                <Dialog.Description className="sr-only">{t('nav.primary')}</Dialog.Description>
                <Dialog.Close className="icon-btn -mr-2 hover:bg-surface-deep-raised" aria-label={t('nav.close')}>
                  <X aria-hidden="true" className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav aria-label={t('nav.primary')} className="mt-4">
                <ul className="flex flex-col gap-1">
                  {NAV.map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className="flex min-h-[3.25rem] items-center rounded-2xl px-4 text-2xl font-display hover:bg-surface-deep-raised aria-[current=page]:bg-surface-deep-raised aria-[current=page]:text-[color:var(--accent)]"
                      >
                        <Label k={key} gloss />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
