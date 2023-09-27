import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      dispatch(login(data.user));
      console.log(data.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <hr />
      <button
        onClick={() => {
          dispatch(logout());
          localStorage.removeItem("token");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LoginForm;
