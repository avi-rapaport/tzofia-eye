interface Filter {
  displayName: string;
  arena: string;
  pririty: string;
}

export type FiletrToUse = Partial<Filter>;

export interface CreateAlertBody {
  displayName: string;
  description: string;
  priority: string;
  arena: string;
  lon: number;
  lat: number;
}

export interface UpdateAlertBody {
  displayName: string;
  description: string;
  priority: string;
  arena: string;
  status: string;
  lon: number;
  lat: number;
}
