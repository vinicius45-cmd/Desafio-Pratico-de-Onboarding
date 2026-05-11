import { useState, useCallback } from 'react';
import { OperadoraService } from '../services/OperadoraService';
import { Operadora } from '../types';

export const useOperadoras = () => {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<Operadora[]>([]);

  const carregar = useCallback(async (filtro: string) => {
    setLoading(true);
    try {
      const res = await OperadoraService.listar(filtro);
      setDados(res);
    } catch (err) {
      // Aqui integra com o padrão de erro do backend (Interceptor já atua)
    } finally {
      setLoading(false);
    }
  }, []);

  return { dados, loading, carregar };
};
