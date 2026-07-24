import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { useApp } from '../app/AppProvider';
import { CardPendencia, FormCadastro, PendenciasKanban } from '../types';
import '../styles/Pendencias.css';

interface ColumnConfig {
  id: string;
  titulo: string;
  corHex: string;
  corClasse: string;
}

const COLUNAS: ColumnConfig[] = [
  { id: 'atrasado', titulo: 'Atrasados', corHex: '#ef5350', corClasse: 'pendencias-column--atrasado' },
  { id: 'vence_hoje', titulo: 'Vence Hoje', corHex: '#ff9800', corClasse: 'pendencias-column--vence-hoje' },
  { id: 'proximos_5_dias', titulo: 'Próximos 5 dias', corHex: '#fbc02d', corClasse: 'pendencias-column--proximos' },
  { id: 'para_assinatura', titulo: 'Para Assinatura', corHex: '#2196f3', corClasse: 'pendencias-column--assinatura' },
  { id: 'especiais', titulo: 'Especiais', corHex: '#9c27b0', corClasse: 'pendencias-column--especiais' }
];

// Dados mockados fortemente tipados
const DADOS_MOCKADOS: PendenciasKanban = {
  atrasado: [
    { id: '1', processoId: '0007834/2024-10', titulo: 'Solicitação de Informação', setor: 'Sec. de Obras', diasRestantes: -10, status: 'atrasado' },
    { id: '2', processoId: '0008983/2024-21', titulo: 'Análise Técnica', setor: 'Sec. de Educação', diasRestantes: -1, status: 'atrasado' },
    { id: '3', processoId: '0007653/2024-11', titulo: 'Parecer Técnico', setor: 'Sec. de Obras', diasRestantes: -2, status: 'atrasado' }
  ],
  vence_hoje: [
    { id: '4', processoId: '0007823/2024-33', titulo: 'Parecer Técnico', setor: 'Sec. de Obras', diasRestantes: 0, status: 'vence_hoje' },
    { id: '5', processoId: '0008986/2024-22', titulo: 'Documentos', setor: 'Sec. de Administração', diasRestantes: 0, status: 'vence_hoje' },
    { id: '6', processoId: '0008868/2024-31', titulo: 'Resposta ao Ofício', setor: 'Sec. de Financeiro', diasRestantes: 0, status: 'vence_hoje' }
  ],
  proximos_5_dias: [
    { id: '7', processoId: '0007843/2024-44', titulo: 'Solicitação de Doc.', setor: 'Sec. de Administração', diasRestantes: 3, status: 'proximos_5_dias' },
    { id: '8', processoId: '0007445/2024-45', titulo: 'Análise e Parecer', setor: 'Sec. de Saúde', diasRestantes: 4, status: 'proximos_5_dias' },
    { id: '9', processoId: '0007185/2024-48', titulo: 'Informações', setor: 'Sec. de Planejamento', diasRestantes: 5, status: 'proximos_5_dias' }
  ],
  para_assinatura: [
    { id: '10', processoId: '0008444/2024-66', titulo: 'Minuta de Resposta', setor: 'Sec. de Planejamento', diasRestantes: 27, status: 'para_assinatura' },
    { id: '11', processoId: '0008694/2024-56', titulo: 'Resposta Técnica', setor: 'Sec. de Obras', diasRestantes: 6, status: 'para_assinatura' },
    { id: '12', processoId: '0007771/2024-47', titulo: 'Parecer Jurídico', setor: 'Sec. de Jurídica', diasRestantes: 7, status: 'para_assinatura' }
  ],
  especiais: [
    { id: '13', processoId: '0008584/2024-66', titulo: 'Processo Especial', setor: 'Sec. de Protesto', diasRestantes: 15, status: 'especiais' },
    { id: '14', processoId: '0008584/2024-67', titulo: 'Processo Reservado', setor: 'Sec. de Governo', diasRestantes: 18, status: 'especiais' }
  ]
};

interface MenuAberto {
  cardId: string | null;
}

type AcaoProcesso = 'editar' | 'visualizar';

const mapearDestinatario = (setor: string): string => {
  if (setor.includes('Obras')) return 'Suter';
  if (setor.includes('Educação')) return 'Suop';
  if (setor.includes('Administração')) return 'Sufisa';
  if (setor.includes('Financeiro')) return 'Suag';
  if (setor.includes('Saúde')) return 'Sutinf';
  if (setor.includes('Planejamento')) return 'Suter';
  return 'Suter';
};

