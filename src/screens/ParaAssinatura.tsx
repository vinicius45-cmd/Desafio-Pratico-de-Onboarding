import React, { useMemo, useState } from 'react';
import { Filter, MoreVertical, PenTool, Search } from 'lucide-react';
import '../styles/ParaAssinatura.css';

type CriticidadeDocumento = 'Atrasado' | 'Urgente' | 'No Prazo';

type FiltroRapido = 'Tipo de Documento' | 'Urgência';

interface DocumentoAssinatura {
  id: string;
  criticidade: CriticidadeDocumento;
  processoSei: string;
  documento: string;
  origemSetor: string;
  dataEnvio: string;
}

const documentosMock: DocumentoAssinatura[] = [
  {
    id: '1',
    criticidade: 'Atrasado',
    processoSei: '0004321/2024-01',
    documento: 'Minuta de Resposta',
    origemSetor: 'Secretaria de Planejamento',
    dataEnvio: '07/05/2024'
  },
  {
    id: '2',
    criticidade: 'Urgente',
    processoSei: '0009876/2024-09',
    documento: 'Despacho Decisório',
    origemSetor: 'Secretaria de Saúde',
    dataEnvio: '09/05/2024'
  },
  {
    id: '3',
    criticidade: 'No Prazo',
    processoSei: '0001234/2024-10',
    documento: 'Ofício de Notificação',
    origemSetor: 'Secretaria de Educação',
    dataEnvio: '10/05/2024'
  },
  {
    id: '4',
    criticidade: 'No Prazo',
    processoSei: '0001122/2024-12',
    documento: 'Minuta de Resposta',
    origemSetor: 'Secretaria de Obras',
    dataEnvio: '11/05/2024'
  },
  {
    id: '5',
    criticidade: 'Urgente',
    processoSei: '0002233/2024-14',
    documento: 'Despacho Decisório',
    origemSetor: 'Secretaria de Finanças',
    dataEnvio: '12/05/2024'
  }
];

const badgeStyles: Record<CriticidadeDocumento, string> = {
  Atrasado: 'para-assinatura__badge--danger',
  Urgente: 'para-assinatura__badge--warning',
  'No Prazo': 'para-assinatura__badge--success'
};

const filtrosRapidos: FiltroRapido[] = ['Tipo de Documento', 'Urgência'];

const ParaAssinatura: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroRapido>('Tipo de Documento');
  const [filterListOpen, setFilterListOpen] = useState<boolean>(false);

  const documentosFiltrados = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return documentosMock;
    }

    return documentosMock.filter((doc) =>
      [doc.processoSei, doc.documento, doc.origemSetor, doc.dataEnvio]
        .some((campo) => campo.toLowerCase().includes(query))
    );
  }, [searchValue]);

  const handleAssinarDocumento = (documento: DocumentoAssinatura): void => {
    window.alert(`Assinar documento: ${documento.documento} (${documento.processoSei})`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.currentTarget.value);
  };

  const handleFiltroClick = (filtro: FiltroRapido): void => {
    setFiltroSelecionado(filtro);
    setFilterListOpen(false);
  };

  return (
    <section className="para-assinatura-page" aria-label="Para Assinatura">
      <div className="para-assinatura__header-row">
        <div>
          <h1>Para Assinatura</h1>
        </div>

        <div className="para-assinatura__actions">
          <label className="para-assinatura__search-field">
            <Search size={16} />
            <input
              type="search"
              placeholder="Buscar documento"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </label>

          <div className="para-assinatura__filter-dropdown">
            <button
              type="button"
              className="para-assinatura__filter-button"
              onClick={() => setFilterListOpen((current) => !current)}
            >
              <Filter size={16} />
              {filtroSelecionado}
              <MoreVertical size={16} />
            </button>
            {filterListOpen && (
              <div className="para-assinatura__filter-list">
                {filtrosRapidos.map((filtro) => (
                  <button
                    key={filtro}
                    type="button"
                    className={filtro === filtroSelecionado ? 'active' : ''}
                    onClick={() => handleFiltroClick(filtro)}
                  >
                    {filtro}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="para-assinatura__table-card">
        <div className="para-assinatura__table-header">
          <span>Documentos pendentes de assinatura</span>
          <span>{documentosFiltrados.length} registros</span>
        </div>

        <div className="para-assinatura__table-wrapper">
          <table className="para-assinatura__table">
            <thead>
              <tr>
                <th>Criticidade</th>
                <th>Processo SEI Nº</th>
                <th>Documento</th>
                <th>Origem/Setor</th>
                <th>Data de Envio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {documentosFiltrados.map((documento) => (
                <tr key={documento.id}>
                  <td>
                    <span className={`para-assinatura__badge ${badgeStyles[documento.criticidade]}`}>
                      {documento.criticidade}
                    </span>
                  </td>
                  <td>
                    <strong>{documento.processoSei}</strong>
                  </td>
                  <td>{documento.documento}</td>
                  <td>{documento.origemSetor}</td>
                  <td>{documento.dataEnvio}</td>
                  <td className="para-assinatura__actions-cell">
                    <button
                      type="button"
                      className="para-assinatura__primary-action"
                      onClick={() => handleAssinarDocumento(documento)}
                    >
                      <PenTool size={14} />
                      Assinar Documento
                    </button>
                    <button type="button" className="para-assinatura__more-button" aria-label="Mais opções">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ParaAssinatura;
