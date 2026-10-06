import { create } from 'zustand';
import type { User, UsersStoreProps } from '../types';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create<UsersStoreProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    { name: 'user', storage: createJSONStorage(() => sessionStorage) }
  )
);
