/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createAppointment,
  deleteAppointment,
  deleteNewspaper,
  deleteSocialAction,
  getAppointments,
  getNewspapers,
  getSettings,
  getSocialActions,
  saveNewspaper,
  saveSettings,
  saveSocialAction,
  updateAppointmentStatus,
} from '../lib/dataService';
import { Appointment, AppointmentStatus, NewspaperEdition, SiteSettings, SocialAction } from '../types';
import { defaultSettings } from '../lib/mockData';

type DataContextValue = {
  loading: boolean;
  settings: SiteSettings;
  appointments: Appointment[];
  newspapers: NewspaperEdition[];
  actions: SocialAction[];
  refresh: () => Promise<void>;
  createAppointment: typeof createAppointment;
  updateAppointmentStatus: typeof updateAppointmentStatus;
  deleteAppointment: typeof deleteAppointment;
  saveNewspaper: typeof saveNewspaper;
  deleteNewspaper: typeof deleteNewspaper;
  saveSocialAction: typeof saveSocialAction;
  deleteSocialAction: typeof deleteSocialAction;
  saveSettings: typeof saveSettings;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newspapers, setNewspapers] = useState<NewspaperEdition[]>([]);
  const [actions, setActions] = useState<SocialAction[]>([]);

  async function refresh() {
    setLoading(true);
    const [settingsResult, appointmentResult, newspaperResult, actionResult] = await Promise.allSettled([
      getSettings(),
      getAppointments(),
      getNewspapers(true),
      getSocialActions(true),
    ]);
    if (settingsResult.status === 'fulfilled') setSettings(settingsResult.value);
    if (appointmentResult.status === 'fulfilled') setAppointments(appointmentResult.value);
    if (newspaperResult.status === 'fulfilled') setNewspapers(newspaperResult.value);
    if (actionResult.status === 'fulfilled') setActions(actionResult.value);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo<DataContextValue>(
    () => ({
      loading,
      settings,
      appointments,
      newspapers,
      actions,
      refresh,
      async createAppointment(input) {
        const result = await createAppointment(input);
        await refresh();
        return result;
      },
      async updateAppointmentStatus(id: string, status: AppointmentStatus) {
        await updateAppointmentStatus(id, status);
        await refresh();
      },
      async deleteAppointment(id: string) {
        await deleteAppointment(id);
        await refresh();
      },
      async saveNewspaper(input: NewspaperEdition) {
        await saveNewspaper(input);
        await refresh();
      },
      async deleteNewspaper(id: string) {
        await deleteNewspaper(id);
        await refresh();
      },
      async saveSocialAction(input: SocialAction) {
        await saveSocialAction(input);
        await refresh();
      },
      async deleteSocialAction(id: string) {
        await deleteSocialAction(id);
        await refresh();
      },
      async saveSettings(input: SiteSettings) {
        await saveSettings(input);
        await refresh();
      },
    }),
    [loading, settings, appointments, newspapers, actions],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData precisa estar dentro de DataProvider');
  return ctx;
}
