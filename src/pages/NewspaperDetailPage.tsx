import { ArrowLeft, Download, FileClock, Newspaper } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { brDate } from '../lib/date';
import { imageBank } from '../lib/mockData';

export function NewspaperDetailPage() {
  const { id } = useParams();
  const { loading, newspapers } = useData();
  const edition = newspapers.find((item) => item.id === id && item.status === 'publicado');

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Jornal Atleta Cidadão"
          title="Abrindo a edição"
          subtitle="Estamos organizando o conteúdo para você."
          image={imageBank.jornal}
        />
        <Section className="bg-civic-cream">
          <DetailLoading />
        </Section>
      </>
    );
  }

  if (!edition) return <Navigate to="/jornal" replace />;

  const pdfAvailable = hasPdf(edition.pdf_url);

  return (
    <>
      <PageHero
        eyebrow={`Edição publicada em ${brDate(edition.edition_date)}`}
        title={edition.title}
        subtitle="Conteúdo do Jornal Atleta Cidadão sobre esporte, cidadania e trabalho próximo da comunidade."
        image={edition.cover_url}
        aside={(
          <div className="glass-card w-72 rounded-[1.75rem] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink shadow-yellow">
              <Newspaper size={24} />
            </span>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-white/45">Temas desta edição</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {edition.categories.slice(0, 3).map((category) => (
                <span key={category} className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white/80">{category}</span>
              ))}
            </div>
          </div>
        )}
      />

      <Section className="bg-civic-cream">
        <div className="grid gap-8 lg:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-12">
          <Reveal>
            <div className="premium-card p-3 sm:p-4">
              <SafeImage
                src={edition.cover_url}
                alt={`Capa da edição ${edition.title}`}
                className="aspect-[4/5] w-full rounded-[1.35rem] bg-civic-navy shadow-dark"
                fallbackLabel="Jornal Atleta Cidadão"
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <article className="premium-card p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2">
                {edition.categories.map((category) => <Badge key={category}>{category}</Badge>)}
              </div>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-civic-blue">Publicado em {brDate(edition.edition_date)}</p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,4.6rem)] uppercase leading-[0.94] tracking-[-0.045em] text-civic-ink">Sobre esta edição</h2>
              <p className="mt-7 whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">{edition.description}</p>

              <div className="mt-9 border-t border-slate-200 pt-7">
                {pdfAvailable ? (
                  <div className="rounded-[1.5rem] bg-civic-ink p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-civic-yellow">Arquivo completo</p>
                      <p className="mt-2 text-sm leading-6 text-white/65">Abra o PDF em uma nova aba para ler ou salvar esta edição.</p>
                    </div>
                    <a
                      className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-civic-yellow px-6 py-3 text-sm font-extrabold text-civic-ink shadow-yellow transition hover:-translate-y-0.5 hover:bg-[#ffd95a] sm:mt-0"
                      href={edition.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download size={18} /> Abrir PDF
                    </a>
                  </div>
                ) : (
                  <div className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 sm:p-6" role="status">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-200 text-slate-500">
                      <FileClock size={22} />
                    </span>
                    <div>
                      <p className="font-extrabold text-civic-ink">PDF em preparação</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Os detalhes desta edição já estão disponíveis aqui. O arquivo completo será publicado pela equipe assim que estiver pronto.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <ButtonLink to="/jornal" variant="dark"><ArrowLeft size={17} /> Ver todas as edições</ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function DetailLoading() {
  return (
    <div className="grid animate-pulse gap-8 lg:grid-cols-[0.78fr_1.22fr]" role="status" aria-label="Carregando edição">
      <div className="premium-card aspect-[4/5] bg-slate-200" />
      <div className="premium-card space-y-6 p-8 sm:p-12">
        <div className="h-3 w-32 rounded-full bg-slate-200" />
        <div className="h-10 w-4/5 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
      </div>
      <span className="sr-only">Carregando detalhes da edição.</span>
    </div>
  );
}

function hasPdf(pdfUrl: string) {
  return Boolean(pdfUrl?.trim() && pdfUrl.trim() !== '#');
}
