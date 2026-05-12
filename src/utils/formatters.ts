/**
 * Utilitários utilitários de formatação para os dados da SEMOB.
 */

/**
 * Formata um CPF no padrão: 000.000.000-00
 */
export const formatarCPF = (cpf: string): string => {
  const limpo = cpf.replace(/\D/g, '');
  if (limpo.length !== 11) return cpf;
  return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata uma data para o padrão brasileiro: DD/MM/AAAA
 */
export const formatarData = (dataStr: string | Date): string => {
  if (!dataStr) return '';
  const data = typeof dataStr === 'string' ? new Date(dataStr) : dataStr;
  if (isNaN(data.getTime())) return String(dataStr);
  return data.toLocaleDateString('pt-BR');
};
