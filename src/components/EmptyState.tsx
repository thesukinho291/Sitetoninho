export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-civic-blue/25 bg-[linear-gradient(135deg,#ffffff,#f3f8fc)] p-8 text-center shadow-sm">
      <span className="mx-auto block h-1.5 w-16 rounded-full bg-civic-yellow" />
      <h3 className="mt-5 text-xl font-black text-civic-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
