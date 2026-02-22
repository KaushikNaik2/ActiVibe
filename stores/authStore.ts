import { create } from 'zustand';
import { SEED_VOLUNTEER, SEED_NGO, type User } from '@/data/seed';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  darkMode: boolean;
  loading: boolean;
  
  // Actions
  loginAsVolunteer: () => void;
  loginAsNGO: () => void;
  logout: () => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  darkMode: false,
  loading: false,

  loginAsVolunteer: () => set({
    user: SEED_VOLUNTEER,
    isAuthenticated: true,
    loading: false,
  }),

  loginAsNGO: () => set({
    user: SEED_NGO,
    isAuthenticated: true,
    loading: false,
  }),

  logout: () => set({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  setLoading: (loading) => set({ loading }),
}));
