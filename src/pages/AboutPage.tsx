import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Route,
  Trophy,
  Users,
} from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { imageBank } from '../lib/mockData';

const principles = [
  {
    number: '01',
    title: 'Atendimento ao morador',
    text: 'Escuta direta e encaminhamento organizado das demandas recebidas.',
    icon: CheckCircle2,
  },
  {
    number: '02',
    title: 'Esporte e saúde',
    text: 'Atividade física como caminho para disciplina, convivência e qualidade de vida.',
    icon: HeartPulse,
  },
  {
    number: '03',
    title: 'Crianças e jovens',
    text: 'Projetos sociais e formação cidadã para ampliar oportunidades.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Bairros de Sorocaba',
    text: 'Presença nas comunidades e acompanhamento próximo das necessidades locais.',
    icon: MapPin,
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre Toninho Corredor"
        title="Uma trajetória em movimento"
        subtitle="Uma história ligada ao esporte, à formação de jovens e ao atendimento direto da população de Sorocaba."
        image={imageBank.heroComunidade}
        aside={
          <div className="glass-card w-[320px] rounded-[1.75rem] p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink">
                <Route size={24} />
              </span>
              <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-white/45">Sorocaba</span>
            </div>
            <p className="mt-6 font-display text-2xl uppercase leading-[1.02] tracking-[-0.03em]">Esporte, comunidade e serviço público</p>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-white/65">
              <span>Vereador de Sorocaba</span>
              <span>Atleta profissional</span>
              <span>Técnico de esportes</span>
            </div>
          </div>
        }
      />

      <Section
        className="overflow-hidden bg-civic-cream"
        eyebrow="Da corrida à vida pública"
        title="O esporte abriu o caminho"
        subtitle="A mesma disciplina construída nas pistas se transformou em presença comunitária, escuta e compromisso com as pessoas."
      >
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-4 translate-x-4 translate-y-4 rounded-[2.5rem] bg-civic-yellow sm:-inset-6" aria-hidden="true" />
            <SafeImage
              src={imageBank.toninhoTribuna}
              alt="Toninho Corredor em atividade pública"
              className="image-zoom relative aspect-[4/5] w-full rounded-[2.25rem] shadow-soft"
              imgClassName="object-top"
              fallbackLabel="Toninho Corredor"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="absolute -bottom-6 -right-1 max-w-[82%] rounded-2xl bg-civic-ink px-5 py-4 text-white shadow-dark sm:-right-8 sm:px-6">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-civic-yellow">História em movimento</p>
              <p className="mt-1 font-display uppercase leading-tight">Esporte • cidadania • presença</p>
            </div>
          </div>

          <div className="pt-4 lg:pt-0">
            <p className="font-display text-[clamp(2rem,4.3vw,4.35rem)] uppercase leading-[0.98] tracking-[-0.045em] text-civic-ink">
              Uma vida próxima do esporte. <span className="text-civic-blue">Um trabalho próximo das pessoas.</span>
            </p>
            <div className="mt-8 grid gap-5 text-base leading-8 text-slate-600">
              <p>Toninho Corredor é vereador de Sorocaba, atleta profissional e técnico de esportes. Sua história pública tem forte ligação com a corrida, com projetos sociais e com a formação cidadã de crianças e jovens.</p>
              <p>O apelido nasceu da presença constante no esporte. Ao longo dos anos, essa vivência se aproximou do trabalho comunitário, especialmente em iniciativas que usam a atividade física como caminho para disciplina, convivência, saúde e oportunidade.</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Escuta direta da população', 'Esporte como ferramenta social', 'Presença nas comunidades', 'Encaminhamento organizado'].map((item) => (
                <span key={item} className="flex items-center gap-3 rounded-2xl border border-civic-ink/[0.07] bg-white/70 px-4 py-3.5 text-sm font-extrabold text-civic-ink shadow-sm">
                  <CheckCircle2 size={18} className="shrink-0 text-civic-blue" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink to="/agendamento" variant="dark">Solicitar atendimento <ArrowUpRight size={18} /></ButtonLink>
              <ButtonLink to="/acoes">Acompanhar ações <ArrowRight size={18} /></ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Eixos de atuação"
        title="Trabalho conectado à vida real"
        subtitle="Quatro frentes que reúnem a experiência no esporte, a formação cidadã e a presença nos bairros."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map(({ number, title, text, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 70}>
              <article className="premium-card group flex min-h-[300px] h-full flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-civic-blue/[0.09] p-3 text-civic-blue transition duration-500 group-hover:bg-civic-blue group-hover:text-white">
                    <Icon size={25} />
                  </span>
                  <span className="font-display text-4xl text-slate-200">{number}</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className="font-display text-2xl uppercase leading-[1.02] tracking-[-0.03em] text-civic-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="relative overflow-hidden bg-civic-ink text-white"
        tone="dark"
        eyebrow="Atleta Cidadão"
        title="Presença que aproxima"
        subtitle="Projetos sociais, esporte e escuta dos moradores fazem parte de uma atuação voltada às comunidades de Sorocaba."
      >
        <div className="hero-grid absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12">
          <SafeImage
            src={imageBank.bairro}
            alt="Atividade comunitária ligada ao esporte em Sorocaba"
            className="image-zoom min-h-[390px] rounded-[2rem] shadow-dark lg:min-h-[560px]"
            fallbackLabel="Atleta Cidadão"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />

          <div className="flex flex-col justify-center">
            <p className="font-display text-[clamp(2rem,4vw,3.9rem)] uppercase leading-[0.98] tracking-[-0.04em] text-white">
              Poder público, comunidade e vida prática <span className="text-civic-yellow">mais próximos.</span>
            </p>
            <p className="mt-7 text-base leading-8 text-blue-50/65">À frente de ações ligadas ao Atleta Cidadão, Toninho mantém uma atuação voltada aos bairros, ouvindo moradores, acompanhando demandas e fortalecendo projetos que aproximam poder público, comunidade e vida prática.</p>

            <div className="mt-8 grid gap-3">
              {[
                { icon: Trophy, text: 'Esporte como caminho para convivência, saúde e oportunidade' },
                { icon: Users, text: 'Formação cidadã de crianças e jovens' },
                { icon: MapPin, text: 'Escuta e acompanhamento das demandas dos bairros' },
              ].map(({ icon: Icon, text }, index) => (
                <Reveal key={text} delay={index * 75}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm font-bold text-white/75 backdrop-blur-sm">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-civic-yellow text-civic-ink"><Icon size={21} /></span>
                    {text}
                  </div>
                </Reveal>
              ))}
            </div>

            <ButtonLink to="/acoes" variant="secondary" className="mt-8 w-full sm:w-fit">Ver ações nos bairros <ArrowRight size={18} /></ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(125deg,#0877c9,#071426_72%)] p-7 text-white shadow-dark sm:p-10 lg:p-14">
          <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[42px] border-civic-yellow/10" aria-hidden="true" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-civic-yellow text-civic-ink"><CalendarCheck size={27} /></span>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.8rem)] uppercase leading-[0.94] tracking-[-0.045em]">Quer conversar com a equipe?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/70 sm:text-base">Envie sua solicitação com data, horário e assunto. A equipe recebe as informações de forma organizada e entra em contato para confirmar o atendimento.</p>
            </div>
            <ButtonLink to="/agendamento" variant="secondary" className="md:justify-self-end">Solicitar atendimento <ArrowUpRight size={18} /></ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
