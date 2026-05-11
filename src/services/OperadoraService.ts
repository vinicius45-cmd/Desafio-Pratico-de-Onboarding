import { api } from '../config/api';
import { Operadora } from '../types';

export const OperadoraService = {
  async listar(filtro: string): Promise<Operadora[]> {
    const { data } = await api.get<Operadora[]>('/operadoras', { 
      params: { nmOperadora: filtro } 
    });
    return data;
  }
};
