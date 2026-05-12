import { api } from '../config/api';
import { Operadora } from '../types';

export const OperadoraService = {
  async listar(filtro: string): Promise<Operadora[]> {
    try {
      const { data } = await api.get<Operadora[]>('/operadoras', { 
        params: { nmOperadora: filtro } 
      });
      return data;
    } catch (e) {
      // Fallback para Dados Mockados no Boilerplate se a API estiver offline
      console.warn('API Offline. Retornando dados mockados do Boilerplate SEMOB.');
      const mockOperadoras: Operadora[] = [
        { idOperadora: 101, nmOperadora: 'TCB - Sociedade de Transportes Coletivos de Brasília' },
        { idOperadora: 202, nmOperadora: 'Viação Piracicabana' },
        { idOperadora: 303, nmOperadora: 'Viação Marechal' },
        { idOperadora: 404, nmOperadora: 'Urbi Mobilidade Urbana' },
        { idOperadora: 505, nmOperadora: 'Viação Pioneira' }
      ];
      if (!filtro) return mockOperadoras;
      return mockOperadoras.filter(op => op.nmOperadora.toLowerCase().includes(filtro.toLowerCase()));
    }
  }
};
