import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  mockMode: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!isSupabaseConfigured && sessionStorage.getItem('tc_admin') === 'true');
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      loading,
      mockMode: !isSupabaseConfigured,
      async signIn(email: string, password: string) {
        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          setIsAuthenticated(true);
          return;
        }
        if (!email || !password) throw new Error('Informe e-mail e senha.');
        sessionStorage.setItem('tc_admin', 'true');
        setIsAuthenticated(true);
      },
      async signOut() {
        if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
        sessionStorage.removeItem('tc_admin');
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return ctx;
}
