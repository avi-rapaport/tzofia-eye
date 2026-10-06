import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useAuthApi';
import { useUserStore } from '../store/useUserStore';

const Navbar = () => {
  const { mutate: logout, isPending } = useLogout();
  const user = useUserStore((state) => state.user);
  console.log(user);
  const removeUser = useUserStore((state) => state.removeUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        removeUser();
        navigate('/login');
      },
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Logout...</h1>;

  return (
    <div className="navbar">
      <div className="nav-links">
        <NavLink to="/alerts" className="nav-link">
          Alerts
        </NavLink>
        <NavLink to="/alerts/create" className="nav-link">
          Create alert
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/register" className="nav-link">
            Add user
          </NavLink>
        )}
      </div>

      <h1>Tzofia Eye system</h1>

      <button onClick={handleLogout} className="action-btn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
