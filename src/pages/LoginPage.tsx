import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { signIn, isAuthenticated, mockMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      setError('');
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    }
  }

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-8 text-slate-900 shadow-soft">
        <span className="grid h-14 w-14 place-items-center rounded-lg bg-civic-blue text-xl font-black text-white">TC</span>
        <h1 className="mt-6 text-3xl font-black text-civic-ink">Acesso da equipe</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{mockMode ? 'Modo demonstração: informe qualquer e-mail e senha.' : 'Entre com o usuário cadastrado no Supabase Auth.'}</p>
        <label className="mt-6 grid gap-2 text-sm font-bold">
          E-mail
          <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-civic-blue" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Senha
          <input className="rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-civic-blue" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <Button className="mt-6 w-full" type="submit">Entrar</Button>
      </form>
    </main>
  );
}
