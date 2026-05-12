import { Pencil, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { SafeImage } from '../../components/SafeImage';
import { useData } from '../../contexts/DataContext';
import { CATEGORIES } from '../../lib/constants';
import { uploadPublicFile } from '../../lib/dataService';
import { imageBank } from '../../lib/mockData';
import { Category, SocialAction } from '../../types';
import { AdminPage } from './AdminDashboardPage';

const emptyAction: SocialAction = {
  id: '',
  title: '',
  description: '',
  action_date: new Date().toISOString().slice(0, 10),
  location: '',
  category: 'esporte',
  image_urls: [imageBank.corrida],
  status: 'rascunho',
  created_at: '',
};

export function AdminActionsPage() {
  const { actions, saveSocialAction, deleteSocialAction } = useData();
  const [editing, setEditing] = useState<SocialAction>(emptyAction);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await saveSocialAction(editing);
    setEditing(emptyAction);
  }

  return (
    <AdminPage title="Ações sociais" subtitle="Cadastre corridas, eventos, projetos e galerias de imagem.">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">{editing.id ? 'Editar ação' : 'Nova ação'}</h2>
          <Field label="Título" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required />
          <Field label="Descrição" value={editing.description} onChange={(value) => setEditing({ ...editing, description: value })} textarea required />
          <Field label="Data" type="date" value={editing.action_date} onChange={(value) => setEditing({ ...editing, action_date: value })} required />
          <Field label="Bairro/local" value={editing.location} onChange={(value) => setEditing({ ...editing, location: value })} required />
          <Field label="Imagens da galeria (uma URL por linha)" value={editing.image_urls.join('\n')} onChange={(value) => setEditing({ ...editing, image_urls: value.split('\n').filter(Boolean) })} textarea required />
          <FileField label="Adicionar imagem" onUpload={async (file) => setEditing({ ...editing, image_urls: [...editing.image_urls, await uploadPublicFile('social-action-images', file, 'gallery')] })} />
          <label className="mt-4 grid gap-2 text-sm font-bold">
            Categoria
            <select className="admin-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as Category })}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold">
            Status
            <select className="admin-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as SocialAction['status'] })}>
              <option value="publicado">publicado</option>
              <option value="rascunho">rascunho</option>
            </select>
          </label>
          <div className="mt-5 flex gap-3">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="dark" onClick={() => setEditing(emptyAction)}>Limpar</Button>
          </div>
        </form>
        <div className="grid gap-4">
          {actions.map((action) => (
            <article key={action.id} className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-[150px_1fr_auto]">
              <SafeImage src={action.image_urls[0]} alt={action.title} className="h-32 w-full rounded-lg" fallbackLabel={action.category} />
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-civic-blue">{action.status} • {action.category}</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{action.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{action.description}</p>
              </div>
              <div className="flex gap-2 md:flex-col">
                <button className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100" onClick={() => setEditing(action)} aria-label="Editar"><Pencil size={18} /></button>
                <button className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600" onClick={() => deleteSocialAction(action.id)} aria-label="Excluir"><Trash2 size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminPage>
  );
}

function FileField({ label, onUpload }: { label: string; onUpload: (file: File) => Promise<void> }) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold">
      {label}
      <input className="admin-input" type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />
    </label>
  );
}

function Field({ label, value, onChange, textarea, type = 'text', required }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; type?: string; required?: boolean }) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold">
      {label}
      {textarea ? (
        <textarea className="admin-input min-h-28" value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      ) : (
        <input className="admin-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
      )}
    </label>
  );
}
