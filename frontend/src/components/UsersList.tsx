import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface Users {
  users: User[];
}

const UsersList = ({ users }: Users) => {
  const navigate = useNavigate();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
          <h1>{user.userName}</h1>
          <h4>{user.assignedArena}</h4>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
