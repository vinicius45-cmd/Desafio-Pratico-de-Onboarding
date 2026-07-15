import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Droplet,
  Eye,
  FileSignature,
  LucideIcon,
  MoreVertical,
  PackagePlus,
  Puzzle,
  TimerReset
} from 'lucide-react';
import { FormCadastro } from '../types';

type Criticidade =
  | 'Atrasado'
  | 'Vence Hoje'
  | 'Próximo do prazo'
  | 'Para Assinatura'
  | 'Especial'
  | 'OK';

type SituacaoProcesso = 'Em andamento' | 'Para assinatura';

interface Processo {
  id: number;
  criticidade: Criticidade;
  numeroSei: string;
  assunto: string;
  orgao: string;
  responsavel: string;
  prazoFinal: string;
  diasRestantes: string;
  situacao: SituacaoProcesso;
}

interface ResumoCard {
  titulo: string;
  valor: string;
  descricao: string;
  variante: 'azul' | 'vermelho' | 'laranja' | 'amarelo' | 'cyan' | 'roxo';
  icone: LucideIcon;
}

const resumoCards: ResumoCard[] = [
  {
    titulo: 'Total de Processos',
    valor: '1.248',
    descricao: 'Todos os processos',
    variante: 'azul',
    icone: ClipboardList
  },
  {
    titulo: 'Atrasados',
    valor: '32',
    descricao: 'Processos atrasados',
    variante: 'vermelho',
    icone: Droplet
  },
  {
    titulo: 'Vence Hoje',
    valor: '15',
    descricao: 'Vencem hoje',
    variante: 'laranja',
    icone: TimerReset
  },
  {
    titulo: 'Próximos 5 dias',
    valor: '48',
    descricao: 'Vencem em até 5 dias',
    variante: 'amarelo',
    icone: PackagePlus
  },
  {
    titulo: 'Para Assinatura',
    valor: '27',
    descricao: 'Aguardando assinatura',
    variante: 'cyan',
    icone: FileSignature
  },
  {
    titulo: 'Especiais',
    valor: '11',
    descricao: 'Processos especiais',
    variante: 'roxo',
    icone: Puzzle
  }
];

const processos: Processo[] = [
  {
    id: 1,
    criticidade: 'Atrasado',
    numeroSei: '0001234/2024-10',
    assunto: 'Solicitação de Informação',
    orgao: 'Secretaria de Saúde',
    responsavel: 'João da Silva',
    prazoFinal: '10/05/2024',
    diasRestantes: '-3 dias',
    situacao: 'Em andamento'
  },
  {
    id: 2,
    criticidade: 'Atrasado',
    numeroSei: '0000987/2024-21',
    assunto: 'Análise Técnica',
    orgao: 'Secretaria de Educação',
    responsavel: 'Maria Santos',
    prazoFinal: '12/05/2024',
    diasRestantes: '-1 dia',
    situacao: 'Em andamento'
  },
  {
    id: 3,
    criticidade: 'Vence Hoje',
    numeroSei: '0001122/2024-33',
    assunto: 'Parecer Técnico',
    orgao: 'Secretaria de Obras',
    responsavel: 'Carlos Lima',
    prazoFinal: '15/05/2024',
    diasRestantes: 'Hoje',
    situacao: 'Em andamento'
  },
  {
    id: 4,
    criticidade: 'Próximo do prazo',
    numeroSei: '0001355/2024-44',
    assunto: 'Solicitação de Documentos',
    orgao: 'Secretaria de Administração',
    responsavel: 'Juliana Alves',
    prazoFinal: '18/05/2024',
    diasRestantes: '3 dias',
    situacao: 'Em andamento'
  },
  {
    id: 5,
    criticidade: 'Para Assinatura',
    numeroSei: '0001444/2024-55',
    assunto: 'Minuta de Resposta',
    orgao: 'Secretaria de Planejamento',
    responsavel: 'João da Silva',
    prazoFinal: '20/05/2024',
    diasRestantes: '5 dias',
    situacao: 'Para assinatura'
  },
  {
    id: 6,
    criticidade: 'Especial',
    numeroSei: '0001555/2024-66',
    assunto: 'Processo Especial',
    orgao: 'Gabinete do Prefeito',
    responsavel: 'Maria Santos',
    prazoFinal: '30/05/2024',
    diasRestantes: '15 dias',
    situacao: 'Em andamento'
  },
  {
    id: 7,
    criticidade: 'OK',
    numeroSei: '0001666/2024-77',
    assunto: 'Informações Gerais',
    orgao: 'Secretaria de Finanças',
    responsavel: 'Carlos Lima',
    prazoFinal: '05/06/2024',
    diasRestantes: '21 dias',
    situacao: 'Em andamento'
  }
];

const getDiasRestantesClass = (diasRestantes: string): string => {
  if (diasRestantes.startsWith('-')) {
    return 'dashboard-table__days--late';
  }

  if (diasRestantes === 'Hoje') {
    return 'dashboard-table__days--today';
  }

  return 'dashboard-table__days--ok';
};

