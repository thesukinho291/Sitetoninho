import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  FileText,
  HandHeart,
  HeartPulse,
  MapPinned,
  Newspaper,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { ButtonLink } from '../components/Button';
import { SafeImage } from '../components/SafeImage';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { imageBank } from '../lib/mockData';

const quickCards = [
  ['Atendimento ao cidadão', 'Canal organizado para moradores enviarem solicitações ao gabinete.', CalendarCheck],
  ['Jornal Atleta Cidadão', 'Edições, notícias e registros das ações de esporte e cidadania.', Newspaper],
  ['Ações sociais', 'Projetos, eventos, corridas e presença nos bairros de Sorocaba.', HandHeart],
  ['Projetos e indicações', 'Acompanhamento das demandas recebidas e encaminhadas pelo mandato.', FileText],
];

const highlights = [
  {
    title: 'Esporte e cidadania',
    description: 'Ações que aproximam atividade física, convivência e participação comunitária.',
    category: 'Esporte',
    image: imageBank.corrida,
    href: '/acoes',
  },
  {
    title: 'Atendimento à população',
    description: 'Escuta organizada para receber demandas dos bairros e encaminhar solicitações.',
    category: 'Gabinete',
    image: imageBank.toninhoTribuna,
    href: '/agendamento',
  },
  {
    title: 'Juventude e inclusão social',
    description: 'Projetos e iniciativas com foco em crianças, jovens, família e cidadania.',
    category: 'Cidadania',
    image: imageBank.instituto,
    href: '/acoes',
  },
  {
    title: 'Presença nos bairros',
    description: 'Registros de agenda, ações comunitárias e demandas acompanhadas em Sorocaba.',
    category: 'Bairros',
    image: imageBank.acao,
    href: '/acoes',
  },
];

