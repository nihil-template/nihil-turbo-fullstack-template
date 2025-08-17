import type { UserInfo } from '@repo/prisma';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthHeader {
  title: string;
  description: string;
}

interface AuthActions {
  setSession: (session: UserInfo) => void;
  clearSession: () => void;
  setAuthCardHeader: (header: AuthHeader) => void;
}

// Auth 스토어 상태 타입
interface AuthState {
  session: UserInfo | null;
  authCardHeader: AuthHeader;
  actions: AuthActions;
}

const authStore = create(
  persist<AuthState>((set) => ({
    session: null,
    authCardHeader: {
      title: '',
      description: '',
    },
    actions: {
      setSession: (session) => (
        set({ session, })
      ),
      clearSession: () => (
        set({ session: null, })
      ),
      setAuthCardHeader: (header) => (
        set({ authCardHeader: header, })
      ),
    },
  }), {
    name: 'auth-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ session: state.session, } as AuthState),
  })
);

export const useSession = () => authStore((state) => state.session);
export const useAuthCardHeader = () => authStore((state) => state.authCardHeader);
export const useAuthActions = () => authStore((state) => state.actions);
