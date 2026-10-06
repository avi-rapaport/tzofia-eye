import { useState } from 'react';
import type { AlertPriority, Arena } from '../types';
import { useCreateAlerts } from '../hooks/useAlertsApi';
import { useNavigate } from 'react-router-dom';

const CreateAlertPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<AlertPriority>('Low');
  const [arena, setArena] = useState<Arena>('center');
  const [lon, setLon] = useState<number>(34.7854);
  const [lat, setLat] = useState<number>(34.7854);

  const navigate = useNavigate();

  const { mutate: create, isPending } = useCreateAlerts();

  const handleCreate = (e: React.SubmitEvent) => {
    e.preventDefault();

    const alertData = { displayName, description, priority, arena, lon, lat };
    create(alertData, {
      onSuccess: () => navigate('/alerts'),
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Saving alert data...</h1>;

  return (
    <div className="create-page">
      <form onSubmit={handleCreate} className="form">
        <input
          placeholder="displayName"
          className="input"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <textarea
          placeholder="description"
          className="input"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>
          priority
          <select
            className="select"
            onChange={(e) => setPriority(e.target.value as AlertPriority)}
            required
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
            onChange={(e) => setArena(e.target.value as Arena)}
            required
          >
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="center">center</option>
          </select>
        </label>

        <input
          placeholder="longitude"
          className="input"
          type="number"
          step="0.0001"
          onChange={(e) => setLon(Number(e.target.value))}
          required
        />

        <input
          placeholder=" latitude"
          className="input"
          type="number"
          step="0.0001"
          onChange={(e) => setLat(Number(e.target.value))}
          required
        />

        <button type="submit" className="action-btn">
          Create alert
        </button>
      </form>
    </div>
  );
};

export default CreateAlertPage;
