import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/userSlice";

import LongForms from "./components/LoginForm";

import { getLetters } from "./slices/coverLetterSlice";
import UserProfile from "./components/UserProfile";

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
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Success") {
            dispatch(login(data.activeUser)); // Here you are logging in the user and updating the user state.

            // Now, perform another fetch to get the cover letters related to this user.
            fetch("http://localhost:5001/api/c-l/user/", {
              headers: {
                Authorization: `Bearer ${token}`, // Assuming that your server expects the token for authentication.
              },
            })
              .then((response) => response.json())
              .then((letterData) => {
                if (letterData.status === "Success") {
                  dispatch(getLetters(letterData.data)); // Update the state with the fetched letters.
                }
              })
              .catch((error) =>
                console.error("Error fetching cover letters:", error)
              );
          }
        })
        .catch((error) => console.error("Error fetching active user:", error));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <LongForms />
      <UserProfile />
    </div>
  );
};

export default App;
