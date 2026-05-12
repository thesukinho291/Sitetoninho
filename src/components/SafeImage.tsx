import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
};

export function SafeImage({ src, alt, className, imgClassName, fallbackLabel }: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setLoaded(false);
    setFailed(!src);
  }, [src]);

  return (
    <div className={clsx('safe-image relative overflow-hidden bg-slate-200', className)}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_20%_20%,rgba(245,197,66,0.35),transparent_32%),linear-gradient(135deg,#0f6fb7,#172033)] p-4 text-center text-white">
          <div>
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-white/18 text-sm font-black ring-1 ring-white/35">TC</span>
            {fallbackLabel && <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/85">{fallbackLabel}</p>}
          </div>
        </div>
      ) : (
        <img
          src={src ?? undefined}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={clsx('absolute inset-0 h-full w-full object-cover transition duration-700', loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]', imgClassName)}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