const getCriticidadeVariant = (criticidade: Criticidade): string => {
  const variants: Record<Criticidade, string> = {
    Atrasado: 'atrasado',
    'Vence Hoje': 'vence-hoje',
    'Próximo do prazo': 'proximo',
    'Para Assinatura': 'assinatura',
    Especial: 'especial',
    OK: 'ok'
  };

  return variants[criticidade];
};

const getSituacaoVariant = (situacao: SituacaoProcesso): string => {
  const variants: Record<SituacaoProcesso, string> = {
    'Em andamento': 'andamento',
    'Para assinatura': 'assinatura'
  };

  return variants[situacao];
};

// Calcula dias restantes baseado nas datas
const calcularDiasRestantes = (prazoFinal: string): number => {
  if (!prazoFinal) return 0;

  const prazo = new Date(prazoFinal);
  const hoje = new Date();

  // Limpa horário para comparação apenas de datas
  prazo.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);

  // Calcula diferença em milissegundos e converte para dias
  const diferenca = prazo.getTime() - hoje.getTime();
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

  return dias;
};

// Converte FormCadastro para Processo
const converterParaProcesso = (form: FormCadastro, index: number): Processo => {
  const diasRestantes = calcularDiasRestantes(form.prazoFinal);
  let criticidade: Criticidade = 'OK';
  let diasTexto = `${diasRestantes} dias`;

  if (diasRestantes < 0) {
    criticidade = 'Atrasado';
    diasTexto = `${diasRestantes} dias`;
  } else if (diasRestantes === 0) {
    criticidade = 'Vence Hoje';
    diasTexto = 'Hoje';
  } else if (diasRestantes <= 5) {
    criticidade = 'Próximo do prazo';
  } else if (form.especial) {
    criticidade = 'Especial';
  }

  return {
    id: parseInt(form.id || index.toString(), 10),
    criticidade,
    numeroSei: form.processoINCRA || form.requerimento || 'N/A',
    assunto: form.assunto,
    orgao: form.orgaoOrigem,
    responsavel: form.responsavel || 'Não atribuído',
    prazoFinal: form.prazoFinal ? new Date(form.prazoFinal).toLocaleDateString('pt-BR') : '',
    diasRestantes: diasTexto,
    situacao: (form.situacaoProcesso === 'em-andamento' ? 'Em andamento' : 'Em andamento') as SituacaoProcesso
  };
};

export const Dashboard: React.FC = () => {
  const [processosExibicao, setProcessosExibicao] = useState<Processo[]>([]);

  useEffect(() => {
    // Carrega processos do localStorage
    const procesosArmazenados = localStorage.getItem('processos_cadastrados');
    if (procesosArmazenados) {
      try {
        const procesos: FormCadastro[] = JSON.parse(procesosArmazenados);
        const processosConvertidos = procesos.map((form, index) => 
          converterParaProcesso(form, index)
        );
        // Combina com os dados mockados
        setProcessosExibicao([...processos, ...processosConvertidos]);
      } catch (erro) {
        console.error('Erro ao carregar processos:', erro);
        setProcessosExibicao(processos);
      }
    } else {
      setProcessosExibicao(processos);
    }
  }, []);
  return (
    <section className="dashboard-page" aria-label="Dashboard">
      <div className="dashboard-summary">
        {resumoCards.map((card) => {
          const Icon = card.icone;

          return (
            <article className="dashboard-card" key={card.titulo}>
              <div className={`dashboard-card__icon dashboard-card__icon--${card.variante}`}>
                <Icon size={23} strokeWidth={2.2} />
              </div>
              <div className="dashboard-card__copy">
                <h2>{card.titulo}</h2>
                <strong>{card.valor}</strong>
                <span>{card.descricao}</span>
              </div>
            </article>
          );
        })}
      </div>

      <section className="dashboard-priority">
        <header className="dashboard-priority__header">
          <h2>Prioridade de Atenção</h2>
          <button type="button">Ver todos</button>
        </header>

        <div className="dashboard-table__wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Criticidade</th>
                <th>Processo SEI Nº</th>
                <th>Assunto</th>
                <th>Órgão de Origem</th>
                <th>Responsável</th>
                <th>Prazo Final</th>
                <th>Dias Restantes</th>
                <th>Situação do Processo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {processosExibicao.map((processo) => (
                <tr key={processo.id}>
                  <td>
                    <span className={`dashboard-badge dashboard-badge--${getCriticidadeVariant(processo.criticidade)}`}>
                      {processo.criticidade}
                    </span>
                  </td>
                  <td>{processo.numeroSei}</td>
                  <td>{processo.assunto}</td>
                  <td>{processo.orgao}</td>
                  <td>{processo.responsavel}</td>
                  <td>{processo.prazoFinal}</td>
                  <td>
                    <span className={`dashboard-table__days ${getDiasRestantesClass(processo.diasRestantes)}`}>
                      {processo.diasRestantes}
                    </span>
                  </td>
                  <td>
                    <span className={`dashboard-status dashboard-status--${getSituacaoVariant(processo.situacao)}`}>
                      {processo.situacao}
                    </span>
                  </td>
                  <td>
                    <div className="dashboard-actions">
                      <button aria-label={`Visualizar processo ${processo.numeroSei}`} type="button">
                        <Eye size={15} />
                      </button>
                      <button aria-label={`Mais ações para o processo ${processo.numeroSei}`} type="button">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
