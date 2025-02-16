import { useState } from "react";
import API_URL from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data)); // Lưu token
        alert("Đăng nhập thành công!");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Lỗi kết nối đến server.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;