const formatDateLocal = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const construirProcessoMockado = (card: CardPendencia): FormCadastro => {
  const hoje = new Date();
  const dataEntrada = new Date(hoje);
  dataEntrada.setDate(hoje.getDate() - 3);

  const prazoFinal = new Date(hoje);
  prazoFinal.setDate(hoje.getDate() + Math.max(5, card.diasRestantes + 8));

  const orgaoOrigem = card.setor.includes('Saúde')
    ? 'secretaria-saude'
    : card.setor.includes('Educação')
      ? 'secretaria-educacao'
      : 'secretaria-fazenda';

  return {
    processoINCRA: card.processoId,
    requerimento: `REQ-${card.processoId.replace(/[^0-9]/g, '').slice(0, 4)}`,
    assunto: card.titulo,
    assuntoTipo: card.status === 'para_assinatura' ? 'Memorando' : 'Ofício',
    destinatario: mapearDestinatario(card.setor),
    solicitudesInformacao: ['Solicitação de documentação', 'Análise complementar'],
    orgaoOrigem,
    dataEntrada: formatDateLocal(dataEntrada),
    prazoAreaTecnica: formatDateLocal(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 2)),
    prazoFinal: formatDateLocal(prazoFinal),
    situacaoProcesso: card.diasRestantes < 0 ? 'parado' : 'em-andamento',
    responsavel: card.titulo.includes('Jurídico') ? 'maria-santos' : card.setor.includes('Administração') ? 'pedro-oliveira' : 'joao-silva',
    documentoSEI: 'doc-001',
    especial: card.status === 'especiais',
    filtroRespostas: card.status === 'para_assinatura',
    observacao: `Processo aberto a partir da pendência ${card.titulo} no setor ${card.setor}.`,
  };
};

const Card: React.FC<{ card: CardPendencia; onMenuClick: (cardId: string) => void; menuAberto: MenuAberto; onAction: (card: CardPendencia, modo: AcaoProcesso) => void }> = ({
  card,
  onMenuClick,
  menuAberto,
  onAction
}) => {
  const diasClass = card.diasRestantes < 0 ? 'card-dias--atrasado' : card.diasRestantes === 0 ? 'card-dias--hoje' : 'card-dias--ok';

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onMenuClick(card.id);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, modo: AcaoProcesso) => {
    event.stopPropagation();
    onAction(card, modo);
  };

  return (
    <div className="kanban-card">
      <div className="card-header">
        <button
          aria-label="Menu"
          className="card-menu-btn"
          onClick={handleMenuButtonClick}
          type="button"
        >
          <MoreVertical size={16} />
        </button>

        {menuAberto.cardId === card.id && (
          <div className="card-menu-dropdown" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={(event) => handleActionClick(event, 'editar')}>Editar</button>
            <button type="button" onClick={(event) => handleActionClick(event, 'visualizar')}>Visualizar detalhes</button>
          </div>
        )}
      </div>

      <div className="card-id">{card.processoId}</div>
      <div className="card-titulo">{card.titulo}</div>
      <div className="card-setor">{card.setor}</div>

      <div className={`card-dias ${diasClass}`}>
        {Math.abs(card.diasRestantes)} {card.diasRestantes === 1 || card.diasRestantes === -1 ? 'dia' : 'dias'}
      </div>
    </div>
  );
};

const Pendencias: React.FC = () => {
  const { navegarPara, definirProcessoSelecionado } = useApp();
  const [menuAberto, setMenuAberto] = useState<MenuAberto>({ cardId: null });

  const handleMenuClick = (cardId: string): void => {
    setMenuAberto((prev) => ({
      cardId: prev.cardId === cardId ? null : cardId
    }));
  };

  const abrirProcesso = (card: CardPendencia, modo: AcaoProcesso): void => {
    definirProcessoSelecionado(construirProcessoMockado(card), modo);
    navegarPara(modo === 'editar' ? 'cadastro-processo' : 'meus-processos');
    setMenuAberto({ cardId: null });
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.card-menu-dropdown')) {
      return;
    }
    setMenuAberto({ cardId: null });
  };

  return (
    <div className="pendencias-container" onClick={handleContainerClick}>
      <header className="pendencias-header">
        <h1>Pendências</h1>
        <p>Acompanhe todos os processos com pendências e prazos</p>
      </header>

      <div className="kanban-board">
        {COLUNAS.map((coluna) => {
          const cards = DADOS_MOCKADOS[coluna.id] || [];

          return (
            <div key={coluna.id} className={`pendencias-column ${coluna.corClasse}`}>
              <div className="column-header">
                <h2 className="column-titulo">{coluna.titulo}</h2>
                <span className="column-contador">{cards.length}</span>
              </div>

              <div className="column-cards">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    onMenuClick={handleMenuClick}
                    menuAberto={menuAberto}
                    onAction={abrirProcesso}
                  />
                ))}
              </div>

              {cards.length === 0 && (
                <div className="column-empty">Nenhuma pendência</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pendencias;
