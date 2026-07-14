import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  HandHeart,
  HeartPulse,
  MapPin,
  Newspaper,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { shortDate } from '../lib/date';
import { imageBank } from '../lib/mockData';

const quickCards = [
  {
    number: '01',
    title: 'Solicitar atendimento',
    text: 'Conte sua demanda e escolha uma data para falar com a equipe do gabinete.',
    href: '/agendamento',
    icon: CalendarCheck,
    featured: true,
  },
  {
    number: '02',
    title: 'Ações nos bairros',
    text: 'Acompanhe iniciativas sociais, esporte, eventos e presença nas comunidades.',
    href: '/acoes',
    icon: HandHeart,
  },
  {
    number: '03',
    title: 'Jornal Atleta Cidadão',
    text: 'Acesse notícias, registros e edições sobre o trabalho com a população.',
    href: '/jornal',
    icon: Newspaper,
  },
  {
    number: '04',
    title: 'Conhecer a trajetória',
    text: 'Do esporte ao serviço público: uma história construída perto das pessoas.',
    href: '/sobre',
    icon: Route,
  },
];

const tickerItems = ['Esporte', 'Cidadania', 'Sorocaba', 'Comunidade', 'Presença', 'Movimento'];

export function HomePage() {
  const { newspapers, actions, settings } = useData();
  const publishedNewspapers = newspapers.filter((item) => item.status === 'publicado').slice(0, 2);
  const publishedActions = actions.filter((item) => item.status === 'publicado').slice(0, 3);
  const titleWords = (settings.home_title || 'Toninho Corredor').trim().split(/\s+/);
  const firstTitleWord = titleWords.shift() || 'Toninho';
  const remainingTitle = titleWords.join(' ');

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-civic-ink text-white">
        <SafeImage
          src={settings.home_image_url || imageBank.heroComunidade}
          alt=""
          className="hero-media absolute inset-0 z-0 h-full w-full bg-civic-ink"
          imgClassName="object-cover object-[58%_center] sm:object-center"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(3,12,25,0.98)_0%,rgba(3,14,29,0.9)_42%,rgba(3,14,29,0.48)_72%,rgba(3,14,29,0.32)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(3,12,25,0.72)_0%,rgba(3,12,25,0.9)_48%,#071426_100%)]" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_18%_74%,rgba(8,119,201,0.28),transparent_28%),radial-gradient(circle_at_76%_25%,rgba(255,201,51,0.1),transparent_23%)]" />
        <div className="hero-grid absolute inset-0 z-[3] opacity-25" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 z-[4] h-40 bg-gradient-to-t from-civic-ink to-transparent" aria-hidden="true" />
        <div className="absolute -right-16 top-[20%] z-[5] hidden h-80 w-80 rounded-full border border-white/10 lg:block" aria-hidden="true">
          <div className="absolute inset-12 rounded-full border border-civic-yellow/30" />
          <div className="absolute inset-24 rounded-full border border-white/15" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-12 lg:pb-20 lg:pt-36">
          <Reveal className="relative z-10 max-w-5xl">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                <span className="pulse-dot h-2 w-2 rounded-full bg-civic-yellow text-civic-yellow" />
                Vereador de Sorocaba
              </span>
              <span className="hidden h-px w-10 bg-white/25 sm:block" />
              <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.18em] text-civic-yellow">Mandato em movimento</span>
            </div>

            <h1 className="font-display uppercase leading-[0.8] tracking-[-0.065em]">
              <span className="block text-[clamp(4rem,12vw,10.5rem)] text-white">{firstTitleWord}</span>
              {remainingTitle && <span className="text-stroke block text-[clamp(3.6rem,11vw,9.4rem)]">{remainingTitle}</span>}
            </h1>

            <div className="track-line mt-8 max-w-3xl pl-5 sm:mt-10 sm:pl-7">
              <p className="max-w-2xl text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">{settings.home_subtitle || 'Esporte, cidadania e compromisso com Sorocaba'}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/65 sm:text-base sm:leading-8">Solicite atendimento, acompanhe as ações nos bairros e acesse as edições do Jornal Atleta Cidadão.</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink to="/agendamento" variant="secondary" className="w-full sm:w-auto">
                Solicitar atendimento <ArrowUpRight size={18} />
              </ButtonLink>
              <ButtonLink to="/acoes" variant="ghost" className="w-full sm:w-auto">
                Acompanhar ações <ArrowRight size={18} />
              </ButtonLink>
              <Link className="group inline-flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-extrabold text-white/75 transition hover:text-civic-yellow sm:justify-start" to="/jornal">
                Ler o jornal <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/55">
              {['Canal oficial', 'Atendimento organizado', 'Compromisso com a população'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-civic-yellow" /> {item}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220} className="relative z-10 hidden self-end pb-16 lg:block">
            <div className="hero-orbit glass-card rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-civic-yellow text-civic-ink"><Sparkles size={20} /></span>
                <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-white/40">Gabinete aberto</span>
              </div>
              <p className="mt-6 font-display text-2xl uppercase leading-[1.05] tracking-[-0.03em]">Perto de quem faz Sorocaba acontecer.</p>
              <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/65">
                <span className="flex items-center gap-3"><MapPin size={17} className="text-civic-yellow" /> Presença nos bairros</span>
                <span className="flex items-center gap-3"><Trophy size={17} className="text-civic-yellow" /> Esporte como inclusão</span>
                <span className="flex items-center gap-3"><Users size={17} className="text-civic-yellow" /> Escuta direta da população</span>
              </div>
            </div>
          </Reveal>
        </div>

        <a href="#comece" className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.58rem] font-extrabold uppercase tracking-[0.22em] text-white/45 transition hover:text-white md:flex">
          Explore <ChevronDown size={17} className="animate-bounce" />
        </a>
      </section>

      <div className="overflow-hidden border-y border-civic-ink/10 bg-civic-yellow py-4 text-civic-ink" aria-label="Esporte, cidadania e compromisso com Sorocaba">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center px-5 font-display text-lg uppercase tracking-[-0.02em] sm:px-8 sm:text-2xl">
              {item}<span className="ml-10 h-2 w-2 rounded-full bg-civic-blue sm:ml-16" />
            </span>
          ))}
        </div>
      </div>

      <div id="comece">
        <Section
          className="bg-civic-cream"
          eyebrow="Caminhos rápidos"
          title="Escolha por onde começar"
          subtitle="Falar com a equipe ou acompanhar o trabalho do mandato deve ser simples. Aqui, você chega ao que precisa sem rodeios."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickCards.map(({ number, title, text, href, icon: Icon, featured }, index) => (
              <Reveal key={title} delay={index * 70}>
                <Link
                  to={href}
                  className={`group flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 transition duration-500 hover:-translate-y-2 hover:shadow-soft sm:p-7 ${featured ? 'border-civic-yellow bg-civic-yellow text-civic-ink' : 'border-slate-200/80 bg-white text-civic-ink'}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl p-3 ${featured ? 'bg-civic-ink text-white' : 'bg-civic-blue/[0.08] text-civic-blue'}`}><Icon size={25} /></span>
                    <span className={`font-display text-4xl ${featured ? 'text-civic-ink/20' : 'text-slate-200'}`}>{number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-[1.02] tracking-[-0.03em]">{title}</h3>
                    <p className={`mt-3 text-sm leading-6 ${featured ? 'text-civic-ink/70' : 'text-slate-600'}`}>{text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold">Acessar <ArrowRight size={17} className="transition group-hover:translate-x-1.5" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section
        className="bg-white"
        eyebrow="Toninho em ação"
        title="Movimento que chega aos bairros"
        subtitle="Esporte, atendimento e cidadania conectados com a vida real das comunidades de Sorocaba."
      >
        <div className="grid auto-rows-[250px] gap-4 md:grid-cols-12 md:auto-rows-[290px]">
          <Link to="/acoes" className="group relative overflow-hidden rounded-[2rem] bg-civic-ink md:col-span-7 md:row-span-2">
            <SafeImage src={imageBank.corrida} alt="Atletas em ação comunitária" className="image-zoom absolute inset-0 h-full w-full" fallbackLabel="Esporte e cidadania" />
            <div className="absolute inset-0 bg-gradient-to-t from-civic-ink via-civic-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-civic-yellow">Atleta Cidadão</span>
              <h3 className="mt-3 max-w-xl font-display text-3xl uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl">Esporte que abre caminhos</h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/65">Atividade física, convivência e oportunidades para fortalecer pessoas e comunidades.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold">Conhecer ações <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </div>
          </Link>

          <Link to="/agendamento" className="group relative overflow-hidden rounded-[2rem] bg-civic-blue md:col-span-5">
            <SafeImage src={imageBank.toninhoTribuna} alt="Toninho Corredor em atividade pública" className="image-zoom absolute inset-0 h-full w-full opacity-60" imgClassName="object-top" fallbackLabel="Atendimento" />
            <div className="absolute inset-0 bg-gradient-to-r from-civic-blue via-civic-blue/75 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-[75%] flex-col justify-end p-7 text-white">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-civic-yellow">Gabinete</span>
              <h3 className="mt-2 font-display text-2xl uppercase leading-none sm:text-3xl">Escuta direta da população</h3>
              <ArrowRight className="mt-4 transition group-hover:translate-x-2" />
            </div>
          </Link>

          <Link to="/acoes" className="group relative overflow-hidden rounded-[2rem] bg-civic-yellow md:col-span-5">
            <SafeImage src={imageBank.acao} alt="Ação social com a comunidade" className="image-zoom absolute inset-0 h-full w-full opacity-35 mix-blend-multiply" fallbackLabel="Ações sociais" />
            <div className="absolute inset-0 bg-gradient-to-r from-civic-yellow via-civic-yellow/90 to-civic-yellow/25" />
            <div className="absolute inset-y-0 left-0 flex max-w-[78%] flex-col justify-end p-7 text-civic-ink">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-civic-blue">Comunidade</span>
              <h3 className="mt-2 font-display text-2xl uppercase leading-none sm:text-3xl">Presença onde a vida acontece</h3>
              <ArrowRight className="mt-4 transition group-hover:translate-x-2" />
            </div>
          </Link>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-civic-cream" eyebrow="Trajetória" title="Do esporte ao serviço público">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-4 translate-x-3 translate-y-3 rounded-[2.5rem] bg-civic-yellow sm:-inset-6" aria-hidden="true" />
            <SafeImage src={imageBank.toninhoTribuna} alt="Toninho Corredor" className="relative aspect-[4/5] w-full rounded-[2.25rem] shadow-soft" imgClassName="object-top" fallbackLabel="Toninho Corredor" />
            <div className="absolute -bottom-5 -right-2 rounded-2xl bg-civic-ink px-5 py-4 text-white shadow-dark sm:-right-8">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-civic-yellow">Uma história em movimento</p>
              <p className="mt-1 font-display uppercase">Esporte • comunidade • serviço</p>
            </div>
          </div>
          <div className="lg:pl-4">
            <p className="font-display text-[clamp(2rem,4vw,4.2rem)] uppercase leading-[0.98] tracking-[-0.04em] text-civic-ink">A corrida ensinou que cada passo conta. <span className="text-civic-blue">Na vida pública também.</span></p>
            <div className="mt-8 grid gap-5 text-base leading-8 text-slate-600">
              <p>Conhecido como Toninho Corredor, construiu sua trajetória perto de atletas, famílias, projetos sociais e moradores que querem transformar seus bairros.</p>
              <p>Hoje, leva essa mesma energia para o mandato: ouvindo, encaminhando demandas e aproximando a população do serviço público.</p>
            </div>
            <ButtonLink to="/sobre" variant="dark" className="mt-8">Conhecer a trajetória <ArrowRight size={18} /></ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        className="relative overflow-hidden bg-civic-ink text-white"
        tone="dark"
        eyebrow="Atleta Cidadão"
        title="Esporte é movimento. Movimento muda histórias."
        subtitle="Uma visão que conecta corrida, saúde, convivência e participação cidadã."
      >
        <div className="hero-grid absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="relative grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <SafeImage src={imageBank.bairro} alt="Atividade esportiva em Sorocaba" className="image-zoom min-h-[380px] rounded-[2rem] shadow-dark lg:min-h-[520px]" fallbackLabel="Atleta Cidadão" />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { title: 'Juventude', text: 'Convivência, disciplina e novos caminhos para crianças e jovens.', icon: Users },
              { title: 'Saúde', text: 'Movimento como incentivo à qualidade de vida e ao bem-estar.', icon: HeartPulse },
              { title: 'Cidadania', text: 'Esporte que aproxima pessoas e fortalece a comunidade.', icon: ShieldCheck },
            ].map(({ title, text, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="group h-full rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm transition duration-500 hover:border-civic-yellow/35 hover:bg-white/[0.09] sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink"><Icon size={23} /></span>
                    <span className="font-display text-3xl text-white/10">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl uppercase">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Jornal Atleta Cidadão"
        title="Informação para acompanhar de perto"
        subtitle="Notícias, registros e histórias sobre esporte, cidadania e ações nas comunidades."
      >
        {publishedNewspapers.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {publishedNewspapers.map((edition, index) => (
              <Reveal key={edition.id} delay={index * 90}>
                <Link to={`/jornal/${edition.id}`} className="premium-card group grid min-h-[360px] sm:grid-cols-[42%_1fr]">
                  <SafeImage src={edition.cover_url} alt={`Capa ${edition.title}`} className="image-zoom min-h-[260px] w-full sm:min-h-full" fallbackLabel="Jornal" />
                  <div className="flex flex-col p-6 sm:p-8">
                    <Badge>{edition.categories[0] ?? 'Jornal'}</Badge>
                    <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-400">{shortDate(edition.edition_date)}</p>
                    <h3 className="mt-3 font-display text-2xl uppercase leading-[1.02] tracking-[-0.03em] text-civic-ink">{edition.title}</h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{edition.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-extrabold text-civic-blue">Ver detalhes <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[2rem] bg-civic-blue p-7 text-white shadow-blue sm:p-10 lg:p-12">
            <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <Newspaper size={36} className="text-civic-yellow" />
                <h3 className="mt-5 font-display text-3xl uppercase leading-none sm:text-4xl">Novas edições em preparação</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-blue-50/75">O Jornal Atleta Cidadão reúne ações, histórias da comunidade e informação útil para a população.</p>
              </div>
              <ButtonLink to="/jornal" variant="secondary">Acompanhar publicações <ArrowRight size={18} /></ButtonLink>
            </div>
          </div>
        )}
        {publishedNewspapers.length > 0 && <div className="mt-8"><ButtonLink to="/jornal" variant="dark">Ver todas as edições <ArrowRight size={18} /></ButtonLink></div>}
      </Section>

      {publishedActions.length > 0 && (
        <Section className="bg-civic-cream" eyebrow="Nos bairros" title="Ações recentes" subtitle="Registros de eventos, atendimentos e iniciativas que aproximam o mandato da população.">
          <div className="grid gap-5 md:grid-cols-3">
            {publishedActions.map((action, index) => (
              <Reveal key={action.id} delay={index * 80}>
                <Link to={`/acoes/${action.id}`} className="premium-card group block h-full">
                  <SafeImage src={action.image_urls[0]} alt={action.title} className="image-zoom h-60 w-full" fallbackLabel={action.category} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-civic-blue"><MapPin size={14} /> {action.location}</div>
                    <h3 className="mt-3 font-display text-xl uppercase leading-[1.05] text-civic-ink">{action.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{action.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-civic-blue">Ver ação <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8"><ButtonLink to="/acoes" variant="dark">Ver todas as ações <ArrowRight size={18} /></ButtonLink></div>
        </Section>
      )}

      <Section className="bg-white">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(125deg,#0877c9,#071426_72%)] p-7 text-white shadow-dark sm:p-10 lg:p-14">
          <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[42px] border-civic-yellow/10" aria-hidden="true" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-civic-yellow p-3 text-civic-ink"><CalendarCheck size={27} /></span>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.8rem)] uppercase leading-[0.94] tracking-[-0.045em]">Sua demanda merece ser ouvida.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/70 sm:text-base">Escolha uma data, informe o assunto e envie sua solicitação. A equipe entrará em contato para confirmar o atendimento.</p>
            </div>
            <ButtonLink to="/agendamento" variant="secondary" className="md:justify-self-end">Solicitar atendimento <ArrowUpRight size={18} /></ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
