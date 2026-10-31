import * as Dialog from '@radix-ui/react-dialog';
import { Menu, ShoppingBasket, X, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart, useCartTotals, useStore, useStoreName, useAccountLinks } from '@/core';
import { useI18n } from '@/i18n';
import { BASKET_EVENT } from './AddToCart';
import { ThemeToggle } from './ThemeToggle';
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
  const name = useStoreName();
  const logo = theme?.logoUrl ?? organization?.logoUrl ?? null;
  if (!name) return <span aria-hidden="true" className="skeleton-deep block h-7 w-24 max-w-full" />;
  return (
    <span className="flex w-full min-w-0 items-center gap-2">
      {logo ? (
        <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 64 64" className="h-8 w-8 shrink-0">
          <path d="M32 6c13 9 20 20 20 31 0 10-9 19-20 19s-20-9-20-19C12 26 19 15 32 6Z" style={{ fill: 'var(--sb-moss)' }} />
          <path d="M32 13v40M32 28l-8-7M32 37l9-8M32 46l-7-5" strokeWidth="3" strokeLinecap="round" fill="none" style={{ stroke: 'var(--accent)' }} />
        </svg>
      )}
      <span className="font-display tracking-tight sm:text-xl min-w-0 flex-1 break-words [overflow-wrap:anywhere] text-base leading-tight">{name}</span>
    </span>
  );
}

export function Header() {
  const { t, plural } = useI18n();
  const name = useStoreName();
  const { count } = useCartTotals();
  const openCart = useCart((s) => s.open);
  const isActive = useIsActive();
  // Barter and the account live in the store's own menus, not in a bar of their own.
  const { barter, account } = useAccountLinks(t);
  const navLinks = [...NAV, barter];
  const menuLinks = [...navLinks, account];
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [settles, setSettles] = useState(0);

  useEffect(() => {
    const onAdded = () => setSettles((n) => n + 1);
    window.addEventListener(BASKET_EVENT, onAdded);
    return () => window.removeEventListener(BASKET_EVENT, onAdded);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header ref={headerRef} className="on-deep relative z-30 bg-surface-deep text-ink-on-deep">
      <DemoNotice />
      <div className="page flex min-h-14 items-center gap-1.5 sm:min-h-16 sm:gap-2 py-1">
        <Link href="/" title={name || undefined} aria-label={name || undefined} className="flex min-h-tap items-center -ml-1 min-w-0 flex-1 rounded-full px-1 lg:flex-initial lg:max-w-[16rem]">
          <StoreMark />
        </Link>

        <nav aria-label={t('nav.primary')} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="flex min-h-tap flex-col justify-center rounded-full px-3 py-1 text-center text-base font-semibold leading-tight transition-colors hover:bg-surface-deep-raised aria-[current=page]:bg-surface-deep-raised aria-[current=page]:text-[color:var(--accent)]"
                >
                  <Label k={key} gloss />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={account.href} aria-label={account.label} title={account.label} aria-current={isActive(account.href) ? 'page' : undefined} className="icon-btn shrink-0 text-ink-on-deep hover:bg-surface-deep-raised hidden lg:inline-grid">
          <UserRound aria-hidden="true" className="h-5 w-5" />
        </Link>

        <ThemeToggle />

        <button
          type="button"
          onClick={openCart}
          className="btn btn-on-deep min-w-tap shrink-0 gap-1.5 !px-2 sm:!px-3"
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
          <Dialog.Trigger className="icon-btn shrink-0 text-ink-on-deep hover:bg-surface-deep-raised lg:hidden" aria-label={t('nav.menu')}>
            <Menu aria-hidden="true" className="h-6 w-6" />
          </Dialog.Trigger>
          <Dialog.Portal container={headerRef.current}>
            <Dialog.Overlay className="overlay fixed inset-0 z-40 bg-[rgb(16_38_27/0.6)]" />
            <Dialog.Content className="nav-menu on-deep fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto overscroll-contain rounded-b-2xl bg-surface-deep px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] text-ink-on-deep">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-xl text-ink-on-deep">{t('nav.menu')}</Dialog.Title>
                <Dialog.Description className="sr-only">{t('nav.primary')}</Dialog.Description>
                <Dialog.Close className="icon-btn -mr-2 text-ink-on-deep hover:bg-surface-deep-raised" aria-label={t('nav.close')}>
                  <X aria-hidden="true" className="h-6 w-6" />
                </Dialog.Close>
              </div>
              <nav aria-label={t('nav.primary')} className="mt-1">
                <ul className="flex flex-col gap-1">
                  {menuLinks.map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(href) ? 'page' : undefined}
                        className="flex min-h-tap items-center rounded-2xl px-3 font-display text-xl text-ink-on-deep hover:bg-surface-deep-raised aria-[current=page]:bg-surface-deep-raised aria-[current=page]:text-[color:var(--accent)]"
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
