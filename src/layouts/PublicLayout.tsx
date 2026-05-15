import { Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useData } from '../contexts/DataContext';
import { imageBank } from '../lib/mockData';

const links = [
  ['Sobre', '/sobre'],
  ['Jornal', '/jornal'],
  ['Ações', '/acoes'],
  ['Agendamento', '/agendamento'],
  ['Contato', '/contato'],
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { settings } = useData();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <SafeImage
              src={imageBank.toninhoTribuna}
              alt="Toninho Corredor"
              className="h-12 w-12 shrink-0 rounded-full border-2 border-civic-blue shadow-sm"
              imgClassName="object-top"
              fallbackLabel="TC"
            />
            <span className="min-w-0">
              <strong className="block truncate text-lg leading-tight text-civic-ink">Toninho Corredor</strong>
              <span className="block truncate text-xs font-semibold uppercase tracking-wide text-slate-500">Atendimento e cidadania</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-bold transition ${isActive ? 'bg-civic-blue text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100 hover:text-civic-blue'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <a className="hidden items-center gap-2 rounded-lg bg-civic-yellow px-5 py-3 text-sm font-black text-civic-ink transition hover:bg-amber-300 lg:inline-flex" href={settings.instagram_url} target="_blank" rel="noreferrer">
            <Instagram size={17} /> Instagram
          </a>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-100 text-civic-ink transition hover:bg-slate-200 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {links.map(([label, href]) => (
                <NavLink key={href} to={href} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-3 font-bold ${isActive ? 'bg-civic-blue text-white' : 'text-slate-800 hover:bg-slate-100'}`}>
                  {label}
                </NavLink>
              ))}
              <a className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-civic-yellow px-4 py-3 text-sm font-black text-civic-ink" href={settings.instagram_url} target="_blank" rel="noreferrer">
                <Instagram size={17} /> Instagram oficial
              </a>
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-civic-ink py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-black">Toninho Corredor</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">Mandato próximo da população, com esporte, cidadania, atendimento ao morador e ações sociais nos bairros.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-civic-yellow">Sorocaba • atendimento • cidadania</p>
          </div>
          <div>
            <h3 className="font-bold">Links rápidos</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-300">
              <Link className="hover:text-white" to="/jornal">Jornal Atleta Cidadão</Link>
              <Link className="hover:text-white" to="/agendamento">Agendamento</Link>
              <Link className="hover:text-white" to="/acoes">Ações sociais</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Canais</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-300">
              <a className="hover:text-white" href={settings.instagram_url} target="_blank" rel="noreferrer">Instagram oficial</a>
              {settings.email && <span>{settings.email}</span>}
              {settings.phone && <span>{settings.phone}</span>}
              {settings.office_location && <span>{settings.office_location}</span>}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 text-xs text-slate-400 sm:px-6 lg:px-8">© {new Date().getFullYear()} Toninho Corredor. Direitos reservados.</div>
      </footer>
    </div>
  );
}
