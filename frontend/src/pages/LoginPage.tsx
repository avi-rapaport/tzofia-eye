import React, { useState } from 'react';
import { useLogin } from '../hooks/useAuthApi';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const LoginPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    const userData = { userName, password };

    login(userData, {
      onSuccess: (data) => {
        setUser(data);
        navigate('/alerts');
      },
      onError: (err) => alert(err.message),
    });
  };

  if (isPending) return <h1>Verify user info...</h1>;

  return (
    <div className="login-page">
      <h1>Welcome to tzofia eye system</h1>
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

        <button type="submit" className="action-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
