import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreateAlertPage from '../pages/CreateAlertPage';
import UpdateAlertPage from '../pages/UpdateAlertPage';
import AlertDetailsPage from '../pages/AlertDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoutes from './ProtectedRoutes';
import LoginPage from '../pages/LoginPage';
import AdminRoutes from './AdminRoutes';
import RegisterPage from '../pages/RegisterPage';
import UsersPage from '../pages/UsersPage';
import Layout from '../components/Layout';
import UserDetailsPage from '../pages/UserDetailsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AdminRoutes />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/alerts" element={<HomePage />} />
          <Route path="/alerts/create" element={<CreateAlertPage />} />
          <Route path="/alerts/update" element={<UpdateAlertPage />} />
          <Route path="/alerts/:id" element={<AlertDetailsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
