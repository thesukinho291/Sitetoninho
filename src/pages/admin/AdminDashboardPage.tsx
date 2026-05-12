import { CalendarCheck, CheckCircle2, Clock3, FileText, Newspaper, Users } from 'lucide-react';
import { useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { getWeekLimit, isTodayKey } from '../../lib/date';

export function AdminDashboardPage() {
  const { appointments, newspapers, actions } = useData();
  const stats = useMemo(() => {
    const weekLimit = getWeekLimit();
    return {
      total: appointments.length,
      today: appointments.filter((item) => isTodayKey(item.appointment_date)).length,
      week: appointments.filter((item) => new Date(`${item.appointment_date}T12:00:00`) <= weekLimit).length,
      pending: appointments.filter((item) => item.status === 'aguardando contato').length,
      confirmed: appointments.filter((item) => item.status === 'confirmado').length,
      newspapers: newspapers.length,
      actions: actions.length,
    };
  }, [appointments, newspapers, actions]);
  return (
    <AdminPage title="Dashboard" subtitle="Visão geral do atendimento, jornal e ações cadastradas.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<CalendarCheck />} label="Total de agendamentos" value={stats.total} />
        <Stat icon={<Clock3 />} label="Agendamentos de hoje" value={stats.today} />
        <Stat icon={<Users />} label="Agendamentos da semana" value={stats.week} />
        <Stat icon={<FileText />} label="Pendentes" value={stats.pending} />
        <Stat icon={<CheckCircle2 />} label="Confirmados" value={stats.confirmed} />
        <Stat icon={<Newspaper />} label="Edições do jornal" value={stats.newspapers} />
        <Stat icon={<Users />} label="Ações sociais" value={stats.actions} />
      </div>
    </AdminPage>
  );
}

export function AdminPage({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-950">{title}</h1>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-civic-blue/10 text-civic-blue">{icon}</span>
        <strong className="text-3xl font-black text-slate-950">{value}</strong>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}
