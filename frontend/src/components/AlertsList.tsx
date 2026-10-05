import { useNavigate } from 'react-router-dom';
import type { Alerts } from '../types';

const AlertsList = ({ alerts }: Alerts) => {
  const navigate = useNavigate();
  return (
    <div className="alert-list">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          onClick={() => navigate(`/alerts/${alert.id}`)}
          className="alert-item"
        >
          <h3>{alert.displayName}</h3>
          <p>{alert.description}</p>
          <h4>{alert.arena}</h4>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;
