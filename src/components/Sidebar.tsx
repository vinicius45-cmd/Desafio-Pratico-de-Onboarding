import React, { useEffect, useState } from 'react';
import {
  Building2,
  Bus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Key,
  LayoutDashboard,
  Lock,
  LucideIcon,
  Route,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Users,
  X
} from 'lucide-react';
import { useApp } from '../app/AppProvider';
import { useModules } from '../hooks/useModules';

type IconName =
  | 'LayoutDashboard'
  | 'Building2'
  | 'Shield'
  | 'ShieldCheck'
  | 'Server'
  | 'Users'
  | 'Key'
  | 'Route'
  | 'Bus'
  | 'FileText'
  | 'CreditCard'
  | 'Lock'
  | 'Terminal';

const iconMap: Record<IconName, LucideIcon> = {
  LayoutDashboard,
  Building2,
  Shield,
  ShieldCheck,
  Server,
  Users,
  Key,
  Route,
  Bus,
  FileText,
  CreditCard,
  Lock,
  Terminal
};

interface IconRendererProps {
  name?: string;
  size?: number;
}

const isIconName = (name: string): name is IconName => name in iconMap;

const IconRenderer: React.FC<IconRendererProps> = ({ name, size = 19 }) => {
  const Icon = name && isIconName(name) ? iconMap[name] : Shield;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.9} />;
};

export const Sidebar: React.FC = () => {
  const { modulos } = useModules();
  const { activeModuleId, activeSubMenuId, navegarPara, sidebarOpen, toggleSidebar } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    cdp: true,
    sif: true,
    suop: true
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = (moduleId: string) => {
    setExpandedModules((current) => ({ ...current, [moduleId]: !current[moduleId] }));
  };

  const sidebarClasses = [
    'app-sidebar',
    collapsed ? 'app-sidebar--collapsed' : '',
    isMobile ? 'app-sidebar--mobile' : '',
    isMobile && sidebarOpen ? 'app-sidebar--open' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      {isMobile && sidebarOpen && (
        <button
          aria-label="Fechar menu lateral"
          className="app-sidebar__overlay"
          onClick={toggleSidebar}
          type="button"
        />
      )}

      <aside aria-label="Menu principal" className={sidebarClasses}>
        <header className="app-sidebar__brand">
          <div className="app-sidebar__brand-mark" aria-hidden="true">
            <FileText size={24} strokeWidth={1.8} />
          </div>

          {(!collapsed || isMobile) && (
            <div className="app-sidebar__brand-copy">
              <strong>CONTROLE DE</strong>
              <strong>PROCESSOS E PRAZOS</strong>
              <span>Sistema de Gestão</span>
            </div>
          )}

          {isMobile && (
            <button
              aria-label="Fechar menu"
              className="app-sidebar__icon-button"
              onClick={toggleSidebar}
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </header>

        <nav className="app-sidebar__nav">
          {modulos.map((modulo) => {
            const hasSubmenus = Boolean(modulo.subMenus?.length);
            const isExpanded = Boolean(expandedModules[modulo.id]);
            const isModuleActive = activeModuleId === modulo.id;

            return (
              <section className="app-sidebar__group" key={modulo.id}>
                <button
                  className={[
                    'app-sidebar__item',
                    isModuleActive ? 'app-sidebar__item--active' : ''
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    if (hasSubmenus) {
                      toggleExpand(modulo.id);
                      return;
                    }
                    navegarPara(modulo.id, null);
                  }}
                  title={collapsed && !isMobile ? modulo.nome : undefined}
                  type="button"
                >
                  <span className="app-sidebar__item-icon">
                    <IconRenderer name={modulo.icone} />
                  </span>
                  {(!collapsed || isMobile) && (
                    <>
                      <span className="app-sidebar__item-label">{modulo.nome}</span>
                      {hasSubmenus && (
                        <span className="app-sidebar__chevron">
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {hasSubmenus && isExpanded && (!collapsed || isMobile) && (
                  <div className="app-sidebar__submenu">
                    {modulo.subMenus?.map((submenu) => {
                      const isSubmenuActive = activeSubMenuId === submenu.id;

                      return (
                        <button
                          className={[
                            'app-sidebar__submenu-item',
                            isSubmenuActive ? 'app-sidebar__submenu-item--active' : ''
                          ].filter(Boolean).join(' ')}
                          key={submenu.id}
                          onClick={() => navegarPara(modulo.id, submenu.id)}
                          type="button"
                        >
                          <IconRenderer name={submenu.icone} size={15} />
                          <span>{submenu.titulo}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </nav>

        {!isMobile && (
          <button
            aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            className="app-sidebar__collapse"
            onClick={() => setCollapsed((current) => !current)}
            type="button"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
