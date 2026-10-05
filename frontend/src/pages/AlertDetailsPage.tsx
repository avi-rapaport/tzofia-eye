import { useNavigate, useParams } from 'react-router-dom';
import { useGetAlertById } from '../hooks/useAlertsApi';
import AlertCard from '../components/AlertCard';

const AlertDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useGetAlertById(id);

  if (isPending) return <h1>"Loading alert info...</h1>;
  if (isError) alert(error.message);

  return (
    <div>
      <AlertCard alert={data} />

      <button onClick={() => navigate('/alerts/update', { state: data })}>
        edit
      </button>
      <button>delete</button>
    </div>
  );
};

export default AlertDetailsPage;
