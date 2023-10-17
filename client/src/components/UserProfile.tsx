import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const letters = useSelector((state: RootState) => state.cover.letters); // cover represents the name of the slice inside the "createSlice"

  interface PersonalInfo {
    Leadership: number;
    "Adaptability & Flexibility": number;
    "Proactivity & Initiative": number;
    "Attention to details": number;
    Spontaneity: number;
    "Teamwork & Collaboration": number;
    Resilience: number;
    "Innovativeness & Creativity": number;
    "Emotional intelligence": number;
  }

  return (
    <>
      <div
        className="mt-24"
        style={{ color: "orange", border: "3px solid green" }}
      >
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.tech_info}</p>
            <p>{user.personal_text}</p>
            {user.personal_info && (
              <p>{(user.personal_info as PersonalInfo).Leadership}</p>
            )}
            {user.personal_info && (
              <pre>{JSON.stringify(user.personal_info, null, 2)}</pre>
            )}
            {user.img ? (
              <img src={user.img} style={{ width: "300px" }}></img>
            ) : (
              <p>this user dont have a pic yet</p>
            )}
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
