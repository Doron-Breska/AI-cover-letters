import React, { useState, useRef, useEffect } from "react";
import "../styles/SideBar.css";
import { CgMenuRound } from "react-icons/cg";

import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { removeLetters } from "../slices/coverLetterSlice";

const SideBar: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const letters = useSelector((state: RootState) => state.cover.letters);

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
              <li className="font-bold my-3">
                <NavLink className={activePath === "/" ? "active" : ""} to="/">
                  Home
                </NavLink>
              </li>
              {user !== null ? (
                <>
                  <li className="font-bold my-3">
                    <NavLink
                      className={activePath === "/profile" ? "active" : ""}
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="font-bold my-3">
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
                    <li className="font-bold my-3">
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
                <li className="font-bold my-3">
                  <NavLink
                    className={activePath === "/registeration" ? "active" : ""}
                    to="/registeration"
                  >
                    Register
                  </NavLink>
                </li>
              )}
            </ul>
            <button
              className="my-5"
              onClick={() => {
                dispatch(logout());
                dispatch(removeLetters());
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </button>
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
