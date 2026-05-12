import { addDays, endOfWeek, format, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function todayDate() {
  return startOfDay(new Date());
}

export function toDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function brDate(dateKey: string) {
  return format(parseISO(dateKey), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function shortDate(dateKey: string) {
  return format(parseISO(dateKey), 'dd/MM/yyyy');
}

export function isPastDay(date: Date) {
  return isBefore(startOfDay(date), todayDate());
}

export function getWeekLimit() {
  return endOfWeek(addDays(new Date(), 6), { weekStartsOn: 1 });
}

export function isTodayKey(dateKey: string) {
  return isSameDay(parseISO(dateKey), new Date());
}
