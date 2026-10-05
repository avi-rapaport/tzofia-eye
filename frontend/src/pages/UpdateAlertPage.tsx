import { useState } from 'react';
import type { AlertPriority, Arena, Status } from '../types';
import { useUpdateAlerts } from '../hooks/useAlertsApi';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateAlertPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<AlertPriority>('Low');
  const [arena, setArena] = useState<Arena>('center');
  const [status, setStatus] = useState<Status>('active');
  const [lon, setLon] = useState<number>(34.7854);
  const [lat, setLat] = useState<number>(34.7854);

  const navigate = useNavigate();
  const location = useLocation();
  const alertToUpdate = location.state;

  const { mutate: update, isPending } = useUpdateAlerts(alertToUpdate.id);

  const handleCreate = (e: React.SubmitEvent) => {
    e.preventDefault();

    const alertData = {
      displayName,
      description,
      priority,
      arena,
      status,
      lon,
      lat,
    };

    update(alertData, {
      onSuccess: () => navigate(`/alerts/${alertToUpdate.id}`),
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Saving alert data...</h1>;

  return (
    <div className="create-page">
      <form onSubmit={handleCreate} className="form">
        <label>
          displayName
          <input
            className="input"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label>
          description
          <input
            className="input"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          priority
          <select
            onChange={(e) => setPriority(e.target.value as AlertPriority)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">Hige</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label>
          arena
          <select onChange={(e) => setArena(e.target.value as Arena)}>
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="center">center</option>
          </select>
        </label>

        <label>
          status
          <select onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="active">active</option>
            <option value="handled">handled</option>
          </select>
        </label>

        <label>
          longitude
          <input
            className="input"
            type="number"
            step="0.0001"
            onChange={(e) => setLon(Number(e.target.value))}
          />
        </label>

        <label>
          latitude
          <input
            className="input"
            type="number"
            step="0.0001"
            onChange={(e) => setLat(Number(e.target.value))}
          />
        </label>

        <button type="submit">Update alert</button>
      </form>
    </div>
  );
};

export default UpdateAlertPage;
