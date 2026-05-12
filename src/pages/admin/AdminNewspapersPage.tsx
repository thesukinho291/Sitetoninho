import { Pencil, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { SafeImage } from '../../components/SafeImage';
import { useData } from '../../contexts/DataContext';
import { CATEGORIES } from '../../lib/constants';
import { uploadPublicFile } from '../../lib/dataService';
import { imageBank } from '../../lib/mockData';
import { Category, NewspaperEdition } from '../../types';
import { AdminPage } from './AdminDashboardPage';

const emptyEdition: NewspaperEdition = {
  id: '',
  title: '',
  description: '',
  edition_date: new Date().toISOString().slice(0, 10),
  cover_url: imageBank.jornal,
  pdf_url: '#',
  categories: ['esporte'],
  status: 'rascunho',
  created_at: '',
};

export function AdminNewspapersPage() {
  const { newspapers, saveNewspaper, deleteNewspaper } = useData();
  const [editing, setEditing] = useState<NewspaperEdition>(emptyEdition);

  async function submit(event: FormEvent) {
    event.preventDefault();
    await saveNewspaper(editing);
    setEditing(emptyEdition);
  }

  return (
    <AdminPage title="Jornal Atleta Cidadão" subtitle="Cadastre edições, capas, PDF, categorias e status de publicação.">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">{editing.id ? 'Editar edição' : 'Nova edição'}</h2>
          <Field label="Título" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value })} required />
          <Field label="Descrição" value={editing.description} onChange={(value) => setEditing({ ...editing, description: value })} textarea required />
          <Field label="Data" type="date" value={editing.edition_date} onChange={(value) => setEditing({ ...editing, edition_date: value })} required />
          <Field label="Imagem de capa (URL)" value={editing.cover_url} onChange={(value) => setEditing({ ...editing, cover_url: value })} required />
          <FileField label="Upload da capa" accept="image/*" onUpload={async (file) => setEditing({ ...editing, cover_url: await uploadPublicFile('newspaper-covers', file, 'covers') })} />
          <Field label="Arquivo PDF (URL)" value={editing.pdf_url} onChange={(value) => setEditing({ ...editing, pdf_url: value })} required />
          <FileField label="Upload do PDF" accept="application/pdf" onUpload={async (file) => setEditing({ ...editing, pdf_url: await uploadPublicFile('newspaper-pdfs', file, 'pdfs') })} />
          <label className="mt-4 grid gap-2 text-sm font-bold">
            Categorias
            <select className="admin-input" value={editing.categories[0]} onChange={(e) => setEditing({ ...editing, categories: [e.target.value as Category] })}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold">
            Status
            <select className="admin-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as NewspaperEdition['status'] })}>
              <option value="publicado">publicado</option>
              <option value="rascunho">rascunho</option>
            </select>
          </label>
          <div className="mt-5 flex gap-3">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="dark" onClick={() => setEditing(emptyEdition)}>Limpar</Button>
          </div>
        </form>
        <div className="grid gap-4">
          {newspapers.map((edition) => (
            <article key={edition.id} className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-[150px_1fr_auto]">
              <SafeImage src={edition.cover_url} alt={`Capa ${edition.title}`} className="h-32 w-full rounded-lg" fallbackLabel="Jornal" />
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-civic-blue">{edition.status}</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{edition.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{edition.description}</p>
              </div>
              <div className="flex gap-2 md:flex-col">
                <button className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100" onClick={() => setEditing(edition)} aria-label="Editar"><Pencil size={18} /></button>
                <button className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600" onClick={() => deleteNewspaper(edition.id)} aria-label="Excluir"><Trash2 size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminPage>
  );
}

function FileField({ label, accept, onUpload }: { label: string; accept: string; onUpload: (file: File) => Promise<void> }) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold">
      {label}
      <input className="admin-input" type="file" accept={accept} onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />
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
