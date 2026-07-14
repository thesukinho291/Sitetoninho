import { ArrowRight, ArrowUpRight, CalendarCheck, Instagram, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { imageBank } from '../lib/mockData';

export function ContactPage() {
  const { settings } = useData();

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Canais oficiais"
        subtitle="Acompanhe o mandato, envie sua mensagem e fale com a equipe pelos canais oficiais de atendimento."
        image={imageBank.heroComunidade}
        aside={
          <div className="glass-card w-[310px] rounded-[1.75rem] p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-yellow text-civic-ink"><Send size={23} /></span>
              <span className="pulse-dot h-2 w-2 rounded-full bg-civic-yellow text-civic-yellow" />
            </div>
            <p className="mt-6 font-display text-2xl uppercase leading-[1.02]">Comunicação direta com a população</p>
            <p className="mt-3 text-sm leading-6 text-white/60">Escolha o canal mais adequado para sua mensagem ou solicitação.</p>
          </div>
        }
      />

      <Section
        className="bg-civic-cream"
        eyebrow="Fale com a equipe"
        title="Escolha o melhor canal"
        subtitle="Informação clara e contato direto para acompanhar o trabalho ou encaminhar uma mensagem ao gabinete."
      >
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <div className="rounded-[2rem] bg-civic-ink p-7 text-white shadow-dark sm:p-9">
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-civic-yellow text-civic-ink"><ShieldCheck size={26} /></span>
              <h2 className="mt-7 font-display text-3xl uppercase leading-[0.98] tracking-[-0.035em] sm:text-4xl">Contato oficial, atendimento organizado.</h2>
              <p className="mt-5 text-sm leading-7 text-blue-50/65">Para pedidos que precisam de data, horário e assunto definidos, o agendamento é o caminho mais direto.</p>
              <ButtonLink to="/agendamento" variant="secondary" className="mt-7 w-full sm:w-auto">Solicitar atendimento <ArrowUpRight size={18} /></ButtonLink>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-civic-ink/[0.08] bg-white/65 p-5 text-sm leading-6 text-slate-600">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-civic-blue" />
              Use os canais abaixo para falar com a equipe e conferir as atualizações oficiais do mandato.
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <ContactCard
                icon={<Instagram size={25} />}
                label="Instagram oficial"
                value="@toninho_corredor"
                description="Acompanhe notícias, agendas e registros do mandato."
                href={settings.instagram_url}
                accent="yellow"
              />
            </Reveal>
            {settings.email && (
              <Reveal delay={70}>
                <ContactCard
                  icon={<Mail size={25} />}
                  label="E-mail"
                  value={settings.email}
                  description="Envie uma mensagem detalhada para a equipe."
                  href={`mailto:${settings.email}`}
                />
              </Reveal>
            )}
            {settings.phone && (
              <Reveal delay={140}>
                <ContactCard
                  icon={<Phone size={25} />}
                  label="Telefone"
                  value={settings.phone}
                  description="Fale com a equipe pelos canais de atendimento."
                  href={`tel:${settings.phone}`}
                />
              </Reveal>
            )}
            {settings.office_location && (
              <Reveal delay={210}>
                <ContactCard
                  icon={<MapPin size={25} />}
                  label="Endereço/localização"
                  value={settings.office_location}
                  description="Referência informada para o atendimento do gabinete."
                />
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Atendimento no gabinete"
        title="Sua solicitação, passo a passo"
        subtitle="O agendamento reúne as informações necessárias para que a equipe receba sua demanda de forma organizada."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(125deg,#0877c9,#071426_76%)] p-7 text-white shadow-dark sm:p-10 lg:p-12">
            <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl bg-civic-yellow text-civic-ink"><CalendarCheck size={27} /></span>
              <h2 className="mt-7 max-w-2xl font-display text-[clamp(2.2rem,4.8vw,4.6rem)] uppercase leading-[0.94] tracking-[-0.045em]">Precisa de atendimento do gabinete?</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-50/70 sm:text-base">Para solicitações com data, horário e assunto definidos, use a página de agendamento. Assim a equipe recebe as informações de forma organizada.</p>
              <ButtonLink to="/agendamento" variant="secondary" className="mt-8 w-full sm:w-fit">Solicitar atendimento <ArrowRight size={18} /></ButtonLink>
            </div>
          </div>

          <div className="premium-card flex flex-col justify-center p-7 sm:p-9 lg:p-10">
            {[
              ['01', 'Escolha a data', 'Consulte as datas disponíveis para atendimento.'],
              ['02', 'Informe o assunto', 'Conte à equipe qual é a sua solicitação.'],
              ['03', 'Aguarde o contato', 'A equipe recebe os dados e entra em contato para confirmar.'],
            ].map(([number, title, text], index) => (
              <Reveal key={number} delay={index * 75}>
                <div className={`grid grid-cols-[auto_1fr] gap-4 py-5 ${index ? 'border-t border-slate-200' : ''}`}>
                  <span className="font-display text-3xl text-civic-blue">{number}</span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight text-civic-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  description,
  href,
  accent = 'blue',
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  href?: string;
  accent?: 'blue' | 'yellow';
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className={`grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl ${accent === 'yellow' ? 'bg-civic-yellow text-civic-ink' : 'bg-civic-blue/[0.09] text-civic-blue'}`}>
          {icon}
        </span>
        {href && <ArrowUpRight size={20} className="text-slate-300 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-civic-blue" />}
      </div>
      <div className="mt-9">
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <p className="mt-2 break-words font-display text-xl uppercase leading-tight text-civic-ink sm:text-2xl">{value}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </>
  );

  const className = 'premium-card group flex min-h-[250px] h-full flex-col justify-between p-6 sm:p-7';

  if (!href) return <div className={className}>{content}</div>;

  const external = href.startsWith('http');
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={className}>
      {content}
    </a>
  );
}
