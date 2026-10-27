import { MessageCircle } from 'lucide-react';
import { contactContent, orderPhone, useCmsPage, usePageMeta, useStore, whatsappHref } from '@/core';
import { useI18n } from '@/i18n';
import { ContactDetails } from '@/components/ContactDetails';
import { Label } from '@/components/Label';
import { SectionError } from '@/components/StoreStates';

export default function Contact() {
  const { t } = useI18n();
  const { contact, isDemo } = useStore();
  const cms = useCmsPage('contact');
  const content = contactContent(cms.page);
  usePageMeta(cms.page?.title ?? t('contact.title'), cms.page?.metaDescription);
  const phone = orderPhone(contact);

  return (
    <div className="page py-12 md:py-16">
      {cms.isLoading ? (
        <div aria-hidden="true" className="flex flex-col gap-3">
          <div className="skeleton h-12 w-64" />
          <div className="skeleton h-5 w-80 max-w-full" />
        </div>
      ) : cms.isError ? (
        <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
      ) : (
        <header className="max-w-2xl">
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] text-heading">{content.hero.title ?? <Label k="contact.title" />}</h1>
          {content.hero.subtitle && <p className="mt-4 text-lg text-ink-soft">{content.hero.subtitle}</p>}
        </header>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <section className="md:col-span-7" aria-label={t('contact.title')}>
          <ContactDetails />
          {phone && !isDemo && (
            <a href={whatsappHref(phone)} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-8">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {t('contact.whatsapp.cta')}
            </a>
          )}
        </section>
        {(content.visit.title || content.visit.note) && (
          <aside className="leaf h-fit bg-surface-quiet p-8 md:col-span-5">
            {content.visit.title && <h2 className="text-3xl text-heading">{content.visit.title}</h2>}
            {content.visit.note && <p className="mt-3 text-ink-soft">{content.visit.note}</p>}
          </aside>
        )}
      </div>
    </div>
  );
}
