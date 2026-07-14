export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-civic-blue/15 bg-civic-blue/[0.08] px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-civic-blue">{children}</span>;
}
