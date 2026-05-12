import { addDays, endOfWeek, format, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BRAZIL_TIME_ZONE = 'America/Sao_Paulo';

function saoPauloParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BRAZIL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function timeToMinutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export function todayDate() {
  return parseDateKey(todayDateKey());
}

export function toDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function parseDateKey(dateKey: string) {
  return startOfDay(new Date(`${dateKey}T00:00:00`));
}

export function todayDateKey(now = new Date()) {
  const parts = saoPauloParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function brDate(dateKey: string) {
  return format(parseISO(dateKey), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function shortDate(dateKey: string) {
  return format(parseISO(dateKey), 'dd/MM/yyyy');
}

export function isPastDate(date: Date | string, now = new Date()) {
  const dateKey = typeof date === 'string' ? date : toDateKey(date);
  return dateKey < todayDateKey(now);
}

export function isPastDay(date: Date) {
  return isPastDate(date);
}

export function getWeekLimit() {
  return endOfWeek(addDays(new Date(), 6), { weekStartsOn: 1 });
}

export function isToday(date: Date | string, now = new Date()) {
  const dateKey = typeof date === 'string' ? date : toDateKey(date);
  return dateKey === todayDateKey(now);
}

export function isTodayKey(dateKey: string) {
  return isToday(dateKey);
}

export function isPastTimeForToday(date: Date | string, time: string, now = new Date()) {
  if (!isToday(date, now)) return false;
  const parts = saoPauloParts(now);
  const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
  return timeToMinutes(time) <= currentMinutes;
}
