import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const AdminRoutes = () => {
  const user = useUserStore((state) => state.user);
  if (user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AdminRoutes;
