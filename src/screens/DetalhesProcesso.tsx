import React, { useState } from 'react';
import { ChevronDown, Edit3, FileText, MoreHorizontal } from 'lucide-react';
import '../styles/DetalhesProcesso.css';

type AbaAtiva = 'dados' | 'historico' | 'movimentacoes' | 'anexos' | 'observacoes';

interface ProcessoCampo {
  label: string;
  value: string;
  variant?: 'danger' | 'success' | 'info' | 'neutral';
  isCheckbox?: boolean;
  checked?: boolean;
}

interface ResumoItem {
  label: string;
  value: string;
  variant?: 'danger' | 'info' | 'neutral';
}

interface ProcessoDetalhe {
  numeroSei: string;
  statusLabel: string;
  diasAtraso: string;
  assunto: string;
  orgaoOrigem: string;
  dados: ProcessoCampo[];
  resumo: ResumoItem[];
}

const tabs: Array<{ id: AbaAtiva; label: string }> = [
  { id: 'dados', label: 'Dados Gerais' },
  { id: 'historico', label: 'Histórico' },
  { id: 'movimentacoes', label: 'Movimentações' },
  { id: 'anexos', label: 'Anexos' },
  { id: 'observacoes', label: 'Observações' }
];

const processoDetalheMock: ProcessoDetalhe = {
  numeroSei: '0001234/2024-10',
  statusLabel: 'Atrasado',
  diasAtraso: '-3 dias',
  assunto: 'Solicitação de Informação',
  orgaoOrigem: 'Secretaria de Saúde',
  dados: [
    { label: 'Processo SEI Nº', value: '0001234/2024-10' },
    { label: 'Requerimento', value: 'REQ-2024/1243' },
    { label: 'Assunto', value: 'Solicitação de Informação' },
    { label: 'Órgão de Origem', value: 'Secretaria de Saúde' },
    { label: 'Data de Entrada', value: '10/05/2024', variant: 'neutral' },
    { label: 'Prazo Área Técnica', value: '24/05/2024', variant: 'success' },
    { label: 'Responsável', value: 'João da Silva' },
    { label: 'Documento SEI - Resposta', value: 'Não informado' },
    { label: 'Situação do Processo', value: 'Em andamento', variant: 'info' },
    { label: 'Prazo Final', value: '10/05/2024', variant: 'danger' },
    { label: 'Dias Restantes', value: '-3 dias', variant: 'danger' },
    { label: 'Especial', value: 'Especial', isCheckbox: true, checked: false }
  ],
  resumo: [
    { label: 'Status', value: 'Atrasado', variant: 'danger' },
    { label: 'Diferença', value: '-3 dias', variant: 'danger' },
    { label: 'Prazo Final', value: '10/05/2024', variant: 'neutral' },
    { label: 'Dias Restantes', value: '-3 dias', variant: 'danger' },
    { label: 'Situação', value: 'Em andamento', variant: 'info' }
  ]
};

const getVariantClass = (variant: ProcessoCampo['variant'] | ResumoItem['variant'] = 'neutral'): string => {
  switch (variant) {
    case 'danger':
      return 'detalhes-processo__value--danger';
    case 'success':
      return 'detalhes-processo__value--success';
    case 'info':
      return 'detalhes-processo__value--info';
    default:
      return '';
  }
};

const DetalhesProcesso: React.FC = () => {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('dados');
  const processo = processoDetalheMock;

  return (
    <section className="detalhes-processo-page" aria-label="Detalhes do Processo">
      <div className="detalhes-processo__topbar">
        <div className="detalhes-processo__breadcrumb">
          <span>Meus Processos</span>
          <span className="detalhes-processo__breadcrumb-separator">›</span>
          <span className="detalhes-processo__breadcrumb-current">Detalhes do Processo</span>
        </div>

        <div className="detalhes-processo__actions">
          <button type="button" className="detalhes-processo__button detalhes-processo__button--secondary">
            <Edit3 size={16} />
            Editar
          </button>
          <button type="button" className="detalhes-processo__button detalhes-processo__button--outline">
            Ações
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="detalhes-processo__header-card">
        <div>
          <div className="detalhes-processo__header-top">
            <strong className="detalhes-processo__numero">{processo.numeroSei}</strong>
            <span className="detalhes-processo__badge detalhes-processo__badge--danger">{processo.statusLabel}</span>
            <span className="detalhes-processo__badge detalhes-processo__badge--subtle">{processo.diasAtraso}</span>
          </div>
          <div className="detalhes-processo__header-subtitle">
            <div className="detalhes-processo__header-label">{processo.assunto}</div>
            <div className="detalhes-processo__header-meta">{processo.orgaoOrigem}</div>
          </div>
        </div>

        <div className="detalhes-processo__header-extra">
          <button type="button" className="detalhes-processo__pill">
            <FileText size={16} />
            Meus Processos
          </button>
        </div>
      </div>

      <div className="detalhes-processo__tabs" role="tablist" aria-label="Navegação por abas do processo">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAbaAtiva(tab.id)}
            className={`detalhes-processo__tab ${abaAtiva === tab.id ? 'detalhes-processo__tab--active' : ''}`}
            aria-selected={abaAtiva === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="detalhes-processo__content-grid">
        <div className="detalhes-processo__content-main">
          <div className="detalhes-processo__dados-grid">
            {processo.dados.map((campo) => (
              <article key={campo.label} className="detalhes-processo__card">
                <span className="detalhes-processo__label">{campo.label}</span>
                {campo.isCheckbox ? (
                  <label className="detalhes-processo__checkbox">
                    <input type="checkbox" checked={campo.checked} disabled />
                    <span>{campo.label === 'Especial' ? 'Especial' : campo.value}</span>
                  </label>
                ) : (
                  <strong className={`detalhes-processo__value ${getVariantClass(campo.variant)}`}>
                    {campo.value}
                  </strong>
                )}
              </article>
            ))}
          </div>
        </div>

        <aside className="detalhes-processo__summary-card">
          <header className="detalhes-processo__summary-header">
            <span>Resumo</span>
          </header>
          <div className="detalhes-processo__summary-list">
            {processo.resumo.map((item) => (
              <div key={`${item.label}-${item.value}`} className="detalhes-processo__summary-item">
                <span className="detalhes-processo__summary-label">{item.label}</span>
                <strong className={`detalhes-processo__summary-value ${getVariantClass(item.variant)}`}>
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {abaAtiva !== 'dados' && (
        <div className="detalhes-processo__placeholder">
          <strong>{tabs.find((tab) => tab.id === abaAtiva)?.label}</strong>
          <p>Conteúdo da aba ainda não implementado para esta visualização.</p>
        </div>
      )}
    </section>
  );
};

export default DetalhesProcesso;
