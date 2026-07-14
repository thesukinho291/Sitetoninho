import { BarChart3, CalendarDays, FileText, LogOut, Newspaper, Settings, Users } from 'lucide-react';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { useAuth } from '../contexts/AuthContext';

const adminLinks = [
  ['Dashboard', '/admin', BarChart3],
  ['Agendamentos', '/admin/agendamentos', CalendarDays],
  ['Jornal', '/admin/jornal', Newspaper],
  ['Ações sociais', '/admin/acoes', Users],
  ['Configurações', '/admin/configuracoes', Settings],
];

export function AdminLayout() {
  const { signOut, mockMode } = useAuth();
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-white/10 bg-slate-950 p-4 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between lg:block">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-civic-yellow font-black text-civic-ink">TC</span>
              <div>
                <h1 className="font-black">Painel do gabinete</h1>
                <p className="text-xs text-slate-400">{mockMode ? 'Modo demonstração' : 'Supabase conectado'}</p>
              </div>
            </div>
          </div>
          <button className="rounded-lg bg-white/10 p-3 lg:hidden" onClick={signOut} aria-label="Sair">
            <LogOut size={18} />
          </button>
        </div>
        <nav className="mt-6 grid gap-2">
          {adminLinks.map(([label, href, Icon]) => (
            <NavLink key={href as string} to={href as string} end={href === '/admin'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold ${isActive ? 'bg-civic-blue text-white' : 'text-slate-300 hover:bg-white/10'}`}>
              <Icon size={18} />
              {label as string}
            </NavLink>
          ))}
        </nav>
        <button className="mt-6 hidden w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 lg:flex" onClick={signOut}>
          <LogOut size={18} />
          Sair
        </button>
      </aside>
      <section className="min-w-0 bg-slate-100 text-slate-900">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
}
