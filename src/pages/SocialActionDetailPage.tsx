import { ArrowLeft, ArrowRight, CalendarDays, Check, Copy, HandHeart, MapPin, Share2 } from 'lucide-react';
import { useState } from 'react';
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
import { SocialAction } from '../types';

export function SocialActionDetailPage() {
  const { id } = useParams();
  const { actions, loading } = useData();
  const [copied, setCopied] = useState(false);
  const nativeShare = (navigator as unknown as { share?: (data: ShareData) => Promise<void> }).share;

  if (loading) {
    return (
      <>
        <PageHero
          eyebrow="Ações nos bairros"
          title="Carregando ação"
          subtitle="Estamos preparando os detalhes deste registro."
          image={imageBank.heroComunidade}
        />
        <Section className="bg-civic-cream">
          <div className="grid animate-pulse gap-6 lg:grid-cols-[1.15fr_0.85fr]" role="status" aria-label="Carregando detalhes da ação">
            <div className="premium-card space-y-5 p-8">
              <div className="h-5 w-28 rounded-full bg-slate-200" />
              <div className="h-10 w-4/5 rounded-xl bg-slate-200" />
              <div className="h-32 rounded-2xl bg-slate-100" />
            </div>
            <div className="premium-card h-72 bg-slate-200" />
            <span className="sr-only">Carregando os detalhes da ação.</span>
          </div>
        </Section>
      </>
    );
  }

  const action = actions.find((item) => item.id === id && item.status === 'publicado');
  if (!action) return <Navigate to="/acoes" replace />;

  async function shareAction(target: SocialAction) {
    const url = window.location.href;

    try {
      if (nativeShare) {
        await nativeShare.call(navigator, { title: target.title, text: target.description, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        setCopied(false);
      }
    }
  }

  return (
    <>
      <PageHero
        eyebrow={action.category}
        title={action.title}
        subtitle={`Um registro de presença, escuta e participação em ${action.location}.`}
        image={action.image_urls[0] || imageBank.heroComunidade}
        aside={
          <div className="glass-card w-80 rounded-[1.75rem] p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-civic-yellow text-civic-ink">
                <CalendarDays size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-blue-50/55">Quando</p>
                <p className="mt-1 text-sm font-bold leading-6 text-white">{brDate(action.action_date)}</p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-4 border-t border-white/10 pt-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-civic-yellow">
                <MapPin size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-blue-50/55">Onde</p>
                <p className="mt-1 text-sm font-bold leading-6 text-white">{action.location}</p>
              </div>
            </div>
          </div>
        }
      />

      <Section
        className="bg-civic-cream"
        eyebrow="O que aconteceu"
        title="Ação construída com a comunidade"
        subtitle="Cada registro mostra de perto como esporte, cidadania e atenção aos bairros podem abrir caminhos para novas oportunidades."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="premium-card p-7 sm:p-10 lg:p-12">
            <Badge>{action.category}</Badge>
            <p className="mt-7 text-xl font-semibold leading-9 text-civic-ink sm:text-2xl sm:leading-10">{action.description}</p>

            <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CalendarDays size={19} className="mt-0.5 shrink-0 text-civic-blue" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400">Data</p>
                  <p className="mt-1 text-sm font-bold text-civic-ink">{brDate(action.action_date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <MapPin size={19} className="mt-0.5 shrink-0 text-civic-blue" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400">Local</p>
                  <p className="mt-1 text-sm font-bold text-civic-ink">{action.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => shareAction(action)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-civic-yellow px-6 py-3 text-sm font-extrabold text-civic-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ffd95a] hover:shadow-yellow"
              >
                {copied ? <Check size={18} aria-hidden="true" /> : nativeShare ? <Share2 size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                {copied ? 'Link copiado' : 'Compartilhar ação'}
              </button>
              <ButtonLink to="/acoes" variant="dark"><ArrowLeft size={18} /> Ver outras ações</ButtonLink>
            </div>
          </div>

          <div className="premium-card relative isolate overflow-hidden border-0 bg-[radial-gradient(circle_at_80%_12%,rgba(21,164,214,0.3),transparent_30%),linear-gradient(145deg,#071426,#0c2d4e)] p-7 text-white shadow-dark sm:p-10">
            <div className="absolute -right-12 -top-10 -z-10 h-52 w-52 rounded-full border border-white/10" aria-hidden="true" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-civic-yellow text-civic-ink shadow-yellow">
              <HandHeart size={27} aria-hidden="true" />
            </span>
            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-civic-yellow">Atendimento ao cidadão</p>
            <h2 className="mt-4 font-display text-3xl uppercase leading-[1.02] sm:text-4xl">Tem uma demanda parecida?</h2>
            <p className="mt-5 text-base leading-7 text-blue-50/72">Conte o que está acontecendo no seu bairro. A equipe recebe a solicitação e entra em contato para orientar os próximos passos.</p>
            <ButtonLink to="/agendamento" variant="secondary" className="mt-8 w-full sm:w-auto">
              Solicitar atendimento <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        className="bg-civic-ink"
        tone="dark"
        eyebrow="Galeria"
        title="Momentos desta ação"
        subtitle="Imagens que registram a participação das pessoas e a presença do trabalho nos bairros."
      >
        <div className="grid auto-rows-[240px] gap-4 sm:auto-rows-[300px] lg:grid-cols-2 lg:auto-rows-[360px]">
          {(action.image_urls.length ? action.image_urls : [undefined]).map((url, index) => (
            <Reveal key={url ?? 'fallback'} delay={Math.min(index * 90, 270)} className={index === 0 && action.image_urls.length > 1 ? 'lg:row-span-2' : ''}>
              <figure className="premium-card group h-full border-white/10 bg-civic-navy">
                <SafeImage
                  src={url}
                  alt={url ? `${action.title} — registro ${index + 1}` : `Registro da ação ${action.title}`}
                  className="image-zoom h-full w-full"
                  fallbackLabel={action.category}
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-civic-ink/75 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  Registro {String(index + 1).padStart(2, '0')}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="premium-card overflow-hidden bg-[linear-gradient(120deg,#ffffff,#eef8fc)] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-civic-blue">Continue acompanhando</p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-civic-ink sm:text-4xl">Veja o trabalho acontecendo pela cidade</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Conheça outros projetos, eventos e encontros publicados pela equipe.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/acoes">Todas as ações <ArrowRight size={18} /></ButtonLink>
              <ButtonLink to="/contato" variant="dark">Falar com a equipe</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
