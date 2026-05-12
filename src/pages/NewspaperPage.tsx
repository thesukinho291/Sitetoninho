import { Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { shortDate } from '../lib/date';

export function NewspaperPage() {
  const { newspapers } = useData();
  const items = newspapers.filter((item) => item.status === 'publicado');
  return (
    <Section className="bg-white" eyebrow="Jornal Atleta Cidadão" title="Edições publicadas" subtitle="Notícias, registros e matérias sobre esporte, cidadania, ações sociais, bairros e juventude.">
      {items.length === 0 ? (
        <EmptyState title="Nenhuma edição publicada" text="As próximas edições aparecerão aqui assim que forem cadastradas pela equipe." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((edition) => (
            <article key={edition.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-soft">
              <Link to={`/jornal/${edition.id}`}>
                <SafeImage src={edition.cover_url} alt={`Capa ${edition.title}`} className="h-64 w-full" fallbackLabel="Jornal" />
              </Link>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {edition.categories.slice(0, 3).map((category) => <Badge key={category}>{category}</Badge>)}
                </div>
                <p className="mt-4 text-sm font-bold text-slate-500">{shortDate(edition.edition_date)}</p>
                <h2 className="mt-2 text-xl font-black text-civic-ink">{edition.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{edition.description}</p>
                <div className="mt-5 flex gap-2">
                  <ButtonLink to={`/jornal/${edition.id}`} className="flex-1"><Eye size={16} /> Ler edição</ButtonLink>
                  <a className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-civic-ink hover:bg-slate-200" href={edition.pdf_url} target="_blank" rel="noreferrer" aria-label="Baixar PDF">
                    <Download size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
