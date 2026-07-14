import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageLoader } from './components/PageLoader';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { AdminLayout } from './layouts/AdminLayout';
import { PublicLayout } from './layouts/PublicLayout';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const NewspaperPage = lazy(() => import('./pages/NewspaperPage').then((module) => ({ default: module.NewspaperPage })));
const NewspaperDetailPage = lazy(() => import('./pages/NewspaperDetailPage').then((module) => ({ default: module.NewspaperDetailPage })));
const ActionsPage = lazy(() => import('./pages/ActionsPage').then((module) => ({ default: module.ActionsPage })));
const SocialActionDetailPage = lazy(() => import('./pages/SocialActionDetailPage').then((module) => ({ default: module.SocialActionDetailPage })));
const AppointmentPage = lazy(() => import('./pages/AppointmentPage').then((module) => ({ default: module.AppointmentPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })));
const AdminAppointmentsPage = lazy(() => import('./pages/admin/AdminAppointmentsPage').then((module) => ({ default: module.AdminAppointmentsPage })));
const AdminNewspapersPage = lazy(() => import('./pages/admin/AdminNewspapersPage').then((module) => ({ default: module.AdminNewspapersPage })));
const AdminActionsPage = lazy(() => import('./pages/admin/AdminActionsPage').then((module) => ({ default: module.AdminActionsPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then((module) => ({ default: module.AdminSettingsPage })));

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader dark />;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Suspense fallback={<PageLoader dark />}>
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
              <Route path="*" element={<NotFoundPage />} />
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
          </Routes>
        </Suspense>
      </DataProvider>
    </AuthProvider>
  );
}