export function HomePage() {
  const { newspapers, actions } = useData();
  const publishedNewspapers = newspapers.filter((item) => item.status === 'publicado').slice(0, 2);
  const publishedActions = actions.filter((item) => item.status === 'publicado').slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url(${imageBank.heroComunidade})` }}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,12,27,0.96)_0%,rgba(5,12,27,0.86)_46%,rgba(5,12,27,0.36)_78%,rgba(5,12,27,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-[2] mx-auto grid min-h-[680px] max-w-7xl items-center px-4 py-12 sm:min-h-[720px] sm:px-6 lg:min-h-[calc(100vh-80px)] lg:px-8">
          <div className="animate-hero min-w-0 max-w-3xl overflow-hidden">
            <Badge>Mandato, esporte e cidadania</Badge>
            <h1 className="mt-6 max-w-full text-4xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">Toninho Corredor</h1>
            <p className="mt-6 max-w-[22rem] text-lg font-semibold leading-7 text-slate-50 sm:max-w-2xl sm:text-2xl sm:leading-8">
              Esporte, cidadania e compromisso com Sorocaba
            </p>
            <p className="mt-4 max-w-[22rem] text-base leading-7 text-blue-50 sm:max-w-2xl sm:text-lg">
              Um canal direto para atendimento, Jornal Atleta Cidadão e registros das ações sociais e esportivas do mandato.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <ButtonLink to="/agendamento" variant="secondary" className="w-full sm:w-auto">
                Agendar atendimento <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink to="/jornal" variant="ghost" className="w-full sm:w-auto">Ver Jornal Atleta Cidadão</ButtonLink>
              <ButtonLink to="/acoes" variant="ghost" className="w-full sm:w-auto">Conhecer ações</ButtonLink>
            </div>
            <div className="mt-8 grid gap-3 text-sm font-bold text-slate-100 sm:grid-cols-3">
              {['Atendimento organizado', 'Presença nos bairros', 'Esporte como inclusão'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/8 px-3 py-2 backdrop-blur">
                  <CheckCircle2 size={16} className="shrink-0 text-civic-yellow" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-white" title="Um canal direto com a população" subtitle="Atendimento, informação pública e registros de ações sociais em uma experiência simples para celular e computador.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickCards.map(([title, text, Icon]) => (
            <Link key={title as string} to={title === 'Atendimento ao cidadão' ? '/agendamento' : title === 'Jornal Atleta Cidadão' ? '/jornal' : '/acoes'} className="card-hover rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-civic-blue/10 text-civic-blue">
                <Icon size={28} />
              </span>
              <h3 className="mt-5 text-lg font-black text-civic-ink">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text as string}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-100" eyebrow="Toninho em ação" title="Destaques do mandato" subtitle="Cards visuais para comunicar esporte, atendimento, bairro e trabalho social sem depender de posts externos.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((post) => (
            <Link key={post.title} to={post.href} className="card-hover group overflow-hidden rounded-lg bg-white shadow-sm">
              <SafeImage src={post.image} alt={post.title} className="h-52 w-full" fallbackLabel={post.category} />
              <div className="p-5">
                <Badge>{post.category}</Badge>
                <h3 className="mt-4 text-lg font-black text-civic-ink">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-civic-blue">
                  Ver mais <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Trajetória" title="Do esporte ao serviço público" subtitle="Uma história ligada ao esporte, à formação de jovens e à presença nos bairros.">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SafeImage src={imageBank.toninhoTribuna} alt="Toninho Corredor" className="h-[420px] w-full rounded-lg shadow-soft" imgClassName="object-top" fallbackLabel="Toninho Corredor" />
          <div className="grid gap-5 text-lg leading-8 text-slate-700">
            <p>Conhecido como Toninho Corredor, atua em Sorocaba com uma linguagem próxima das famílias, dos atletas, dos projetos sociais e dos moradores que buscam encaminhamento para suas demandas.</p>
            <p>O mandato valoriza atendimento organizado, escuta direta e trabalho de base, com atenção ao esporte, à cidadania, à juventude e às necessidades dos bairros.</p>
            <ButtonLink to="/sobre" className="w-fit">Conhecer trajetória</ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="bg-civic-ink text-white" eyebrow="Atleta Cidadão" title="Esporte como caminho de inclusão" subtitle="Uma conexão visual com corrida, convivência, saúde e cidadania, inspirada no universo do Atleta Cidadão.">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <SafeImage src={imageBank.instituto} alt="Projeto Atleta Cidadão" className="min-h-80 rounded-lg shadow-soft" fallbackLabel="Atleta Cidadão" />
          <div className="grid gap-4">
            {[
              ['Juventude', 'Ações voltadas a crianças e jovens com foco em convivência e cidadania.', Users],
              ['Saúde', 'Esporte e movimento como incentivo à qualidade de vida.', HeartPulse],
              ['Confiança', 'Canal de atendimento claro, organizado e próximo da população.', ShieldCheck],
            ].map(([title, text, Icon]) => (
              <div key={title as string} className="rounded-lg border border-white/10 bg-white/8 p-5 backdrop-blur">
                <Icon className="text-civic-yellow" size={26} />
                <h3 className="mt-3 text-lg font-black">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Jornal Atleta Cidadão" title="Informação sobre ações e comunidade">
        {publishedNewspapers.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {publishedNewspapers.map((edition) => (
              <Link to={`/jornal/${edition.id}`} key={edition.id} className="card-hover grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:grid-cols-[220px_1fr]">
                <SafeImage src={edition.cover_url} alt={`Capa ${edition.title}`} className="h-56 w-full sm:h-full" fallbackLabel="Jornal" />
                <div className="p-6">
                  <Badge>{edition.categories[0] ?? 'Jornal'}</Badge>
                  <h3 className="mt-4 text-xl font-black text-civic-ink">{edition.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{edition.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-civic-blue/20 bg-slate-50 p-6 text-slate-700">
            <p className="font-black text-civic-ink">As edições publicadas aparecerão aqui.</p>
            <p className="mt-2 text-sm leading-6">Enquanto isso, o site mantém o canal de atendimento e as páginas institucionais disponíveis para a população.</p>
          </div>
        )}
      </Section>

      <Section className="bg-slate-100" eyebrow="Nos bairros" title="Ações sociais, esporte e presença" subtitle="Registros de eventos, atendimentos e iniciativas que aproximam o mandato da vida real das comunidades.">
        {publishedActions.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {publishedActions.map((action) => (
              <Link to={`/acoes/${action.id}`} key={action.id} className="card-hover overflow-hidden rounded-lg bg-white text-slate-900 shadow-sm">
                <SafeImage src={action.image_urls[0]} alt={action.title} className="h-56 w-full" fallbackLabel={action.category} />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-civic-blue">
                    <MapPinned size={14} /> {action.location}
                  </div>
                  <h3 className="mt-3 text-lg font-black text-civic-ink">{action.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="font-black text-civic-ink">Os registros de ações serão publicados em breve.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">A estrutura já está preparada para exibir fotos, locais, datas e detalhes das iniciativas do mandato.</p>
          </div>
        )}
      </Section>

      <Section className="bg-white">
        <div className="grid gap-6 rounded-lg bg-[linear-gradient(135deg,#0f6fb7,#172033)] p-6 text-white shadow-soft sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Trophy size={32} className="text-civic-yellow" />
            <h2 className="mt-4 text-3xl font-black leading-tight">Precisa falar com o gabinete?</h2>
            <p className="mt-3 max-w-2xl text-blue-50">Escolha uma data disponível, informe o assunto e a equipe entrará em contato para confirmar o atendimento.</p>
          </div>
          <ButtonLink to="/agendamento" variant="secondary">Agendar atendimento</ButtonLink>
        </div>
      </Section>
    </>
  );
}
