import { clsx } from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
};

export function SafeImage({ src, alt, className, imgClassName, fallbackLabel, loading = 'lazy', fetchPriority = 'auto', sizes }: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasExplicitPosition = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? '');

  useLayoutEffect(() => {
    if (!src) {
      setLoaded(false);
      setFailed(true);
      return;
    }

    setFailed(false);
    setLoaded(Boolean(imageRef.current?.complete && imageRef.current.naturalWidth));
  }, [src]);

  return (
    <div className={clsx('safe-image overflow-hidden bg-slate-200', !hasExplicitPosition && 'relative', className)}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_20%_20%,rgba(245,197,66,0.35),transparent_32%),linear-gradient(135deg,#0f6fb7,#172033)] p-4 text-center text-white">
          <div>
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-white/[0.18] text-sm font-black ring-1 ring-white/35">TC</span>
            {fallbackLabel && <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/85">{fallbackLabel}</p>}
          </div>
        </div>
      ) : (
        <img
          ref={imageRef}
          {...(fetchPriority === 'auto' ? {} : ({ fetchpriority: fetchPriority } as Record<string, string>))}
          src={src ?? undefined}
          alt={alt}
          loading={loading}
          sizes={sizes}
          decoding="async"
          className={clsx('absolute inset-0 h-full w-full object-cover transition duration-700', loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]', imgClassName)}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
