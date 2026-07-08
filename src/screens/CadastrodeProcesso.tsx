import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FormCadastro, ResumoProcesso } from '../types';
import '../styles/CadastrodeProcesso.css';

const CadastrodeProcesso: React.FC = () => {
  const [form, setForm] = useState<FormCadastro>({
    processoINCRA: '',
    requerimento: '',
    assunto: '',
    solicitudesInformacao: [],
    orgaoOrigem: '',
    dataEntrada: '',
    prazoAreaTecnica: '',
    prazoFinal: '',
    situacaoProcesso: '',
    responsavel: '',
    documentoSEI: '',
    especial: false,
    observacao: '',
  });

  const [resumo] = useState<ResumoProcesso>({
    status: 'OK',
    diasRestantes: 21,
    prazoFinal: '05/06/2024',
    situacao: 'Em andamento',
    responsavel: 'João da Silva',
  });

  const [solicitudePendente, setSolicitudePendente] = useState<string>('');

  // Manipuladores de evento estritamente tipados
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const target = e.currentTarget;
    const { name, value, type } = target;
    
    if (type === 'checkbox' && target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddSolicitude = (): void => {
    if (solicitudePendente.trim()) {
      setForm((prev) => ({
        ...prev,
        solicitudesInformacao: [
          ...prev.solicitudesInformacao,
          solicitudePendente,
        ],
      }));
      setSolicitudePendente('');
    }
  };

  const handleRemoveSolicitude = (index: number): void => {
    setForm((prev) => ({
      ...prev,
      solicitudesInformacao: prev.solicitudesInformacao.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Formulário submetido:', form);
    console.log('Resumo:', resumo);
  };

  const handleCancel = (): void => {
    setForm({
      processoINCRA: '',
      requerimento: '',
      assunto: '',
      solicitudesInformacao: [],
      orgaoOrigem: '',
      dataEntrada: '',
      prazoAreaTecnica: '',
      prazoFinal: '',
      situacaoProcesso: '',
      responsavel: '',
      documentoSEI: '',
      especial: false,
      observacao: '',
    });
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <nav className="breadcrumb">
          <span className="breadcrumb-item">Cadastro de Processo</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item active">Novo Processo</span>
        </nav>
      </div>

      <div className="cadastro-content">
        {/* Coluna Esquerda - Formulário */}
        <div className="formulario-column">
          <form onSubmit={handleSubmit} className="formulario">
            {/* Seção: Dados do Processo */}
            <section className="form-section">
              <h3 className="section-title">Dados do Processo</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="processoINCRA">Processo INCRA</label>
                  <input
                    type="text"
                    id="processoINCRA"
                    name="processoINCRA"
                    value={form.processoINCRA}
                    onChange={handleInputChange}
                    placeholder="0001/7/2024-88"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="requerimento">Requerimento</label>
                  <input
                    type="text"
                    id="requerimento"
                    name="requerimento"
                    value={form.requerimento}
                    onChange={handleInputChange}
                    placeholder="REQ-2024/????"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="assunto">
                  Assunto <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={form.assunto}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="solicitudesInfo">
                  Solicitudes de Informação
                </label>
                <div className="solicitudes-input-group">
                  <input
                    type="text"
                    id="solicitudesInfo"
                    value={solicitudePendente}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSolicitudePendente(e.target.value)
                    }
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSolicitude();
                      }
                    }}
                    placeholder="Adicione uma solicitação"
                  />
                  <button
                    type="button"
                    onClick={handleAddSolicitude}
                    className="btn-add"
                  >
                    +
                  </button>
                </div>
                <div className="solicitudes-tags">
                  {form.solicitudesInformacao.map((solicitude, index) => (
                    <div key={index} className="tag">
                      <span>{solicitude}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSolicitude(index)}
                        className="tag-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="orgaoOrigem">
                  Órgão de Origem <span className="required-asterisk">*</span>
                </label>
                <select
                  id="orgaoOrigem"
                  name="orgaoOrigem"
                  value={form.orgaoOrigem}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um órgão</option>
                  <option value="secretaria-saude">Secretária de Saúde</option>
                  <option value="secretaria-educacao">
                    Secretária de Educação
                  </option>
                  <option value="secretaria-fazenda">
                    Secretária da Fazenda
                  </option>
                </select>
              </div>
            </section>

            {/* Seção: Datas */}
            <section className="form-section">
              <h3 className="section-title">Datas</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dataEntrada">
                    Data de Entrada <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="date"
                    id="dataEntrada"
                    name="dataEntrada"
                    value={form.dataEntrada}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prazoAreaTecnica">Prazo Área Técnica</label>
                  <input
                    type="date"
                    id="prazoAreaTecnica"
                    name="prazoAreaTecnica"
                    value={form.prazoAreaTecnica}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prazoFinal">
                    Prazo Final <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="date"
                    id="prazoFinal"
                    name="prazoFinal"
                    value={form.prazoFinal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Seção: Controle */}
            <section className="form-section">
              <h3 className="section-title">Controle</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="situacaoProcesso">
                    Situação do Processo{' '}
                    <span className="required-asterisk">*</span>
                  </label>
                  <select
                    id="situacaoProcesso"
                    name="situacaoProcesso"
                    value={form.situacaoProcesso}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma situação</option>
                    <option value="em-andamento">Em andamento</option>
                    <option value="concluido">Concluído</option>
                    <option value="parado">Parado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="responsavel">
                    Responsável <span className="required-asterisk">*</span>
                  </label>
                  <select
                    id="responsavel"
                    name="responsavel"
                    value={form.responsavel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um responsável</option>
                    <option value="joao-silva">João da Silva</option>
                    <option value="maria-santos">Maria dos Santos</option>
                    <option value="pedro-oliveira">Pedro Oliveira</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="documentoSEI">
                  Documento SEI - Resposta
                </label>
                <select
                  id="documentoSEI"
                  name="documentoSEI"
                  value={form.documentoSEI}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o documento</option>
                  <option value="doc-001">Documento 001</option>
                  <option value="doc-002">Documento 002</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="especial"
                  name="especial"
                  checked={form.especial}
                  onChange={handleInputChange}
                />
                <label htmlFor="especial" className="checkbox-label">
                  Especial
                </label>
              </div>
            </section>

            {/* Seção: Observação */}
            <section className="form-section">
              <h3 className="section-title">Observação</h3>

              <div className="form-group">
                <textarea
                  name="observacao"
                  value={form.observacao}
                  onChange={handleInputChange}
                  placeholder="Informações complementares sobre o processo..."
                  rows={4}
                />
              </div>
            </section>

            {/* Botões de Ação */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>

        {/* Coluna Direita - Resumo */}
        <div className="resumo-column">
          <div className="resumo-card">
            <div className="resumo-header">
              <button className="btn-status">{resumo.status}</button>
            </div>

            <div className="resumo-dias">
              <span className="dias-number">{resumo.diasRestantes}</span>
              <span className="dias-text">dias restantes</span>
            </div>

            <div className="resumo-section">
              <label className="resumo-label">Prazo Final</label>
              <p className="resumo-value">{resumo.prazoFinal}</p>
            </div>

            <div className="resumo-divider"></div>

            <div className="resumo-section">
              <label className="resumo-label">Situação:</label>
              <button className="btn-situacao">{resumo.situacao}</button>
            </div>

            <div className="resumo-section">
              <label className="resumo-label">Responsável</label>
              <button className="btn-responsavel">{resumo.responsavel}</button>
            </div>

            <div className="resumo-info">
              <div className="info-icon">ⓘ</div>
              <div className="info-content">
                <h4>Como é calculado?</h4>
                <p>
                  O prazo é calculado com base na Data de Entrada e no Prazo
                  Final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrodeProcesso;
