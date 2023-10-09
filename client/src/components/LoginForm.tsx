import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { getLetters } from "../slices/coverLetterSlice";

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
      
      const coverLetterResponse = await fetch(
        "http://localhost:5001/api/c-l/user/",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!coverLetterResponse.ok) {
        const errorData = await coverLetterResponse.json();
        console.error("Failed to fetch cover letters:", errorData.message);
        // Optionally, handle the error, for example, by showing a notification to the user.
      } else {
        const coverLetterData = await coverLetterResponse.json();
        dispatch(getLetters(coverLetterData.data)); // dispatch the fetched cover letters to the Redux store
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="">
      <div className="h-screen w-full max-w-xl md:h-auto md:min-w-auto bg-gradient-to-br from-indigo-500/20 dark:from-black/50 via-gray-100/90 dark:via-slate-800/80 to-gray-300/80 dark:to-black/50 flex rounded-2xl md:p-5 shadow-lg items-stretch">
        <form
          onSubmit={handleLogin}
          className="bg-azure-radiance flex flex-col rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
