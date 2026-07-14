import { ArrowLeft, Compass } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';

export function NotFoundPage() {
  return (
    <>
      <PageHero eyebrow="Erro 404" title="Esta página saiu da rota" subtitle="O endereço pode ter mudado ou o conteúdo não está mais disponível." />
      <Section className="bg-civic-cream">
        <div className="premium-card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-civic-blue/[0.09] text-civic-blue"><Compass size={30} /></span>
          <h1 className="mt-6 font-display text-3xl uppercase text-civic-ink sm:text-4xl">Vamos voltar ao caminho certo</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">Na página inicial você encontra os canais de atendimento, as ações nos bairros e o Jornal Atleta Cidadão.</p>
          <ButtonLink to="/" variant="dark" className="mt-7"><ArrowLeft size={18} /> Voltar ao início</ButtonLink>
        </div>
      </Section>
    </>
  );
}
