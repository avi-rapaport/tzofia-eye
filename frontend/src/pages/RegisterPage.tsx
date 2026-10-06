import React, { useState } from 'react';
import { useRegister } from '../hooks/useAuthApi';
import { useNavigate } from 'react-router-dom';
import type { AssignedArena, Role } from '../types';

const RegisterPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<Role>('arenaUser');
  const [assignedArena, setAssignedArena] = useState<AssignedArena>('all');
  const navigate = useNavigate();

  const { mutate: register, isPending } = useRegister();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    const data = { userName, password, email, role, assignedArena };

    register(data, {
      onSuccess: () => navigate('/users'),
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Saving user info...</h1>;

  return (
    <div className="register-page">
      <form onSubmit={handleLogin} className="form">
        <input
          className="input"
          type="text"
          placeholder="userName"
          required
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          role
          <select
            className="select"
            required
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="arenaUser">arena user</option>
            <option value="generalUser">general user</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <label>
          assignedArena
          <select
            className="select"
            required
            onChange={(e) => setAssignedArena(e.target.value as AssignedArena)}
          >
            <option value="all">all</option>
            <option value="north">north</option>
            <option value="south">south</option>
            <option value="center">center</option>
          </select>
        </label>

        <button type="submit" className="action-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
