import React, { useState } from 'react';
import '../styles/Administracao.css';

type TabAdministracao = 'usuarios' | 'configuracoes' | 'permissoes';

type PerfilAcesso = 'admin' | 'analista' | 'visualizador';

type StatusUsuario = 'ativo' | 'inativo';

interface UsuarioAdmin {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilAcesso;
  status: StatusUsuario;
}

interface ConfiguracaoSistema {
  habilitarEmail: boolean;
  modoUrgenciaAutomatico: boolean;
  permitirAcessoExterno: boolean;
}

const usuariosMock: UsuarioAdmin[] = [
  {
    id: 'u1',
    nome: 'Ana Beatriz Silva',
    email: 'ana.silva@dominio.gov.br',
    perfil: 'admin',
    status: 'ativo'
  },
  {
    id: 'u2',
    nome: 'Bruno Costa',
    email: 'bruno.costa@dominio.gov.br',
    perfil: 'analista',
    status: 'ativo'
  },
  {
    id: 'u3',
    nome: 'Carla Martins',
    email: 'carla.martins@dominio.gov.br',
    perfil: 'visualizador',
    status: 'inativo'
  },
  {
    id: 'u4',
    nome: 'Diego Rocha',
    email: 'diego.rocha@dominio.gov.br',
    perfil: 'analista',
    status: 'ativo'
  },
  {
    id: 'u5',
    nome: 'Elisa Nogueira',
    email: 'elisa.nogueira@dominio.gov.br',
    perfil: 'admin',
    status: 'ativo'
  }
];

const configuracoesMock: ConfiguracaoSistema = {
  habilitarEmail: true,
  modoUrgenciaAutomatico: false,
  permitirAcessoExterno: false
};

const perfilLabel: Record<PerfilAcesso, string> = {
  admin: 'Administrador',
  analista: 'Analista',
  visualizador: 'Visualizador'
};

const statusLabel: Record<StatusUsuario, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo'
};

const Administracao: React.FC = () => {
  const [abaAtiva, setAbaAtiva] = useState<TabAdministracao>('usuarios');
  const [configuracoes, setConfiguracoes] = useState<ConfiguracaoSistema>(configuracoesMock);

  const handleToggle = (field: keyof ConfiguracaoSistema): void => {
    setConfiguracoes((current) => ({
      ...current,
      [field]: !current[field]
    }));
  };

  return (
    <section className="administracao-page" aria-label="Administração">
      <div className="administracao-header-row">
        <h1>Administração</h1>
        <button type="button" className="administracao-button administracao-button--primary">
          + Novo Usuário
        </button>
      </div>

      <div className="administracao-tabs" role="tablist" aria-label="Sub-abas de administração">
        <button
          type="button"
          className={`administracao-tab ${abaAtiva === 'usuarios' ? 'administracao-tab--active' : ''}`}
          onClick={() => setAbaAtiva('usuarios')}
          aria-selected={abaAtiva === 'usuarios'}
        >
          Usuários do Sistema
        </button>
        <button
          type="button"
          className={`administracao-tab ${abaAtiva === 'configuracoes' ? 'administracao-tab--active' : ''}`}
          onClick={() => setAbaAtiva('configuracoes')}
          aria-selected={abaAtiva === 'configuracoes'}
        >
          Configurações Gerais
        </button>
        <button
          type="button"
          className={`administracao-tab ${abaAtiva === 'permissoes' ? 'administracao-tab--active' : ''}`}
          onClick={() => setAbaAtiva('permissoes')}
          aria-selected={abaAtiva === 'permissoes'}
        >
          Permissões
        </button>
      </div>

      {abaAtiva === 'usuarios' && (
        <div className="administracao-table-card">
          <table className="administracao-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil/Cargo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosMock.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <strong>{usuario.nome}</strong>
                  </td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`administracao-tag administracao-tag--${usuario.perfil}`}>
                      {perfilLabel[usuario.perfil]}
                    </span>
                  </td>
                  <td>
                    <span className={`administracao-status administracao-status--${usuario.status}`}>
                      {statusLabel[usuario.status]}
                    </span>
                  </td>
                  <td className="administracao-actions-cell">
                    <button type="button" className="administracao-icon-button">Editar</button>
                    <button type="button" className="administracao-icon-button administracao-icon-button--danger">Bloquear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {abaAtiva === 'configuracoes' && (
        <div className="administracao-config-card">
          <div className="administracao-config-row">
            <label className="administracao-config-label">Habilitar notificações por e-mail</label>
            <button
              type="button"
              className={`administracao-switch ${configuracoes.habilitarEmail ? 'administracao-switch--active' : ''}`}
              onClick={() => handleToggle('habilitarEmail')}
            >
              <span />
            </button>
          </div>
          <div className="administracao-config-row">
            <label className="administracao-config-label">Ativar modo de urgência automático</label>
            <button
              type="button"
              className={`administracao-switch ${configuracoes.modoUrgenciaAutomatico ? 'administracao-switch--active' : ''}`}
              onClick={() => handleToggle('modoUrgenciaAutomatico')}
            >
              <span />
            </button>
          </div>
          <div className="administracao-config-row">
            <label className="administracao-config-label">Permitir acessos externos</label>
            <button
              type="button"
              className={`administracao-switch ${configuracoes.permitirAcessoExterno ? 'administracao-switch--active' : ''}`}
              onClick={() => handleToggle('permitirAcessoExterno')}
            >
              <span />
            </button>
          </div>
          <div className="administracao-config-actions">
            <button type="button" className="administracao-button administracao-button--secondary">
              Salvar alterações
            </button>
          </div>
        </div>
      )}

      {abaAtiva === 'permissoes' && (
        <div className="administracao-placeholder-card">
          <h2>Permissões</h2>
          <p>Configuração de perfis e acesso será exibida aqui quando a aba estiver habilitada.</p>
        </div>
      )}
    </section>
  );
};

export default Administracao;
