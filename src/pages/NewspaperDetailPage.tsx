import { Download } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { brDate } from '../lib/date';

export function NewspaperDetailPage() {
  const { id } = useParams();
  const { newspapers } = useData();
  const edition = newspapers.find((item) => item.id === id && item.status === 'publicado');
  if (!edition) return <Navigate to="/jornal" replace />;

  return (
    <Section className="bg-white">
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <SafeImage src={edition.cover_url} alt={`Capa ${edition.title}`} className="h-[560px] w-full rounded-lg shadow-soft" fallbackLabel="Jornal" />
        <div>
          <div className="flex flex-wrap gap-2">{edition.categories.map((category) => <Badge key={category}>{category}</Badge>)}</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-500">{brDate(edition.edition_date)}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-civic-ink sm:text-5xl">{edition.title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">{edition.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-civic-yellow px-5 py-3 text-sm font-bold text-civic-ink hover:bg-amber-300" href={edition.pdf_url} target="_blank" rel="noreferrer">
              <Download size={18} /> Baixar PDF
            </a>
            <ButtonLink to="/jornal">Ver outras edições</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
