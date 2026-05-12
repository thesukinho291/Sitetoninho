import { addMonths, format, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { buildCalendarDays, getAvailableTimes, isDateBookable } from '../lib/dataService';
import { todayDate, toDateKey } from '../lib/date';

type Step = 'data' | 'horario' | 'dados' | 'confirmacao';

export function AppointmentPage() {
  const { appointments, createAppointment, settings } = useData();
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState<Step>('data');
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', neighborhood: '', subject: '', description: '', consent: false });
  const days = useMemo(() => buildCalendarDays(month), [month]);
  const times = selectedDate ? getAvailableTimes(selectedDate, appointments) : [];
  const canGoPrev = startOfMonth(subMonths(month, 1)) >= startOfMonth(todayDate());

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!selectedDate || !selectedTime || !form.consent) return;
    await createAppointment({
      full_name: form.full_name,
      phone: form.phone,
      neighborhood: form.neighborhood,
      subject: form.subject,
      description: form.description,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      consent: form.consent,
    });
    setDone(true);
    setStep('confirmacao');
  }

  if (done) {
    return (
      <Section className="bg-white">
        <div className="mx-auto max-w-2xl rounded-lg bg-slate-50 p-8 text-center shadow-soft">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-civic-green text-white"><Check size={30} /></span>
          <h1 className="mt-6 text-3xl font-black text-civic-ink">Solicitação enviada</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{settings.appointment_success_message}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-white" eyebrow="Agendamento" title="Atendimento no gabinete" subtitle="Escolha uma data e um horário disponível. A solicitação será enviada como aguardando contato da equipe.">
      <div className="mb-6 grid grid-cols-4 gap-2 rounded-lg bg-slate-100 p-2 md:hidden">
        {['data', 'horario', 'dados', 'confirmacao'].map((item, index) => (
          <div key={item} className={`rounded-md px-2 py-2 text-center text-xs font-bold ${step === item ? 'bg-civic-blue text-white' : 'text-slate-500'}`}>{index + 1}</div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className={`${step !== 'data' ? 'hidden md:block' : ''} rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <button disabled={!canGoPrev} className="grid h-10 w-10 place-items-center rounded-lg bg-white disabled:opacity-40" onClick={() => setMonth(subMonths(month, 1))} aria-label="Mês anterior">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-black capitalize text-civic-ink">{format(month, 'MMMM yyyy', { locale: ptBR })}</h2>
            <button className="grid h-10 w-10 place-items-center rounded-lg bg-white" onClick={() => setMonth(addMonths(month, 1))} aria-label="Próximo mês">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase text-slate-500">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {days.map((day) => {
              const key = toDateKey(day);
              const bookable = isSameMonth(day, month) && isDateBookable(day, appointments);
              const selected = key === selectedDate;
              return (
                <button
                  key={key}
                  disabled={!bookable}
                  onClick={() => {
                    setSelectedDate(key);
                    setSelectedTime('');
                    setStep('horario');
                  }}
                  className={`aspect-square rounded-lg text-sm font-black transition ${selected ? 'bg-civic-blue text-white' : bookable ? 'bg-white text-civic-ink hover:bg-civic-yellow' : 'bg-transparent text-slate-300 opacity-45'}`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className={step !== 'horario' && step !== 'dados' ? 'hidden md:block' : ''}>
            <h2 className="text-xl font-black text-civic-ink">Horários disponíveis</h2>
            <p className="mt-1 text-sm text-slate-500">{selectedDate ? format(new Date(`${selectedDate}T12:00:00`), 'dd/MM/yyyy') : 'Escolha uma data no calendário.'}</p>
            <div className="mt-4 grid gap-3">
              {['10:30', '13:30', '15:30'].map((time) => {
                const available = times.includes(time as any);
                return (
                  <button key={time} disabled={!selectedDate || !available} onClick={() => { setSelectedTime(time); setStep('dados'); }} className={`rounded-lg border px-4 py-4 text-left font-black ${selectedTime === time ? 'border-civic-blue bg-civic-blue text-white' : available ? 'border-slate-200 bg-slate-50 text-civic-ink hover:border-civic-yellow' : 'border-slate-100 bg-slate-100 text-slate-400'}`}>
                    {time} {available ? '' : 'indisponível'}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={submit} className={`${step !== 'dados' ? 'hidden md:block' : ''} mt-7 grid gap-4`}>
            <h2 className="text-xl font-black text-civic-ink">Dados do atendimento</h2>
            <Input label="Nome completo" value={form.full_name} onChange={(value) => setForm({ ...form, full_name: value })} required />
            <Input label="Telefone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
            <Input label="Bairro" value={form.neighborhood} onChange={(value) => setForm({ ...form, neighborhood: value })} required />
            <Input label="Assunto do atendimento" value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} required />
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Descrição do pedido
              <textarea className="min-h-28 rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-civic-blue" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            </label>
            <label className="flex gap-3 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} required className="mt-1 h-5 w-5" />
              autorizo o uso dos meus dados para contato da equipe do gabinete sobre este agendamento.
            </label>
            <p className="text-xs leading-5 text-slate-500">Os dados informados serão usados apenas para tratar esta solicitação de atendimento, conforme a LGPD.</p>
            <Button type="submit" disabled={!selectedDate || !selectedTime}>Confirmar solicitação</Button>
          </form>
        </div>
      </div>
    </Section>
  );
}

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-civic-blue" value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}
