export type AlertPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type Arena = 'north' | 'south' | 'center';

export interface CreateAlertBody {
  displayName: string;
  description: string;
  priority: AlertPriority;
  arena: Arena;
  lon: number;
  lat: number;
}

export interface UpdateAlertBody {
  displayName: string;
  description: string;
  priority: AlertPriority;
  arena: Arena;
  status: 'active' | 'handled';
  lon: number;
  lat: number;
}

export interface Alert {
  id: string;
  displayName: string;
  description: string;
  priority: AlertPriority;
  arena: Arena;
  lon: number;
  lat: number;
}

export interface Alerts {
  alerts: Alert[];
}

export interface AlertStoreProps {
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  nameSearch: string;
  selectedPriority: string;
  selectedArena: string;
  setNameSearch: (name: string) => void;
  setSelectedPriority: (priority: AlertPriority) => void;
  setSelectedArena: (arena: Arena) => void;
}
