import { useAlertStore } from '../store/useAlertSrore';
import { useGetAlerts } from './useAlertsApi';

export function useConnectApiToStore() {
  const { data: result } = useGetAlerts();

  const setAlerts = useAlertStore((state) => state.setAlerts);
  setAlerts(result.data);
}
