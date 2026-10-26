import { Link } from 'wouter';
import { usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { Label } from '@/components/Label';

export default function NotFound() {
  const { t } = useI18n();
  usePageMeta(t('notFound.title'));
  return (
    <div className="page flex flex-col items-start gap-5 py-24">
      <svg aria-hidden="true" viewBox="0 0 120 120" className="h-24 w-24 -rotate-12 text-heading">
        <path d="M14 106C30 58 66 22 106 14C98 62 66 98 14 106Z" fill="var(--surface-quiet)" stroke="currentColor" strokeWidth="2.5" />
        <path d="M22 98C46 74 72 48 98 22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </svg>
      <h1 className="text-5xl text-heading">{t('notFound.title')}</h1>
      <p className="max-w-xl text-lg text-ink-soft">{t('notFound.body')}</p>
      <Link href="/" className="btn btn-moss">
        <Label k="nav.home" /> · {t('notFound.cta')}
      </Link>
    </div>
  );
}
