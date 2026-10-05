import type { Alert } from '../types';

interface AlertCard {
  alert: Alert;
}

const AlertCard = ({ alert }: AlertCard) => {
  return (
    <div>
      <h1>alert name: {alert.displayName}</h1>
      <p>description: {alert.description}</p>
      <h4>arena: {alert.arena}</h4>
      <h3>priority: {alert.priority}</h3>
      <h4>status: {alert.status}</h4>
      <h5>
        location: {alert.lat} / {alert.lon}
      </h5>
      <h6>createdAt: {alert.createdAt}</h6>
    </div>
  );
};

export default AlertCard;
