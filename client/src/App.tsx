import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/user";

import LongForms from "./components/LoginForm";
import SomeComponent from "./components/SomeComponent";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5001/api/users/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch active user");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(login(data.activeUser));
        })
        .catch((error) => {
          console.error("Failed to fetch active user:", error);
          localStorage.removeItem("token"); // Remove invalid token
        });
    }
  }, [dispatch]);
  return (
    <div className="App">
      <LongForms />
      <SomeComponent />
    </div>
  );
};

export default App;
