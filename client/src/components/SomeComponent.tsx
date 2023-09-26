import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../main";

const SomeComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return <div style={{color:"orange"}}>{user ? <p>{user.username}</p> : <p>No user logged in</p>}</div>;
};

export default SomeComponent;
