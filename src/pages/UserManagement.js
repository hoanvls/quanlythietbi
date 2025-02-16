import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h2>Quản lý Người Dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
