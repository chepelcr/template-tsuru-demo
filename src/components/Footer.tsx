import { Link } from 'wouter';
import { useIsDemo, useStore } from '@/core';
import { useI18n } from '@/i18n';
import { ContactDetails } from './ContactDetails';
import { NAV } from './Header';
import { Label } from './Label';
import { LeafEdge } from './LeafEdge';

export function Footer() {
  const { organization } = useStore();
  const isDemo = useIsDemo();
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="on-deep mt-20 text-ink-on-deep">
      <LeafEdge flip className="-mb-px text-[color:var(--surface-deep)]" />
      <div className="bg-surface-deep">
        <div className="page grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-3xl">{organization?.name}</p>
            {!isDemo && organization?.description && <p className="mt-3 max-w-sm text-ink-on-deep-soft">{organization.description}</p>}
            {isDemo && <p className="mt-3 max-w-sm text-sm text-ink-on-deep-soft">{t('demo.notice')}</p>}
          </div>
          <nav aria-label={t('footer.navigation')} className="md:col-span-3">
            <ul className="flex flex-col gap-1">
              {NAV.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="inline-flex min-h-tap flex-col justify-center py-1 font-semibold hover:text-[color:var(--accent)]">
                    <Label k={key} gloss />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-5">
            <ContactDetails tone="deep" compact />
          </div>
        </div>
        <div className="border-t border-rule-deep">
          <p className="page flex flex-wrap justify-between gap-2 py-5 text-sm text-ink-on-deep-soft">
            <span>© {year} {organization?.name}</span>
            <span>{t('footer.madeWith')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
