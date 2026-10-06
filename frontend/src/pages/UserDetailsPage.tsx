import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteUser, useGetUserById } from '../hooks/useAuthApi';
import UserCard from '../components/UserCard';

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = useGetUserById(id);
  console.log(data);
  const { mutate: deleteUser } = useDeleteUser(id);

  if (isPending) return <h1>"Loading...</h1>;

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => navigate('/users'),
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Loading...</h1>;

  return (
    <div>
      <UserCard user={data} />
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default UserDetailsPage;
