import { useAlertStore } from '../store/useAlertSrore';
import type { Alert, AlertPriority, Arena } from '../types';
import AlertsMap from '../components/AlertsMap';
import AlertsList from '../components/AlertsList';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const HomePage = () => {
  const alerts = useAlertStore((state) => state.alerts);
  console.log(alerts);

  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<AlertPriority>('Low');
  const [arena, setArena] = useState<Arena>('center');

  const nameSearch = useAlertStore((state) => state.nameSearch);
  const selectedPriority = useAlertStore((state) => state.selectedPriority);
  const selectedArena = useAlertStore((state) => state.selectedArena);
  const setNameSearch = useAlertStore((state) => state.setNameSearch);
  const setSelectedPriority = useAlertStore(
    (state) => state.setSelectedPriority
  );
  const setSelectedArena = useAlertStore((state) => state.setSelectedArena);

  const filterredAlerts = alerts.filter((alert: Alert) => {
    const matchName = alert.displayName
      .toLowerCase()
      .includes(nameSearch.toLowerCase());

    const matchArena = alert.arena === selectedArena;

    const matchPriority = alert.priority === selectedPriority;

    return matchName && matchArena && matchPriority;
  });

  return (
    <div className="home-page">
      <AlertsMap alerts={filterredAlerts} height={450} />

      <label>
        search display name
        <input type="text" onChange={(e) => setNameSearch(e.target.value)} />
      </label>

      <label>
        priority
        <select
          onChange={(e) => setSelectedPriority(e.target.value as AlertPriority)}
        >
          <option value="Low">Low</option>
          <option value="Low">Low</option>
          <option value="Low">Low</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <label>
        arena
        <select onChange={(e) => setSelectedArena(e.target.value as Arena)}>
          <option value="north">north</option>
          <option value="south">south</option>
          <option value="center">center</option>
        </select>
      </label>

      <Link className="create-alert-btn" to="/create">
        Create new alert +
      </Link>

      <h1>Alerts</h1>
      <AlertsList alerts={filterredAlerts} />
    </div>
  );
};

export default HomePage;
