import { Info } from 'lucide-react';
import { useIsDemo } from '@/core';
import { useI18n } from '@/i18n';

/** Demo stores say so, so no visitor mistakes illustrative prices for real ones. */
export function DemoNotice() {
  const isDemo = useIsDemo();
  const { t } = useI18n();
  if (!isDemo) return null;
  return (
    <div className="bg-surface-quiet text-heading">
      <p className="page flex items-center justify-center gap-2 py-1.5 text-center text-xs font-medium sm:text-sm">
        <Info aria-hidden="true" className="h-4 w-4 shrink-0" />
        {t('demo.notice')}
      </p>
    </div>
  );
}
