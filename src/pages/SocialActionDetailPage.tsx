import { Share2 } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { brDate } from '../lib/date';

export function SocialActionDetailPage() {
  const { id } = useParams();
  const { actions } = useData();
  const action = actions.find((item) => item.id === id && item.status === 'publicado');
  if (!action) return <Navigate to="/acoes" replace />;

  return (
    <Section className="bg-white">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <Badge>{action.category}</Badge>
          <h1 className="mt-4 text-4xl font-black leading-tight text-civic-ink sm:text-5xl">{action.title}</h1>
          <p className="mt-4 font-bold text-slate-500">{brDate(action.action_date)} • {action.location}</p>
          <p className="mt-6 text-lg leading-8 text-slate-700">{action.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-civic-yellow px-5 py-3 text-sm font-bold text-civic-ink hover:bg-amber-300" onClick={() => navigator.share?.({ title: action.title, url: location.href })}>
              <Share2 size={18} /> Compartilhar
            </button>
            <ButtonLink to="/acoes">Ver outras ações</ButtonLink>
          </div>
        </div>
        <div className="grid gap-3">
          {action.image_urls.map((url, index) => (
            <SafeImage key={url} src={url} alt={`${action.title} - imagem ${index + 1}`} className={`w-full rounded-lg shadow-sm ${index === 0 ? 'h-80' : 'h-48'}`} fallbackLabel={action.category} />
          ))}
        </div>
      </div>
    </Section>
  );
}
