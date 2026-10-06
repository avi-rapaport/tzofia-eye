import React, { useState } from 'react';
import { useLogin } from '../hooks/useAuthApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    const data = { userName, password };

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
      </form>
    </div>
  );
};

export default LoginPage;
