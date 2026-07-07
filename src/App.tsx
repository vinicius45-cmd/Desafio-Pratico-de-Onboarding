import React from 'react';
import AppProvider, { useApp } from './app/AppProvider';
import { Button } from './components/Button';
import { ContentArea } from './components/ContentArea';
import { Headerbar } from './components/Headerbar';
import { Sidebar } from './components/Sidebar';
import { useAuth } from './hooks/useAuth';
import { useModules } from './hooks/useModules';
import { useSemAcesso } from './hooks/useSemAcesso';
import { LoginScreen } from './screens/LoginScreen';
import { ShieldAlert } from 'lucide-react';

const LoadingSpinner: React.FC = () => (
  <div className="app-loading">
    <div className="app-loading__spinner" />
    <span>Carregando módulo...</span>
  </div>
);

const LockScreen: React.FC = () => {
  const { usuario, fazerLogout } = useAuth();

  return (
    <div className="lock-screen">
      <div className="lock-screen__card glassmorphism animate-scale-up">
        <div className="lock-screen__icon">
          <ShieldAlert size={36} />
        </div>
        <h2>Acesso não Autorizado</h2>
        <p>
          Olá, <strong>{usuario?.nome}</strong>. Sua autenticação com o LDAP ocorreu com sucesso,
          mas você não possui perfis ou permissões de módulos configurados no CDP.
        </p>
        <div className="lock-screen__notice">
          Entre em contato com o administrador do sistema para liberar seu perfil.
        </div>
        <Button variant="danger" style={{ width: '100%' }} onClick={fazerLogout}>
          Voltar para o Login
        </Button>
      </div>
    </div>
  );
};

const MainLayoutShell: React.FC = () => {
  const { modulos } = useModules();
  const { activeModuleId, activeSubMenuId } = useApp();

  const activeModule = modulos.find((module) => module.id === activeModuleId);
  const activeSubmenu = activeModule?.subMenus?.find((submenu) => submenu.id === activeSubMenuId);
  const ViewComponent = activeSubmenu ? activeSubmenu.componente : activeModule?.componente ?? null;

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-shell__workspace">
        <Headerbar />
        <ContentArea fallback={<LoadingSpinner />} viewComponent={ViewComponent} />
        <footer className="app-footer">
          Secretaria de Estado de Mobilidade do Distrito Federal • SEMOB-DF • 2026
        </footer>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { estaAutenticado } = useAuth();
  const { bloqueado } = useSemAcesso();

  if (!estaAutenticado) {
    return <LoginScreen />;
  }

  if (bloqueado) {
    return <LockScreen />;
  }

  return <MainLayoutShell />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
