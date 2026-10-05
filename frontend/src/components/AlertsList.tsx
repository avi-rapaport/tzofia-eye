import type { Alerts } from '../types';

const AlertsList = ({ alerts }: Alerts) => {
  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <h1>{alert.displayName}</h1>
          <p>{alert.description}</p>
          <h3>{alert.arena}</h3>
        </div>
      ))}
    </div>
  );
};

export default AlertsList;
