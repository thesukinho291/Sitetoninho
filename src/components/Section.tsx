import { clsx } from 'clsx';

export function Section({
  children,
  className,
  eyebrow,
  title,
  subtitle,
}: {
  children?: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className={clsx('reveal py-16 sm:py-20', className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <div className="mb-9 max-w-3xl">
            {eyebrow && <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-civic-blue">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-3xl font-black text-civic-ink sm:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
