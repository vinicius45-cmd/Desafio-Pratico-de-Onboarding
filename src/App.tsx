import React, { useState, Suspense } from 'react';
import AppProvider, { useApp } from './app/AppProvider';
import { useAuth } from './hooks/useAuth';
import { useModules } from './hooks/useModules';
import { useSemAcesso } from './hooks/useSemAcesso';
import { Sidebar } from './components/Sidebar';
import { Headerbar } from './components/Headerbar';
import { Button } from './components/Button';
import { ShieldAlert, KeyRound, User, Lock, ArrowRight } from 'lucide-react';

const LoadingSpinner: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', minHeight: '300px' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(59, 130, 246, 0.1)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Carregando módulo...</span>
  </div>
);

// Lock / Blocked Screen Component
const LockScreen: React.FC = () => {
  const { usuario, fazerLogout } = useAuth();
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--semob-bg)', padding: '1.5rem' }}>
      <div className="glassmorphism animate-scale-up" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem', borderRadius: '1.25rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', background: 'var(--semob-surface)', border: '1px solid var(--semob-border)' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', margin: '0 auto 1.5rem' }}>
          <ShieldAlert size={36} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--semob-text)', marginBottom: '0.75rem' }}>Acesso não Autorizado</h2>
        <p style={{ color: 'var(--semob-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Olá, <strong style={{ color: 'var(--semob-text)' }}>{usuario?.nome}</strong>. Sua autenticação com o LDAP ocorreu com sucesso, mas você não possui perfis ou permissões de módulos configurados no **CDP (Controle de Dados e Perfis)**.
        </p>
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444', borderRadius: '0.375rem', fontSize: '0.8rem', color: 'var(--semob-danger)', textAlign: 'left', marginBottom: '2rem' }}>
          Entre em contato com o administrador do sistema para liberar seu perfil.
        </div>
        <Button variant="danger" style={{ width: '100%' }} onClick={fazerLogout}>
          Voltar para o Login
        </Button>
      </div>
    </div>
  );
};

// Login View
const LoginScreen: React.FC = () => {
  const { fazerLogin, erroLogin, loadingAuth } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !password) return;
    try {
      await fazerLogin(nickname, password);
    } catch {
      // erroLogin is managed inside AuthContext
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--semob-bg)', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background graphic glow */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: '400px', height: '400px', background: 'rgba(37, 99, 235, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '25%', width: '350px', height: '350px', background: 'rgba(16, 185, 129, 0.02)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="glassmorphism animate-scale-up" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem', borderRadius: '1.25rem', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)', background: 'var(--semob-surface)', border: '1px solid var(--semob-border)' }}>
        
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', margin: '0 auto 1rem', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}>
            <KeyRound size={26} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--semob-text)', margin: 0 }}>SISMOB Portal</h2>
          <p style={{ color: 'var(--semob-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem', fontWeight: 700 }}>
            Secretaria de Mobilidade DF
          </p>
        </div>

        {/* Info Credentials Guide */}
        <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--semob-border)', padding: '0.85rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--semob-text)', lineHeight: '1.5' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--semob-primary)', display: 'block', marginBottom: '0.25rem' }}>💡 Usuários CDP Disponíveis (Teste):</span>
          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
            <li><strong>admin</strong> (Acesso Total / CDP Super)</li>
            <li><strong>auditor.silva</strong> (Acesso SUOP e SIF)</li>
            <li><strong>preposto.carvalho</strong> (Acesso SUOP Leitura)</li>
            <li><strong>sem.acesso</strong> (Sem Permissão)</li>
          </ul>
          <span style={{ display: 'block', marginTop: '0.5rem', color: 'var(--semob-text-muted)' }}>Senha: Qualquer valor.</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Email/Nickname Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--semob-text-muted)' }}>Nickname / Matrícula</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--semob-text-muted)' }} />
              <input
                type="text"
                placeholder="Ex: auditor.silva"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: 'var(--semob-bg)', border: '1px solid var(--semob-border)', borderRadius: '0.5rem', color: 'var(--semob-text)', outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--semob-primary)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--semob-border)' }}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--semob-text-muted)' }}>Senha LDAP</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--semob-text-muted)' }} />
              <input
                type="password"
                placeholder="Digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: 'var(--semob-bg)', border: '1px solid var(--semob-border)', borderRadius: '0.5rem', color: 'var(--semob-text)', outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--semob-primary)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--semob-border)' }}
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {erroLogin && (
            <div style={{ padding: '0.6rem 0.85rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 500 }}>
              ⚠️ {erroLogin}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" loading={loadingAuth} style={{ width: '100%', marginTop: '0.5rem' }}>
            Acessar Sistema <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
          </Button>
        </form>
      </div>
    </div>
  );
};

// Main Layout Shell wrapper
const MainLayoutShell: React.FC = () => {
  const { modulos } = useModules();
  const { activeModuleId, activeSubMenuId } = useApp();

  // Find target component
  const activeMod = modulos.find(m => m.id === activeModuleId);
  const activeSub = activeMod?.subMenus?.find(s => s.id === activeSubMenuId);
  
  const ViewComponent = activeSub 
    ? activeSub.componente 
    : (activeMod ? activeMod.componente : null);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--semob-bg)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right Column content container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* Headerbar */}
        <Headerbar />

        {/* Content scrolling frame */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <Suspense fallback={<LoadingSpinner />}>
            {ViewComponent ? <ViewComponent /> : (
              <div style={{ padding: '2rem', background: 'var(--semob-surface)', border: '1px solid var(--semob-border)', borderRadius: '0.75rem' }}>
                <h3 style={{ color: 'var(--semob-text)' }}>Nenhum módulo selecionado</h3>
              </div>
            )}
          </Suspense>
        </main>

        {/* Footer info banner */}
        <footer
          style={{
            height: '40px',
            background: 'var(--semob-surface)',
            borderTop: '1px solid var(--semob-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.78rem',
            color: 'var(--semob-text-muted)',
            flexShrink: 0
          }}
        >
          Secretaria de Estado de Mobilidade do Distrito Federal • SEMOB-DF • 2026
        </footer>
      </div>
    </div>
  );
};

// Application Main Selector
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
