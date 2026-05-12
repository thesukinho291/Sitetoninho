import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useData } from '../../contexts/DataContext';
import { uploadPublicFile } from '../../lib/dataService';
import { SiteSettings } from '../../types';
import { AdminPage } from './AdminDashboardPage';

export function AdminSettingsPage() {
  const { settings, saveSettings } = useData();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <AdminPage title="Configurações" subtitle="Edite contatos, textos públicos, imagem principal e mensagem pós-agendamento.">
      <form onSubmit={submit} className="max-w-3xl rounded-lg bg-white p-5 shadow-sm">
        <Field label="Instagram" value={form.instagram_url} onChange={(value) => setForm({ ...form, instagram_url: value })} />
        <Field label="E-mail" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Telefone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <Field label="Endereço/localização do gabinete" value={form.office_location} onChange={(value) => setForm({ ...form, office_location: value })} />
        <Field label="Título da home" value={form.home_title} onChange={(value) => setForm({ ...form, home_title: value })} />
        <Field label="Texto da home" value={form.home_subtitle} onChange={(value) => setForm({ ...form, home_subtitle: value })} textarea />
        <Field label="Imagem principal da home (URL)" value={form.home_image_url} onChange={(value) => setForm({ ...form, home_image_url: value })} />
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Upload da imagem principal
          <input className="admin-input" type="file" accept="image/*" onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) setForm({ ...form, home_image_url: await uploadPublicFile('site-assets', file, 'home') });
          }} />
        </label>
        <Field label="Mensagem exibida após agendamento" value={form.appointment_success_message} onChange={(value) => setForm({ ...form, appointment_success_message: value })} textarea />
        <div className="mt-5 flex items-center gap-4">
          <Button type="submit">Salvar configurações</Button>
          {saved && <span className="text-sm font-bold text-civic-green">Configurações salvas.</span>}
        </div>
      </form>
    </AdminPage>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold">
      {label}
      {textarea ? (
        <textarea className="admin-input min-h-28" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="admin-input" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
