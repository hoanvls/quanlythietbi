import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users', {
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Lỗi tải user:', err));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Quản lý User</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="border p-2 my-2">
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
