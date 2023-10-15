import React, { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";
import { getLetters, removeLetters } from "../slices/coverLetterSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(login(user));
      console.log(user);

      const coverLetterResponse = await axios.get(
        "http://localhost:5001/api/c-l/user/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getLetters(coverLetterResponse.data.data));
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input type="text" ref={usernameRef} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" ref={passwordRef} />
        </div>
        <button type="submit">Login</button>
      </form>
      <hr />
      <button
        onClick={() => {
          dispatch(logout());
          dispatch(removeLetters());
          localStorage.removeItem("token");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LoginForm;
