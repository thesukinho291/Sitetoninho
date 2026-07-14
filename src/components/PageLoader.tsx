export function PageLoader({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`grid min-h-[55vh] place-items-center px-5 ${dark ? 'bg-civic-ink text-white' : 'bg-civic-cream text-civic-ink'}`} role="status" aria-label="Carregando página">
      <div className="text-center">
        <div className="mx-auto flex w-fit items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((item) => <span key={item} className="h-3 w-3 animate-pulse rounded-full bg-civic-yellow" style={{ animationDelay: `${item * 140}ms` }} />)}
        </div>
        <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.2em] opacity-55">Carregando</p>
      </div>
    </div>
  );
}
