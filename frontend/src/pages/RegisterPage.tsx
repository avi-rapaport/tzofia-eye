import React, { useState } from 'react';
import { useLogin } from '../hooks/useAuthApi';
import { useNavigate } from 'react-router-dom';
import type { AssignedArena, Role } from '../types';

const RegisterPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<Role>('arena_user');
  const [assignedArena, setAssignedArena] = useState<AssignedArena>('all');
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    const data = { userName, password, email, role, assignedArena };

    login(data, {
      onSuccess: () => navigate('/alerts'),
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Saving user info</h1>;

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="userName"
          required
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          role
          <select onChange={(e) => setRole(e.target.value as Role)}>
            <option value="arenaUser">arena user</option>
            <option value="generalUser">general user</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <label>
          assignedArena
          <select
            onChange={(e) => setAssignedArena(e.target.value as AssignedArena)}
          >
            <option value="">all</option>
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="center">center</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default RegisterPage;
