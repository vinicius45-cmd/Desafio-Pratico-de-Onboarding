import { lazy } from 'react';
import { ModuloConfig } from '../types';
import { withProps } from '../screens/PlaceholderView';

// Lazy load modules/screens to support code splitting
const DashboardDocs = lazy(() => import('../screens/DashboardDocs'));
const OperadoraList = lazy(() => import('../screens/OperadoraList'));
const ValidadorList = lazy(() => import('../screens/ValidadorList'));

const raw_modulos_sistema: ModuloConfig[] = [
  {
    id: 'dash',
    sigla: 'DASH',
    nome: 'Painel e Documentos',
    descricao: 'Documentação viva e painel de desenvolvedor',
    icone: 'LayoutDashboard',
    cor: '#1e293b',
    rota: 'dashboard',
    componente: DashboardDocs,
    ativo: true
  },
  {
    id: 'suop',
    sigla: 'SUOP',
    nome: 'Cadastro de Operadoras',
    descricao: 'Gestão de operadoras, linhas e frotas',
    icone: 'Building2',
    cor: '#0d9488',
    rota: 'suop',
    componente: withProps('SUOP - Cadastro de Operadoras', 'Cadastro geral de operadoras, linhas e frotas da SEMOB.'),
    ativo: true,
    subMenus: [
      { id: 'suop-agencies', titulo: 'Operadoras (Ativa)', icone: 'Building2', rota: 'suop-agencies', componente: OperadoraList },
      { id: 'suop-routes', titulo: 'Linhas (Mock)', icone: 'Route', rota: 'suop-routes', componente: withProps('SUOP - Linhas', 'Consulta e edição de linhas de ônibus.') },
      { id: 'suop-vehicles', titulo: 'Veículos (Mock)', icone: 'Bus', rota: 'suop-vehicles', componente: withProps('SUOP - Veículos', 'Cadastro de frotas e vistorias de veículos.') },
    ]
  },
  {
    id: 'sif',
    sigla: 'SIF',
    nome: 'Fiscalização',
    descricao: 'Sistema de Informações de Fiscalização',
    icone: 'ShieldCheck',
    cor: '#e11d48',
    rota: 'sif-menu',
    componente: withProps('SIF - Fiscalização', 'Controle e emissão de autos de infração e vistorias.'),
    ativo: true,
    subMenus: [
      { id: 'sif-fisc', titulo: 'Auto de Infração', icone: 'FileText', rota: 'sif-fiscalizacao', componente: withProps('SIF - Novo Auto', 'Emissão de auto de infração digital.') },
      { 
        id: 'sif-val', 
        titulo: 'Validadores', 
        icone: 'CreditCard', 
        rota: 'sif-valador', 
        componente: ValidadorList // Alterado de placeholder para a tela real do desafio
      },
    ]
  },
  {
    id: 'cdp',
    sigla: 'CDP',
    nome: 'Controle de Acesso',
    descricao: 'Gestão de Sistemas, Módulos e Usuários',
    icone: 'Shield',
    cor: '#1e1b4b',
    rota: 'cdp',
    componente: withProps('CDP - Controle de Acessos', 'Gestão de permissões de sistemas e usuários.'),
    ativo: true,
    subMenus: [
      { id: 'cdp-sistemas', titulo: 'Sistemas', icone: 'Server', rota: 'cdp-sistemas', componente: withProps('CDP - Sistemas', 'Cadastro de novos sistemas do ecossistema SEMOB.') },
      { id: 'cdp-usuarios', titulo: 'Usuários', icone: 'Users', rota: 'cdp-usuarios', componente: withProps('CDP - Usuários', 'Associação de usuários com perfis e prepostos.') },
      { id: 'cdp-grupos', titulo: 'Perfis e Regras', icone: 'Key', rota: 'cdp-grupos', componente: withProps('CDP - Perfis', 'Cadastro de perfis de permissão do sistema.') }
    ]
  }
];

const isDevModulos = import.meta.env.VITE_SHOW_DEV_MODULOS === 'true';

export const modulos_sistema: ModuloConfig[] = raw_modulos_sistema.map(modulo => {
  if (isDevModulos) {
    return { ...modulo, ativo: true };
  }
  return modulo;
});
export default modulos_sistema;