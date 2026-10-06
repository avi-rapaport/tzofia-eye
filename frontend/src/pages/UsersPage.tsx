import UsersList from '../components/UsersList';
import { useGetUsers } from '../hooks/useAuthApi';

const UsersPage = () => {
  const { data, isPending } = useGetUsers();

  if (isPending) return <h1>Loading users data...</h1>;

  return <UsersList users={data} />;
};

export default UsersPage;
