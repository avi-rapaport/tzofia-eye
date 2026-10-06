import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../hooks/useAuthApi';

const ProtectedRoutes = () => {
  const { isPending, isError } = useMe();

  if (isPending) return <h1>Verify...</h1>;

  if (isError) {
    console.log(isError);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
