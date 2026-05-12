import { Section } from '../components/Section';
import { SafeImage } from '../components/SafeImage';
import { imageBank } from '../lib/mockData';

export function AboutPage() {
  return (
    <>
      <Section className="bg-white" eyebrow="Sobre" title="Toninho Corredor" subtitle="Uma trajetória ligada ao esporte, à formação de jovens e ao atendimento direto da população de Sorocaba.">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SafeImage src={imageBank.toninhoTribuna} alt="Toninho Corredor em atividade pública" className="h-[460px] w-full rounded-lg shadow-soft" imgClassName="object-top" fallbackLabel="Toninho Corredor" />
          <div className="grid gap-5 text-lg leading-8 text-slate-700">
            <p>Toninho Corredor é vereador de Sorocaba, atleta profissional e técnico de esportes. Sua história pública tem forte ligação com a corrida, com projetos sociais e com a formação cidadã de crianças e jovens.</p>
            <p>O apelido nasceu da presença constante no esporte. Ao longo dos anos, essa vivência se aproximou do trabalho comunitário, especialmente em iniciativas que usam a atividade física como caminho para disciplina, convivência, saúde e oportunidade.</p>
            <p>À frente de ações ligadas ao Atleta Cidadão, Toninho mantém uma atuação voltada aos bairros, ouvindo moradores, acompanhando demandas e fortalecendo projetos que aproximam poder público, comunidade e vida prática.</p>
          </div>
        </div>
      </Section>
      <Section className="bg-slate-100" title="Eixos de atuação">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {['Atendimento ao morador', 'Esporte e saúde', 'Crianças e jovens', 'Bairros de Sorocaba'].map((item) => (
            <div key={item} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black text-civic-ink">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Trabalho feito com escuta, presença e encaminhamento organizado das demandas recebidas.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
