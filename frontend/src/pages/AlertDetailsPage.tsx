import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteAlerts, useGetAlertById } from '../hooks/useAlertsApi';
import AlertCard from '../components/AlertCard';

const AlertDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending: alertPending, isError, error } = useGetAlertById(id);
  const { mutate: deletealert, isPending: deletePending } = useDeleteAlerts(id);

  if (alertPending) return <h1>"Loading alert info...</h1>;
  if (deletePending) return <h1>"Deleting alert...</h1>;
  if (isError) return error.message;

  const handleDelete = () => {
    deletealert(undefined, {
      onSuccess: () => navigate('/'),
      onError: (err) => alert(err.message),
    });
  };

  return (
    <div>
      <AlertCard alert={data} />

      <button onClick={() => navigate('/alerts/update', { state: data })}>
        edit
      </button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default AlertDetailsPage;
