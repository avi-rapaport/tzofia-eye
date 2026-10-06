import { useState } from 'react';
import type { AlertPriority, Arena, Status } from '../types';
import { useUpdateAlerts } from '../hooks/useAlertsApi';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateAlertPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alertToUpdate = location.state;

  const [displayName, setDisplayName] = useState(alertToUpdate.displayName);
  const [description, setDescription] = useState(alertToUpdate.description);
  const [priority, setPriority] = useState<AlertPriority>(
    alertToUpdate.priority
  );
  const [arena, setArena] = useState<Arena>(alertToUpdate.arena);
  const [status, setStatus] = useState<Status>(alertToUpdate.status);
  const [lon, setLon] = useState<number>(alertToUpdate.lon);
  const [lat, setLat] = useState<number>(alertToUpdate.lat);

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
      onSuccess: () => {
        navigate('/alerts');
      },
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Saving alert data...</h1>;

  return (
    <div className="update-page">
      <form onSubmit={handleCreate} className="form">
        <input
          value={displayName}
          placeholder="displayName"
          className="input"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <textarea
          placeholder="description"
          value={description}
          className="input"
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          priority
          <select
            className="select"
            value={priority}
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
          <select
            className="select"
            value={arena}
            onChange={(e) => setArena(e.target.value as Arena)}
          >
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="center">center</option>
          </select>
        </label>

        <label>
          status
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="active">active</option>
            <option value="handled">handled</option>
          </select>
        </label>

        <input
          placeholder="longitude"
          value={lon}
          className="input"
          type="number"
          step="0.0001"
          onChange={(e) => setLon(Number(e.target.value))}
        />

        <input
          placeholder="latitude"
          value={lat}
          className="input"
          type="number"
          step="0.0001"
          onChange={(e) => setLat(Number(e.target.value))}
        />

        <button type="submit">Update alert</button>
      </form>
    </div>
  );
};

export default UpdateAlertPage;
