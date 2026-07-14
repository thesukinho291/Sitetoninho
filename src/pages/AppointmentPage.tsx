import { addMonths, format, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LockKeyhole,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { Button, ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { buildCalendarDays, getAvailableTimes, isDateBookable } from '../lib/dataService';
import { isPastTimeForToday, todayDate, toDateKey } from '../lib/date';

type Step = 'data' | 'horario' | 'dados' | 'confirmacao';

const steps: { key: Step; label: string }[] = [
  { key: 'data', label: 'Data' },
  { key: 'horario', label: 'Horário' },
  { key: 'dados', label: 'Seus dados' },
];

export function AppointmentPage() {
  const { appointments, createAppointment, settings } = useData();
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState<Step>('data');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ full_name: '', phone: '', neighborhood: '', subject: '', description: '', consent: false });
  const days = useMemo(() => buildCalendarDays(month), [month]);
  const times = selectedDate ? getAvailableTimes(selectedDate, appointments) : [];
  const canGoPrev = startOfMonth(subMonths(month, 1)) >= startOfMonth(todayDate());
  const selectedDateLabel = selectedDate ? format(new Date(`${selectedDate}T12:00:00`), "EEEE, dd 'de' MMMM", { locale: ptBR }) : '';
  const currentStepIndex = Math.max(0, steps.findIndex((item) => item.key === step));

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!selectedDate || !selectedTime || !form.consent || submitting) return;
    setError('');
    if (!getAvailableTimes(selectedDate, appointments).includes(selectedTime as never)) {
      setError('Este horário acabou de ficar indisponível. Escolha outro para continuar.');
      setStep('horario');
      return;
    }
    setSubmitting(true);
    try {
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
    } catch {
      setError('Não foi possível reservar este horário. Volte e escolha outra opção.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <>
        <PageHero eyebrow="Solicitação recebida" title="Agora é com a nossa equipe" subtitle="Registramos seus dados e o horário solicitado. A confirmação será feita pelo telefone informado." />
        <Section className="bg-civic-cream">
          <Reveal className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-civic-green/20 bg-white p-7 text-center shadow-soft sm:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-2 bg-civic-green" />
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-civic-green text-white shadow-[0_16px_36px_rgba(22,135,95,0.25)]"><Check size={36} /></span>
              <h1 className="mt-7 font-display text-3xl uppercase leading-none text-civic-ink sm:text-4xl">Solicitação enviada</h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">{settings.appointment_success_message}</p>
              <div className="mx-auto mt-8 grid max-w-xl gap-3 rounded-2xl bg-civic-cream p-5 text-left sm:grid-cols-2">
                <div><span className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-slate-400">Data solicitada</span><strong className="mt-1 block capitalize text-civic-ink">{selectedDateLabel}</strong></div>
                <div><span className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-slate-400">Horário</span><strong className="mt-1 block text-civic-ink">{selectedTime}</strong></div>
                <div className="sm:col-span-2"><span className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-slate-400">Contato para confirmação</span><strong className="mt-1 block text-civic-ink">{form.phone}</strong></div>
              </div>
              <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-slate-500">A data, o horário e o local ainda serão confirmados pela equipe. Mantenha o telefone informado disponível.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink to="/" variant="dark">Voltar para o início</ButtonLink>
                <ButtonLink to="/acoes">Acompanhar ações <ArrowRight size={17} /></ButtonLink>
              </div>
            </div>
          </Reveal>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Atendimento ao cidadão"
        title="Fale com o gabinete"
        subtitle="Escolha uma data e envie sua solicitação. A equipe entrará em contato para confirmar horário e local."
        aside={
          <div className="glass-card w-72 rounded-[1.75rem] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-civic-yellow">Como funciona</p>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <span className="flex items-center gap-3"><CalendarDays size={17} /> Escolha uma data</span>
              <span className="flex items-center gap-3"><MessageCircle size={17} /> Conte sua demanda</span>
              <span className="flex items-center gap-3"><PhoneCall size={17} /> Aguarde a confirmação</span>
            </div>
          </div>
        }
      />

      <Section className="bg-civic-cream">
        <div className="mx-auto max-w-6xl">
          <ol className="mb-8 grid grid-cols-3 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-[0_8px_24px_rgba(7,20,38,0.05)]">
            {steps.map((item, index) => {
              const active = step === item.key;
              const completed = index < currentStepIndex;
              return (
                <li key={item.key} className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl px-2 text-xs font-extrabold transition sm:text-sm ${active ? 'bg-civic-ink text-white shadow-dark' : completed ? 'text-civic-blue' : 'text-slate-400'}`} aria-current={active ? 'step' : undefined}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full text-[0.65rem] ${active ? 'bg-civic-yellow text-civic-ink' : completed ? 'bg-civic-blue text-white' : 'bg-slate-100'}`}>{completed ? <Check size={13} /> : index + 1}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </li>
              );
            })}
          </ol>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start">
            <div className={`${step !== 'data' ? 'hidden lg:block' : ''} rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(7,20,38,0.07)] sm:p-7`}>
              <div className="mb-6 flex items-center justify-between gap-3">
                <button disabled={!canGoPrev} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-civic-ink transition hover:border-civic-blue hover:text-civic-blue disabled:cursor-not-allowed disabled:opacity-30" onClick={() => setMonth(subMonths(month, 1))} aria-label="Mês anterior">
                  <ChevronLeft size={20} />
                </button>
                <div className="text-center">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-civic-blue">Escolha uma data</span>
                  <h2 className="mt-1 text-lg font-extrabold capitalize text-civic-ink sm:text-xl">{format(month, 'MMMM yyyy', { locale: ptBR })}</h2>
                </div>
                <button className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-civic-ink transition hover:border-civic-blue hover:text-civic-blue" onClick={() => setMonth(addMonths(month, 1))} aria-label="Próximo mês">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[0.62rem] font-extrabold uppercase tracking-wide text-slate-400 sm:gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => <span className="py-2" key={day}>{day}</span>)}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1.5 sm:gap-2">
                {days.map((day) => {
                  const key = toDateKey(day);
                  const inMonth = isSameMonth(day, month);
                  const bookable = inMonth && isDateBookable(day, appointments);
                  const selected = key === selectedDate;
                  return (
                    <button
                      key={key}
                      disabled={!bookable}
                      aria-label={format(day, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      aria-pressed={selected}
                      onClick={() => {
                        setSelectedDate(key);
                        setSelectedTime('');
                        setError('');
                        setStep('horario');
                      }}
                      className={`aspect-square rounded-xl text-xs font-extrabold transition duration-300 sm:rounded-2xl sm:text-sm ${selected ? 'bg-civic-blue text-white shadow-blue' : bookable ? 'bg-civic-cream text-civic-ink hover:-translate-y-0.5 hover:bg-civic-yellow' : inMonth ? 'bg-slate-50 text-slate-300' : 'bg-transparent text-slate-200'}`}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-xs text-slate-500">
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-md bg-civic-cream ring-1 ring-slate-200" /> Disponível</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-md bg-civic-blue" /> Selecionada</span>
                <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-md bg-slate-100" /> Indisponível</span>
              </div>
            </div>

            <div className={`${step === 'data' ? 'hidden lg:block' : ''} rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(7,20,38,0.07)] sm:p-7`}>
              {step === 'data' && (
                <div className="py-6 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-civic-blue/[0.08] text-civic-blue"><CalendarCheck size={30} /></span>
                  <h2 className="mt-5 font-display text-2xl uppercase text-civic-ink">Comece pelo calendário</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500">As datas em destaque ainda têm pelo menos um horário disponível.</p>
                </div>
              )}

              {step === 'horario' && (
                <div>
                  <button onClick={() => setStep('data')} className="mb-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 transition hover:text-civic-blue"><ArrowLeft size={16} /> Alterar data</button>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-civic-blue">Horários disponíveis</p>
                  <h2 className="mt-2 font-display text-2xl uppercase leading-none text-civic-ink">{selectedDateLabel}</h2>
                  <div className="mt-6 grid gap-3">
                    {['10:30', '13:30', '15:30'].map((time) => {
                      const available = times.includes(time as never);
                      const pastTime = selectedDate ? isPastTimeForToday(selectedDate, time) : false;
                      return (
                        <button
                          key={time}
                          disabled={!selectedDate || !available}
                          onClick={() => { setSelectedTime(time); setError(''); setStep('dados'); }}
                          className={`group flex min-h-16 items-center justify-between rounded-2xl border px-5 text-left transition ${selectedTime === time ? 'border-civic-blue bg-civic-blue text-white shadow-blue' : available ? 'border-slate-200 bg-civic-cream text-civic-ink hover:border-civic-yellow hover:bg-civic-yellow' : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-350 opacity-55'}`}
                        >
                          <span className="flex items-center gap-3"><Clock3 size={19} /> <strong>{time}</strong></span>
                          <span className="text-xs font-bold">{available ? 'Selecionar' : pastTime ? 'Já passou' : 'Indisponível'}</span>
                        </button>
                      );
                    })}
                  </div>
                  {times.length === 0 && <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">Não há horários livres nesta data. Volte ao calendário e escolha outro dia.</p>}
                </div>
              )}

              {step === 'dados' && (
                <form onSubmit={submit} className="grid gap-4">
                  <button type="button" onClick={() => setStep('horario')} className="mb-1 inline-flex w-fit items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 transition hover:text-civic-blue"><ArrowLeft size={16} /> Alterar horário</button>
                  <div>
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-civic-blue">Para concluir</p>
                    <h2 className="mt-2 font-display text-2xl uppercase leading-none text-civic-ink">Conte como podemos ajudar</h2>
                  </div>

                  <Input label="Nome completo" value={form.full_name} onChange={(value) => setForm({ ...form, full_name: value })} autoComplete="name" required />
                  <Input label="Telefone com DDD" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9()+\-\s]{10,20}" placeholder="(15) 99999-9999" required />
                  <Input label="Bairro" value={form.neighborhood} onChange={(value) => setForm({ ...form, neighborhood: value })} autoComplete="address-level3" required />
                  <Input label="Assunto do atendimento" value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} placeholder="Ex.: esporte, zeladoria, saúde" required />
                  <label className="grid gap-2 text-sm font-extrabold text-slate-700">
                    Descrição do pedido <span className="sr-only">obrigatório</span>
                    <textarea className="field-control min-h-32 resize-y font-medium" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Explique sua demanda com as informações que considerar importantes." required />
                  </label>

                  <div className="rounded-2xl bg-civic-cream p-4">
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-slate-400">Resumo da solicitação</p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold text-civic-ink"><span className="capitalize">{selectedDateLabel}</span><span>{selectedTime}</span></div>
                  </div>

                  <label className="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 transition hover:border-civic-blue/30">
                    <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} required className="mt-1 h-5 w-5 shrink-0 accent-civic-blue" />
                    <span><strong className="text-civic-ink">Autorizo o contato da equipe</strong> e o uso dos meus dados exclusivamente para tratar esta solicitação de atendimento.</span>
                  </label>
                  <p className="flex items-start gap-2 text-xs leading-5 text-slate-500"><LockKeyhole size={14} className="mt-0.5 shrink-0 text-civic-green" /> Seus dados serão usados apenas para este atendimento, conforme a LGPD.</p>
                  <p aria-live="polite" className="text-sm font-bold text-red-600">{error}</p>
                  <Button type="submit" disabled={!selectedDate || !selectedTime || !form.consent || submitting} className="w-full">
                    {submitting ? 'Enviando solicitação…' : 'Enviar solicitação'} {!submitting && <ArrowRight size={18} />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Antes de enviar" title="O que acontece depois?">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: MessageCircle, title: 'Recebemos sua demanda', text: 'A solicitação entra no fluxo de atendimento do gabinete com as informações enviadas.' },
            { icon: PhoneCall, title: 'A equipe faz contato', text: 'Você recebe uma ligação ou mensagem para confirmar data, horário e local.' },
            { icon: CalendarCheck, title: 'Atendimento confirmado', text: 'Somente depois do contato da equipe o atendimento estará confirmado.' },
          ].map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="premium-card h-full p-6 sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-civic-blue/[0.08] text-civic-blue"><Icon size={23} /></span>
                <h3 className="mt-5 font-display text-xl uppercase text-civic-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  type = 'text',
  inputMode,
  autoComplete,
  pattern,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  autoComplete?: string;
  pattern?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-slate-700">
      {label}{required && <span className="sr-only">obrigatório</span>}
      <input
        className="field-control font-medium"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        pattern={pattern}
        placeholder={placeholder}
      />
    </label>
  );
}
