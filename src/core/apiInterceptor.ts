import { api } from '../config/api';

/**
 * Registra cabeçalhos e configurações dinâmicas de segurança
 * que devem ser enviadas com cada requisição para as APIs da SEMOB.
 */
export const setupApiInterceptors = (tokenProvider: () => string | null) => {
  api.interceptors.request.use(
    (config) => {
      const token = tokenProvider();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Configurações e logs globais de auditoria podem ser injetados aqui
      console.log(`[HTTP Request] ${config.method?.toUpperCase()} -> ${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
