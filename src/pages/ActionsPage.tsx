import { ArrowRight, CalendarDays, Check, Copy, HandHeart, MapPin, Share2 } from 'lucide-react';
import { useState } from 'react';
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
import { SocialAction } from '../types';

export function ActionsPage() {
  const { actions, loading } = useData();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const items = actions.filter((item) => item.status === 'publicado');
  const nativeShare = (navigator as unknown as { share?: (data: ShareData) => Promise<void> }).share;

  async function shareAction(action: SocialAction) {
    const url = `${window.location.origin}/acoes/${action.id}`;

    try {
      if (nativeShare) {
        await nativeShare.call(navigator, { title: action.title, text: action.description, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopiedId(action.id);
      window.setTimeout(() => setCopiedId((current) => (current === action.id ? null : current)), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(action.id);
        window.setTimeout(() => setCopiedId((current) => (current === action.id ? null : current)), 2200);
      } catch {
        setCopiedId(null);
      }
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Ações nos bairros"
        title="Presença que se transforma em ação"
        subtitle="Esporte, cuidado e cidadania em iniciativas que aproximam o mandato da rotina das comunidades de Sorocaba."
        image={imageBank.heroComunidade}
        aside={
          <div className="glass-card w-72 rounded-[1.75rem] p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink shadow-yellow">
              <HandHeart size={24} aria-hidden="true" />
            </span>
            <p className="mt-8 font-display text-5xl leading-none text-white">{loading ? '—' : items.length}</p>
            <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-50/65">
              {items.length === 1 ? 'ação publicada' : 'ações publicadas'}
            </p>
          </div>
        }
      />

      <Section
        className="bg-civic-cream"
        eyebrow="Trabalho em movimento"
        title="Histórias que chegam aos bairros"
        subtitle="Acompanhe os encontros, projetos e mobilizações que unem escuta, participação e compromisso com a cidade."
      >
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Carregando ações">
            {[0, 1, 2].map((item) => (
              <div key={item} className="premium-card animate-pulse" aria-hidden="true">
                <div className="h-64 bg-slate-200" />
                <div className="space-y-4 p-7">
                  <div className="h-5 w-28 rounded-full bg-slate-200" />
                  <div className="h-8 w-4/5 rounded-xl bg-slate-200" />
                  <div className="h-20 rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
            <span className="sr-only">Carregando ações publicadas.</span>
          </div>
        ) : items.length === 0 ? (
          <div className="premium-card overflow-hidden bg-[radial-gradient(circle_at_82%_18%,rgba(21,164,214,0.16),transparent_30%),linear-gradient(135deg,#ffffff,#eef7fc)] p-7 sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <span className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-civic-blue text-white shadow-blue">
                <HandHeart size={34} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-civic-blue">Novidades em breve</p>
                <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-civic-ink sm:text-4xl">Novos registros estão sendo preparados</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Enquanto as próximas ações são publicadas, você pode enviar uma demanda do seu bairro ou falar diretamente com a equipe.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink to="/agendamento">Solicitar atendimento <ArrowRight size={17} /></ButtonLink>
                <ButtonLink to="/contato" variant="dark">Ver canais oficiais</ButtonLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((action, index) => {
              const copied = copiedId === action.id;

              return (
                <Reveal key={action.id} delay={Math.min(index * 70, 280)} className="h-full">
                  <article className="premium-card group flex h-full flex-col">
                    <Link to={`/acoes/${action.id}`} className="relative block overflow-hidden" aria-label={`Conhecer a ação ${action.title}`}>
                      <SafeImage src={action.image_urls[0]} alt={action.title} className="image-zoom h-64 w-full sm:h-72" fallbackLabel={action.category} />
                      <span className="absolute right-5 top-5 rounded-full border border-white/30 bg-civic-ink/70 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        Ver história
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Badge>{action.category}</Badge>
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
                          <CalendarDays size={15} className="text-civic-blue" aria-hidden="true" />
                          {shortDate(action.action_date)}
                        </span>
                      </div>

                      <h2 className="mt-5 font-display text-2xl uppercase leading-[1.04] tracking-[-0.025em] text-civic-ink">
                        <Link to={`/acoes/${action.id}`} className="transition-colors hover:text-civic-blue">{action.title}</Link>
                      </h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{action.description}</p>

                      <div className="mt-6 flex items-start gap-2 border-t border-slate-200/80 pt-5 text-sm font-bold text-slate-600">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-civic-blue" aria-hidden="true" />
                        <span>{action.location}</span>
                      </div>

                      <div className="mt-auto flex gap-3 pt-6">
                        <ButtonLink to={`/acoes/${action.id}`} className="flex-1 px-4">
                          Conhecer ação <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </ButtonLink>
                        <button
                          type="button"
                          onClick={() => shareAction(action)}
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-civic-ink shadow-sm transition hover:-translate-y-0.5 hover:border-civic-blue/30 hover:text-civic-blue hover:shadow-blue"
                          aria-label={copied ? `Link de ${action.title} copiado` : `Compartilhar ${action.title}`}
                          title={copied ? 'Link copiado' : 'Compartilhar'}
                        >
                          {copied ? <Check size={19} aria-hidden="true" /> : nativeShare ? <Share2 size={19} aria-hidden="true" /> : <Copy size={19} aria-hidden="true" />}
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </Section>

      <Section className="bg-white">
        <div className="premium-card overflow-hidden border-0 bg-[radial-gradient(circle_at_85%_15%,rgba(21,164,214,0.28),transparent_30%),linear-gradient(135deg,#071426,#0c3054)] p-7 text-white shadow-dark sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-civic-yellow">Sua voz também move a cidade</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[0.98] sm:text-5xl">Tem uma demanda no seu bairro?</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50/75">Envie sua solicitação com data, assunto e informações de contato para a equipe dar o encaminhamento adequado.</p>
            </div>
            <ButtonLink to="/agendamento" variant="secondary">Solicitar atendimento <ArrowRight size={18} /></ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
