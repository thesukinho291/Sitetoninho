import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { shortDate } from '../lib/date';

export function ActionsPage() {
  const { actions } = useData();
  const items = actions.filter((item) => item.status === 'publicado');
  return (
    <Section className="bg-white" eyebrow="Ações sociais" title="Eventos, corridas e projetos" subtitle="Registros das iniciativas do mandato, do esporte e do trabalho social nos bairros.">
      {items.length === 0 ? (
        <EmptyState title="Nenhuma ação publicada" text="As ações cadastradas e publicadas pela equipe aparecerão aqui." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((action) => (
            <article key={action.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-soft">
              <Link to={`/acoes/${action.id}`}>
                <SafeImage src={action.image_urls[0]} alt={action.title} className="h-64 w-full" fallbackLabel={action.category} />
              </Link>
              <div className="p-6">
                <Badge>{action.category}</Badge>
                <p className="mt-4 text-sm font-bold text-slate-500">{shortDate(action.action_date)} • {action.location}</p>
                <h2 className="mt-2 text-xl font-black text-civic-ink">{action.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{action.description}</p>
                <div className="mt-5 flex gap-2">
                  <Link className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-civic-blue px-4 text-sm font-bold text-white" to={`/acoes/${action.id}`}>Ver ação</Link>
                  <button className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-civic-ink hover:bg-slate-200" onClick={() => navigator.share?.({ title: action.title, url: location.origin + `/acoes/${action.id}` })} aria-label="Compartilhar">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
