import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const letters = useSelector((state: RootState) => state.cover.letters); // cover represents the name of the slice inside the "createSlice"

  return (
    <>
      <div style={{ color: "orange", border: "3px solid green" }}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.last_name}</p>
            <p>{user.first_name}</p>
            <p>{user.tech_info}</p>
            <p>{user.personal_text}</p>
            <p>{user.personal_info && <p>user.personal_info</p>}</p>
          </>
        ) : (
          <p>No user logged in</p>
        )}
      </div>
      <div style={{ color: "red", border: "3px solid green" }}>
        {letters.length === 0 ? (
          <p>no letters</p>
        ) : (
          letters.map((letter) => (
            <p key={letter.c_v_id}>
              {letter.job_title}
              {letter.content}
            </p>
          ))
        )}
      </div>
    </>
  );
};

export default UserProfile;
