import { Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { useData } from '../../contexts/DataContext';
import { STATUS_OPTIONS } from '../../lib/constants';
import { shortDate } from '../../lib/date';
import { AppointmentStatus } from '../../types';
import { AdminPage } from './AdminDashboardPage';

export function AdminAppointmentsPage() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useData();
  const [filters, setFilters] = useState({ date: '', neighborhood: '', status: '', subject: '', q: '' });
  const filtered = useMemo(() => appointments.filter((item) => {
    const q = filters.q.toLowerCase();
    return (!filters.date || item.appointment_date === filters.date)
      && (!filters.neighborhood || item.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase()))
      && (!filters.status || item.status === filters.status)
      && (!filters.subject || item.subject.toLowerCase().includes(filters.subject.toLowerCase()))
      && (!q || item.full_name.toLowerCase().includes(q) || item.phone.toLowerCase().includes(q));
  }), [appointments, filters]);

  return (
    <AdminPage title="Agendamentos" subtitle="Controle de solicitações, contato da equipe e confirmação de presença.">
      <div className="mb-5 grid gap-3 rounded-lg bg-white p-4 shadow-sm md:grid-cols-5">
        <input className="admin-input" type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
        <input className="admin-input" placeholder="Bairro" value={filters.neighborhood} onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value })} />
        <input className="admin-input" placeholder="Assunto" value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} />
        <select className="admin-input" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Todos os status</option>
          {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
        </select>
        <input className="admin-input" placeholder="Nome ou telefone" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
      </div>
      <div className="grid gap-4">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-lg bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1fr_220px_170px_auto] lg:items-start">
              <div>
                <h2 className="text-xl font-black text-slate-950">{item.full_name}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.phone} • {item.neighborhood}</p>
                <p className="mt-3 font-bold text-civic-blue">{item.subject}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
              <div className="text-sm font-bold text-slate-700">
                {shortDate(item.appointment_date)}<br />{item.appointment_time}
                <p className="mt-2 text-xs font-normal text-slate-500">Criado em {new Date(item.created_at).toLocaleString('pt-BR')}</p>
              </div>
              <select className="admin-input" value={item.status} onChange={(event) => updateAppointmentStatus(item.id, event.target.value as AppointmentStatus)}>
                {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
              </select>
              <button className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100" onClick={() => deleteAppointment(item.id)} aria-label="Excluir">
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className="rounded-lg bg-white p-8 text-center text-slate-600">Nenhum agendamento encontrado.</div>}
      </div>
    </AdminPage>
  );
}
