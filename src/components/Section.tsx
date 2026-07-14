import { clsx } from 'clsx';
import { Reveal } from './Reveal';

export function Section({
  children,
  className,
  eyebrow,
  title,
  subtitle,
  tone = 'light',
}: {
  children?: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <section className={clsx('site-section py-16 sm:py-20 lg:py-28', className)}>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {(eyebrow || title || subtitle) && (
          <Reveal className="mb-10 max-w-4xl lg:mb-14">
            {eyebrow && (
              <p className={clsx('flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em]', tone === 'dark' ? 'text-civic-yellow' : 'text-civic-blue')}>
                <span className={clsx('h-px w-8', tone === 'dark' ? 'bg-civic-yellow' : 'bg-civic-blue')} />
                {eyebrow}
              </p>
            )}
            {title && <h2 className={clsx('mt-4 font-display text-[clamp(2.35rem,5.6vw,5.4rem)] uppercase leading-[0.92] tracking-[-0.045em]', tone === 'dark' ? 'text-white' : 'text-civic-ink')}>{title}</h2>}
            {subtitle && <p className={clsx('mt-5 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8', tone === 'dark' ? 'text-blue-50/70' : 'text-slate-600')}>{subtitle}</p>}
          </Reveal>
        )}
        <Reveal delay={80}>{children}</Reveal>
      </div>
    </section>
  );
}
