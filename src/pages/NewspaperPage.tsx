import { ArrowUpRight, Download, FileClock, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { shortDate } from '../lib/date';
import { imageBank } from '../lib/mockData';
import { NewspaperEdition } from '../types';

export function NewspaperPage() {
  const { loading, newspapers } = useData();
  const items = newspapers.filter((item) => item.status === 'publicado');
  const [featured, ...otherEditions] = items;

  return (
    <>
      <PageHero
        eyebrow="Jornal Atleta Cidadão"
        title="Notícia que corre pela cidade"
        subtitle="Edições sobre esporte, cidadania e o trabalho realizado perto das pessoas e dos bairros de Sorocaba."
        image={imageBank.jornal}
        aside={(
          <div className="glass-card w-72 rounded-[1.75rem] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink shadow-yellow">
              <Newspaper size={24} />
            </span>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-white/45">Arquivo cidadão</p>
            <p className="mt-2 font-display text-3xl uppercase leading-none text-white">
              {loading ? 'Atualizando' : `${items.length} ${items.length === 1 ? 'edição' : 'edições'}`}
            </p>
          </div>
        )}
      />

      <Section
        className="bg-civic-cream"
        eyebrow="Publicações"
        title="Edições publicadas"
        subtitle="Informação organizada para você acompanhar projetos, ações sociais, esporte, juventude e presença nos bairros."
      >
        {loading ? (
          <NewspaperLoading />
        ) : !featured ? (
          <div className="premium-card mx-auto max-w-4xl p-7 sm:p-10 lg:p-12">
            <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-civic-blue text-white shadow-blue">
                <Newspaper size={30} />
              </span>
              <div>
                <h2 className="font-display text-2xl uppercase leading-tight text-civic-ink sm:text-3xl">Novas edições a caminho</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  A equipe está preparando os próximos conteúdos do Jornal Atleta Cidadão. Enquanto isso, você pode conhecer as ações nos bairros ou enviar uma solicitação ao gabinete.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink to="/acoes">Conhecer as ações <ArrowUpRight size={17} /></ButtonLink>
                  <ButtonLink to="/agendamento" variant="dark">Falar com o gabinete</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:gap-10">
            <Reveal>
              <EditionFeature edition={featured} />
            </Reveal>

            {otherEditions.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherEditions.map((edition, index) => (
                  <Reveal key={edition.id} delay={Math.min(index * 70, 280)} className="h-full">
                    <EditionCard edition={edition} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}

function EditionFeature({ edition }: { edition: NewspaperEdition }) {
  const pdfAvailable = hasPdf(edition.pdf_url);

  return (
    <article className="premium-card group grid min-h-[520px] lg:grid-cols-[0.9fr_1.1fr]">
      <Link to={`/jornal/${edition.id}`} className="relative min-h-[360px] overflow-hidden bg-civic-navy lg:min-h-full">
        <SafeImage
          src={edition.cover_url}
          alt={`Capa da edição ${edition.title}`}
          className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.025]"
          fallbackLabel="Jornal Atleta Cidadão"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
        <span className="absolute left-5 top-5 rounded-full bg-civic-yellow px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-civic-ink shadow-yellow">
          Edição mais recente
        </span>
      </Link>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <div className="flex flex-wrap gap-2">
          {edition.categories.slice(0, 3).map((category) => <Badge key={category}>{category}</Badge>)}
        </div>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-civic-blue">Publicado em {shortDate(edition.edition_date)}</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4.5rem)] uppercase leading-[0.93] tracking-[-0.04em] text-civic-ink">
          <Link className="transition hover:text-civic-blue" to={`/jornal/${edition.id}`}>{edition.title}</Link>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{edition.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink to={`/jornal/${edition.id}`}>Ver detalhes <ArrowUpRight size={17} /></ButtonLink>
          {pdfAvailable ? (
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-extrabold text-civic-ink transition hover:-translate-y-0.5 hover:border-civic-blue hover:text-civic-blue"
              href={edition.pdf_url}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={17} /> Abrir PDF
            </a>
          ) : (
            <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-500" aria-disabled="true">
              <FileClock size={17} /> PDF em preparação
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function EditionCard({ edition }: { edition: NewspaperEdition }) {
  const pdfAvailable = hasPdf(edition.pdf_url);

  return (
    <article className="premium-card group flex h-full flex-col">
      <Link to={`/jornal/${edition.id}`} className="relative block aspect-[4/3] overflow-hidden bg-civic-navy">
        <SafeImage
          src={edition.cover_url}
          alt={`Capa da edição ${edition.title}`}
          className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.035]"
          fallbackLabel="Jornal"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-civic-ink/85 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
          {shortDate(edition.edition_date)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {edition.categories.slice(0, 2).map((category) => <Badge key={category}>{category}</Badge>)}
        </div>
        <h2 className="mt-5 font-display text-2xl uppercase leading-[1.02] tracking-[-0.03em] text-civic-ink">
          <Link className="transition hover:text-civic-blue" to={`/jornal/${edition.id}`}>{edition.title}</Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{edition.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-7">
          <Link className="inline-flex items-center gap-2 text-sm font-extrabold text-civic-blue transition hover:gap-3" to={`/jornal/${edition.id}`}>
            Ver detalhes <ArrowUpRight size={16} />
          </Link>
          {pdfAvailable ? (
            <a
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-civic-ink text-white transition hover:-translate-y-0.5 hover:bg-civic-blue"
              href={edition.pdf_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir PDF de ${edition.title}`}
            >
              <Download size={17} />
            </a>
          ) : (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400" aria-label="PDF em preparação" aria-disabled="true">
              <FileClock size={17} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function NewspaperLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Carregando edições">
      {[0, 1, 2].map((item) => (
        <div key={item} className="premium-card animate-pulse p-4">
          <div className="aspect-[4/3] rounded-[1.35rem] bg-slate-200" />
          <div className="space-y-4 p-3 pt-7">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-7 w-4/5 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-2/3 rounded bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando edições do Jornal Atleta Cidadão.</span>
    </div>
  );
}

function hasPdf(pdfUrl: string) {
  return Boolean(pdfUrl?.trim() && pdfUrl.trim() !== '#');
}
