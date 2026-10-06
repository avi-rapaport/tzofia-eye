import type { User } from '../types';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.userName}</h1>
      <h1>{user.email}</h1>
      <h1>{user.role}</h1>
      <h1>{user.assignedArena}</h1>
    </div>
  );
};

export default UserCard;
