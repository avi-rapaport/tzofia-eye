export type AlertPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type Arena = 'north' | 'south' | 'center';

export type Status = 'active' | 'handled';

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
  status: Status;
  lon: number;
  lat: number;
}

export interface Alert {
  id: string;
  displayName: string;
  description: string;
  priority: AlertPriority;
  arena: Arena;
  status: Status;
  lon: number;
  lat: number;
  createdAt: string;
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

export interface LoginBody {
  userName: string;
  password: string;
}

export type Role = 'arena_user' | 'general_user' | 'admin';
export type AssignedArena = 'north' | 'south' | 'center' | 'all';

export interface RegisterBody {
  userName: string;
  password: string;
  email: string;
  role: Role;
  assignedArena: AssignedArena;
}

export interface User {
  id: string;
  userName: string;
  password: string;
  email: string;
  role: Role;
  assignedArena: AssignedArena;
}

export interface UsersStoreProps {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}
