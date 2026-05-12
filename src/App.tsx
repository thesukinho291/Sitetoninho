import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { ActionsPage } from './pages/ActionsPage';
import { AdminActionsPage } from './pages/admin/AdminActionsPage';
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminNewspapersPage } from './pages/admin/AdminNewspapersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NewspaperDetailPage } from './pages/NewspaperDetailPage';
import { NewspaperPage } from './pages/NewspaperPage';
import { SocialActionDetailPage } from './pages/SocialActionDetailPage';
import { AboutPage } from './pages/AboutPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-950 text-white grid place-items-center">Carregando painel...</div>;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/jornal" element={<NewspaperPage />} />
            <Route path="/jornal/:id" element={<NewspaperDetailPage />} />
            <Route path="/acoes" element={<ActionsPage />} />
            <Route path="/acoes/:id" element={<SocialActionDetailPage />} />
            <Route path="/agendamento" element={<AppointmentPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Route>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="agendamentos" element={<AdminAppointmentsPage />} />
            <Route path="jornal" element={<AdminNewspapersPage />} />
            <Route path="acoes" element={<AdminActionsPage />} />
            <Route path="configuracoes" element={<AdminSettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}
