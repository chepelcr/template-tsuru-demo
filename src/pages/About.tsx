import { aboutContent, paragraphs, useCmsPage, usePageMeta } from '@/core';
import { useI18n } from '@/i18n';
import { CmsIcon } from '@/components/CmsIcon';
import { Label } from '@/components/Label';
import { LeafEdge } from '@/components/LeafEdge';
import { Placeholder } from '@/components/Placeholder';
import { SectionError } from '@/components/StoreStates';
import { StoreImage } from '@/components/StoreImage';

export default function About() {
  const { t } = useI18n();
  const cms = useCmsPage('about');
  const about = aboutContent(cms.page);
  usePageMeta(cms.page?.title ?? t('nav.about'), cms.page?.metaDescription);
  const story = paragraphs(about.story.content);

  return (
    <>
      <section className="on-deep relative overflow-hidden bg-surface-deep text-ink-on-deep">
        <div className="page grid items-end gap-8 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-6">
            {cms.isLoading ? (
              <div aria-hidden="true" className="flex flex-col gap-3">
                <div className="skeleton-deep h-12 w-64" />
                <div className="skeleton-deep h-5 w-80 max-w-full" />
              </div>
            ) : cms.isError ? (
              <SectionError title={t('state.error.title')} onRetry={cms.refetch} />
            ) : (
              <>
                <h1 className="text-[clamp(2.4rem,6vw,4rem)]">{about.hero.title ?? <Label k="nav.about" />}</h1>
                {about.hero.subtitle && <p className="mt-4 max-w-xl text-lg text-ink-on-deep-soft">{about.hero.subtitle}</p>}
              </>
            )}
          </div>
          {about.hero.image && (
            <div className="leaf aspect-[16/10] bg-surface-deep-raised md:col-span-6">
              <StoreImage src={about.hero.image} alt="" priority sizes="(min-width: 768px) 50vw, 100vw" fallback={<Placeholder tone="deep" />} />
            </div>
          )}
        </div>
      </section>
      <LeafEdge className="-mt-px text-[color:var(--surface-deep)]" />

      {(about.story.title || story.length > 0) && (
        <section className="page grid gap-10 py-12 md:grid-cols-12">
          <div className={about.story.image ? 'md:col-span-7' : 'md:col-span-9'}>
            {about.story.title && <h2 className="text-4xl text-heading">{about.story.title}</h2>}
            <div className="mt-5 flex max-w-[64ch] flex-col gap-4 text-lg text-ink-soft">
              {story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {about.story.image && (
            <div className="leaf aspect-[4/5] bg-surface-quiet md:col-span-4 md:col-start-9">
              <StoreImage src={about.story.image} alt="" sizes="(min-width: 768px) 30vw, 100vw" maxWidth={960} fallback={<Placeholder />} />
            </div>
          )}
        </section>
      )}

      {about.values.items.length > 0 && (
        <section className="bg-surface-quiet py-14">
          <div className="page">
            {about.values.title && <h2 className="mb-8 text-4xl text-heading">{about.values.title}</h2>}
            <ul className="grid gap-10 md:grid-cols-3">
              {about.values.items.map((value) => (
                <li key={value.title} className="flex flex-col gap-3">
                  <span className="leaf-sm grid h-12 w-12 place-items-center bg-surface text-heading">
                    <CmsIcon icon={value.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-2xl text-heading">{value.title}</h3>
                  {value.description && <p className="text-ink-soft">{value.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
