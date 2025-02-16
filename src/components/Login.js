import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setUser({ username, role: data.role });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl">Đăng nhập</h2>
      <input className="border p-2" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="border p-2" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;
