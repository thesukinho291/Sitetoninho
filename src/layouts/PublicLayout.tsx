import {
  ArrowUpRight,
  CalendarCheck,
  ChevronRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { SafeImage } from '../components/SafeImage';
import { useData } from '../contexts/DataContext';
import { imageBank } from '../lib/mockData';

const links = [
  { label: 'Sobre', href: '/sobre', number: '01' },
  { label: 'Jornal', href: '/jornal', number: '02' },
  { label: 'Ações', href: '/acoes', number: '03' },
  { label: 'Agendamento', href: '/agendamento', number: '04' },
  { label: 'Contato', href: '/contato', number: '05' },
];

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Toninho Corredor | Vereador de Sorocaba', description: 'Atendimento à população, esporte, cidadania, ações sociais e Jornal Atleta Cidadão em Sorocaba.' },
  '/sobre': { title: 'Trajetória | Toninho Corredor', description: 'Conheça a trajetória de Toninho Corredor, do esporte ao serviço público em Sorocaba.' },
  '/jornal': { title: 'Jornal Atleta Cidadão | Toninho Corredor', description: 'Edições e notícias sobre esporte, cidadania e ações nas comunidades de Sorocaba.' },
  '/acoes': { title: 'Ações nos bairros | Toninho Corredor', description: 'Acompanhe projetos, eventos e ações sociais realizadas perto da população.' },
  '/agendamento': { title: 'Solicitar atendimento | Toninho Corredor', description: 'Envie sua solicitação de atendimento ao gabinete de Toninho Corredor.' },
  '/contato': { title: 'Canais oficiais | Toninho Corredor', description: 'Canais oficiais para falar com a equipe e acompanhar o mandato.' },
};

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { settings } = useData();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.requestAnimationFrame(() => document.getElementById('conteudo')?.focus({ preventScroll: true }));

    const detailFallback = location.pathname.startsWith('/jornal/')
      ? { title: 'Edição do Jornal | Toninho Corredor', description: 'Detalhes de uma edição do Jornal Atleta Cidadão.' }
      : location.pathname.startsWith('/acoes/')
        ? { title: 'Ação social | Toninho Corredor', description: 'Detalhes de uma ação realizada junto à comunidade.' }
        : { title: 'Página não encontrada | Toninho Corredor', description: 'Encontre os canais, ações e conteúdos oficiais de Toninho Corredor.' };
    const meta = routeMeta[location.pathname] ?? detailFallback;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const updateScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 24);
      setProgress(height > 0 ? Math.min((top / height) * 100, 100) : 0);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="site-shell min-h-screen bg-civic-cream text-slate-900">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-white/10" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-civic-yellow via-civic-sky to-civic-yellow transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <header className={`site-header fixed inset-x-0 top-0 z-[60] border-b text-white transition-all duration-500 ${scrolled ? 'border-white/10 bg-civic-ink/[0.94] shadow-dark backdrop-blur-xl' : 'border-white/[0.08] bg-civic-ink/75 backdrop-blur-md'}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${scrolled ? 'h-[72px]' : 'h-[84px]'}`}>
          <Link to="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)} aria-label="Toninho Corredor — página inicial">
            <span className="relative block shrink-0">
              <span className="absolute -inset-1 rounded-full border border-civic-yellow/55 transition duration-300 group-hover:scale-110" />
              <SafeImage
                src={imageBank.toninhoTribuna}
                alt=""
                className="h-11 w-11 rounded-full bg-civic-navy sm:h-12 sm:w-12"
                imgClassName="object-top"
                fallbackLabel="TC"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-civic-ink bg-civic-yellow" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate font-display text-sm uppercase leading-tight tracking-[-0.02em] sm:text-base">Toninho Corredor</strong>
              <span className="mt-0.5 block truncate text-[0.58rem] font-extrabold uppercase tracking-[0.19em] text-white/55 sm:text-[0.63rem]">Vereador de Sorocaba</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {links.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) => `nav-link relative rounded-full px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.08em] transition duration-300 ${isActive ? 'bg-white/[0.1] text-civic-yellow' : 'text-white/70 hover:bg-white/[0.07] hover:text-white'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-white/35 hover:bg-white/10 hover:text-white" href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram oficial">
              <Instagram size={18} />
            </a>
            <Link className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-civic-yellow px-5 text-xs font-extrabold uppercase tracking-[0.07em] text-civic-ink shadow-yellow transition hover:-translate-y-0.5 hover:bg-[#ffd95a]" to="/agendamento">
              <CalendarCheck size={17} /> Fale com o gabinete
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.07] text-white transition hover:bg-white/[0.14] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div id="menu-mobile" className="mobile-menu fixed inset-x-0 top-[72px] z-50 h-[calc(100svh-72px)] w-screen overflow-y-auto bg-civic-ink px-5 pb-8 pt-5 text-white lg:hidden">
            <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
            <nav className="relative mx-auto grid max-w-2xl" aria-label="Navegação móvel">
              {links.map(({ label, href, number }) => (
                <NavLink
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `group flex items-center justify-between border-b border-white/10 py-5 text-left font-display text-[clamp(1.8rem,10vw,3rem)] uppercase leading-none tracking-[-0.04em] ${isActive ? 'text-civic-yellow' : 'text-white'}`}
                >
                  <span className="flex items-baseline gap-4"><small className="font-sans text-[0.6rem] tracking-[0.18em] text-white/35">{number}</small>{label}</span>
                  <ChevronRight size={24} className="text-white/35 transition group-hover:translate-x-1 group-hover:text-civic-yellow" />
                </NavLink>
              ))}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-civic-yellow px-5 text-sm font-extrabold text-civic-ink" to="/agendamento" onClick={() => setOpen(false)}>
                  <CalendarCheck size={19} /> Solicitar atendimento
                </Link>
                <a className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 text-sm font-extrabold text-white" href={settings.instagram_url} target="_blank" rel="noreferrer">
                  <Instagram size={19} /> Instagram oficial
                </a>
              </div>
              <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/35">Esporte • cidadania • compromisso</p>
            </nav>
          </div>
        )}
      </header>

      <main id="conteudo" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>

      <footer className="relative overflow-hidden bg-civic-ink text-white">
        <div className="h-2 bg-[linear-gradient(90deg,#ffc933_0_18%,#15a4d6_18%_52%,#0877c9_52%_76%,#ffc933_76%)]" aria-hidden="true" />
        <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
          <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-civic-yellow"><span className="h-px w-9 bg-civic-yellow" /> Gabinete aberto</p>
              <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,6.6rem)] uppercase leading-[0.9] tracking-[-0.05em]">Sua voz também <span className="text-stroke">move Sorocaba.</span></h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-md text-sm leading-7 text-white/60">Envie sua demanda, conte o que acontece no seu bairro e acompanhe de perto as ações do mandato.</p>
              <Link className="mt-6 inline-flex min-h-14 items-center gap-3 rounded-full bg-civic-yellow px-7 text-sm font-extrabold text-civic-ink shadow-yellow transition hover:-translate-y-1 hover:bg-[#ffd95a]" to="/agendamento">
                Solicitar atendimento <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.7fr_1fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <SafeImage src={imageBank.toninhoTribuna} alt="" className="h-12 w-12 rounded-full" imgClassName="object-top" fallbackLabel="TC" />
                <span><strong className="block font-display uppercase">Toninho Corredor</strong><small className="text-xs text-white/45">Vereador de Sorocaba</small></span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">Trabalho próximo da população, com esporte, cidadania e presença real nos bairros.</p>
            </div>
            <nav aria-label="Links do rodapé">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/35">Explore</h3>
              <div className="mt-5 grid gap-3 text-sm font-bold text-white/70">
                {links.slice(0, 4).map(({ label, href }) => <Link className="w-fit transition hover:translate-x-1 hover:text-civic-yellow" key={href} to={href}>{label}</Link>)}
              </div>
            </nav>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/35">Canais oficiais</h3>
              <div className="mt-5 grid gap-3 text-sm text-white/65">
                <a className="flex w-fit items-center gap-2 transition hover:text-civic-yellow" href={settings.instagram_url} target="_blank" rel="noreferrer"><Instagram size={16} /> @toninho_corredor</a>
                {settings.email && <a className="flex w-fit items-center gap-2 transition hover:text-civic-yellow" href={`mailto:${settings.email}`}><Mail size={16} /> {settings.email}</a>}
                {settings.phone && <a className="flex w-fit items-center gap-2 transition hover:text-civic-yellow" href={`tel:${settings.phone}`}><Phone size={16} /> {settings.phone}</a>}
                {settings.office_location && <span className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {settings.office_location}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Toninho Corredor. Direitos reservados.</span>
            <span>Dados de atendimento tratados com respeito e conforme a LGPD.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
