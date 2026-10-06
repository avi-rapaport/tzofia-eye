import { create } from 'zustand';
import type { User, UsersStoreProps } from '../types';

export const useUserStore = create<UsersStoreProps>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  removeUser: () => set({ user: null }),
}));
