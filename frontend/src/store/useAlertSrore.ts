import { create } from 'zustand';
import type { Alert, AlertPriority, AlertStoreProps, Arena } from '../types';

export const useAlertStore = create<AlertStoreProps>((set) => ({
  alerts: [],
  setAlerts: (alerts: Alert[]) => set({ alerts }),
  addAlert: (alert: Alert) =>
    set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (id: string) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),

  nameSearch: '',
  selectedPriority: '',
  selectedArena: '',
  setNameSearch: (name: string) => set({ nameSearch: name }),
  setSelectedPriority: (priority: AlertPriority) =>
    set({ selectedArena: priority }),
  setSelectedArena: (arena: Arena) => set({ selectedArena: arena }),
}));
