import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DeviceList from './components/DeviceList';
import UserManagement from './components/UserManagement';

const App = () => {
  const [user, setUser] = useState(null);
  const [station, setStation] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDevices();
    }
  }, [user, station]);

  const fetchDevices = () => {
    const url = station ? `http://localhost:5000/devices?station=${station}` : 'http://localhost:5000/devices';
    fetch(url, {
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="p-5">
        {user ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Quản lý Thiết Bị</h1>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Đăng xuất</button>
            </div>
            
            <select onChange={(e) => setStation(e.target.value)} className="border p-2">
              <option value="">Toàn bộ thiết bị</option>
              <option value="Trạm 1">Trạm 1</option>
              <option value="Trạm 2">Trạm 2</option>
            </select>

            <Routes>
              <Route path="/" element={<DeviceList devices={devices} userRole={user.role} fetchDevices={fetchDevices} />} />
              {user.role === 'Admin' && <Route path="/users" element={<UserManagement />} />}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </Router>
  );
};

export default App;
