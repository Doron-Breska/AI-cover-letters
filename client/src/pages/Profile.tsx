import UpdateUser from "../components/UpdateUser";
import UserProfile from "../components/UserProfile";
import React from "react";

// type Props = {}

const Profile = () => {
  return (
    <div className="profile-page">
      <UserProfile />
      <hr />
      <hr />
      <hr />
      <UpdateUser />
    </div>
  );
};

export default Profile;
