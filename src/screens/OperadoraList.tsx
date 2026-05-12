import React, { useState } from 'react';
import { useOperadoras } from '../hooks/useOperadoras';
import { Button } from '../components/Button';

export const OperadoraList: React.FC = () => {
  const { dados, loading, carregar } = useOperadoras();
  const [filtro, setFiltro] = useState('');

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    carregar(filtro);
  };

  return (
    <div style={{ padding: '1.5rem', background: '#1f2937', borderRadius: '0.75rem', border: '1px solid #374151' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#f3f4f6' }}>🔍 Consulta de Operadoras (Exemplo de Tela)</h3>
      
      <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Digite o nome da operadora..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #4b5563',
            background: '#111827',
            color: '#ffffff',
            outline: 'none'
          }}
        />
        <Button type="submit" loading={loading}>
          Filtrar
        </Button>
      </form>

      {loading ? (
        <p style={{ color: '#9ca3af' }}>Carregando dados da SEMOB...</p>
      ) : dados.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>Nenhuma operadora encontrada. Clique em Filtrar para buscar (mock).</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {dados.map((op) => (
            <div
              key={op.idOperadora}
              style={{
                padding: '0.75rem 1rem',
                background: '#111827',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #3b82f6',
                display: 'flex',
                justifyContent: 'between',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{op.nmOperadora}</span>
              <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>ID: {op.idOperadora}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OperadoraList;
