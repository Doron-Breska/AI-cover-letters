import React, { useState, useRef, useEffect } from "react";
import "../styles/SideBar.css";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";

const SideBar: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

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
          <AiOutlineMenuUnfold />
        </button>
      )}

      {isSidebarVisible && (
        <>
          <div ref={sidebarRef} className="sidebar">
            <ul>
              <li>
                <NavLink className={activePath === "/" ? "active" : ""} to="/">
                  Home
                </NavLink>
              </li>
              {user !== null ? (
                <>
                  <li>
                    <NavLink
                      className={activePath === "/profile" ? "active" : ""}
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={
                        activePath === "/create-letter" ? "active" : ""
                      }
                      to="/create-letter"
                    >
                      Create Cover Letter
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
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
              style={{ border: "3px solid green" }}
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </button>
          </div>
          <button className="hamburger" onClick={closeSidebar}>
            <AiOutlineMenuUnfold />
          </button>
        </>
      )}
    </>
  );
};

export default SideBar;
