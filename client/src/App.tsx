import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/userSlice";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { getLetters } from "./slices/coverLetterSlice";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Coverletters from "./pages/Coverletters";

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
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-letter" element={<Coverletters />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
