import { addDays, format, parseISO, startOfMonth } from 'date-fns';
import { APPOINTMENT_TIMES } from './constants';
import { defaultSettings, mockActions, mockAppointments, mockNewspapers } from './mockData';
import { isSupabaseConfigured, supabase } from './supabase';
import { readStore, writeStore } from './storage';
import { Appointment, AppointmentStatus, NewspaperEdition, SiteSettings, SocialAction } from '../types';

const keys = {
  appointments: 'tc_appointments',
  newspapers: 'tc_newspapers',
  actions: 'tc_actions',
  settings: 'tc_settings',
};

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export async function getSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
    if (data) return { ...defaultSettings, ...data };
  }
  return readStore(keys.settings, defaultSettings);
}

export async function saveSettings(settings: SiteSettings) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('settings').upsert({ id: 1, ...settings });
    if (error) throw error;
  }
  writeStore(keys.settings, settings);
}

export async function getAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true });
    if (error) {
      const { data: slots, error: slotError } = await supabase
        .from('appointment_slots')
        .select('appointment_date, appointment_time')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });
      if (slotError) throw error;
      return (slots ?? []).map((slot: any) => ({
        id: `${slot.appointment_date}-${slot.appointment_time}`,
        full_name: '',
        phone: '',
        neighborhood: '',
        subject: '',
        description: '',
        appointment_date: slot.appointment_date,
        appointment_time: slot.appointment_time,
        status: 'confirmado',
        consent: true,
        created_at: new Date().toISOString(),
      }));
    }
    return data ?? [];
  }
  return readStore(keys.appointments, mockAppointments);
}

export async function createAppointment(input: Omit<Appointment, 'id' | 'created_at' | 'status'>) {
  const appointment: Appointment = {
    ...input,
    id: newId(),
    status: 'aguardando contato',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('appointments').insert(appointment);
    if (error) throw error;
    return appointment;
  }

  const current = await getAppointments();
  writeStore(keys.appointments, [...current, appointment]);
  return appointment;
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (error) throw error;
  }
  const current = await getAppointments();
  writeStore(
    keys.appointments,
    current.map((item) => (item.id === id ? { ...item, status } : item)),
  );
}

export async function deleteAppointment(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) throw error;
  }
  writeStore(
    keys.appointments,
    (await getAppointments()).filter((item) => item.id !== id),
  );
}

export async function getNewspapers(includeDrafts = false): Promise<NewspaperEdition[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('newspaper_editions').select('*').order('edition_date', { ascending: false });
    if (!includeDrafts) query = query.eq('status', 'publicado');
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }
  const items = readStore(keys.newspapers, mockNewspapers);
  return includeDrafts ? items : items.filter((item) => item.status === 'publicado');
}

export async function saveNewspaper(input: NewspaperEdition) {
  const item = { ...input, id: input.id || newId(), created_at: input.created_at || new Date().toISOString() };
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('newspaper_editions').upsert(item);
    if (error) throw error;
  }
  const current = await getNewspapers(true);
  writeStore(keys.newspapers, current.some((n) => n.id === item.id) ? current.map((n) => (n.id === item.id ? item : n)) : [item, ...current]);
}

export async function deleteNewspaper(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('newspaper_editions').delete().eq('id', id);
    if (error) throw error;
  }
  writeStore(keys.newspapers, (await getNewspapers(true)).filter((item) => item.id !== id));
}

export async function getSocialActions(includeDrafts = false): Promise<SocialAction[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('social_actions').select('*, gallery_images(image_url)').order('action_date', { ascending: false });
    if (!includeDrafts) query = query.eq('status', 'publicado');
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((item: any) => ({
      ...item,
      image_urls: item.image_urls ?? item.gallery_images?.map((image: any) => image.image_url) ?? [],
    }));
  }
  const items = readStore(keys.actions, mockActions);
  return includeDrafts ? items : items.filter((item) => item.status === 'publicado');
}

export async function saveSocialAction(input: SocialAction) {
  const item = { ...input, id: input.id || newId(), created_at: input.created_at || new Date().toISOString() };
  if (isSupabaseConfigured && supabase) {
    const { image_urls, ...payload } = item;
    const { error } = await supabase.from('social_actions').upsert(payload);
    if (error) throw error;
    await supabase.from('gallery_images').delete().eq('social_action_id', item.id);
    if (image_urls.length) {
      await supabase.from('gallery_images').insert(image_urls.map((image_url) => ({ social_action_id: item.id, image_url })));
    }
  }
  const current = await getSocialActions(true);
  writeStore(keys.actions, current.some((n) => n.id === item.id) ? current.map((n) => (n.id === item.id ? item : n)) : [item, ...current]);
}

export async function deleteSocialAction(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('social_actions').delete().eq('id', id);
    if (error) throw error;
  }
  writeStore(keys.actions, (await getSocialActions(true)).filter((item) => item.id !== id));
}

export function getAvailableTimes(dateKey: string, appointments: Appointment[]) {
  const busy = new Set(
    appointments
      .filter((item) => item.appointment_date === dateKey && item.status !== 'cancelado')
      .map((item) => item.appointment_time),
  );
  return APPOINTMENT_TIMES.filter((time) => !busy.has(time));
}

export function isDateBookable(date: Date, appointments: Appointment[]) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  if (date < monthStart || format(date, 'yyyy-MM-dd') < format(today, 'yyyy-MM-dd')) return false;
  return getAvailableTimes(format(date, 'yyyy-MM-dd'), appointments).length > 0;
}

export function buildCalendarDays(monthDate: Date) {
  const start = startOfMonth(monthDate);
  const startWeekDay = start.getDay();
  const days: Date[] = [];
  for (let i = 0; i < startWeekDay; i += 1) days.push(addDays(start, -startWeekDay + i));
  for (let i = 0; i < 42; i += 1) days.push(addDays(start, i));
  return days.slice(0, 42);
}

export async function uploadPublicFile(bucket: string, file: File, pathPrefix: string) {
  if (!isSupabaseConfigured || !supabase) {
    return URL.createObjectURL(file);
  }
  const path = `${pathPrefix}/${newId()}-${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
