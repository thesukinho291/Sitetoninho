export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-civic-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-civic-blue">{children}</span>;
}
