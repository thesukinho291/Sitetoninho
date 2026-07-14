import { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  aside,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero relative isolate overflow-hidden bg-civic-ink text-white">
      {image && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_82%_18%,rgba(21,164,214,0.24),transparent_28%),linear-gradient(110deg,rgba(5,17,34,0.98)_20%,rgba(8,31,57,0.9)_62%,rgba(5,17,34,0.76))]" />
      <div className="hero-grid absolute inset-0 z-[2] opacity-35" aria-hidden="true" />
      <div className="absolute -right-8 bottom-[-0.22em] z-[2] hidden select-none font-display text-[clamp(7rem,17vw,17rem)] leading-none text-white/[0.025] lg:block" aria-hidden="true">
        SOROCABA
      </div>
      <div className="relative z-10 mx-auto grid min-h-[430px] max-w-[1440px] items-end gap-10 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:pb-20">
        <Reveal className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-civic-yellow">
            <span className="h-px w-10 bg-civic-yellow" />
            {eyebrow}
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.9rem,8vw,6.7rem)] uppercase leading-[0.88] tracking-[-0.055em] text-white">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">{subtitle}</p>
        </Reveal>
        {aside && <Reveal delay={140} className="hidden lg:block">{aside}</Reveal>}
      </div>
    </section>
  );
}
