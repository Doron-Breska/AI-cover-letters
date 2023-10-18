import React, { useState, useRef, useEffect } from "react";
import "../styles/SideBar.css";
import { CgMenuRound } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";

import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";
import { getLetters, removeLetters } from "../slices/coverLetterSlice";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { serverURL } from "../utils/serverURL";

const SideBar: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const letters = useSelector((state: RootState) => state.cover.letters);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [msg, setMsg] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const useActivePath = () => {
    const location = useLocation();
    return location.pathname;
  };

  const activePath = useActivePath();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverURL}/api/users/login`, {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(login(user));
      // console.log(user);
      setMsg("");

      const coverLetterResponse = await axios.get(
        `${serverURL}/api/c-l/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getLetters(coverLetterResponse.data.data));
      //eslint-disable-next-line
    } catch (error: any) {
      // Check if the error response from the server exists
      if (error.response && error.response.data && error.response.data.msg) {
        setMsg(error.response.data.msg);
        console.error("Login Error:", error.response.data.msg);
      } else {
        console.error("General Login Error:", error);
        setMsg("Something went wrong with the srevr, Please try again.");
      }
    }
  };

  return (
    <>
      {!isSidebarVisible && (
        <button className="hamburger" onClick={() => setIsSidebarVisible(true)}>
          <CgMenuRound />
        </button>
      )}

      {isSidebarVisible && (
        <>
          <div ref={sidebarRef} className="sidebar">
            <ul>
              <li className="font-bold my-5">
                <NavLink className={activePath === "/" ? "active" : ""} to="/">
                  Home
                </NavLink>
              </li>
              {user !== null ? (
                <>
                  <li className="font-bold my-5">
                    <NavLink
                      className={activePath === "/profile" ? "active" : ""}
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="font-bold my-5">
                    <NavLink
                      className={
                        activePath === "/create-letter" ? "active" : ""
                      }
                      to="/create-letter"
                    >
                      Create Cover Letter
                    </NavLink>
                  </li>
                  {letters.length !== 0 && (
                    <li className="font-bold my-5">
                      <NavLink
                        className={
                          activePath === "/manage-letters" ? "active" : ""
                        }
                        to="/manage-letters"
                      >
                        Saved Letters
                      </NavLink>
                    </li>
                  )}
                </>
              ) : (
                <li className="font-bold my-5">
                  <NavLink
                    className={activePath === "/registration" ? "active" : ""}
                    to="/registration"
                  >
                    Register
                  </NavLink>
                </li>
              )}
            </ul>
            {user ? (
              <RiLogoutBoxRLine
                className="my-5 side-btn"
                onClick={() => {
                  dispatch(logout());
                  dispatch(removeLetters());
                  localStorage.removeItem("token");
                }}
              />
            ) : (
              <form className="mt-8">
                <label>Username: </label>
                <input type="text" ref={usernameRef} className="my-1" />

                <label>Password: </label>
                <input type="password" ref={passwordRef} className="my-1" />
                <RiLoginBoxLine
                  onClick={handleLogin}
                  className="my-5 side-btn"
                />
                <input
                  type="submit"
                  onClick={handleLogin}
                  style={{ display: "none" }}
                />
                {msg && (
                  <div className="reg-error-div" ref={errorRef}>
                    <h2 className="font-extrabold	">{msg}</h2>
                    <AiOutlineCloseCircle
                      className="close-error-reg mt-2"
                      onClick={() => {
                        setMsg("");
                      }}
                    />
                  </div>
                )}
              </form>
            )}

            <button className="hamburger" onClick={closeSidebar}>
              <CgMenuRound />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
