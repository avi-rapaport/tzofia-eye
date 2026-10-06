import { useAlertStore } from '../store/useAlertSrore';
import type { Alert, AlertPriority, Arena } from '../types';
import AlertsMap from '../components/AlertsMap';
import AlertsList from '../components/AlertsList';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useEffect, useMemo } from 'react';

const HomePage = () => {
  const { data, isLoading, error } = useFetch<Alert[]>(
    'http://localhost:3001/api/alerts'
  );

  const setAlerts = useAlertStore((state) => state.setAlerts);

  useEffect(() => {
    if (data) {
      setAlerts(data);
    }
  }, [data, setAlerts]);

  const alerts = useAlertStore((state) => state.alerts);

  const resetFilters = useAlertStore((state) => state.resetFilters);

  const nameSearch = useAlertStore((state) => state.nameSearch);
  const selectedPriority = useAlertStore((state) => state.selectedPriority);
  const selectedArena = useAlertStore((state) => state.selectedArena);
  const setNameSearch = useAlertStore((state) => state.setNameSearch);
  const setSelectedPriority = useAlertStore(
    (state) => state.setSelectedPriority
  );
  const setSelectedArena = useAlertStore((state) => state.setSelectedArena);

  const filterredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchName =
        nameSearch === '' ||
        alert.displayName.toLowerCase().includes(nameSearch.toLowerCase());

      const matchPriority =
        selectedPriority === '' ||
        alert.priority.toLowerCase() === selectedPriority.toLowerCase();

      const matchArena =
        selectedArena === '' ||
        alert.arena.toLowerCase() === selectedArena.toLowerCase();
      console.log(matchPriority, selectedPriority, selectedArena);
      return matchName && matchPriority && matchArena;
    });
  }, [alerts, nameSearch, selectedPriority, selectedArena]);

  console.log(filterredAlerts);

  if (isLoading) return <h1>Loading alerts map...</h1>;
  if (error) alert(error);

  return (
    <div className="home-page">
      <AlertsMap alerts={filterredAlerts} height={450} />

      <label>
        search display name
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setNameSearch(e.target.value)}
        />
      </label>

      <label>
        priority
        <select
          onChange={(e) => setSelectedPriority(e.target.value as AlertPriority)}
        >
          <option value="">All pririties</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">Hige</option>
          <option value="Critical">Critical</option>
        </select>
      </label>

      <label>
        arena
        <select onChange={(e) => setSelectedArena(e.target.value as Arena)}>
          <option value="">all arenas</option>
          <option value="north">north</option>
          <option value="south">south</option>
          <option value="center">center</option>
        </select>
      </label>

      <button onClick={resetFilters}>reset filters</button>

      <Link className="create-alert-btn" to="/alerts/create">
        Create new alert +
      </Link>

      <h1>Alerts</h1>
      <AlertsList alerts={filterredAlerts} />
    </div>
  );
};

export default HomePage;
