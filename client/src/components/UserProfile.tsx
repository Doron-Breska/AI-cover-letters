import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const letters = useSelector((state: RootState) => state.cover.letters); // cover represents the name of the slice inside the "createSlice"

  return (
    <>
      <div style={{ color: "orange" }}>
        {user ? <p>{user.username}</p> : <p>No user logged in</p>}
      </div>
      <div style={{ color: "red" }}>
        {letters.length === 0 ? (
          <p>no letters</p>
        ) : (
          letters.map((letter) => <p key={letter.c_v_id}>{letter.job_title}</p>)
        )}
      </div>
    </>
  );
};

export default UserProfile;
