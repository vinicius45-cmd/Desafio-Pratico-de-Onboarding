import { create } from 'zustand';

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
  token: string;
}

interface AuthState {
  usuario: Usuario | null;
  autenticado: boolean;
  setUsuario: (usuario: Usuario | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: {
    id: 1,
    nome: 'Desenvolvedor SEMOB',
    cargo: 'Auditor Técnico',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  },
  autenticado: true,
  setUsuario: (usuario) => set({ usuario, autenticado: !!usuario }),
  logout: () => set({ usuario: null, autenticado: false })
}));
